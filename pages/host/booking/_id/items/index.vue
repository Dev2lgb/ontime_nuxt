<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area layout_format">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약관리<br>예약상품을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>
    <div class="user_dashboard full_height j_start layout_format">
      <div class="pa-5">
        <h3>등록된 예약 상품 ({{ bookingOptionItems.length }})</h3>
        <v-btn dark color="#4487fa" class="mt-5" :to="'/host/booking/' + this.$route.params.id + '/items/create'" elevation="0">+ 예약상품 등록</v-btn>

        <div class="mt-5">
          <div class="mb-5 border_a pa-3" v-for="item in bookingOptionItems" :key="item.id">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div class="flex j_start a_center">
              <v-btn depressed class="mr-3" @click="deleteOption(item.id)">삭제</v-btn>
              <v-btn depressed :to="'items/' + item.id + '/edit/'">정보수정</v-btn>
              <v-spacer></v-spacer>
              <v-switch
                v-model="item.is_display"
                true-value="Y"
                false-value="N"
                label="노출"
                @change="toggleDisplay(item.id)"
                hide-details="auto"
              ></v-switch>
            </div>
          </div>
        </div>
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

      let urlOptions = '/host/bookings/' + this.$route.params.id + '/options';
      const responseOptions = await this.$axios.get(urlOptions);
      this.bookingOptionItems = responseOptions.data;
      this.bookingOptionCount = responseOptions.data.length;

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
    bookingOptionItems: [],
  }),
  methods: {
    async deleteOption(id) {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/' + id;
        let method = 'delete';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('예약상품이 삭제되었습니다.');
          this.$fetch();
        } else {
          this.$toast.error(response.data.message);
          this.$fetch();
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    async toggleDisplay(id) {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/' + id + '/toggle/is_display';
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('처리 됐습니다.');
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
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
::v-deep .sub_nav .v-slide-group__wrapper {background: #0087e1;}
.select-box {padding: 0 20px;}
</style>
