<template>
  <v-app>
    <div class="global_user_wrap">
      <div class="user_size_wrap">
        <div class="fixed_header">
          <v-app-bar
            elevation="0"
            color="#fff"
          >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" x-large></v-app-bar-nav-icon>
            <v-spacer></v-spacer>
            <v-btn icon large>
              <v-icon>mdi-bookmark-plus</v-icon>
            </v-btn>
            <v-btn icon large>
              <v-icon>mdi-filter</v-icon>
            </v-btn>
            <v-btn icon large>
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
                <v-list-item>
                  <v-list-item-title>내 예약</v-list-item-title>
                </v-list-item>

                <v-list-item>
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

                <v-list-item>
                  <v-list-item-title>English</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>고객센터</v-list-item-title>
                </v-list-item>
                <v-list-item>
                  <v-list-item-title>로그아웃</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer>
        </div>

        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),

  watch: {
    group () {
      this.drawer = false
    },
  },
}
</script>

<style scoped>

</style>
