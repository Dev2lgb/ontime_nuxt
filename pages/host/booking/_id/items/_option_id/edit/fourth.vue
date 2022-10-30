<template>
  <div>
    <HostSubHeader :title="'예약상품 수정'" :link="'/host/booking/' + this.$route.params.id + '/items/' + this.$route.params.option_id + '/edit/third'" />
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 상품 수정하기<br>상품수정 진행중 (4/4)</p>
        </div>

        <div class="proceeding">

          <template>
            <v-progress-linear value="100"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기본정보</p>
            <p class="q_width text-center font_small_text">일정설정</p>
            <p class="q_width text-center font_small_text">휴무일설정</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>

        <div class="titleform">
          <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약상품 시간정보</span>
        </div>

        <div class="">
          <OptionForm4 :data="form" :errors="errors" :mode="'edit'" @form-data="getFormData" />
          <div class="pt-10">
            <v-btn
              block
              depressed
              tile
              x-large
              dark
              color="#1976d2"
              @click="nextForm()"
            >예약상품 수정완료</v-btn>
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
    dates: [],
    menu: false,
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
        let url = '/host/bookings/' + this.$route.params.id + '/options/4';
        let method = 'post';

        this.form.booking_id = this.$route.params.id;
        this.form.id = this.$route.params.option_id;

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })

        if (response.data.result) {
          this.clearBookingOptionEditForm();
          this.$toast.success('예약상품이 수정되었습니다.');
          this.$router.push('/host/booking/' + this.$route.params.id + '/items');
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
    ...mapMutations("common",['setBookingOptionEditForm', 'clearBookingOptionEditForm']),
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
