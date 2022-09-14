<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          to="/host/reservation/"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 만들기 (2/4)</h3>
    </div>
    <div class="px-5">
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
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">예약 관리자 정보를 입력해주세요.</p>
        <div class="mb-1">
          <p class="font_small_text mb-1">이름</p>
          <div>
            <v-text-field outlined placeholder="텍스트 입력"></v-text-field>
          </div>
        </div>
        <div class="mb-1">
          <p class="font_small_text mb-1">이메일 주소(E-mail)</p>
          <div>
            <v-text-field outlined placeholder="(예) abcd@ontimeworld.kr"></v-text-field>
          </div>
        </div>
        <div class="mb-1">
          <p class="font_small_text mb-1">연락처 (선택입력)</p>
          <div class="flex j_start a_center">
            <div class="q_width mr-2">
              <v-select
                :items="nationalPhoneItems" outlined placeholder="국가번호"
                item-text="name"
                item-value="value"
              ></v-select>
            </div>
            <v-text-field outlined placeholder="전화번호 입력"></v-text-field>
          </div>
        </div>
        <div class="mb-1">
          <p class="font_small_text mb-1">홈페이지 (선택입력)</p>
          <div>
            <v-text-field outlined placeholder="(예) http://ontimeworld.kr"></v-text-field>
          </div>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">SNS채널 추가</p>
        <div class="flex j_space a_center">
          <div class="sns_logo"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="(예) http://ontimeworld.kr"></v-text-field>
          </div>
        </div>
        <div class="flex j_space a_center">
          <div class="sns_logo"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="(예) http://ontimeworld.kr"></v-text-field>
          </div>
        </div>
        <div class="flex j_space a_center">
          <div class="sns_logo"></div>
          <div class="sns_input">
            <v-text-field outlined placeholder="(예) http://ontimeworld.kr"></v-text-field>
          </div>
        </div>
      </div>

      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">회사 정보</p>
        <div class="mb-1">
          <p class="font_small_text mb-1">회사명(선택 입력)</p>
          <div>
            <v-text-field outlined placeholder="회사명 입력"></v-text-field>
          </div>
        </div>
        <div class="mb-1">
          <p class="font_small_text mb-1">사업자등록번호(선택 입력)</p>
          <div>
            <v-text-field outlined placeholder="'-' 없이 사업자등록번호 입력"></v-text-field>
          </div>
        </div>
      </div>

      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">정해진 운영시간이 있나요?</p>
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
          large
          dark
          color="#4455ff"
          to="/host/reservation/third"
        >다음 단계로 이동</v-btn>
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
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
</style>
