<template>
  <div class="f_width">
    <HostSubHeader :title="'예약상품 등록'" />
    <div class="px-5 mt-16">
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
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">지금 선택하신 상품은 어떤 예약인가요?</p>
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
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1 col_content_btn"
              block
              value="time"
            >
              <p class="font-weight-bold ma-0 mb-2">날짜&시간 선택형 예약</p>
              <p>
                관리자는 원하는 날짜를 시간 또는 분 단위로 나누어 예약을 받아요.<br/>
                예약자는 원하는 상품의 날짜와 시간을 선택할 수 있어요.
              </p>
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              block
              class="ma-1 col_content_btn"
              value="date"
            >
              <p class="font-weight-bold ma-0 mb-2">날짜 선택형 예약</p>
              <p>
                관리자는 시간 설정 없이 하루 단위로만 예약을 받아요.<br/>
                예약자는 원하는 상품의 날짜만 선택하면 돼요.
              </p>
            </v-btn>
<!--            <v-btn-->
<!--              style="border:1px solid #ccc; border-radius:10px"-->
<!--              block-->
<!--              class="ma-1 col_content_btn"-->
<!--              value="term"-->
<!--            >-->
<!--              <p class="font-weight-bold ma-0 mb-2">기간 선택형 예약</p>-->
<!--              <p>-->
<!--                관리자는 날짜나 시간단위의 최소-최대 기간을 설정하여 예약을 받아요.<br >-->
<!--                예약자는 원하는 상품의 시작 &middot; 종료 시점을 선택할 수 있어요.-->
<!--              </p>-->
<!--            </v-btn>-->
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">예약 상품의 이름을 입력해주세요.</p>
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
        <p class="font-weight-bold ma-0 mb-3">예약 상품 소개글을 간단히 입력해주세요.</p>
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

      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
          @click="nextForm"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
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
          // localStorage.setItem('bookingOptionForm', JSON.stringify(this.form));
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
    setBeforeData() {
      if (this.$store.state.common.bookingOptionForm) {
        this.form = JSON.parse(this.$store.state.common.bookingOptionForm);
      }
      // if (localStorage.getItem('bookingOptionForm')) {
      //   this.form = JSON.parse(localStorage.getItem('bookingOptionForm'));
      // }
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
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
::v-deep .col_content_btn { height:auto !important; }
::v-deep .col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; }
</style>
