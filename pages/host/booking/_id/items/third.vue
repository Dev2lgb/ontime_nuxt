<template>
  <div class="f_width">
    <HostSubHeader :title="'예약상품 등록'" />
    <div class="px-5 mt-16">
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
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">예약 가능 기간 중 휴무일이 있나요?</p>
        <div>
          <v-btn-toggle
            color="primary"
            v-model="form.is_na_day"
            group
            mandatory
            outlined
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="N"
            >
              휴무일이 없어요.
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              지정된 요일에 휴무일이 있어요
            </v-btn>
          </v-btn-toggle>
        </div>
        <div v-show="form.is_na_day == 'Y'" class="mt-3 ">
          <div class="mb-5">
            <p class="font_small_text mb-1">휴무일 주기 선택</p>
            <div class="flex j_start a_center mt-2 ">
              <v-btn-toggle
                color="primary"
                v-model="selectedWeek"
                group
                multiple
                outlined
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                  v-for="weekItem in weekItems"
                  :key="weekItem.value"
                  style="border:1px solid #ccc; border-radius:10px"
                  class="ma-1"
                  :disabled="allCheck == 'Y'"
                  :value="weekItem.value"
                >
                  {{ weekItem.text }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <v-checkbox hide-details="auto" v-model="allCheck" class="mt-3" label="매주" true-value="Y" false-value="N" value="allWeek"></v-checkbox>
          </div>

          <p class="font_small_text mb-1">휴무일 요일 선택</p>
          <div class="mb-3">
            <v-btn-toggle
              color="primary"
              v-model="selectedWeekend"
              group
              multiple
              outlined
              dense
              class="d-flex flex-wrap justify-start align-center"
            >
              <v-btn
                v-for="weekendItem in weekendItems"
                :key="weekendItem.value"
                style="border:1px solid #ccc; border-radius:10px"
                class="ma-1"

                :value="weekendItem.value"
              >
                {{ weekendItem.text }}
              </v-btn>
            </v-btn-toggle>
            <div class="my-3">
              <v-btn
                block
                depressed
                tile
                large
                dark
                color="#4455ff"
                @click="addHoliday"
              >휴무일 추가</v-btn>
            </div>
            <div>
              <v-chip v-for="(holiday, h) in form.na_weekdays" :key="h" class="ma-1" close @click:close="deleteHoliday(h)">
                {{ getChipText(holiday) }}
              </v-chip>
            </div>
          </div>

          <p class="font_small_text mb-1">그 외 휴무일을 날짜로 선택해주세요.</p>
          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="form.na_days"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="form.na_days"
                  multiple
                  chips
                  small-chips
                  placeholder="휴무일 날짜 직접 입력"
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                  hide-details="auto"
                ></v-combobox>
              </template>
              <v-date-picker
                v-model="form.na_days"
                multiple
                no-title
                locale="ko"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(form.na_days)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
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
          @click="nextForm"
          :to="'/host/booking/' + this.$route.params.id + '/items/fourth'"
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
    form: {
      na_weekdays: [],
      na_days: [],
    },
    errors: [],
    allCheck: 'N',
    selectedWeek: [],
    selectedWeekend: [],
    selectedHoliday: 'N',
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
    weekItems: [
      { text: '첫번째주', value:'1'},
      { text: '두번째주', value:'2'},
      { text: '세번째주', value:'3'},
      { text: '네번째주', value:'4'},
      { text: '다섯번째주', value:'5'},
    ],
    weekendItems: [
      { text: '월', value:'1'},
      { text: '화', value:'2'},
      { text: '수', value:'3'},
      { text: '목', value:'4'},
      { text: '금', value:'5'},
      { text: '토', value:'6'},
      { text: '일', value:'7'},
    ],
    menu: false,
  }),
  watch: {
    allCheck(val) {
      if (val == 'Y') {
        this.selectedWeek = ['1','2','3','4','5'];
      } else {
        this.selectedWeek = [];
      }
    }
  },
  methods: {
    async nextForm() {
      this.loading = true;

      try {
        let url = '/host/bookings/' + this.$route.params.id + '/options/3';
        let method = 'post';

        this.form.booking_id = this.$route.params.id;

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          localStorage.setItem('bookingOptionForm', JSON.stringify(this.form));
          this.$router.push('/host/booking/' + this.$route.params.id + '/items/fourth');
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
    addHoliday() {
      for(let i = 0; i < this.selectedWeekend.length; i++) {
        for(let w = 0; w < this.selectedWeek.length; w++) {
          this.form.na_weekdays.push({
            week:this.selectedWeek[w], day: this.selectedWeekend[i]
          });
        }
      }
    },
    getChipText(item) {
      let returnText = '';
      let weekName = _.filter(this.weekItems, { value: item.week });
      let weekendName = _.filter(this.weekendItems, { value: item.day });
      return weekName[0].text + ' ' + weekendName[0].text;
    },
    deleteHoliday(index) {
      this.form.na_weekdays.splice(index, 1);
    }
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
