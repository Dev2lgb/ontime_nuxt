<template>
  <div>
    <h3 class="mb-3 fontW"><v-icon>mdi-calendar-range</v-icon> 예약일자 조회</h3>
    <div class="flex j_start a_center line_area">
      <div class="basic_width">
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
      <div class="q_width ml-3">
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

    <div class="py-10">
      <div class="mb-10">
        <h3 class="mb-3 fontW"><v-icon>mdi-account-multiple</v-icon> 회원/예약현황</h3>
        <div class="pa-5 flex j_space a_center border_a">
          <div class="adm_dash_item flex d_col j_center a_center border_r">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">방문자 현황</p>
          </div>
          <div class="adm_dash_item flex d_col j_center a_center border_r">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">페이지뷰</p>
          </div>
          <div class="adm_dash_item flex d_col j_center a_center border_r">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">누적 회원가입</p>
          </div>
          <div class="adm_dash_item flex d_col j_center a_center border_r">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">신규예약</p>
          </div>
          <div class="adm_dash_item flex d_col j_center a_center border_r">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">총 누적예약</p>
          </div>
          <div class="adm_dash_item flex d_col j_center a_center">
            <p class="ma-0 font_title font-weight-bold">10</p>
            <p class="ma-0">현재 예약중</p>
          </div>
        </div>
      </div>
      <div class="mb-10">
        <h3 class="mb-3 fontW"><v-icon>mdi-poll</v-icon> 회원 정보에 따른 통계</h3>
        <div class="pa-10 flex j_space a_center border_a">
          <div class="h_width mr-5">
            <h3 class="fontW">국적통계</h3>
            <doughnut-chart
              :chart-options='chartOptions'
              :chart-data='countryChartData'
              chart-id='myCustomId'
            />
          </div>
          <div class="h_width">
            <v-simple-table>
              <template v-slot:default>
              <thead>
              <tr>
                <th>국적</th>
                <th>회원수</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in countryPersonnels" :key="item.country">
                <td>{{ item.country }}</td>
                <td>{{ item.count }}</td>
              </tr>
              </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
      <div class="mb-10">
        <div class="pa-10 flex j_space a_center border_a">
          <div class="h_width mr-5">
            <h3 class="fontW">연령대별 통계</h3>
            <bar-chart
              :chart-options='barChartOptions'
              :chart-data='sexAgeChartData'
              chart-id='myCustomId'
            />
          </div>
          <div class="h_width">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th>연령대</th>
                  <th>남성</th>
                  <th>여성</th>
                  <th>합계</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in sexAgePersonnels" :key="item.age">
                  <td>{{ item.age }}</td>
                  <td>{{ item.male }}</td>
                  <td>{{ item.female }}</td>
                  <td>{{ item.sum }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
        <div class="mt-5 border_a pa-10">
          <h3 class="fontW">예약현황</h3>
          <line-chart
            :chart-options='barChartOptions'
            :chart-data='monthChartData'
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {DateTime} from "luxon";
DateTime.defaultZoneName = 'Asia/Seoul';

export default {
  layout: 'admin',
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

      let url = '/admin/dashboard';
      if (this.search.dates.length > 0) {
        url += '?search=' + JSON.stringify(this.search);
      }
      const response = await this.$axios.get(url);
      this.countryChartData = response.data.countryChartData;
      this.countryPersonnels = response.data.countryPersonnels;
      this.monthChartData = response.data.monthChartData;
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
  data: () => ({
    search: {
      dates: [],
    },
    countryChartData: [],
    monthChartData: [],
    countryPersonnels: [],
    sexAgeChartData: [],
    sexAgePersonnels: [],
    menu: false,
    searchMonth:  {type: 'last', start: {month: 0}},
    searchTermItems: [
      {text: '이번달' , value: {type: 'last', start: {month: 0}}},
      {text: '지난달', value: {type: 'last', start: {month: 1}}},
      {text: '3개월', value: {type: 'this', start: {month: 3}}},
      {text: '6개월', value: {type: 'this', start: {month: 6}}},
    ],
    chartData: {
      labels: [ 'January', 'February', 'March'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12]
        }
      ]
    },
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
    barChartData: {
      labels: [ 'January', 'February', 'March'],
      datasets: [
        {
          label: '남자',
          backgroundColor: '#f87979',
          data: [40, 20, 12]
        },
        {
          label: '여자',
          backgroundColor: '#f87979',
          data: [40, 20, 12]
        }
      ]
    },
    barChartOptions: {
      responsive: true,
      maintainAspectRatio: false
    },
  }),
  computed: {
    dateRangeText () {
      return this.search.dates.join(' ~ ')
    },
  },
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
.basic_width { width:150px; }
.adm_dash_item { width:calc((100% / 6)  - 20px); }
.fontW {font-weight: 400;}
.line_area {border: 1px solid #ddd; padding: 20px 30px;}
</style>
