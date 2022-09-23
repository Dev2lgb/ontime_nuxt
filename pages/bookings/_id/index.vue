<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          to="/bookings"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약 상세보기</h3>
    </div>
    <div>
      <v-img
        :src="`https://picsum.photos/500/300?image=10`"
        :lazy-src="`https://picsum.photos/10/6?image=10`"
      ></v-img>
    </div>
    <div class="pa-5">
      <h3>[교육] 사찰예절 배움 템플스테이 해맞이 체험 프로그램</h3>
      <p class="color_main my-1 font_small_text">#자연휴식형 #친환경 #힐링</p>
      <div class="flex j_space a_center background_gray mt-3 mb-5">
        <div class="q_width flex d_col j_center a_center py-3">
          <v-icon>mdi-clock</v-icon>
          <p class="font_small_text ma-0">6시간 이용가능</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <v-icon>mdi-clock-fast</v-icon>
          <p class="font_small_text ma-0">예약즉시 확정</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <v-icon>mdi-earth</v-icon>
          <p class="font_small_text ma-0">온라인 진행</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <v-icon>mdi-earth</v-icon>
          <p class="font_small_text ma-0">온라인 진행</p>
        </div>
      </div>
      <h3 class="font_sub_title">예약 프로그램을 소개합니다</h3>
      <p class="font_small_text ma-0 mt-3 background_gray pa-5">
        - 사극에 자주 등장하는 장희빈부터 사도세자까지 수많은 역사의 주인공들이 살았던 창경궁을 경험해보세요.<br />
        - 달빛이 내린 창경궁의 밤에서 곳곳에 숨어 있는 흥미진진한 이야기를 들어보세요.<br />
        - 밤의 장막을 스크린 삼아 영화 같은 창경궁 곳곳을 가족/연인/친구들과 함께 걸어보세요.
      </p>
      <h3 class="font_sub_title mt-5">
        예약에 대한 문의사항이 있으신가요?<br />
        관리자에게 직접 문의하실 수 있습니다
      </h3>
      <p class="font_small_text mt-3">운영시간 : 09:00 ~ 18:00</p>
      <div class="flex j_space a_center wrap background_gray mt-3 mb-5 pa-3">
        <div class="flex j_start a_center h_width pa-2">
          <v-icon>mdi-account-circle</v-icon>
          <p class="ma-0 ml-1">홍길동</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <v-icon>mdi-email-variant</v-icon>
          <p class="ma-0 ml-1">apple@naver.com</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <v-icon>mdi-phone-outgoing</v-icon>
          <p class="ma-0 ml-1">082+ 010-1234-5678</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <v-icon>mdi-web</v-icon>
          <p class="ma-0 ml-1">https://naver.com</p>
        </div>
      </div>

      <div class="flex j_space a_center">
        <p class="ma-0">SNS채널 바로가기</p>
        <div class="flex j_end a_center h_width">
          <v-btn outlined small class="q_width"><v-icon>mdi-facebook-box</v-icon></v-btn>
          <v-btn outlined small class="q_width ml-1"><v-icon>mdi-instagram</v-icon></v-btn>
          <v-btn outlined small class="q_width ml-1"><v-icon>mdi-youtube-play</v-icon></v-btn>
        </div>
      </div>

      <h3 class="font_sub_title my-6">예약 프로그램이 진행되는 장소를 안내드려요</h3>
      <div class="border_a pa-3 mb-5"></div>
      <h3 class="font_sub_title my-6">첨부파일</h3>
      <div class="border_a pa-3 mb-5"></div>

      <div class="flex j_space a_center mt-10 pt-10 border_t">
        <div class="flex j_start a_center">
          <v-btn depressed outlined>문의하기</v-btn>
          <v-btn depressed dark class="ml-3" color="#0057FF" to="/bookings/12/options">예약하기</v-btn>
        </div>
        <v-btn fab small depressed dark color="#ddd"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  layout: 'user',
  data: () => ({
    searchCategory: '',
    searchCategoryItems: [
      { text: '전체', value:'' },
      { text: '교육', value:'1' },
      { text: '관광', value:'2' },
      { text: '문화', value:'3' },
      { text: '패션', value:'4' },
      { text: '행사', value:'5' },
    ],
  }),
  methods: {

  },
}
</script>

<style scoped>
.thumbnail_width { width:150px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width { width:60px }
.img_radius { border-radius: 10px; }
</style>
