<template>
<div id="chat">
    <div class="log">
        <div v-for="(message, index) in messages"
             :key="index"
             class="message"
        >
            {{ message.message }}
        </div>
    </div>
    <div class="message_input">
        <input type="text" v-model="message_input" @keyup.enter="sendMessage" placeholder="Type a message...">
        <img @click="sendMessage" src="@/assets/send.svg" alt="">
    </div>
</div>
</template>

<script>

export default {
    name: 'ChatLog',
    data () {
        return {
            message_input: '',
            messages: [{'name': 'bodok', 'message': 'New Message From me!'}, {'name': 'carl', 'message': 'Another message for test purpose'}]
        }
    },
    methods: {
        sendMessage: function() {
            this.$emit('sendMessage', this.message_input)
            this.message_input = ''
        },
        logMessage (data) {
            const message = data['message']
            this.messages.push({
                'name': 'foo',
                'message': message
            })
        }
    },
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