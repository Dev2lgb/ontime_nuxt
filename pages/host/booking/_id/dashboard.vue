<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/host/home"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약관리</h3>
    </div>
    <div class="px-5">
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservation_items"
        item-text="title"
        item-value="id"
      ></v-select>
    </div>
    <div class="pa-5">
      <v-tabs>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/dashboard'">대시보드</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/members'">예약현황</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/message'">메시지</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/statistics'">통계</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/items/'">예약상품</v-tab>
      </v-tabs>
    </div>
    <div class="pa-5">
      <h3>[교육] 사찰예절 배움 템플스테이 해맞이</h3>
      <v-btn text small class="pa-0 mt-1">ontimewolrd.kr/b/d1a24a <v-icon small class="ml-1">mdi-content-copy</v-icon></v-btn>
      <div class="flex j_start a_center my-3">
        <v-btn outlined small>예약 보기</v-btn>
        <v-btn outlined small class="mx-2">예약코드 복사</v-btn>
        <v-btn outlined small>예약 수정</v-btn>
        <v-btn outlined small class="ml-2">노출중</v-btn>
      </div>
      <div class="flex j_space a_center reservation_status_items mt-5">
        <div class="text-center py-3">
          <p class="font_big_title ma-0">3</p>
          <p class="ma-0">예약 확정</p>
        </div>
        <div class="text-center py-3">
          <p class="font_big_title ma-0 ">4</p>
          <p class="ma-0">예약 대기</p>
        </div>
        <div class="text-center py-3">
          <p class="font_big_title ma-0 ">5</p>
          <p class="ma-0">예약 취소</p>
        </div>
        <div class="text-center py-3">
          <p class="font_big_title ma-0 ">6</p>
          <p class="ma-0">저장</p>
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
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :type="type"
          @click:event="showEvent"
          locale="ko"
          @change="updateRange"
          event-color="transparent"

        ></v-calendar>
      </v-sheet>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedItem: '125',
    reservation_items: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
    focus: '',
    events: [],
    type: 'month',
    selectedEvent: {},
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
    updateRange ({ start, end }) {
      const events = []
      events.push({ color:'#483dff', start: '2022-09-13', end: '2022-09-13', name: '세미나실1(2)', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      events.push({ color:'#483dff', start: '2022-09-13', end: '2022-09-13', name: '세미나실2(4)', count: '4', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      events.push({ color:'#483dff', start: '2022-09-14', end: '2022-09-14', name: '세미나실2(4)', count: '4', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      this.events = events
    },
    showEvent() {},
  },
}
</script>

<style scoped>

.reservation_item { border-radius:10px; }
.reservation_status_items > div { background-color:#ddd; width:calc(25% - 20px); border-radius: 10px}

</style>
