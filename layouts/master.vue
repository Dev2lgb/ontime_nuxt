<template>
  <v-app>
    <div class="global_wrap">
        <Nuxt />
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

</style>
