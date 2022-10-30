<template>
  <div>
    <HostSubHeader :title="'예약상품 등록'" :link="'/host/booking/' + this.$route.params.id + '/items/'" />
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 상품 만들기<br>상품생성 진행중 (1/4)</p>
        </div>

        <div class="proceeding">

          <template>
            <v-progress-linear value="25"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기본정보</p>
            <p class="q_width text-center font_small_text">일정설정</p>
            <p class="q_width text-center font_small_text">휴무일설정</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>

        <div class="titleform">
          <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약정보</span>
        </div>

        <div class="">
          <OptionForm1  :data="form" :errors="errors" @form-data="getFormData" />
        {{ form }}
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
    selectedType: 'option1',
    masterBooking: {},
    form: {
      booking_id: '',
    },
    errors: [],
  }),
  watch: {

  },
  methods: {
    getFormData(data) {
      this.form = data;
    },
    async nextForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/1';
        let method = 'post';

        this.form.booking_id = this.$route.params.id;

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingOptionForm(JSON.stringify(this.form));
          this.$router.push('/host/booking/' + this.$route.params.id + '/items/second');
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
    ...mapMutations("common",['setBookingOptionForm']),
  },
}
</script>

<style scoped>
::v-deep .col_content_btn { height:auto !important; }
::v-deep .col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; flex: auto!important; white-space: normal!important;}
.select_btn {border: 1px solid #ddd!important; padding: 16px!important; width: 100%;}
.select_btn p {margin: 0; font-weight: 400;}
.select_btn p:first-child {margin-bottom: 10px!important; font-weight: 600;}
.select_btn p:last-child {font-size: 13px;letter-spacing: -0px; }
</style>
