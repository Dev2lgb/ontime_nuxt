<template>
  <v-app>
    <div>
      <div class="admin_header">
        <div class="inner">
          <h3 class="flex j_start a_center">
            <img src="~/assets/images/logo.png" alt="">
            <span class="font_title ml-5">시스템 관리자</span>
          </h3>
        </div>
      </div>
      <div class="inner">
        <div class="flex j_start a_center py-5">
          <v-btn-toggle
            mandatory
            group
          >
            <v-btn to="/admin" class="admin_nav_btn_width">대시보드</v-btn>
            <v-btn to="/admin/members" class="admin_nav_btn_width">회원관리</v-btn>
            <v-btn to="/admin/bookings" class="admin_nav_btn_width">예약관리</v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="inner my-16">
        <Nuxt />
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
.admin_header { padding:30px 0; border-bottom:1px solid #ddd; }
.admin_header img { width:150px; }
.admin_nav_btn_width { width:120px; }

</style>
