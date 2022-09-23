<template>
  <div>
    <div v-if="$auth.loggedIn"> {{ $auth.user.name }} </div>
    <div v-else> <v-btn to="/auth/login">login</v-btn> </div>
    <hr/>
    <chat-list/>
  </div>
</template>

<script>
import ChatList from "../components/chat/ChatList";

export default {
  name: "index",
  components: {ChatList},
  mounted() {
    console.log(this.$auth);
  }
}
</script>

<style scoped>

</style>
