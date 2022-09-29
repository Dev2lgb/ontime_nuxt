<template>
  <v-app>
    <div class="global_user_wrap">
      <div class="user_size_wrap">

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
