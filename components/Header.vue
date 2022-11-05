<template>
  <div class="fixed_header">
    <v-app-bar
     class="host_area layout_format"
      elevation="0"
      color="#fff"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon large to="/my-bookmark">
        <v-icon>mdi-bookmark-plus</v-icon>
      </v-btn>
      <v-btn icon large to="/sevice_code">
        <v-icon>mdi-filter</v-icon>
      </v-btn>
      <v-btn icon large to="/my-chat">
        <v-icon>mdi-tooltip-text</v-icon>
      </v-btn>
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
          <v-list-item
            v-show="!isMobile()"
            to="/"
          >
            <v-list-item-title>홈으로</v-list-item-title>
          </v-list-item>
          <v-list-item
            to="/my-bookings"
          >
            <v-list-item-title>내 예약</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/auth/modify"
          >
            <v-list-item-title>프로필 관리</v-list-item-title>
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
          <v-list-item
            to="/host/home"
          >
            <v-list-item-title>관리자로 전환</v-list-item-title>
          </v-list-item>

          <v-list-item @click="changeLocale('en')" v-show="this.$i18n.locale == 'ko'">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeLocale('ko')" v-show="this.$i18n.locale == 'en'">
            <v-list-item-title>Korean</v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>고객센터</v-list-item-title>
          </v-list-item>
          <v-list-item
            @click="logout"
          >
            <v-list-item-title>로그아웃</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>


<script>
import {mapMutations} from "vuex";

export default {
  middleware: ['auth'],
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
    changeLocale(lan) {
      this.$i18n.locale = lan;
      this.setLocale(lan);
    },
    isMobile() {
      var user = navigator.userAgent;
      var is_mobile = false;
      if( user.indexOf("iPhone") > -1
        || user.indexOf("Android") > -1
        || user.indexOf("iPad") > -1
        || user.indexOf("iPod") > -1
      ) {
        is_mobile = true;
      }
      return is_mobile;
    },
    ...mapMutations("common",['setLocale']),
  },
}
</script>

