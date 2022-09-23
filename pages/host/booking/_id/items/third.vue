<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          :to="'/host/booking/' + + this.$route.params.id + '/items/create'"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 상품 등록 (3/4)</h3>
    </div>
    <div class="px-5">
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
            v-model="selectedHoliday"
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
        <div v-show="selectedHoliday == 'Y'" class="mt-3 ">
          <p class="font_small_text mb-1">휴무일 주기 선택</p>
          <div class="border_a pa-3 mb-3">
            <v-checkbox hide-details="auto" class="mt-0" label="매주" value="allWeek"></v-checkbox>
            <div class="flex j_start a_center mt-2">
              <v-checkbox label="첫번째주" value="1" hide-details="auto" class="mr-2 mt-0"></v-checkbox>
              <v-checkbox label="두번째주" value="2" hide-details="auto" class="mr-2 mt-0"></v-checkbox>
              <v-checkbox label="세번째주" value="3" hide-details="auto" class="mr-2 mt-0"></v-checkbox>
              <v-checkbox label="네번째주" value="4" hide-details="auto" class="mr-2 mt-0"></v-checkbox>
              <v-checkbox label="다섯번째주" value="5" hide-details="auto" class="mr-2 mt-0"></v-checkbox>
            </div>
          </div>

          <p class="font_small_text mb-1">휴무일 요일 선택</p>
          <div class="mb-3">
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
                :value="weekItem.value"
              >
                {{ weekItem.text }}
              </v-btn>
            </v-btn-toggle>
          </div>

          <p class="font_small_text mb-1">그 외 휴무일을 날짜로 선택해주세요.</p>
          <div>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="dates"
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
                v-model="dates"
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
                  @click="$refs.menu.save(dates)"
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
          to="/host/booking/125/items/fourth"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedHoliday: 'N',
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
    weekItems: [
      { text: '월', value:'Mon'},
      { text: '화', value:'Tue'},
      { text: '수', value:'Wed'},
      { text: '목', value:'Thu'},
      { text: '금', value:'Fri'},
      { text: '토', value:'Sat'},
      { text: '일', value:'Sun'},
    ],
    dates: [],
    menu: false,
  }),
  methods: {

  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
/deep/.col_content_btn { height:auto !important; }
/deep/.col_content_btn .v-btn__content { flex-direction: column; justify-content: flex-start; align-items: flex-start; text-align:left; }
</style>
