<template>
<div id="chat">
    <div class="log">
        <div v-for="(message, index) in messages"
             :key="message.id"
             class="message">
             <div v-if="index == 0 || message.sender != messages[index - 1].sender"  class="message_author">{{ message.sender }}</div>
            <div class="message__text">{{ message.message }}</div>
        </div>
    </div>
    <div class="message_input">
        <input type="text" v-model="message_input" @keyup.enter="sendMessage" placeholder="Type a message...">
        <img @click="sendMessage" src="@/assets/send.svg" alt="">
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
import { getAPI } from '@/axios-api'

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
            this.connection.send(JSON.stringify({
                'message': this.message_input,
                'sender': this.username,
                'roomId': this.roomId
            }))
            this.message_input = ''
        },
        connectToRoom(roomId) {
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
            }

            this.connection.onmessage = (event) => {
                const data = event.data
                console.log('message on chatLog')
                console.log(data)
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

#chat {
    position: relative;
    flex-grow: 1;
    background-color: #2C394B;
    
    .log {
        height: calc(100% - 40px);
        padding-left: 20px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;

        .message {
            position: relative;
            bottom: 0;
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