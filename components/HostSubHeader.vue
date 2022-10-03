<template>
  <div class="fixed_header">
    <v-app-bar
      class="host_area"
      elevation="0"
      color="#173bb3"
    >
       <v-btn
        fab
        text
        exact
        :to="'/host/home'"
        large  color="#fff"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-app-bar>
    
  </div>
</template>


<script>
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
    }
  },
}
</script>
<style scoped>
</style>

