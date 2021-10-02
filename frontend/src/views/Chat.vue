<template>
<div id="chat">
  <div class="container">
    <ChatSidebar @chatContact="emitContactId"></ChatSidebar>
    <ChatLog ref="chatLog"></ChatLog>
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
    emitContactId(contactId) {
      this.$refs.chatLog.chatConnect(contactId);
    },
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