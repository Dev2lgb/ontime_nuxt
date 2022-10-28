<template>
  <div>
    <HostSubHeader :title="'예약수정하기'" :link="'/host/booking/' + this.$route.params.id + '/edit/third'" />
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 수정하기<br>예약수정 진행중 (4/4)</p>
        </div>

        <div class="proceeding">
          <template>
            <v-progress-linear value="100"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기초설정</p>
            <p class="q_width text-center font_small_text">관리자 정보</p>
            <p class="q_width text-center font_small_text">확정방법</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>
        <div class="">
          <BookingForm4 :data="form" :errors="errors" :mode="'edit'" @form-data="getFormData" />
          <div class="pt-10">
            <v-btn
              block
              depressed
              tile
              x-large
              dark
              color="#1976d2"
              @click="submitForm"
            >예약수정완료</v-btn>
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
    form: { },
    errors:[],
  }),
  methods: {
    getFormData(data) {
      this.form = data;
    },
    async submitForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/4';
        let method = 'post';

        this.form.id = parseInt(this.$route.params.id);

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.clearBookingEditForm();
          this.$toast.success('예약이 수정되었습니다.');
          this.$router.push('/host/home');
        } else {
          this.$toast.error(response.data.message);
          this.$router.push('/host/home');
        }


        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          this.$toast.error(e.response.data.message);
        }
      }
    },
    ...mapMutations("common",['setBookingEditForm', 'clearBookingEditForm']),
  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
.input_pd {padding: 24px 16px!important; border: 1px solid #ddd!important;}
</style>
