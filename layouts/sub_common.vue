<template>
  <v-app>
    <div class="global_user_wrap">
      <div class="user_size_wrap">
        <div class="fixed_header">
          <v-app-bar
            elevation="0"
            color="#fff"
          >
            <div class="flex j_start a_center">
              <div>
                <v-btn
                  fab
                  text
                  exact
                  to="/home"
                >
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
              </div>
              <h3>예약리스트</h3>
            </div>
          </v-app-bar>

        </div>

        <Nuxt />
      </div>
    </div>
  </v-app>
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
}
</script>

<style scoped>

</style>
