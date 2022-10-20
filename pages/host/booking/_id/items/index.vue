<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약관리<br>예약상품을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <p style="color:#5b7ade">예약관리 서비스</p>
          <HostTabMenu />
        </div>
      </div>
    </div>
    <div class="user_dashboard full_height j_start">
      <div class="select-box">
        <v-select
          outlined hide-details="auto"
          dense
          v-model="selectedBooking"
          :items="bookings"
          item-text="text"
          item-value="value"
        ></v-select>
      </div>

      <div class="pa-5">
        <h3>등록된 예약 상품 (3)</h3>
        <v-btn outlined color="blue" class="mt-3" :to="'/host/booking/' + this.selectedBooking + '/items/create'">+ 예약상품 등록</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import HostTabMenu from "../../../../../components/HostTabMenu";
export default {
  components: {HostTabMenu},
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      let url = '/host/bookings/items';
      const response = await this.$axios.get(url);
      this.bookings = response.data;
      console.log(response);
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        // console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  mounted() {
  },
  data: () => ({
    selectedBooking: '125',
    bookings: [],
  }),
  methods: {

  },
}
</script>

<style scoped>
.create_a {background: #4961e5; height: 60px; padding: 0 24px;}
::v-deep .search_box .v-select__selection{color: #fff;}
::v-deep .search_box .theme--light.v-icon{color: #fff;}
::v-deep .search_box .v-input__slot:before {border-style: unset!important;}
.progrma_option {background: #f5f5f5; border-radius: 10px; padding: 8px 0; margin-top: 25px;}
.progrma_option p {margin-top: 10px; margin-bottom: 0;}
.sub_nav {margin-top: -7px;}
::v-deep .sub_nav .v-slide-group__wrapper {background: #173bb3;}
.select-box {padding: 0 20px;}
</style>
