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
      <h3>새 예약 상품 등록 (4/4)</h3>
    </div>
    <div class="px-5">
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
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">기준 시간대를 선택해주세요.</p>
        <div>
          <v-select
            v-model="selectedTimeZone"
            :items="timeZoneItems"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="기준시간대 선택"
          ></v-select>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">현지시간 비교기능을 사용하나요?</p>
        <div>
          <v-btn-toggle
            color="primary"
            v-model="selectedRest"
            group
            mandatory
            outlined
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              value="N"
            >
              아니요
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              value="Y"
            >
              네, 예약자의 현지 시간대로 보여주세요.
            </v-btn>
          </v-btn-toggle>
            <p class="border_a pa-3 mt-3">
              시차 걱정 없이 해외 접속자와의 예약을 편하게 이어가세요!<br>
              ※ 현지시간 비교기능 사용 시, 예약자가 선택한 도시 기준으로 일정과 시간이 변환 표시됩니다.<br>
              ※ 해외 접속자와 화상회의, 온라인 이벤트를 준비하시는 경우 해당 기능을 넣는 것을 추천합니다.
            </p>
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
        >새 예약상품 등록완료</v-btn>
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
