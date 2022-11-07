<template>

</template>

<script>
export default {
  name: "index",
  mounted() {
    this.addGoogleCalendar();
  },
  methods: {
    addGoogleCalendar() {
      //const query = new URLSearchParams(this.$route.query).toString();
      const query = Object.entries(this.$route.query).map(e => e.join('=')).join('&');
      this.$axios.$get('/my/bookings/google-calendar?'+query)
        .then(data => {
          if (data.result) {
            //console.log(data.data);
            if (data.data.events) {
              alert('success');
            }
            if (data.data.redirect) {
              this.$router.push(data.data.redirect);
            }
          }
        });
    }
  }
}
</script>

<style scoped>

</style>
