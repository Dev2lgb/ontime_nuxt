<template>
<div>
  <div class="titleform">
    <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>확정방법</span>
  </div>

  <div class="mb-7">
    <p class="font-weight-bold ma-0 mb-5">1. 예약 승인 유형을 선택해주세요.</p>
    <div>
      <v-btn-toggle
        v-model="form.is_booking_confirm"
        :error-messages="errors.is_booking_confirm"
        color="primary"
        group
        outlined
        mandatory
        dense
        class="d-flex flex-wrap justify-start align-center"
      >
        <v-btn
          large
          class="input_pd"
          value="N"
        >
          <span class="font-weight-bold mr-3">자동</span>
          예약 신청과 동시에 예약이 확정됩니다.
        </v-btn>
        <v-btn
          large
          class="input_pd"
          value="Y"
        >
          <span class="font-weight-bold mr-3">수동</span>
          관리자의 승인 후 예약이 확정됩니다.
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
  <div class="mb-7">
    <p class="font-weight-bold ma-0 mb-5">2. 공개 여부를 선택해주세요.</p>
    <div>
      <v-btn-toggle
        v-model="form.is_public"
        :error-messages="errors.is_public"
        color="primary"
        group
        outlined
        mandatory
        dense
        class="d-flex flex-wrap justify-start align-center"
      >
        <v-btn
          large
          class="input_pd"
          value="Y"
        >
          <span class="font-weight-bold mr-3">전체공개</span>
          온타임의 모든 접속자가 이 예약에 신청할 수 있어요.
        </v-btn>
        <v-btn
          large
          class="input_pd"
          value="N"
        >
          <span class="font-weight-bold mr-3">부분공개</span>
          별도의 코드를 전달받은 예약자만 신청할 수 있어요.
        </v-btn>
      </v-btn-toggle>
    </div>
  </div>
  <div class="mb-7">
    <p class="font-weight-bold ma-0 mb-5">3. 하나의 계정으로 최대 몇 개의 예약상품을 예약할 수 있나요?</p>
    <div>
      <v-btn-toggle
        v-model="form.is_multiple_option"
        :error-messages="errors.is_multiple_option"
        color="primary"
        group
        outlined
        mandatory
        dense
        class="d-flex flex-wrap justify-start align-center"
      >
        <v-btn
          large
          class="input_pd"
          value="N"
        >
          한 계정당 한 개씩만 받을게요
        </v-btn>
        <v-btn
          large
          class="input_pd"
          value="Y"
        >
          복수의 예약상품을 예약할 수 있어요.
        </v-btn>
      </v-btn-toggle>

      <div class="flex j_space a_center mt-3" v-show="form.is_multiple_option == 'Y'">
        <div class="h_width">
          <v-select
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            v-model="selectedMaxMinOption"
            :items="MaxMinOptionItems"
          ></v-select>
        </div>
        <div class="h_width ml-2">
          <v-text-field type="number" v-model="form.multiple_option_count" prefix="최대" suffix="개" outlined hide-details="auto" dense></v-text-field>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: ['data', 'errors', 'mode'],
  data: () => ({
    selectedMinTime: 'N',
    selectedTerm: 'N',
    selectedOpen: 'N',
    selectedApprove: 'N',
    dates: [],
    errors: [],
    form: {},
    menu: false,
    min_time: '1',
    minTimeItems: [
      {text: '예약시간 1시간 전', value: 1},
      {text: '예약시간 2시간 전', value: 2},
      {text: '예약시간 3시간 전', value: 3},
      {text: '예약시간 4시간 전', value: 4},
      {text: '예약시간 5시간 전', value: 5},
    ],
    selectedMaxMinOption: 'N',
    MaxMinOptionItems: [
      { text:'제한없음', value:'N' },
      { text:'최대갯수설정', value:'Y' },
    ],
  }),
  mounted() {
    this.setBeforeData();
  },
  watch: {
    selectedMaxMinOption(val) {
      if (val == 'N') {
        this.form.multiple_option_count = 0;
      }
    },
    data(val) {
      this.form = val;
    },
    form(val){
      this.$emit('form-data', val);
    },
  },
  methods: {
    classEnField() {
      if(this.form.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },

    setBeforeData() {
      if (this.mode == 'edit') {
        if (this.$store.state.common.bookingEditForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingEditForm));
          if (this.form.multiple_option_count > 0) {
            this.selectedMaxMinOption = 'Y'
          }
        }
      } else {
        if (this.$store.state.common.bookingForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingForm));
          if (this.form.multiple_option_count > 0) {
            this.selectedMaxMinOption = 'Y'
          }
        }
      }
    }
  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
.input_pd {padding: 24px 16px!important; border: 1px solid #ddd!important;}
</style>
