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
          <div>
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

      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({

  }),
  methods: {

  },
}
</script>

<style scoped>
</style>
