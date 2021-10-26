<template>
<div id="chat__log">
    <div class="log">
        <ul class="message_list">
            <li v-for="(message, index) in messages"
                :key="message.id"
                :ref="'message-' + message.id"
                class="message">
                <div v-if="index == 0 || message.sender != messages[index - 1].sender"
                     class="message__author">
                     {{ message.sender === this.username ? 'You': message.sender }}:
                </div>
                <div class="message__text">{{ message.message }}</div>
            </li>
        </ul>
    </div>
    <div class="message_input"
         v-show="this.roomId != null">
        <input type="text" v-model="message_input" @keyup.enter="sendMessage" placeholder="Type a message...">
        <img @click="sendMessage" src="@/assets/send.svg" alt="">
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'ChatLog',
    data () {
        return {
            connection: null,
            message_input: '',
        }
    },
    methods: {
        sendMessage() {
            this.$store.dispatch('room/postMessage', {
                'message': this.message_input,
                'sender': this.username,
            })
              .then(response => {
                  this.connection.send(JSON.stringify({
                      'room_id': this.roomId,
                      ...response
                  }))
                  this.message_input = ''
              })
              .catch(error => {
                  console.log(error)
              })
        },
        connectToRoom(roomId) {
            if (this.roomId == roomId) {
                return
            }

            if (this.connection != null) {
                this.connection.close()
            }

            this.$store.dispatch('room/updateRoomId', {
                roomId: roomId,
            })

            this.connection = new WebSocket(
                'ws://'
                + window.location.hostname
                + ':8000/ws/chat/'
                + this.roomId
                + '/'
            )

            this.connection.onopen = (event) => {
                this.$store.dispatch('room/getMessages')
                  .then(response => this.$refs[`message-${this.messages.at(-1).id}`].scrollIntoView())
            }

            this.connection.onmessage = (event) => {
                this.$store.dispatch('room/addMessage', event.data)
            }

            this.connection.onclose = (event) => {
            }
        },
    },
    computed: mapState({
        username: state => state.account.username,
        roomId: state => state.room.currentRoomId,
        messages: state => state.room.messages
    })
}

</script>

<style lang="scss" scoped>

#chat__log {
    position: relative;
    flex-grow: 1;
    background-color: #2C394B;
    
    .log {
        display: flex;
        flex-direction: column-reverse;
        height: calc(100% - 40px);
        overflow-y: auto;

        .message_list {
            list-style: none;
            padding-left: 1rem;
            margin: 0 0 .5rem 0;

            .message {
                position: relative;
                bottom: 0;

                .message__author {
                    font-weight: bold;
                }

                .message__text {
                    color: #CBCBCB;
                    padding: 0 1rem;
                    word-break: break-all;
                }

            }
        }
    }

    .message_input {
        height: 40px;
        background-color: #1a212c;
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        align-items: center;

        input {
            background-color: transparent;
            outline: none;
            color: #fff;
            height: 20px;
            padding-left: 15px;
            border: 0;
            flex-grow: 1;
        }

        img {
            height: 30px;
            margin-right: 15px;
            cursor: pointer;
        }
    }
}

</style>