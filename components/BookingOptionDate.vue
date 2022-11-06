<template>
  <div>
    <div class="mb-7">
      <div class="info-text">
        <p>날짜 선택형 예약</p>

          관리자는 시간 설정 없이 하루 단위로만 예약을 받아요.<br/>
          예약자는 원하는 상품의 날짜만 선택하면 돼요.
      </div>
    </div>
    <div class="titleform">
      <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약상품 정보</span>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">1. 예약이 가능한 기간이 있나요?</p>
      <v-btn-toggle
        color="primary"
        v-model="form.is_period"
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
          상시 가능해요
        </v-btn>
        <v-btn
           class="select_btn btn_spac"
              large
          value="Y"
        >
          설정된 날짜에서 가능해요
        </v-btn>
      </v-btn-toggle>

      <div class="flex j_center a_center mt-5" v-show="form.is_period == 'Y'">
        <v-menu
          v-model="available_start"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.start_date"
              label="예약 가능 시작일자"
              readonly
              outlined
              hide-details="auto"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.start_date"
            @input="available_start = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="available_end"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.end_date"
              label="예약 종료 시작일자"
              readonly
              class="ml-3"
              outlined
              hide-details="auto"
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.end_date"
            @input="available_end = false"
          ></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">2. 날짜 당 예약가능 수량(인원)을 입력해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="is_date_personnel"
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
            제한없어요
          </v-btn>
          <v-btn
             class="select_btn btn_spac"
              large
            value="Y"
          >
            가능인원설정
          </v-btn>
        </v-btn-toggle>
        <v-text-field v-show="is_date_personnel == 'Y'" v-model="form.date_personnel" type="number" suffix="명" outlined hide-details="auto" class="mt-3"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">3. 예약가능한 최소~최대 기간을 설정해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="is_booking_number"
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
            제한없어요
          </v-btn>
          <v-btn
             class="select_btn btn_spac"
              large
            value="Y"
          >
            직접입력
          </v-btn>
        </v-btn-toggle>
        <div v-show="is_booking_number == 'Y'" class="flex j_center a_center mt-5">
            <v-text-field type="number" class="h_width text-right"
                          v-model="form.min_booking_number"
                          outlined
                          hide-details="auto"
                          prefix="최소"
                          suffix="일"
                          placeholder="최소 1일"></v-text-field>
            <v-text-field type="number" class="h_width ml-3 text-right"
                          v-model="form.max_booking_number"
                          outlined
                          prefix="최대"
                          suffix="일"
                          hide-details="auto"
                          placeholder="최대 1일"></v-text-field>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">4. 하나의 계정으로 최대 몇 명을 예약할 수 있나요?</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="is_max_booking_personnel_number"
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
            한 계정당 한 명씩만 받을게요.
          </v-btn>
          <v-btn
             class="select_btn btn_spac"
              large
            value="Y"
          >
            한 계정으로 여려명 예약이 가능해요
          </v-btn>
        </v-btn-toggle>
        <div class="flex j_space a_center mt-3" v-show="is_max_booking_personnel_number == 'Y'">
          <div class="h_width">
            <v-select
              item-text="text"
              item-value="value"
              outlined
              dense
              hide-details="auto"
              v-model="selectedMaxMinOption"
              :items="MaxMinOptionItems"
              height="50"
            ></v-select>
          </div>
          <div class="h_width ml-2" v-show="selectedMaxMinOption == 'Y'">
            <v-text-field type="number" height="50" v-model="form.max_booking_personnel_number" prefix="최대" suffix="명" outlined hide-details="auto" dense></v-text-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errors', 'res_form', 'mode'],
  watch: {
    form: {
      deep: true,
      handler(val) {
        this.$emit('formData', val);
      }
    },
    date_personnel(val) {
      this.form.date_personnel = val;
    },
    is_date_personnel(val){
      if (val == 'N') {
        this.form.date_personnel = 0;
      }
    },
    is_booking_number(val) {
      if(val == 'N') {
        this.form.max_booking_number = 0;
        this.form.min_booking_number = 0;
      }
    },
    is_max_booking_personnel_number(val) {
      if (val == 'N') {
        this.form.max_booking_personnel_number = 1;
      }
    },
    selectedMaxMinOption(val) {
      if (val == 'N') {
        this.form.max_booking_personnel_number = 0;
      }
    },
  },
  mounted() {
    this.setBeforeData()
  },
  data: () => ({
    is_booking_number: 'N',
    is_date_personnel: 'N',
    is_max_booking_personnel_number: 'N',
    form: {
      date_personnel: 0,
      min_booking_number: 0,
      max_booking_number: 0,
      max_booking_personnel_number: 0,
    },

    selectedMaxMinOption: 'N',
    MaxMinOptionItems: [
      { text:'제한없음', value:'N' },
      { text:'최대인원설정', value:'Y' },
    ],
    available_start: false,
    available_end: false,
  }),
  methods: {
    setBeforeData() {
      if (this.mode == 'edit') {
        if (localStorage.getItem('bookingOptionEditForm')) {
          this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingOptionEditForm')))
          if (this.form.date_personnel > 0) {
            this.is_date_personnel = 'Y';
          }
          if (this.form.min_booking_number > 0 || this.form.min_booking_number > 0) {
            this.is_booking_number = 'Y';
          }
          if (this.form.max_booking_personnel_number == 0) {
            this.is_max_booking_personnel_number = 'Y';
            this.selectedMaxMinOption = 'N';
          }
          if (this.form.max_booking_personnel_number > 0) {
            this.is_max_booking_personnel_number = 'Y';
            this.selectedMaxMinOption = 'Y';
          }
        }
      } else {
        if (localStorage.getItem('bookingOptionForm')) {
          this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingOptionForm')))
          if (this.form.date_personnel > 0) {
            this.is_date_personnel = 'Y';
          }
          if (this.form.min_booking_number > 0 || this.form.min_booking_number > 0) {
            this.is_booking_number = 'Y';
          }
          if (this.form.max_booking_personnel_number == 0) {
            this.is_max_booking_personnel_number = 'Y';
            this.selectedMaxMinOption = 'N';
          }
          if (this.form.max_booking_personnel_number > 0) {
            this.is_max_booking_personnel_number = 'Y';
            this.selectedMaxMinOption = 'Y';
          }
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
