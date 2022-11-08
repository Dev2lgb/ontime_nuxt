<template>
  <div>
    <h3 class="mb-3 fontW"><v-icon>mdi-checkbox-multiple-marked-circle-outline</v-icon> 예약정보 조회</h3>
    <div class="flex j_start a_center line_area">
      <div class="basic_width">
        <v-select  height="50" hide-details="auto" dense @change="dateTerm" outlined v-model="selectedSearchTermItem" :items="searchTermItems"></v-select>
      </div>
      <div class="q_width">
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
            v-model="search.dates"
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
              @click="$refs.menu.save(search.dates)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div class="q_width">
        <v-text-field v-model="search.keyword" outlined dense hide-details="auto" class="mx-3" height="50" placeholder="검색어입력"></v-text-field>
      </div>
      <v-btn height="50" elevation="0" color="#2ab588" dark @click="$fetch()">검색</v-btn>
    </div>
    <div class="btn_margin flex j_space">
      <h3 class="fontW"><v-icon>mdi-clipboard-outline</v-icon> 예약 리스트</h3>
      <div>
      <v-btn elevation="0" color="#00bcd4" @click="excelDown" dark>엑셀다운</v-btn>
      </div>
    </div>
    <div class="table_in">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :single-select="false"
        item-key="id"
        show-select
      >
        <template v-slot:item.title="{ item }">
          <router-link :to="'/bookings/' + item.id" class="non-deco">
            {{ item.title }}
          </router-link>
        </template>
        <template v-slot:item.created_at="{ item }">
          {{ item.created_at.substr(0, 10) }}
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn small dark depressed color="#888" @click="editMember(item)">로그인</v-btn>
          <v-btn small dark depressed color="#888" @click="submitDeleteBooking(item.id)">삭제</v-btn>
        </template>
      </v-data-table>
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
      let url = '/admin/bookings';
      if (Object.keys(this.search).length > 0) url += '?search=' + JSON.stringify(this.search);
      const response = await this.$axios.get(url);

      this.items = response.data.data;
      this.count = this.items.length;

      this.loading = false;
    } catch (e) {
      console.log(e);
      if (e.response.status === '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  computed: {
    dateRangeText () {
      return this.search.dates.join(' ~ ')
    },
  },
  data: () => ({
    selectedSearchTermItem: '',
    searchTermItems: [
      {text: '전체', value: ''},
      {text: '이번달' , value: {type: 'last', start: {month: 0}}},
      {text: '지난달', value: {type: 'last', start: {month: 1}}},
      {text: '3개월', value: {type: 'this', start: {month: 3}}},
      {text: '6개월', value: {type: 'this', start: {month: 6}}},
    ],
    items: [],
    errors: [],
    dates: [],
    selected: [],
    search: {
      dates: [],
      keyword: '',
    },
    headers: [
      {
        text: '예약명',
        align: 'start',
        sortable: false,
        value: 'title',
      },
      { text: '상품개수', value: 'options_count' },
      { text: '예약자수', value: 'personnels_count' },
      { text: '예약관리자', value: 'host_name' },
      { text: '연락처', value: 'telephone' },
      { text: '이메일', value: 'email' },
      { text: '생성일시', value: 'created_at' },
      { text: '로그인/삭제', value: 'actions' },
    ],
    menu: false,
  }),
  methods: {
    async excelDown() {
      let url = process.env.BASEURL + '/api/admin/bookings/export';
      if (Object.keys(this.search).length > 0) url += '?search=' + JSON.stringify(this.search);
      location.href = url;
    },
    submitDeleteBooking(id){
      this.loading = true;
      try {
        this.$confirm(
          {
            message: '삭제된 데이터는 복구가 불가합니다. 정말 삭제하시겠습니까?',
            button: {
              no: '취소',
              yes: '삭제'
            },
             callback: async confirm => {
              if (confirm) {
                let url = '/admin/bookings/' + id;
                let method = 'delete';

                const response = await this.$axios({
                  url: url, method: method, data:''
                })
                if (response.data.result) {
                  this.$toast.success('삭제되었습니다.');
                  this.close();
                  this.$fetch();
                } else {
                  this.$toast.error(response.data.message);
                }
                this.loading = false;
              }
            }
          }
        )
      } catch (e) {
        console.log(e);
      }
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
.btn_margin {margin: 40px 0 20px;}
.fontW {font-weight: 400;}
.table_in {border-top: 4px solid #ddd}
.line_area {border: 1px solid #ddd; padding: 20px 30px;}
</style>
