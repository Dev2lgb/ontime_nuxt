<template>
  <div>
    <HostSubHeader :title="'예약수정하기'" :link="'/host/booking/' + this.$route.params.id + '/edit'" />
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 수정하기<br>예약수정 진행중 (2/4)</p>
        </div>

        <div class="proceeding">
          <template>
            <v-progress-linear value="50"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기초설정</p>
            <p class="q_width text-center font_small_text">관리자 정보</p>
            <p class="q_width text-center font_small_text">확정방법</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>
        <div>
          <BookingForm2 :data="form" :mode="'edit'" :errors="errors" @form-data="getFormData" />
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
    form: {},
    errors: [],
  }),
  methods: {
    getFormData(data) {
      this.form = data;
    },
    async nextForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/2';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingEditForm(JSON.stringify(this.form));
          //localStorage.setItem('bookingForm', JSON.stringify(this.form));
          this.$router.push('/host/booking/' + this.$route.params.id + '/edit/third');
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
    ...mapMutations("common",['setBookingEditForm']),

  },
}
</script>

<style scoped>
.sns_tab {display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;}
.sns_input { width:calc(100% - 70px); }
</style>
