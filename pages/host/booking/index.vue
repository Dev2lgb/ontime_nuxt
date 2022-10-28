<template>
  <div>
    <HostSubHeader :title="'예약만들기'" :link="'/host/home'"/>
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 만들기<br>예약생성 진행중 (1/4)</p>
        </div>

        <div class="proceeding">
          <template>
            <v-progress-linear value="25"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기초설정</p>
            <p class="q_width text-center font_small_text">관리자 정보</p>
            <p class="q_width text-center font_small_text">확정방법</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>
        <div>
          <BookingForm1 :data="form" :errors="errors" @form-data="getFormData" />

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
    {{ form }}
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
        let url = '/host/bookings/1';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingForm(JSON.stringify(this.form));
          this.$router.push('/host/booking/second');
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
    ...mapMutations("common",['setBookingForm']),

  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
