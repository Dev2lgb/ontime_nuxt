<template>
  <div class="sizedbox">
    <Loading :loading="loading"/>
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area layout_format">
        <div class="host_nik">
          <p><span>관리자</span> 님, 예약관련하여<br>현황을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start px-5">
      <div class="sizedBox-20"></div>
      <div class="flex j_space a_center layout_format">
        <div class="t_width">
          <v-select
            v-model="searchMonth"
            :items="searchTermItems"
            outlined
            @change="dateTerm"
            dense
            hide-details="auto"
            height="50"
          >
          </v-select>
        </div>
        <div class="f_width ml-3 ">
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
                height="50"
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
        <v-btn @click="this.$fetch" class="ml-3" height="50" depressed color="#1976d2" dark>검색</v-btn>
      </div>
      <div class="layout_format">
      <div class="border_a pa-5 mt-5">
        <h3 class="mb-4">일별 방문자 및 예약자수</h3>
        <div>
          <line-chart
            :chart-options='chartOptions'
            :chart-data='dateChartData'
            chart-id='myCustomId'
          />
        </div>
        <div class="mt-3">
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  날짜
                </th>
                <th class="text-left">
                  인원
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="(datePersonnel, dindex) in datePersonnels"
                :key="dindex"
              >
                <td>{{ datePersonnel.booking_date }}</td>
                <td>{{ datePersonnel.personnel }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      <div class="border_a pa-5 mt-5">
        <h3 class="mb-4">예약상품 별 예약현황</h3>
        <div>
          <doughnut-chart
            :chart-options='bookingChartOptions'
            :chart-data='optionChartData'
            chart-id='bookingChart'
          />
        </div>
      </div>

      <div class="border_a pa-5 mt-5">
        <h3 class="mb-4">인구통계 (성별/연령대)</h3>
        <div>
          <radar-chart
            :chart-options='bookingChartOptions'
            :chart-data='sexAgeChartData'
            chart-id='bookingChart'
          />
        </div>
      </div>

      <div class="border_a pa-5 mt-5">
        <h3 class="mb-4">국가별 예약자 현황</h3>
        <div>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  국가
                </th>
                <th class="text-left">
                  인원
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="(countryPersonnel, cindex) in countryPersonnels"
                :key="cindex"
              >
                <td>{{ countryPersonnel.country }}</td>
                <td>{{ countryPersonnel.personnel }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </div>
      </div>

    </div>
  </div>
</template>
<script>
import {DateTime} from "luxon";
DateTime.defaultZoneName = 'Asia/Seoul';

export default {
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      // let urlBookings = '/host/bookings/' + this.$route.params.id + '/statistics?search=';

      if (this.search.dates.length == 0) {
        var date = new Date();
        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        this.search.dates.push(this.toStringByFormatting(firstDay));
        this.search.dates.push(this.toStringByFormatting(lastDay));
      }

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
    loading: false,
    menu: false,
    countryPersonnels : [],
    sexAgeChartData:[],
    optionChartData:[],
    dateChartData : [],
    search: {
      dates: [],
    },
    bookingChartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
    selectedItem: '125',
    reservation_items: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
    searchMonth:  {type: 'last', start: {month: 0}},
    searchTermItems: [
      {text: '이번달' , value: {type: 'last', start: {month: 0}}},
      {text: '지난달', value: {type: 'last', start: {month: 1}}},
      {text: '3개월', value: {type: 'this', start: {month: 3}}},
      {text: '6개월', value: {type: 'this', start: {month: 6}}},
    ],
  }),
  methods: {
    setInit(){
      this.dates.push();
    },
    leftPad(value) {
      if (value >= 10) {
        return value;
      }
      return `0${value}`;
    },
    toStringByFormatting(source, delimiter = '-') {
      const year = source.getFullYear();
      const month = this.leftPad(source.getMonth() + 1);
      const day = this.leftPad(source.getDate());

      return [year, month, day].join(delimiter);
    },
    dateTerm(searches) {
      this.search.dates = [];
      //console.log(searches);
      let now = DateTime.now();
      let startdate = '';
      let enddate = '';
      if (searches.type === 'this') {
        startdate = now.minus(searches.start).startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.toFormat('yyyy-MM-dd');
      }
      if (searches.type === 'last') {
        now = now.minus(searches.start);
        startdate = now.startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.endOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
      }
      if (startdate && enddate)  {
        this.search.dates = [startdate, enddate];
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
