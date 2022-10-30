<template>
  <div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">1. 기준 시간대를 선택해주세요.</p>
      <div>
        <v-select
          v-model=form.timezone
          :error-messages="errors.timezone"
          :items="timezoneItems"
          item-text="text"
          item-value="value"
          outlined
          dense
          hide-details="auto"
          placeholder="기준시간대 선택"
          height="50"
        ></v-select>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">2. 현지시간 비교기능을 사용하나요?</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.is_use_timezone"
          :error-messages="errors.is_use_timezone"
          group
          mandatory
          outlined
          dense
          class="d-flex flex-wrap justify-start align-center"
        >
          <v-btn
            class="select_btn btn_spac"
            large
            value="N"
          >
            아니요
          </v-btn>
          <v-btn
            class="select_btn btn_spac"
            large
            value="Y"
          >
            네, 예약자의 현지 시간대로 보여주세요.
          </v-btn>
        </v-btn-toggle>
        <div class="info-text">
          <p>시차 걱정 없이 해외 접속자와의 예약을 편하게 이어가세요!</p>
          - 현지시간 비교기능 사용 시, 예약자가 선택한 도시 기준으로 일정과 시간이 변환 표시<br>
          - 해외 접속자와 화상회의, 온라인 이벤트를 준비하시는 경우 해당 기능을 넣는 것을 추천
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">3. 예약 신청 가능한 기간이 따로 있나요?</p>
        <div class="mb-5">
          <v-btn-toggle
            v-model="form.is_booking_available_period"
            :error-messages="errors.is_booking_available_period"
            color="primary"
            group
            outlined
            mandatory
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              large
              class="select_btn btn_spac"
              value="N"
            >
              아니요, 없어요
            </v-btn>
            <v-btn
              large
              class="select_btn btn_spac"
              value="Y"
            >
              네, 있어요
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="mb-1" v-show="form.is_booking_available_period == 'Y'">
          <p class="font_small_text">예약 신청 가능일자 선택</p>
          <div class="flex j_start a_center">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.booking_available_period"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.booking_available_period"
                  :error-messages="errors.booking_available_period"
                  prepend-icon="mdi-calendar"
                  outlined
                  hide-details="auto"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.booking_available_period"
                no-title
                locale="ko"
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
                  @click="$refs.menu.save(form.booking_available_period)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">4. 예약 신청 가능한 최소 시간이 따로 있나요?</p>
        <div class="mb-5">
          <v-btn-toggle
            v-model="form.is_booking_available_hour"
            :error-messages="errors.is_booking_available_hour"
            color="primary"
            group
            outlined
            mandatory
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              class="select_btn btn_spac"
              large
              value="N"
            >
              아니요, 없어요
            </v-btn>
            <v-btn
              class="select_btn btn_spac"
              large
              value="Y"
            >
              네, 있어요
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="mb-1" v-show="form.is_booking_available_hour == 'Y'">
          <v-select
            v-model="form.booking_available_hour"
            :error-messages="errors.booking_available_hour"
            :items="minTimeItems"
            outlined
            hide-details="auto"
            item-text="text"
            item-value="value"
          ></v-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  props: ['data', 'errors', 'mode'],
  async fetch() {
    this.loading = true;
    try {
      let url = '/host/bookings/' + this.$route.params.id + '/options/init';
      const response = await this.$axios.get(url);
      this.timezoneItems = response.data.timezoneItems;
      this.masterBooking = response.data.booking;

      this.setBeforeData();
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
      }
    }
  },
  data: () => ({
    selectedHoliday: 'N',
    timezoneItems: [],
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
    dates: [],
    menu: false,
    form: {},
    errors: [],
    min_time: '1',
    minTimeItems: [
      {text: '예약시간 1시간 전', value: 1},
      {text: '예약시간 2시간 전', value: 2},
      {text: '예약시간 3시간 전', value: 3},
      {text: '예약시간 4시간 전', value: 4},
      {text: '예약시간 5시간 전', value: 5},
    ],
  }),
  watch: {
    data(val) {
      this.form = val;
    },
    form(val){
      this.$emit('form-data', val);
    },
  },
  methods: {
    ...mapMutations("common",['setBookingOptionForm', 'clearBookingOptionForm']),
    setBeforeData() {
      if (this.mode == 'edit') {
        if (this.$store.state.common.bookingOptionEditForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingOptionEditForm));
        }
      } else {
        if (this.$store.state.common.bookingOptionForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingOptionForm));
        }
      }
    },
    classEnField() {
      if(this.masterBooking.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
::v-deep .col_content_btn { height:auto !important; }
::v-deep .col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; }
.select_btn {border: 1px solid #ddd!important; padding: 16px!important; }
.info-text {font-size: 13px; border: 1px solid #ddd; padding: 20px 16px; margin: 14px 0 25px;}
.info-text p {font-size: 15px; font-weight: 500; color: #009688;}
</style>
