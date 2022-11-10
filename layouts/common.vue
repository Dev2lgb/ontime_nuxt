<template>
  <v-app>
    <vue-confirm-dialog></vue-confirm-dialog>
    <div class="global_user_wrap">
      <div class="user_size_wrap">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  mounted() {
    this.$i18n.locale = localStorage.getItem("locale");
  },
}
</script>

<style scoped>

</style>
