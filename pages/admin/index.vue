<template>
  <div>
    <div class="flex j_start a_center">
      <div class="basic_width">
        <v-select
          v-model="selectedSearch"
          :items="searchItems"
          outlined
          dense
        ></v-select>
      </div>
      <div class="q_width">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dates"
              prepend-inner-icon="mdi-calendar"
              outlined
              dense
              class="ml-3"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dates"
            no-title
            scrollable
            range
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
              @click="$refs.menu.save(dates)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
    </div>

    <div class="py-10">
      <div class="mb-10">
        <h3 class="mb-3">회원/예약현황</h3>
        <div class="pa-5 flex j_center a_center border_a">
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
        <h3 class="mb-3">회원 정보에 따른 통계</h3>
        <div class="pa-5 flex j_space a_center border_a">
          <div class="h_width mr-5">
            <h3>국적통계</h3>
            <doughnut-chart
              :chart-options='chartOptions'
              :chart-data='chartData'
              chart-id='myCustomId'
            />
          </div>
          <div class="h_width">
            <v-simple-table>
              <template v-slot:default>
              <thead>
              <tr>
                <th>국적</th>
                <th>점유율</th>
                <th>회원수</th>
              </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Korea</td>
                  <td>10</td>
                  <td>20</td>
                </tr>
              </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
      </div>
      <div class="mb-10">
        <div class="pa-5 flex j_space a_center border_a">
          <div class="h_width mr-5">
            <h3>연령대별 통계</h3>
            <bar-chart
              :chart-options='barChartOptions'
              :chart-data='barChartData'
              chart-id='myCustomId'
            />
          </div>
          <div class="h_width">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th>국적</th>
                  <th>점유율</th>
                  <th>회원수</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>Korea</td>
                  <td>10</td>
                  <td>20</td>
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
export default {
  layout: 'admin',
  data: () => ({
    dates: [],
    menu: false,
    searchItems: [
      { text: '이번달', value: '이번달' },
      { text: '저번달', value: '저번달' },
      { text: '이번달', value: '이번달' }
    ],
    selectedSearch: '이번달',
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
  methods: {

  },
}
</script>

<style scoped>
.basic_width { width:150px; }
.adm_dash_item { width:calc((100% / 6)  - 20px); }
</style>
