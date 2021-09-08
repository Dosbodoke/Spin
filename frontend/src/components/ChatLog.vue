<template>
<div id="chat">
    <div class="log">
    </div>
    <div class="message">
        <input type="text" v-model="message" @keyup.enter="sendMessage" placeholder="Type a message...">
        <img @click="sendMessage" src="@/assets/send.svg" alt="">
    </div>
</div>
</template>

<script>

export default {
    name: 'ChatLog',
    data () {
        return {
            message: ''
        }
    },
    methods: {
        sendMessage: function() {
            this.$emit('message', this.message)
            this.message = ''
        }
    }
}

</script>

<style lang="scss" scoped>

#chat {
    position: relative;
    flex-grow: 1;
    background-color: #2C394B;

    .message {
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