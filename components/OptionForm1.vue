<template>
  <div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">1. 지금 선택하신 상품은 어떤 예약인가요?</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.type"
          :error-messages="errors.type"
          group
          mandatory
          outlined
          dense
          class="d-flex flex-wrap justify-start align-center"
        >
          <v-btn
            class="ma-1 col_content_btn select_btn"
            value="time"
          >
            <p>날짜&시간 선택형 예약</p>
            <p>
              관리자는 원하는 날짜를 시간 또는 분 단위로 나누어 예약을 받아요.<br/>
              예약자는 원하는 상품의 날짜와 시간을 선택할 수 있어요.
            </p>
          </v-btn>
          <v-btn
            class="ma-1 col_content_btn select_btn"
            value="date"
          >
            <p>날짜 선택형 예약</p>
            <p>
              관리자는 시간 설정 없이 하루 단위로만 예약을 받아요.<br/>
              예약자는 원하는 상품의 날짜만 선택하면 돼요.
            </p>
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">2. 예약 상품의 이름을 입력해주세요.</p>
      <div>
        <v-text-field
          placeholder="예약 상품명 입력"
          outlined
          hide-details="auto"
          v-model="form.title"
          :error-messages="errors.title"
        ></v-text-field>

        <v-text-field
          placeholder="영문 예약 상품명 입력"
          outlined
          class="mt-3"
          hide-details="auto"
          v-model="form.title_en"
          :error-messages="errors.title_en"
          :class="classEnField()"
        ></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">3. 예약 상품 소개글을 간단히 입력해주세요.</p>
      <div>
        <v-text-field
          placeholder="예약 상품 소개 글 입력"
          outlined
          hide-details="auto"
          v-model="form.desc"
          :error-messages="errors.desc"
        ></v-text-field>
        <v-text-field
          placeholder="영문 예약 상품 소개 글 입력"
          outlined
          class="mt-3"
          hide-details="auto"
          v-model="form.desc_en"
          :error-messages="errors.desc_en"
          :class="classEnField()"
        ></v-text-field>
      </div>
    </div>
  </div>
</template>


<script>
import {mapMutations} from "vuex";

export default {
  props: ['data', 'errors', 'mode'],
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
    selectedType: 'option1',
    masterBooking: {},
    form: {
      booking_id: '',
    },
    errors: [],
  }),
  watch: {
    data(val) {
      this.form = val;
    },
    form(val){
      this.$emit('form-data', val);
    },
  },
  methods: {

    setBeforeData() {
      if (this.mode == 'edit') {
        if (this.$store.state.common.bookingOptionEditForm) {
          this.form = JSON.parse(this.$store.state.common.bookingOptionEditForm);
        }
      } else {
        if (this.$store.state.common.bookingOptionForm) {
          this.form = JSON.parse(this.$store.state.common.bookingOptionForm);
        }
      }
    },
    classEnField() {
      if(this.masterBooking.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
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
