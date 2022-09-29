<template>
  <div class="user_dashboard full_height j_start pa-5">

    <div>
      <v-img
        :src="`https://picsum.photos/500/300?image=10`"
        :lazy-src="`https://picsum.photos/10/6?image=10`"
      ></v-img>
    </div>
    <div class="progrma_subject">
      <h3>[교육] 사찰예절 배움 템플스테이 해맞이 체험 프로그램</h3>
      <p class="color_main my-1">#자연휴식형 #친환경 #힐링</p>
      <div class="flex j_space a_center mb-5 progrma_option">
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/progrma_icon01.png" height="40">
          <p class="font_small_text">6시간 이용가능</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/progrma_icon02.png" height="40">
          <p class="font_small_text">온라인 진행</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/progrma_icon03.png" height="40">
          <p class="font_small_text">예약즉시 확정</p>
        </div>
        <div class="q_width flex d_col j_center a_center py-3">
          <img src="~/assets/images/progrma_icon04.png" height="40">
          <p class="font_small_text">실시간 응대가능</p>
        </div>
      </div>
      <h3 class="font_sub_title"><v-icon>mdi-calendar-text</v-icon> 예약 프로그램을 소개합니다</h3>
      <p class="progrma_text">
        - 사극에 자주 등장하는 장희빈부터 사도세자까지 수많은 역사의 주인공들이 살았던 창경궁을 경험해보세요.<br /><br />
        - 달빛이 내린 창경궁의 밤에서 곳곳에 숨어 있는 흥미진진한 이야기를 들어보세요.<br /><br />
        - 밤의 장막을 스크린 삼아 영화 같은 창경궁 곳곳을 가족/연인/친구들과 함께 걸어보세요.
      </p>
      <div class="area_line"></div>
      <h3 class="font_sub_title mt-5"><v-icon>mdi-whatsapp</v-icon> 예약에 대한 문의사항이 있으신가요?</h3>
      <p class="call_time">담당문의 가능 및 운영시간 : 09:00 ~ 18:00</p>

      <div class="flex j_space a_center wrap progrma_call">
        <div class="flex j_start a_center h_width pa-2">
          <img src="~/assets/images/p_icon01.png" height="30">&emsp;
          <p class="ma-0 ml-1">홍길동</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <img src="~/assets/images/p_icon02.png" height="30">&emsp;
          <p class="ma-0 ml-1">apple@naver.com</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <img src="~/assets/images/p_icon03.png" height="30">&emsp;
          <p class="ma-0 ml-1">+82 10-1234-5678</p>
        </div>
        <div class="flex j_start a_center h_width pa-2">
          <img src="~/assets/images/p_icon04.png" height="30">&emsp;
          <p class="ma-0 ml-1">https://naver.com</p>
        </div>
      </div>
      <div class="area_line"></div>
      <h3 class="font_sub_title"><v-icon>mdi-share</v-icon> SNS채널 바로가기</h3>
       <div class="progrma_sns">
        <v-btn icon dark><img src="~/assets/images/facebook.png" height="40"></v-btn>&nbsp;&nbsp;
        <v-btn icon dark><img src="~/assets/images/twitter.png" height="40"></v-btn>&nbsp;&nbsp;
        <v-btn icon dark><img src="~/assets/images/google.png" height="40"></v-btn>&nbsp;&nbsp;
        <v-btn icon dark><img src="~/assets/images/naver.png" height="40"></v-btn>
       </div>
      <div class="area_line"></div>
      <h3 class="font_sub_title my-6"><v-icon>mdi-map-marker-circle</v-icon> 예약 프로그램이 진행되는 장소를 안내드려요</h3>
      <div class="border_a pa-3 mb-5"></div>
      <div class="area_line"></div>
      <h3 class="font_sub_title my-6"><v-icon>mdi-file-plus</v-icon> 첨부파일</h3>
      <div class="border_a pa-3 mb-5"></div>

      <div class="flex j_space a_center mt-10 ">
        <div class="flex j_start a_center">
          <v-btn depressed outlined large>문의하기</v-btn>
          <v-btn depressed dark class="ml-3" color="#28b487" to="/bookings/12/options" large>예약하기</v-btn>
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
  .progrma_subject h3 {margin: 30px 0 10px;}
  .progrma_subject>p {font-size: 14px;}
  .progrma_option {background: #f5f5f5; border-radius: 14px; padding: 10px; margin-top: 30px;}
  .progrma_option p {margin-top: 10px; margin-bottom: 0;}
  .progrma_call {margin: 10px 0 30px;}
  .progrma_call p {margin: 0; font-size: 14px;}
  .progrma_text {padding: 10px; margin-top: 14px;}
  .call_text {margin: 0;}
  .call_time {background: #00bcd4; color: #fff; padding: 10px 0; border-radius: 30px; margin: 20px 0 0; text-align: center;}
  .progrma_sns {padding: 10px 10px 30px; margin-top: 14px;}
</style>
