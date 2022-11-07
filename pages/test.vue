<template>
  <div>
    <v-btn @click="addGoogleCalendar">Google Calendar</v-btn>
  </div>
</template>

<script>
export default {
  name: "test.vue",
  methods: {
    addGoogleCalendar() {
      this.$axios.$post('/my/bookings/google-calendar', {bookedId: 72, redirect: this.$route.path})
        .then(data => {
          if (data.result) {
            if (data.data.authUrl) {
              window.location.href = data.data.authUrl
            }
            if (data.data.events) {
              alert('success');
            }
          }
        });
    }
  }
}
</script>

<style scoped>

</style>
