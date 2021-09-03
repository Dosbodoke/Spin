<template>
<div id="chat">
  <div class="container">
    <ChatSidebar></ChatSidebar>
    <ChatLog></ChatLog>
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
  computed: mapState({
    accessToken: state => state.account.accessToken,
    refreshToken: state => state.account.refreshToken,
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