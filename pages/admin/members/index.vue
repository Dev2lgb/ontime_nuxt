<template>
  <div>
    <div class="flex j_start a_center">
      <div class="basic_width">
        <v-select
          v-model="selectedSearch"
          :items="searchItems"
          hide-details="auto"
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
        <v-text-field outlined dense hide-details="auto" class="mx-3"></v-text-field>
      </div>
      <v-btn>검색</v-btn>
    </div>
    <div class="py-5">
      <v-btn>푸시발송</v-btn>
      <v-btn>엑셀다운</v-btn>
    </div>
    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="desserts"
        :single-select="false"
        item-key="name"
        show-select
        class="elevation-1"
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
        text: '이름',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '연락처', value: 'calories' },
      { text: '이메일', value: 'fat' },
      { text: '출생연도', value: 'carbs' },
      { text: '성별', value: 'protein' },
      { text: '국적', value: 'iron' },
      { text: '타임존', value: 'iron' },
      { text: '가입일시', value: 'iron' },
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
</style>
