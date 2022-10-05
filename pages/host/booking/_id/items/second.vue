<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          :to="'/host/booking/' + this.$route.params.id + '/items/create'"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 상품 등록 (2/4)</h3>
    </div>
    <div class="px-5">
      <template>
        <v-progress-linear value="50"></v-progress-linear>
      </template>
      <div class="flex j_center a_center mt-1">
        <p class="q_width text-center font_small_text">기본정보</p>
        <p class="q_width text-center font_small_text">일정설정</p>
        <p class="q_width text-center font_small_text">휴무일설정</p>
        <p class="q_width text-center font_small_text">추가정보</p>
      </div>
    </div>
    <div class="pa-5">
      <BookingOptionTime @formData="getFormData()" :errors="errors" v-show="form.type == 'time'" />
      <BookingOptionDate @formData="getFormData()" :errors="errors" v-show="form.type == 'date'" />
      <BookingOptionTerm @formData="getFormData()" :errors="errors" v-show="form.type == 'term'" />

      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
          to="/host/booking/125/items/third"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import BookingOptionTime from "../../../../../components/BookingOptionTime";
export default {
  components: {BookingOptionTime},
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      let url = '/host/bookings/' + this.$route.params.id + '/options/init';
      const response = await this.$axios.get(url);
      this.timezoneItems = response.data.timezoneItems;
      this.masterBooking = response.data.booking;

      this.setBeforeData();
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
      }
    }
  },
  data: () => ({
    form: {},
    errors: [],
    selectedTimeUnit: '30',
    selectedType: 'option1',
    selectedRest: 'Y',
    selectedQuantity: 'N',
    selectedMaxMinTime: 'N',
    selectedMaxMinMan: '1',
    selectedMaxMinOption: '1',
    timeUnitItems: [
      { text:'30분', value:'30' },
      { text:'60분', value:'60' },
      { text:'120분', value:'120' },
      { text:'직접입력', value:'0' },
    ],
    QuantityItems: [
      { text:'제한 없어요.', value:'N' },
      { text:'가능인원설정', value:'Y' },
    ],
    MaxMinTimeItems: [
      { text:'제한 없어요.', value:'N' },
      { text:'직접입력', value:'Y' },
    ],
    MaxMinManItems: [
      { text:'한 계정당 한명씩만 받을게요.', value:'1' },
      { text:'한 계정으로 여려명 예약이 가능해요.', value:'0' },
    ],
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
  }),
  methods: {
    async nextForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/2';
        let method = 'post';

        this.form.booking_id = this.$route.params.id;

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          localStorage.setItem('bookingOptionForm', JSON.stringify(this.form));
          this.$router.push('/host/booking/' + this.$route.params.id + '/items/third');
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
    setBeforeData() {
      if (localStorage.getItem('bookingOptionForm')) {
        this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingOptionForm')))
      }
    },
    classEnField() {
      if(this.masterBooking.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
    getFormData(formData) {
      this.form = _.merge({}, this.form, formData)
    },
  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
::v-deep .col_content_btn { height:auto !important; }
::v-deep .col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; }
</style>
