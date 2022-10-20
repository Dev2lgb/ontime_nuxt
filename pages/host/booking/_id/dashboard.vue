<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area">
        <div class="host_nik">
          <p><span>관리자</span> 님, 예약내역<br>프로그램을 확인해 주세요.</p>
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
      <h3>[{{ getCategoryName(booking) }}] {{ booking.title }}</h3>
      <v-btn text small class="pa-0 mt-1" @click="copySomething(booking.url)"> {{ booking.url }} <v-icon small class="ml-1">mdi-content-copy</v-icon></v-btn>
      <div class="flex j_start a_center wrap my-3">
        <v-btn dark color="#4487fa" label small class="ma-1" elevation="0" :to="'/host/booking/' + this.$route.params.id + '/members'">예약 보기</v-btn>
        <v-btn dark color="#44acfa" label small class="ma-1" elevation="0" @click="copySomething(booking.code)">예약코드 복사</v-btn>
        <v-btn dark color="#fb8c00" label small class="ma-1" elevation="0">예약 수정</v-btn>
        <v-spacer></v-spacer>
        <v-switch
          v-model="form.is_show"
          true-value="Y"
          false-value="N"
          label="노출"
          hide-details="auto"
        ></v-switch>
      </div>

      <div class="flex j_space a_center mb-5 progrma_option">
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/list_icon01.png" height="30">
          <p class="font_small_text">예약확정 ({{ booking.confirmed_number }})</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/list_icon02.png" height="30">
          <p class="font_small_text">예약대기 ({{ booking.unconfirmed_number }})</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/list_icon03.png" height="30">
          <p class="font_small_text">예약취소 ({{ booking.deleted_number }})</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/list_icon04.png" height="30">
          <p class="font_small_text">저장 ({{ booking.saved_number }})</p>
        </div>
      </div>

    </div>

    <div class="px-5">
      <div class="f_width flex j_center a_center mb-5 rela_position">
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="prev"
        >
          <v-icon small>
            mdi-chevron-left
          </v-icon>
        </v-btn>
        <p v-if="$refs.calendar" class="cal_title">
          {{ $refs.calendar.title }}
        </p>
        <v-btn
          fab
          text
          small
          color="grey darken-2"
          @click="next"
        >
          <v-icon small>
            mdi-chevron-right
          </v-icon>
        </v-btn>
      </div>
      <v-sheet height="700">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          locale="ko"
          @change="updateRange"
          event-color="transparent"
          event-height="50"
        >
          <template v-slot:event="{ event }" >
            <p class="text-center ma-0 date_selector color_main">확정 : {{ event.confirmed }}</p>
            <p class="text-center ma-0 date_selector color_red">대기 : {{ event.unconfirmed }}</p>
          </template>
        </v-calendar>
      </v-sheet>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      let urlBookings = '/host/bookings/items';
      const responseBookings = await this.$axios.get(urlBookings);
      this.bookings = responseBookings.data;
      this.selectedBooking = responseBookings.data[0];

      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    selectedBooking: {},
    selectedItem: '125',
    reservation_items: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
    focus: '',
    booking: {},
    schedules: {},
    bookings: [],
    events: [],
    type: 'month',
    selectedEvent: {},
    form: {
      is_show: 'Y'
    },
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async updateRange ({ start, end }) {
      const events = []

      let url = '/host/bookings/' + this.$route.params.id + '/calendar/' + start.date + '/' + end.date;
      const response = await this.$axios.get(url);
      this.booking = response.data.booking;
      this.schedules = response.data.calendar;

      for(var date in this.schedules)
      {
        events.push({
          start: date,
          end: date,
          confirmed: this.schedules[date]['confirmed'],
          unconfirmed: this.schedules[date]['unconfirmed'],
          timed:0,
        })
      }
      // for (let i = 0; i <  this.schedules.length; i++) {
      //   console.log(this.schedules[i]);
      //   // events.push({ start: '2022-09-13', end: '2022-09-13', name: '세미나실1(2)', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      // }
      //
      // events.push({ color:'#483dff', start: '2022-09-13', end: '2022-09-13', name: '세미나실1(2)', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      // events.push({ color:'#483dff', start: '2022-09-13', end: '2022-09-13', name: '세미나실2(4)', count: '4', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      // events.push({ color:'#483dff', start: '2022-09-14', end: '2022-09-14', name: '세미나실2(4)', count: '4', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      this.events = events
    },
    showEvent() {},
    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      }
      if (item.hasOwnProperty('category_name')){
        return item.category_name.name_ko;
      }
    },
    async copySomething(text) {
      try {
        await this.$copyText(text);
        this.$toast.success("복사되었습니다.");
      } catch (e) {
        console.error(e);
      }
    },
    getStatusName(status) {
      if (status) {
        if (status.hasOwnProperty('text_ko')) {
          return status.text_ko;
        }
      }
    }
  },
}
</script>

<style scoped>

.reservation_item { border-radius:10px; }
.reservation_status_items > div { background-color:#ddd; width:calc(25% - 20px); border-radius: 10px}
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
