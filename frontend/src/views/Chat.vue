<template>
<div id="chat">
  <div class="container">
    <ChatSidebar></ChatSidebar>
    <ChatLog
      @sendMessage="sendMessage" 
      ref="chatLog"
    >
    </ChatLog>
  </div>
</div>

</template>

<script>
import ChatSidebar from "@/components/ChatSidebar"
import ChatLog from "@/components/ChatLog"
import { mapState } from 'vuex'

export default {
  name: 'Chat',
  components: {
    ChatSidebar,
    ChatLog,
  },
  data() {
    return {
      connection: null,
    }
  },
  methods: {
    sendMessage: function(message) {
      const data = {
        'message': message
      }
      this.connection.send(JSON.stringify(data))
    }
  },
  created() {
    this.connection = new WebSocket(
      'ws://'
      + window.location.hostname
      + ':8000/ws/chat/'
      + this.username
      + '/'
    )

    this.connection.onopen = (event) => {
    }

    this.connection.onmessage = (event) => {
      this.$refs.chatLog.logMessage(JSON.parse(event.data))
    }

    this.connection.onclose = (event) => {
    }

  },
  computed: mapState({
    accessToken: state => state.account.accessToken,
    refreshToken: state => state.account.refreshToken,
    username: state => state.account.username,
  })
}
</script>

<style lang="scss" scoped>
#chat {
  .container {
    max-width: 1140px;
    margin: 0 auto;
    height: 100vh;
    display: flex;
  }
}
</style>