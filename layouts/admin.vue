<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div>
      <div class="admin_header">
        <div class="inner flex j_space a_center">
          <h3 class="flex j_start a_center">
            <router-link to="/">
            <img src="~/assets/images/logo.png" alt="">
            </router-link>
            <span class="font_title">시스템 관리자</span>
          </h3>
          <v-btn @click="logout" depressed dark color="#555">로그아웃</v-btn>
        </div>
      </div>
      <div class="admin_gnb">
      <div class="inner">
        <div class="flex j_start a_center">
          <v-btn to="/admin" :exact="true" class="admin_nav_btn_width" tile depressed>대시보드</v-btn>
          <v-btn to="/admin/members" :exact="true" class="admin_nav_btn_width mx-3" tile depressed>회원관리</v-btn>
          <v-btn to="/admin/bookings" :exact="true" class="admin_nav_btn_width" tile depressed>예약관리</v-btn>
        </div>
      </div>
      </div>
      <div class="inner">
        <div class="admin_content">
          <Nuxt />
        </div>
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth', 'admin'],
  data: () => ({
  }),
  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  },
  watch: {
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
}
</script>

<style scoped>
.admin_header { padding:20px 0; border-bottom:1px solid #ddd; }
.admin_header img { width:120px; }
.admin_nav_btn_width { width:120px; margin: 0!important; border: none!important;}
.font_title {margin-left: 14px;}
.admin_gnb {border-bottom: 1px solid #ddd;}
.admin_content {padding-top: 40px;}
</style>
