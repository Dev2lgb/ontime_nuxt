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
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">지금 선택하신 상품은 어떤 예약인가요?</p>
        <div class="border_a pa-3" v-show="form.type == 'time'">
          <p class="font-weight-bold ma-0 mb-2">날짜&시간 선택형 예약</p>
          <p>
            관리자는 원하는 날짜를 시간 또는 분 단위로 나누어 예약을 받아요.<br/>
            예약자는 원하는 상품의 날짜와 시간을 선택할 수 있어요.
          </p>
        </div>
        <div class="border_a pa-3" v-show="form.type == 'date'">
          <p class="font-weight-bold ma-0 mb-2">날짜 선택형 예약</p>
          <p>
            관리자는 시간 설정 없이 하루 단위로만 예약을 받아요.<br/>
            예약자는 원하는 상품의 날짜만 선택하면 돼요.
          </p>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">예약 시작과 종료시간을 알려주세요.</p>
        <div class="flex j_space a_center">
          <div class="h_width">
            <v-select v-model="form.start_time" :error-messages="errors.start_time" :items="timeItems" outlined dense hide-details="auto" placeholder="시작시간"></v-select>
          </div>
          <div class="h_width ml-3">
            <v-select v-model="form.end_time" :error-messages="errors.end_time" :items="timeItems" outlined dense hide-details="auto" placeholder="종료시간"></v-select>
          </div>
        </div>
      </div>
<!--      <div class="mb-7">-->
<!--        <p class="font-weight-bold ma-0 mb-3">휴게시간이 있나요?</p>-->
<!--        <div>-->
<!--          <v-btn-toggle-->
<!--            color="primary"-->
<!--            v-model="selectedRest"-->
<!--            group-->
<!--            mandatory-->
<!--            outlined-->
<!--            dense-->
<!--            class="d-flex flex-wrap justify-start align-center"-->
<!--          >-->
<!--            <v-btn-->
<!--              style="border:1px solid #ccc; border-radius:10px"-->
<!--              value="N"-->
<!--            >-->
<!--              아니오, 없어요-->
<!--            </v-btn>-->
<!--            <v-btn-->
<!--              style="border:1px solid #ccc; border-radius:10px"-->
<!--              value="Y"-->
<!--            >-->
<!--              예, 있어요-->
<!--            </v-btn>-->
<!--          </v-btn-toggle>-->
<!--        </div>-->
<!--      </div>-->
<!--      <div class="mb-7" v-show="selectedRest == 'Y'">-->
<!--        <p class="ma-0 mb-3">휴게시간 설정</p>-->
<!--        <div class="flex j_space a_center">-->
<!--          <div class="h_width">-->
<!--            <v-select :items="timeItems" outlined dense hide-details="auto" placeholder="시작시간"></v-select>-->
<!--          </div>-->
<!--          <div class="h_width ml-3">-->
<!--            <v-select :items="timeItems" outlined dense hide-details="auto" placeholder="종료시간"></v-select>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">몇 시간 단위로 예약을 받으세요?</p>
        <div>
          <v-select
            v-model="form.interval_minute"
            :items="timeUnitItems"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="단위 선택"
          ></v-select>
          <v-text-field v-show="form.interval_minute == '0'" v-model="form.interval_minute" type="number" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">시간 당 예약가능 수량(인원)을 입력해주세요.</p>
        <div>
          <v-select
            v-model="selectedQuantity"
            :items="QuantityItems"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="단위 선택"
          ></v-select>
          <v-text-field v-show="selectedQuantity == 'Y'" type="number" suffix="명" outlined hide-details="auto" dense class="mt-3"></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">예약가능한 최소-최대 시간을 설정해주세요.</p>
        <div>
          <v-select
            v-model="selectedMaxMinTime"
            :items="MaxMinTimeItems"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="최소/최대 시간 선택"
          ></v-select>
          <div class="flex j_space a_center" v-show="selectedMaxMinTime == 'Y'">
            <div class="h_width">
              <v-text-field type="number" prefix="최소" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
            </div>
            <div class="h_width ml-2">
              <v-text-field type="number" prefix="최대" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">하나의 계정으로 최대 몇 명을 예약할 수 있나요?</p>
        <div>
          <v-select
            v-model="selectedMaxMinMan"
            :items="MaxMinManItems"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="예약인원설정 선택"
          ></v-select>
          <div class="flex j_space a_center mt-3" v-show="selectedMaxMinMan == '0'">
            <div class="h_width">
              <v-select
                item-text="text"
                item-value="value"
                outlined
                dense
                hide-details="auto"
                v-model="selectedMaxMinOption"
                :items="MaxMinOptionItems"
              ></v-select>
            </div>
            <div class="h_width ml-2" v-show="selectedMaxMinOption == 0">
              <v-text-field type="number" prefix="최대" suffix="명" outlined hide-details="auto" dense></v-text-field>
            </div>
          </div>
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
          to="/host/booking/125/items/third"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
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
