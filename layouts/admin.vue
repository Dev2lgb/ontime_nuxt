<template>
  <v-app>
    <div>
      <div class="admin_header">
        <div class="inner">
          <h3 class="flex j_start a_center">
            <img src="~/assets/images/logo.png" alt="">
            <span class="font_title">시스템 관리자</span>
          </h3>
        </div>
      </div>
      <div class="admin_gnb">
      <div class="inner">
        <div class="flex j_start a_center">
          <v-btn-toggle
            mandatory
            color="#2fb78b"
            group
          >
            <v-btn to="/admin" class="admin_nav_btn_width">대시보드</v-btn>
            <v-btn to="/admin/members" class="admin_nav_btn_width">회원관리</v-btn>
            <v-btn to="/admin/bookings" class="admin_nav_btn_width">예약관리</v-btn>
          </v-btn-toggle>
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
