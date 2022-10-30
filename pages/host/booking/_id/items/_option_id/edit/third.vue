<template>
  <div>
    <HostSubHeader :title="'예약상품 수정'" :link="'/host/booking/' + this.$route.params.id + '/items/' + this.$route.params.option_id + '/edit/second'" />
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 상품 수정하기<br>상품수정 진행중 (3/4)</p>
        </div>

        <div class="proceeding">

          <template>
            <v-progress-linear value="75"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기본정보</p>
            <p class="q_width text-center font_small_text">일정설정</p>
            <p class="q_width text-center font_small_text">휴무일설정</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>

        <div class="titleform">
          <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약상품 휴무정보</span>
        </div>

        <div class="">
          <OptionForm3 :data="form" :errors="errors" :mode="'edit'" @form-data="getFormData" />
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
    form: {
      na_weekdays: [],
      na_days: [],
    },
    errors: [],
    menu: false,
  }),
  methods: {
    getFormData(data) {
      this.form = data;
    },
    async nextForm() {
      this.loading = true;

      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/3';
        let method = 'post';

        this.form.booking_id = this.$route.params.id;
        // this.form.id = this.$route.params.option_id;

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingOptionEditForm(JSON.stringify(this.form));
          this.$router.push('/host/booking/' + this.$route.params.id + '/items/' + this.$route.params.option_id + '/edit/fourth');
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
    ...mapMutations("common",['setBookingOptionEditForm']),

  },
}
</script>

<style scoped>
::v-deep .col_content_btn { height:auto !important; }
::v-deep .col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; }
</style>
