<template>
  <div>
    <div class="select-box mb-5">
      <v-select
        outlined hide-details="auto"
        dark
        v-model="selectedBooking"
        :items="bookings"
        item-text="text"
        :item-value="bookings.value"
        @change="changeBooking"
      ></v-select>
    </div>
    <v-tabs class="sub_nav" height="50" slider-color="#03a9f4" color="#fff" dark>
      <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/items'">예약상품</v-tab>
      <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/dashboard'">대시보드</v-tab>
      <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/members'">예약현황</v-tab>
      <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/message'">메시지</v-tab>
      <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/statistics'">통계</v-tab>
    </v-tabs>
  </div>
</template>

<script>
export default {
  async fetch() {
    this.loading = true;
    try {
      let urlBookings = '/host/bookings/items';
      const responseBookings = await this.$axios.get(urlBookings);
      this.bookings = responseBookings.data;
      this.selectedBooking = parseInt(this.$route.params.id);


      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    bookings : [],
    selectedBooking : 0,
  }),
  methods: {
    changeBooking(item) {
      let pathArray = this.$route.path.split('/');
      this.$router.push('/host/booking/' + item + '/' + pathArray[pathArray.length - 1]);
    }
  },
}
</script>
