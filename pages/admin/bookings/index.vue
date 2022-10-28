<template>
  <div>
    <h3 class="mb-3 fontW"><v-icon>mdi-checkbox-multiple-marked-circle-outline</v-icon> 예약정보 조회</h3>
    <div class="flex j_start a_center line_area">
      <div class="basic_width">
        <v-select
          v-model="selectedSearch"
          :items="searchItems"
          hide-details="auto"
          height="50"
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
              placeholder="날짜선택"
              class="ml-3"
              height="50"
              hide-details="auto"
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
      <div class="q_width">
        <v-text-field outlined dense hide-details="auto" class="mx-3" height="50" placeholder="검색어입력"></v-text-field>
      </div>
      <v-btn height="50" elevation="0" color="#2ab588" dark>검색</v-btn>
    </div>
    <div class="btn_margin flex j_space">
      <h3 class="fontW"><v-icon>mdi-clipboard-outline</v-icon> 예약 리스트</h3>
      <div>
      <v-btn elevation="0" color="#00bcd4" dark>엑셀다운</v-btn>
      </div>
    </div>
    <div class="table_in">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="false"
        item-key="name"
        show-select
      >
      </v-data-table>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data: () => ({
    dates: [],
    selected: [],
    headers: [
      {
        text: '예약명',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '상품개수', value: 'calories' },
      { text: '예약자수', value: 'fat' },
      { text: '예약관리자', value: 'carbs' },
      { text: '연락처', value: 'protein' },
      { text: '이메일', value: 'iron' },
      { text: '생성일시', value: 'iron' },
    ],
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
.btn_margin {margin: 40px 0 20px;}
.fontW {font-weight: 400;}
.table_in {border-top: 4px solid #ddd}
.line_area {border: 1px solid #ddd; padding: 20px 30px;}
</style>
