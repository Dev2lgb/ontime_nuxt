<template>
  <div class="f_width user_padding">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/host/booking"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 만들기</h3>
    </div>

<div class="host_area">
    <div class="user_nik">
      <p><span>ON<span>TIME</span></span> 예약 프로그램 만들기<br>예약생성 진행중 (2/4)</p>
    </div>

    <div class="proceeding">
      <template>
        <v-progress-linear value="50"></v-progress-linear>
      </template>
      <div class="flex j_center a_center mt-1">
        <p class="q_width text-center font_small_text">기초설정</p>
        <p class="q_width text-center font_small_text">관리자 정보</p>
        <p class="q_width text-center font_small_text">확정방법</p>
        <p class="q_width text-center font_small_text">추가정보</p>
      </div>
    </div>
    <div class="">
      <div class="titleform">
        <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>담당자정보</span>
      </div>

        <p class="font-weight-bold ma-0 mb-5">1. 예약 관리자 정보를 입력해주세요.</p>
          <div class="mb-1">
            <v-text-field outlined label="예약 담당자명을 입력해주세요" hide-details="auto"></v-text-field>
          <div class="sized_box_h"></div>
        </div>
        <div class="mb-1">
          <div>
            <v-text-field outlined placeholder="이메일주소를 입력해주세요" hide-details="auto"></v-text-field>
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
                :items="nationalPhoneItems" outlined placeholder="국가번호"
                item-text="name"
                item-value="value"
                hide-details="auto"
              ></v-select>
            </div>
            <v-text-field outlined placeholder="담당자 연락처" hide-details="auto"></v-text-field>
          </div>
          <div class="sized_box_h"></div>
          <div>
            <v-text-field outlined placeholder="홈페이지 (http://ontimeworld.kr)" ></v-text-field>
          </div>
        </div>
      
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">2. SNS채널 추가</p>
        <div class="sns_tab">
          <div class="sns_logo"><img src="~/assets/images/sns_001.png" width="50"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="http://" hide-details="auto"></v-text-field>
          </div>
        </div>
        <div class="sns_tab">
          <div class="sns_logo"><img src="~/assets/images/sns_002.png" width="50"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="http://" hide-details="auto"></v-text-field>
          </div>
        </div>
        <div class="sns_tab">
          <div class="sns_logo"><img src="~/assets/images/sns_003.png" width="50"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="http://" hide-details="auto"></v-text-field>
          </div>
        </div>
      </div>

      <div class="titleform mt-7">
        <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>기업정보(선택)</span>
      </div>

      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">3. 회사 정보</p>
        <div class="mb-1">
            <v-text-field outlined placeholder="회사명 입력" hide-details="auto"></v-text-field>
            <div class="sized_box_h"></div>
            <v-text-field outlined placeholder="'-' 없이 사업자등록번호 입력" hide-details="auto"></v-text-field>
        </div>
      </div>

      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">4. 정해진 운영시간이 있나요?</p>
        <div class="mb-5">
          <v-btn-toggle
            v-model="selectedTimeDivision"
            color="primary"
            group
            outlined
            mandatory
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              width="calc(25% - 8px)"
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
        <div class="mb-1" v-show="selectedTimeDivision == 'Y'">
          <p class="font_small_text mb-1">운영시간 설정</p>
          <div class="flex j_start a_center">
            <v-select class="mr-3" :items="timeItems" outlined placeholder="시작시간"></v-select>
            <v-select :items="timeItems" outlined placeholder="종료시간"></v-select>
          </div>
          <div class="border_a mt-3 pa-5">
            * 운영시간은 예약자 안내와 정보제공을 위한 것으로 예약 선택에 영향을 주지 않습니다.
          </div>
        </div>

      </div>

      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          x-large
          dark
          color="#1976d2"
          to="/host/booking/third"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedTimeDivision: 'N',
    nationalPhoneItems: [
      { name: '대한민국(+82)', value: '+082' },
      { name: '대한민국', value: '+082' },
      { name: '대한민국', value: '+082' },
    ],
    timeItems: ['01:00', '02:00'],
  }),
  methods: {

  },
}
</script>

<style scoped>
.sns_tab {display: flex; justify-content: space-between; margin-bottom: 10px; align-items: center;}
.sns_input { width:calc(100% - 70px); }
</style>
