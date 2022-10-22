<template>
  <div class="fixed_header">
    <v-app-bar
      elevation="0"
      height="80"
      color="#fff"
    >

      <img src="~/assets/images/logo.png" class="mo_logo_image">
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      left
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>서비스</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/home"
          >
            <v-list-item-title>예약하기</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/auth/modify"
          >
            <v-list-item-title>예약만들기</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>

      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/auth/login"
            v-show="!this.$auth.loggedIn"
          >
            <v-list-item-title>로그인</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/auth/register"
            v-show="!this.$auth.loggedIn"
          >
            <v-list-item-title>회원가입</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
            v-show="this.$auth.loggedIn"
          >
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/auth/modify"
            v-show="this.$auth.loggedIn"
          >
            <v-list-item-title>프로필 수정</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      drawer: false,
    }
  },
  methods: {
    async logout(){
      await this.$auth.logout();
    }
  },
}
</script>

<style>

.mo_logo_image { width:120px; }
</style>
