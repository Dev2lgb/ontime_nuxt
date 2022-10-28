<template>
  <div>
    <div class="titleform">
      <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>담당자정보</span>
    </div>

    <p class="font-weight-bold ma-0 mb-5">1. 예약 관리자 정보를 입력해주세요.</p>
    <div class="mb-1">
      <v-text-field outlined v-model="form.host_name" :error-messages="errors.host_name" label="예약 담당자명을 입력해주세요" class="mb-3" hide-details="auto"></v-text-field>
      <v-text-field v-model="form.host_name_en" :error-messages="errors.host_name_en" :class="classEnField()" outlined label="영문 예약 담당자명을 입력해주세요" hide-details="auto"></v-text-field>
      <div class="sized_box_h"></div>
    </div>
    <div class="mb-1">
      <div>
        <v-text-field outlined v-model="form.email" :error-messages="errors.email" placeholder="이메일주소를 입력해주세요" hide-details="auto"></v-text-field>
        <p class="font_small_text mt-1">(예) abcd@ontimeworld.kr</p>
      </div>
    </div>

    <div class="titleform mt-7">
      <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>담당자정보(선택)</span>
    </div>

    <div class="mb-1">
      <div class="flex j_start a_center">
        <div class="q_width mr-2">
          <v-select
            :items="callingCodeItems"
            outlined
            placeholder="국가번호"
            item-text="text"
            item-value="value"
            hide-details="auto"
            v-model="form.telephone_country_calling_code"
            :error-messages="errors.telephone_country_calling_code"
          ></v-select>
        </div>
        <v-text-field outlined v-model="form.telephone" :error-messages="errors.telephone" placeholder="담당자 연락처" hide-details="auto"></v-text-field>
      </div>
      <div class="sized_box_h"></div>
      <div>
        <v-text-field v-model="form.homepage_url" :error-messages="errors.homepage_url" outlined placeholder="홈페이지 (http://ontimeworld.kr)" ></v-text-field>
      </div>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-5">2. SNS채널 추가</p>
      <div class="sns_tab">
        <div class="sns_logo"><img src="~/assets/images/sns_001.png" width="50"></div>
        <div class="sns_input">
          <v-text-field outlined v-model="form.instagram_url" :error-messages="errors.instagram_url" placeholder="http://" hide-details="auto"></v-text-field>
        </div>
      </div>
      <div class="sns_tab">
        <div class="sns_logo"><img src="~/assets/images/sns_002.png" width="50"></div>
        <div class="sns_input">
          <v-text-field outlined v-model="form.facebook_url" :error-messages="errors.facebook_url" placeholder="http://" hide-details="auto"></v-text-field>
        </div>
      </div>
      <div class="sns_tab">
        <div class="sns_logo"><img src="~/assets/images/sns_003.png" width="50"></div>
        <div class="sns_input">
          <v-text-field outlined v-model="form.youtube_url" :error-messages="errors.youtube_url" placeholder="http://" hide-details="auto"></v-text-field>
        </div>
      </div>
    </div>

    <div class="titleform mt-7">
      <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>기업정보(선택)</span>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-5">3. 회사 정보</p>
      <div class="mb-1">
        <v-text-field outlined v-model="form.company_name" :error-messages="errors.company_name" placeholder="회사명 입력" class="mb-3" hide-details="auto"></v-text-field>
        <v-text-field v-model="form.company_name_en" :error-messages="errors.company_name_en" :class="classEnField()" outlined label="영문 회사명 입력" hide-details="auto"></v-text-field>
        <div class="sized_box_h"></div>
        <v-text-field v-model="form.business_registration_number" :error-messages="errors.business_registration_number" outlined placeholder="'-' 없이 사업자등록번호 입력" hide-details="auto"></v-text-field>
      </div>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-5">4. 정해진 운영시간이 있나요?</p>
      <div class="mb-5">
        <v-btn-toggle
          v-model="form.is_operating_time"
          :error-messages="errors.is_operating_time"
          color="primary"
          group
          outlined
          mandatory
          dense
          class="d-flex flex-wrap justify-start align-center"
        >
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="N"
          >
            아뇨, 없어요
          </v-btn>
          <v-btn
            width="calc(25% - 8px)"
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="Y"
          >
            네, 있어요.
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="mb-1" v-show="form.is_operating_time == 'Y'">
        <p class="font_small_text mb-1">운영시간 설정</p>
        <div class="flex j_start a_center">
          <v-select class="mr-3" v-model="form.operating_start_time" :error-messages="errors.operating_start_time" :items="timeItems" outlined placeholder="시작시간"></v-select>
          <v-select :items="timeItems" v-model="form.operating_end_time" :error-messages="errors.operating_end_time"  outlined placeholder="종료시간"></v-select>
        </div>
        <div class="border_a mt-3 pa-5">
          * 운영시간은 예약자 안내와 정보제공을 위한 것으로 예약 선택에 영향을 주지 않습니다.
        </div>
      </div>

    </div>
  </div>
</template>
<script>
export default {
  props: ['data', 'errors'],
  async fetch() {
    this.loading = true;
    try {
      let url = '/host/bookings/init';
      const response = await this.$axios.get(url);

      this.callingCodeItems = response.data.callingCodeItems;
      this.categoryItems = response.data.categoryItems;
      this.onlineItems = response.data.onlineItems;
      this.timezoneItems = response.data.timezoneItems;

      this.setBeforeData();
      this.loading = false;
    } catch (e) {
      if (e.response.data.status == '401') {
        this.$toast.error(e.response.data.message);
      }s
    }
  },
  data: () => ({
    form: {},
    errors: [],
    timezoneItems: [],
    categoryItems: [],
    callingCodeItems: [],
    timeItems: ['00:00', '01:00','02:00','03:00','04:00','05:00','06:00','07:00','08:00','09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00'],
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
    classEnField() {
      if(this.form.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
    setBeforeData() {
      if (this.mode == 'edit') {
        if (this.$store.state.common.bookingEditForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingEditForm));
        }
      } else {
        if (this.$store.state.common.bookingForm) {
          this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingForm));
        }
      }
    }
  },

}

</script>
<style scoped>
.sns_tab {display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;}
.sns_input { width:calc(100% - 70px); }
</style>
