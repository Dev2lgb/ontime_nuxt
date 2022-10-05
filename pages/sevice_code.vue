<template>
  <div>
    <SubHeader :link="'/home'" :title="'예약코드'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="host_area">
        <div class="user_nik">
          <p>예약 관리자에게 별도의<br>코드를 받으셨나요?</p>
          <p class="sub_txt">전달받으신 코드를 입력하시면 해당<br>예약 페이지로 바로 이동 하실 수 있습니다.</p>
        </div>
        <div class="code_search">
          <v-text-field outlined class="inpBottom vinpuT" placeholder="예약코드를 입력해주세요." hide-details="auto"/>
          <div class="sized_box_h"></div>
          <v-btn x-large width="100%" height="60" elevation="0" color="#28b487" dark class="clear_btn">입장하기</v-btn>
          <NuxtLink to="/">전체예약 확인하기</NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'user',
  data: () => ({

  }),
  methods: {

  },
}
</script>

<style scoped>
.thumbnail_width { width:80px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width {width:60px; position: absolute; right: 0; top: 7px;}
.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 24px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span {font-weight: 800; color: #28b487;}
.user_nik p span span {color: #4487fa;}
.code_search {position: relative; text-align: center;}
.sub_txt {font-size: 15px!important; font-weight: 500!important; letter-spacing: 0!important; color: #111!important; margin-bottom: 0;}
.clear_btn {margin-bottom: 20px;}
.code_search a {text-decoration: none; color: #111;}
</style>
