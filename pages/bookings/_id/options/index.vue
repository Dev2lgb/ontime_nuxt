<template>
  <div class="f_width">
    <SubHeader :link="'/bookings'" />
    <div class="pa-5">
      <div class="pb-7">
        <div>
          <h3>예약옵션을 선택해주세요.</h3>
          <p class="mt-2">해당 예약은 1개의 상품만 선택할 수 있어요.</p>
        </div>

        <v-select
          outlined
          v-model="selectedReservationOption"
          hide-details="auto"
          :items="reservationItems"
          item-value="id"
          :item-text="getItemText"
          placeholder="예약 옵션 선택"
        ></v-select>
      </div>
      <div v-show="selectedReservationOption">
        <div class="pb-7">
          <div>
            <h3>인원 선택하기</h3>
            <p class="mt-2">최대 3명까지 참여가능해요.</p>
          </div>

          <v-select
            outlined
            v-model="selectedNumber"
            hide-details="auto"
            :items="numberItems"
            item-value="value"
            item-text="text"
          ></v-select>
        </div>
        <div class="pb-7">
          <div>
            <h3>날짜선택하기</h3>
          </div>
          <div class="f_width flex j_space a_center mb-5">
            <div class="flex j_center a_center mt-3">
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
              <p v-if="$refs.calendar" class="cal_title ma-0">
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
            <div class="q_width">
              <v-select
                :items="timezoneItems"
                outlined
                dense
                hide-details="auto"
              ></v-select>
            </div>
          </div>
          <v-sheet height="400">
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
        <div class="pb-7">
          <div>
            <h3>예약시간 선택하기</h3>
            <p class="mt-2">최소1타임 / 최대 3타임 선택 가능해요.</p>
          </div>


        </div>
      </div>
      <div class="flex j_space a_center mt-10">
        <v-btn depressed dark block color="#0057FF" :to="'/bookings/' + this.$route.params.id + '/options/second'">다음단계</v-btn>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  layout: 'user',
  data: () => ({
    selectedReservationOption: '',
    selectedNumber: '1',
    numberItems: [
      { text:'1명', value:'1' },
      { text:'2명', value:'2' },
      { text:'3명', value:'3' },
    ],
    reservationItems: [
      { id: '1', title: '템플 스테이 예절교육 집중', desc: '템플스테이 마운틴 투어' },
      { id: '2', title: '템플 스테이 힐링 세미나', desc: '템플스테이 힐링 세미나 진행' },
      { id: '3', title: '템플 스테이 비건푸드 체험', desc: '템플스테이 비건푸드 체험' }
    ],
    focus: '',
    events: [],
    type: 'month',
  }),
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getItemText(item) {
      return `${item.title} - ${item.desc}`;
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    updateRange ({ start, end }) {
      const events = []
      events.push({ color:'#483dff', start: '2022-09-13', end: '2022-09-13', name: '10/20', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      events.push({ color:'#483dff', start: '2022-09-14', end: '2022-09-14', name: '10/20', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      events.push({ color:'#483dff', start: '2022-09-15', end: '2022-09-15', name: '10/20', count: '2', timed:0, customer: { name:'송다윤', phone:'010-1234-1234'}})
      this.events = events
    },
    showEvent() {},
  },
}
</script>

<style scoped>
.thumbnail_width { width:150px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width { width:60px }
.img_radius { border-radius: 10px; }
</style>
