<template>
  <div>
    <HostSubHeader :title="'예약만들기'" />
    <div class="f_width user_padding">
      <div class="host_area">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 만들기<br>예약생성 진행중 (3/4)</p>
        </div>

        <div class="proceeding">
          <template>
            <v-progress-linear value="75"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기초설정</p>
            <p class="q_width text-center font_small_text">관리자 정보</p>
            <p class="q_width text-center font_small_text">확정방법</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>
        <div class="">
          <div class="titleform">
            <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>담당자정보</span>
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
                  value="Y"
                >
                  <span class="font-weight-bold mr-3">자동</span>
                  예약 신청과 동시에 예약이 확정됩니다.
                </v-btn>
                <v-btn
                  large
                  class="input_pd"
                  value="N"
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
          <div class="pt-10">
            <v-btn
              block
              depressed
              tile
              x-large
              dark
              color="#1976d2"
              @click="nextForm"
            >다음 단계로 이동</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  layout: 'host',
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
  }),
  mounted() {
    this.setBeforeData();
  },
  methods: {
    classEnField() {
      if(this.form.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
    async nextForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/3';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingForm(JSON.stringify(this.form));
          // localStorage.setItem('bookingForm', JSON.stringify(this.form));
          this.$router.push('/host/booking/fourth');
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    ...mapMutations("common",['setBookingForm']),
    setBeforeData() {
      if (this.$store.state.common.bookingForm) {
        this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingForm));
      }
      // if (localStorage.getItem('bookingForm')) {
      //   this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingForm')))
      // }
    }
  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
.input_pd {padding: 24px 16px!important; border: 1px solid #ddd!important;}
</style>
