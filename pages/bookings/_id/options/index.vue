<template>
  <div class="sizedbox layout_format">
    <SubHeader :link="'/bookings'" :title="'예약하기'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p>예약옵션을 선택해주세요.</p>
        <p v-show="booking.is_multiple_option == 'N' || booking.multiple_option_count == 1">해당 예약은 <span>1개의 옵션</span>만 선택 가능.</p>
        <p v-show="booking.is_multiple_option == 'Y' || booking.multiple_option_count > 0">해당 예약은 <span>{{ booking.multiple_option_count }}개의 옵션</span>만 선택 가능.</p>
      </div>
      <div class="progrma_area">
        <p><v-icon>mdi-checkbox-marked-circle-outline</v-icon> <span class="font-weight-bold">{{ bookingOptionCount }}개</span>의 예약 옵션이 대기중</p>
        <v-select
          outlined
          v-model="selectedBookingOption"
          hide-details="auto"
          :items="bookingOptionItems"
          :item-text="getItemText"
          :item-value="getItemValue"
          placeholder="예약 옵션 선택"
        ></v-select>
      </div>
      <div class="select_hide_option">
        <div v-show="selectedBookingOption.type == 'time'">
          <div class="area_line"></div>
          <div class="pb-7">
            <div class="d-flex justify-space-between align-center user_num">
              <h3><v-icon>mdi-account-multiple</v-icon> 인원 선택하기</h3>
              <p class="ma-0">최대 {{ selectedBookingOption.max_booking_personnel_number }}명까지 참여가능해요.</p>
            </div>

            <v-select
              outlined
              v-model="personnel"
              hide-details="auto"
              :items="getPersonnelItems(selectedBookingOption.max_booking_personnel_number)"
              item-value="value"
              item-text="text"
            ></v-select>
          </div>
          <div class="area_line"></div>
          <div class="pb-7">
            <div>
              <h3><v-icon>mdi-calendar-clock</v-icon> 날짜 선택하기</h3>
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
              <div class="q_width" v-show="selectedBookingOption.is_use_timezone === 'Y'">
                <v-select
                  :items="timezoneItems"
                  outlined
                  v-model="selectedTimezone"
                  dense
                  @change=""
                  hide-details="auto"
                ></v-select>
              </div>
            </div>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :type="type"
                :event-more="false"
                @click:event="showBookingTime"
                locale="ko"
                @change="updateRange"
                event-color="transparent"
              >
                <template v-slot:event="{ event }">
                  <p class="text-center ma-0 date_selector"  :class="dayClass(event)">{{ event.name }}</p>
                </template>
              </v-calendar>
            </v-sheet>
          </div>
          <div class="area_line"></div>
          <div class="">
            <div>
              <h3><v-icon>mdi-clock</v-icon> 예약시간 선택하기</h3>
              <p class="mt-2">최소 {{ selectedBookingOption.min_booking_number }}타임 / 최대 {{ selectedBookingOption.max_booking_number }}타임 선택 가능해요.</p>
            </div>
            <div>
<!--              <v-btn-toggle-->
<!--                color="primary"-->
<!--                v-model="form.date_times"-->
<!--                :error-messages="errors.type"-->
<!--                group-->
<!--                outlined-->
<!--                multiple-->
<!--                dense-->
<!--                class="d-flex flex-wrap justify-start align-center"-->
<!--              >-->
<!--                <v-btn-->
<!--                  style="border:1px solid #ccc; border-radius:10px"-->
<!--                  class="ma-1 col_content_btn"-->
<!--                  v-for="(date, d) in timeTypesItem" :key="d"-->
<!--                  :value="date.date + ' ' + date.time"-->
<!--                >-->
<!--                  {{ date.time }}-->
<!--                </v-btn>-->
<!--              </v-btn-toggle>-->
              <v-chip-group
                v-model="form.date_times"
                :error-messages="errors.date_times"
                column
                :max="selectedBookingOption.max_booking_number"
                multiple
              >
              <v-chip
                filter
                v-for="(date, d) in timeTypesItem" :key="d"
                :value="date.date + ' ' + date.time"
                :disabled="!date.is_available || !date.is_on"
              >
                {{ date.timezone_time }}
              </v-chip>
              </v-chip-group>
            </div>
          </div>
        </div>
        <div v-show="selectedBookingOption.type == 'date'">
          <div class="area_line"></div>
          <div class="pb-7">
            <div class="d-flex justify-space-between align-center user_num">
              <h3><v-icon>mdi-account-multiple</v-icon> 인원 선택하기</h3>
              <p class="ma-0">최대 {{ selectedBookingOption.max_booking_personnel_number }}명까지 참여가능해요.</p>
            </div>

            <v-select
              outlined
              v-model="form.personnel"
              hide-details="auto"
              :items="getPersonnelItems(selectedBookingOption.max_booking_personnel_number)"
              item-value="value"
              item-text="text"
            ></v-select>
          </div>
          <div class="area_line"></div>
          <div class="pb-7">
            <div>
              <h3><v-icon>mdi-calendar-clock</v-icon> 날짜 선택하기</h3>
              <p>
                예약 신청 가능일자 :
                <span v-if="selectedBookingOption.start_date">
                  {{ selectedBookingOption.start_date }} 부터 {{ selectedBookingOption.end_date }} 까지
                </span>
                <span v-else>제한없음</span>
                <br />({{ selectedBookingOption.timezone }} 기준)
              </p>
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
            </div>
            <v-sheet height="600">
              <v-calendar
                ref="calendar"
                v-model="focus"
                color="primary"
                :events="events"
                :type="type"
                @click:event="addBookings"
                locale="ko"
                :event-more="false"
                @change="updateRange"
                event-color="transparent"
              >
                <template v-slot:event="{ event }">
                  <p class="text-center ma-0 date_selector" :class="dayClass(event)">{{ event.name }}</p>
                </template>
              </v-calendar>
            </v-sheet>

          </div>
          <div class="area_line"></div>
          <div class="">
            <div>
              <h3><v-icon>mdi-clock</v-icon> 선택된 날짜</h3>
              <p class="mt-2" v-if="this.selectedBookingOption.min_booking_number > 0">최소 {{ this.selectedBookingOption.min_booking_number}}일 / 최대 {{ this.selectedBookingOption.max_booking_number }}일 선택 가능해요.</p>
              <p class="mt-2" v-else>날짜를 선택해주세요.</p>
              <div>
               <v-chip v-for="(date, d) in form.date_times" :key="d" class="ma-1" close @click:close="deleteDate(d)">{{ date }}</v-chip>
              </div>
            </div>
          </div>
        </div>
        <div class="flex j_space a_center mt-10">
          <v-btn class="next_btn" :disabled="form.date_times.length == 0" x-large depressed block color="#28b487" @click="nextForm">다음단계</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      let urlBooking = '/bookings/' + this.$route.params.id;
      const responseBooking = await this.$axios.get(urlBooking);
      this.booking = responseBooking.data.data.booking;

      let url = '/host/bookings/' + this.$route.params.id + '/options';
      const response = await this.$axios.get(url);
      this.bookingOptionItems = response.data;
      this.bookingOptionCount = response.data.length;

      //타임존
      let urlInit = 'host/bookings/init';
      const responseInit = await this.$axios.get(urlInit);
      this.timezoneItems = responseInit.data.timezoneItems;

      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    errors: [],
    timezoneItems:[],
    selectedTimezone: '',
    bookingOptionCount: 0,
    selectedBookingOption: '',
    personnel: 1,
    numberItems: [],
    bookingOptionItems: [],
    focus: '',
    events: [],
    type: 'month',
    calendarItems: [],
    availableDays: [],
    availableDateTimes: [],
    timeTypesItem: [],
    booking: { timezone: '' },
    form : {
      id : '',
      type: '',
      personnel: 1,
      date_times: [],
      title : '',
      desc : '',
      timezone : '',
    }
  }),
  watch: {
    selectedBookingOption() {
      this.form.id = this.selectedBookingOption.id;
      this.form.type = this.selectedBookingOption.type;
      this.form.title = this.selectedBookingOption.title;
      this.form.desc = this.selectedBookingOption.desc;
      this.form.timezone = this.selectedBookingOption.timezone;
      this.selectedTimezone = this.selectedBookingOption.timezone;
      const start = this.$refs.calendar.lastStart;
      const end = this.$refs.calendar.lastEnd;
      this.updateRange({start, end});
    },
    selectedTimezone() {
      const start = this.$refs.calendar.lastStart;
      const end = this.$refs.calendar.lastEnd;
      this.form.date_times = [];
      this.form.timezone = this.selectedTimezone;
      this.timeTypesItem = [];
      this.updateRange({start, end});
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
    getItemText(item) {
      return `${item.title} - ${item.desc}`;
    },
    getItemValue(item) {
      return item;
    },
    getPersonnelItems(lcount) {
      let numberItems = [];
      for(let i = 1; i <= lcount; i++) {
        numberItems.push({ text: i + '명', value: i });
      }
      return numberItems;
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    async updateRange ({ start, end }) {
      this.loading = true;
      try {
        let url = '/bookings/' + this.$route.params.id + '/options/'
          + this.selectedBookingOption.id + '/' + start.date + '/' + end.date

          if (this.selectedTimezone) {
          url +=  '/' + this.selectedTimezone;
          }

        const response = await this.$axios.get(url);
        this.calendarItems = response.data;
        this.availableDateTimes = response.data.availableDateTimes;
        let events = [];

        if (this.selectedBookingOption.type == 'time') {
          let groupbyData = _.chain(this.availableDateTimes)
            .groupBy("date")
            .map((value, key) => ({ date: key, times: value }))
            .value()
          for (let i = 0; i <  groupbyData.length; i++) {
            let available_count = 0;
            let total_count = 0;
            let is_available = false;
            let is_on = false;
            for (let j = 0; j <  groupbyData[i].times.length; j++) {
              if (groupbyData[i].times[j].is_available) {
                is_available = true;
              }
              if (groupbyData[i].times[j].is_on) {
                is_on = true;
              }
              if (groupbyData[i].times[j].is_available && groupbyData[i].times[j].is_on) {
                available_count += parseInt(groupbyData[i].times[j].available_personnel);
              }
              total_count += parseInt(groupbyData[i].times[j].total_personnel);
            }
            events.push({
              name: available_count + '/' + total_count,
              is_on: is_on,
              is_available: is_available,
              date :  groupbyData[i].date,
              times :  groupbyData[i].times,
              start:  groupbyData[i].date,
              end:  groupbyData[i].date,
              timed: '0',
            })
          }
        }
        if (this.selectedBookingOption.type == 'date') {
          for (let i = 0; i <  this.availableDateTimes.length; i++) {
            let name = '제한없음';
            if (this.availableDateTimes[i].total_personnel > 0) {
              let name = this.availableDateTimes[i].available_personnel + '/' +  this.availableDateTimes[i].total_personnel;
            }

            events.push({
              id :  this.availableDateTimes[i].id,
              date :  this.availableDateTimes[i].date,
              is_on :  this.availableDateTimes[i].is_on,
              name:  name,
              start:  this.availableDateTimes[i].date,
              end:  this.availableDateTimes[i].date,
              timed: '0',
            })
          }
        }

        this.events = events

        this.loading = false;
      } catch (e) {
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    showBookingTime(event) {
      this.timeTypesItem = [];
      this.form.date_times = [];
      for(let i = 0; i < event.eventParsed.input.times.length; i++) {
        this.timeTypesItem.push({date: event.day.date, time: event.eventParsed.input.times[i].time, timezone_time: event.eventParsed.input.times[i].timezone_time,is_available: event.eventParsed.input.times[i].is_available, is_on:event.eventParsed.input.times[i].is_on });
      }
    },
    addBookings(event) {
      if (this.selectedBookingOption.max_booking_number) {
        if ((this.form.date_times.length + 1) > this.selectedBookingOption.max_booking_number) {
          this.$toast.error('최대 예약 갯수를 초과할수 없습니다.');
          return false;
        }
      }
      if (this.form.date_times.indexOf(event.day.date) >= 0) {
        this.$toast.error('이미 추가한 날짜입니다.');
        return false;
      }
      this.form.date_times.push(event.day.date);
    },
    deleteDate(index) {
      this.form.date_times.splice(index, 1);
    },
    dayClass(event) {
      if (event) {
        return 'activate_date';
      } else {
        return 'non_activate_date';
      }
      if (event.available_personnel == 0) {
        return 'non_activate_date';
      } else {
        return 'activate_date';
      }

      if (!event.is_available) {
        return 'non_activate_date';
      } else {
        return 'activate_date';
      }

      if (!event.is_on) {
        return 'non_activate_date';
      } else {
        return 'activate_date';
      }
    },

    nextForm() {
      if (this.selectedBookingOption.min_booking_number) {
        if ((this.form.date_times.length) < this.selectedBookingOption.min_booking_number) {
          this.$toast.error('최소 예약 갯수에 맞춰 선택해주세요.');
          return false;
        }
      }

      //todo : 기존에 등록된 옵션키가있으면 알러트

      this.setUserBookingOptionForm(JSON.stringify(this.form));
      this.$router.push('/bookings/' + this.$route.params.id + '/options/second');
    },
    ...mapMutations("common",['setUserBookingOptionForm']),

  },

}
</script>

<style scoped>
.date_selector { height:50px; }
.activate_date {
  color:#483dff;
}
.non_activate_date {
  color:#aaa;
}
.thumbnail_width { width:150px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width { width:60px }
.img_radius { border-radius: 10px; }

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px; margin-bottom: 0;}
.user_nik p span { color: #4487fa; font-weight: 600;}
.user_nik p span span {color: #28b487;}

.select_hide_option {margin-top: 30px;}
.user_num {margin-bottom: 14px;}
.user_num p {font-size: 14px; color: #ff5722;}

.next_btn {font-size: 15px; color:#fff; }
::v-deep .v-event > div { color:#333 !important; text-align:center; }
</style>
