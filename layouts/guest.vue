<template>
  <v-app>
    <div class="global_login_wrap">
      <div class="phone_size_wrap">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {

  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  }
}
</script>

<style scoped>

</style>
