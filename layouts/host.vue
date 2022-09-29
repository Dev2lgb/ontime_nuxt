<template>
  <v-app>
    <div class="global_wrap">
      <div class="phone_size_wrap">
        <Nuxt />
      </div>
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: ['auth'],
  data: () => ({
  }),

  watch: {
  },
  methods: {
  },
}
</script>

<style scoped>

</style>
