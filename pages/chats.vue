<template>
  <div>
    <div v-if="$auth.loggedIn">
      {{ $auth.user.name }}
      <v-btn @click="$auth.logout()">logout</v-btn>
    </div>
    <div v-else> <v-btn to="/auth/login">login</v-btn> </div>
    <hr/>
    <chat-list/>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import ChatList from "../components/chat/ChatList";

export default {
  name: "index",
  components: {ChatList},
  mounted() {
    console.log(this.$auth);
    if (this.$auth.loggedIn) {
      this.init();
    }
  },
  methods: {
    ...mapActions('chat', ['setChats']),
    async init() {
      this.$echo.private('chat-unreads.' + this.$auth.user.id).listen('ChatUnread', e => {
        //console.log('chat-unreads', e.unreads, this.$auth.user.id);
        if (e.unreads) {
          //e.unreads.forEach(e => this.setUnreadChat(e));
          this.setChats(e.unreads);
        }
      });
      const data = await this.$axios.$get('/api/chats');
      this.setChats(data.chats);
    }
  }
}
</script>

<style scoped>

</style>
