<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area">
        <div class="host_nik">
          <p><span>관리자</span> 님, 예약관련하여<br>현황을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start px-5">
      <div class="flex j_space a_center">
        <div class="h_width">
          <v-select
            v-model="searchMonth"
            :items="monthsItems"
            outlined
            dense
            hide-details="auto"
          >
          </v-select>
        </div>
        <div class="h_width ml-3">
          <v-menu
            ref="menu"
            v-model="menu"
            :close-on-content-click="false"
            :return-value.sync="search.dates"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="dateRangeText"
                prepend-inner-icon="mdi-calendar"
                outlined
                dense
                hide-details="auto"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="search.dates"
              no-title
              range
              scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                text
                color="primary"
                @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                text
                color="primary"
                @click="$refs.menu.save(search.dates)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>
        <v-btn @click="this.$fetch">검색</v-btn>
      </div>
      {{ countryPersonnels }}
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      // let urlBookings = '/host/bookings/' + this.$route.params.id + '/statistics?search=';
      let url = '/host/bookings/' + this.$route.params.id + '/statistics?search=';
      if (this.search.dates.length > 0) {
        url += JSON.stringify(this.search);
      }
      const response = await this.$axios.get(url);
      this.countryPersonnels = response.data.countryPersonnels;
      this.dateChartData = response.data.dateChartData;
      this.datePersonnels = response.data.datePersonnels;
      this.optionChartData = response.data.optionChartData;
      this.optionPersonnels = response.data.optionPersonnels;
      this.sexAgeChartData = response.data.sexAgeChartData;
      this.sexAgePersonnels = response.data.sexAgePersonnels;

      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  computed: {
    dateRangeText () {
      return this.search.dates.join(' ~ ')
    },
  },
  data: () => ({
    menu: false,
    countryPersonnels : [],
    dateChartData : [],
    search: {
      dates: [],
    },
    selectedItem: '125',
    reservation_items: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
    searchMonth: '1',
    monthsItems: [
      {text : '이번달', value: '1'},
      {text : '3개월', value: '3'},
      {text : '6개월', value: '6'},
    ]
  }),
  methods: {
    setInit(){
      this.dates.push();
    }
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
