<template>
  <div>
    <div class="mb-7">
      <div class="info-text">
        <p>날짜&시간 선택형 예약</p>

          관리자는 원하는 날짜를 시간 또는 분 단위로 나누어 예약을 받아요.<br/>
          예약자는 원하는 상품의 날짜와 시간을 선택할 수 있어요.
      </div>
    </div>

    <div class="titleform">
      <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약상품 정보</span>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">1. 예약 시작과 종료시간을 알려주세요.</p>
      <div class="flex j_space a_center">
        <div class="h_width">
          <v-select height="50" v-model="form.start_time" :error-messages="errors.start_time" :items="timeItems" @change="calcTimeTable" outlined dense hide-details="auto" placeholder="시작시간"></v-select>
        </div>
        <div class="h_width ml-3">
          <v-select height="50" v-model="form.end_time" :error-messages="errors.end_time" :items="timeItems" @change="calcTimeTable" outlined dense hide-details="auto" placeholder="종료시간"></v-select>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">2. 몇 시간 단위로 예약을 받으세요?</p>
      <div>
        <v-radio-group
          v-model="form.interval_minute"
          :error-messages="errors.interval_minute"
          @change="calcTimeTable"
          hide-details="auto"
          row
        >
          <v-radio label="30분" :value="30"></v-radio>
          <v-radio label="60분" :value="60"></v-radio>
          <v-radio label="120분" :value="120"></v-radio>
          <v-radio label="직접입력" :value="0"></v-radio>
        </v-radio-group>
        <v-text-field v-show="form.interval_minute == '0'" @change="calcTimeTable" v-model="form.interval_minute_direct" type="number" suffix="분" outlined hide-details="auto" dense class="mt-3" height="50"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">3. 예약가능한 최소-최대 선택 갯수 을 설정해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.booking_number"
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
            제한 없어요.
          </v-btn>
          <v-btn
            class="select_btn btn_spac"
              large
            value="Y"
          >
            직접입력
          </v-btn>
        </v-btn-toggle>

        <div class="flex j_center a_center mt-3" v-show="form.booking_number == 'Y'">
          <v-text-field type="number" class="h_width"
                        v-model="form.min_booking_number"
                        outlined
                        dense
                        hide-details="auto"
                        height="50"
                        placeholder="최소 1개 타임"></v-text-field>
          <v-text-field type="number" class="h_width ml-3"
                        v-model="form.max_booking_number"
                        outlined
                        dense
                        hide-details="auto"
                        height="50"
                        placeholder="최대 1개 타임"></v-text-field>
        </div>
      </div>

    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">4. 하나의 계정으로 최대 몇 명을 예약할 수 있나요?</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.max_booking_personnel_number"
          group
          outlined
          mandatory
          dense
          class="d-flex flex-wrap justify-start align-center"
        >
          <v-btn
            class="select_btn btn_spac"
              large
            value="1"
          >
            한 계정당 한 명씩만 받을게요
          </v-btn>
          <v-btn
            class="select_btn btn_spac"
              large
            value="0"
          >
            한 계정으로 여려명 예약이 가능해요
          </v-btn>
        </v-btn-toggle>
        <div class="flex j_space a_center mt-3" v-show="form.max_booking_personnel_number == '0'">
          <div class="h_width">
            <v-select
              item-text="text"
              item-value="value"
              height="50"
              outlined
              dense
              hide-details="auto"
              v-model="selectedMaxMinOption"
              :items="MaxMinOptionItems"
            ></v-select>
          </div>
          <div class="h_width ml-2" v-show="selectedMaxMinOption == '0'">
            <v-text-field type="number" height="50" prefix="최대" suffix="명" outlined hide-details="auto" dense></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-1">5. 시간 당 예약가능 수량(인원)을 입력해주세요.</p>
      <p class="ma-0 mb-3 color_gray font_small_text">휴게시간이나 예약이 불가 한 타임은 On/Off처리하실 수 있습니다.</p>
      <div>
        <div class="flex j_center a_center time_head py-2 font_small_text">
          <div class="ma-0 time_col1">예약 타임</div>
          <div class="ma-0 time_col2">가능 수량(인원)</div>
          <div class="ma-0 time_col3">On/Off</div>
        </div>
        <div class="flex j_center a_center time_head py-2 font_small_text background_gray" v-show="form.time_personnels.length > 0">
          <div class="ma-0 time_col1">일괄설정</div>
          <div class="ma-0 time_col2">
            <v-text-field type="number" v-model="countAll" class="font_small_text itemCount" hide-details="auto" outlined dense suffix="명"></v-text-field>
          </div>
          <div class="ma-0 time_col3"></div>
        </div>
        <div class="flex j_center a_center time_body font_small_text" v-for="(item, i) in form.time_personnels" :key="i">
          <div class="ma-0 time_col1">{{ item.time }}</div>
          <div class="ma-0 time_col2">
            <v-text-field type="number" v-model="item.personnel" class="font_small_text" :value="item.personnel" hide-details="auto" outlined dense suffix="명"></v-text-field>
          </div>
          <div class="ma-0 time_col3">
            <v-switch
              class="d-inline-block"
              v-model="item.is_on"
              true-value="Y"
              false-value="N"
            ></v-switch>
          </div>
        </div>
        <div v-show="form.time_personnels.length == 0">
          <p class="font_small_text color_gray text-center py-5">예약시작, 종료시간, 단위를 선택하세요.</p>
        </div>
        <div v-show="form.time_personnels.length > 0">
          <v-switch
            class="d-inline-block"
            v-model="form.no_limit"
            true-value="Y"
            false-value="N"
            label="인원제한 없음으로 설정"
          ></v-switch>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['res_form','errors','mode'],
  data: () => ({
    form: {
      no_limit: 'N',
      time_personnels: [],
    },
    time_number_items: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
    ],
    timeItems: [
      { text: '00:00', value:'00:00:00'},
      { text: '01:00', value:'01:00:00'},
      { text: '02:00', value:'02:00:00'},
      { text: '03:00', value:'03:00:00'},
      { text: '04:00', value:'04:00:00'},
      { text: '05:00', value:'05:00:00'},
      { text: '06:00', value:'06:00:00'},
      { text: '07:00', value:'07:00:00'},
      { text: '08:00', value:'08:00:00'},
      { text: '09:00', value:'09:00:00'},
      { text: '10:00', value:'10:00:00'},
      { text: '11:00', value:'11:00:00'},
      { text: '12:00', value:'12:00:00'},
      { text: '13:00', value:'13:00:00'},
      { text: '14:00', value:'14:00:00'},
      { text: '15:00', value:'15:00:00'},
      { text: '16:00', value:'16:00:00'},
      { text: '17:00', value:'17:00:00'},
      { text: '18:00', value:'18:00:00'},
      { text: '19:00', value:'19:00:00'},
      { text: '20:00', value:'20:00:00'},
      { text: '21:00', value:'21:00:00'},
      { text: '22:00', value:'22:00:00'},
      { text: '23:00', value:'23:00:00'},
    ],
    selectedMaxMinOption: '',
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
    countAll: 1,
  }),
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$emit('formData', val);
      }
    },
    countAll(val) {
      _.forEach(this.form.time_personnels, function(value) {
        value.personnel = val;
      });
    },
  },
  mounted() {
    this.setBeforeData();
  },
  methods: {
    calcTimeTable() {
      let startTimeMin = 0;
      let endTimeMin = 0;
      let unitMinute = Number(this.form.interval_minute);
      let unitMinuteDirect = Number(this.form.interval_minute_direct);

      if (unitMinute == 0) {
        if (unitMinuteDirect > 0) {
          unitMinute = Number(unitMinuteDirect);
        }
      }

      if (this.form.start_time) {
        startTimeMin = Number(this.form.start_time.substr(0, 2)) * 60;
      }
      if (this.form.end_time) {
        endTimeMin = Number(this.form.end_time.substr(0, 2)) * 60;
      }

      let m = Number(startTimeMin);
      this.form.time_personnels = [];
      if (unitMinute > 0) {
        while (m < endTimeMin) {
          let minRange = (m/60);
          let maxRange = (m + unitMinute) / 60;
          this.form.time_personnels.push({
            time: this.changeTimeFormat(minRange) + '~' + this.changeTimeFormat(maxRange), personnel: '1', is_on: 'Y'
          });
          m = m + unitMinute;
        }
      }
    },
    changeTimeFormat(time) {
      let hour = parseInt(time / 1);
      let setHour = '';
      let setMin = '';

      if (String(hour).length == 1) {
        setHour = '0' + String(hour);
      } else {
        setHour = String(hour);
      }
      let Min = time % 1;
      if (Min > 0) {
        setMin = Math.round(Min * 60);
      }
      if (Min == 0) {
        setMin = '00';
      }
      return setHour + ':' + setMin
    },
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
  },

}
</script>

<style scoped>
.time_head { font-size:14px; border-bottom: 1px solid #ddd; }
.time_col1 { width:36%; text-align:center; }
.time_col2 { width:32%; text-align:center; }
.time_col3 { width:32%; text-align:center; }
.select_btn {border: 1px solid #ddd!important; padding: 16px!important; }
.info-text {font-size: 13px; border: 1px solid #ddd; padding: 20px 16px; margin: 14px 0 25px;}
.info-text p {font-size: 15px; font-weight: 500; color: #009688;}
</style>
