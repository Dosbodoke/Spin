<template>
<div id="chat">
  <div class="container">
    <ChatSidebar @connectToRoom="connectToRoom"></ChatSidebar>
    <ChatLog ref="ChatLog"></ChatLog>
  </div>
</div>

</template>

<script>
import ChatSidebar from "@/components/ChatSidebar"
import ChatLog from "@/components/ChatLog"

export default {
  name: 'Chat',
  components: {
    ChatSidebar,
    ChatLog,
  },
  methods: {
    connectToRoom(roomId) {
      this.$refs.ChatLog.connectToRoom(roomId);
    },
  },
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