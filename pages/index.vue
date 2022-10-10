<template>
  <div class="main_wrap">
    <div class="header">
      <div class="inner">
        <div class="header_height flex j_space a_center">
          <div class="logo">
            <img src="~/assets/images/logo.png">
          </div>
          <div class="nav">
            <ul class="flex j_start a_center">
              <li>
                <router-link to="">서비스</router-link>
              </li>
              <li>
                <router-link to="/host/home">예약만들기</router-link>
              </li>
              <li>
                <router-link to="/home">예약하기</router-link>
              </li>
            </ul>
          </div>
          <div class="header_auth flex j_space a_center">
            <router-link to="/auth/login" class="header_btn" v-show="!this.$auth.loggedIn">로그인</router-link>
            <router-link to="/auth/register" class="header_btn colored" v-show="!this.$auth.loggedIn">회원가입</router-link>
            <a href="javascript:void(0)" class="header_btn" @click="logout" v-show="this.$auth.loggedIn">로그아웃</a>
            <router-link to="/auth/modify" class="header_btn colored" v-show="this.$auth.loggedIn">프로필 수정</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="mv">
      <MainSlider />
    </div>

    <div class="systems">
      <div class="inner">
        <div class="flex j_space a_center">
          <div class="systems_item" v-for="system in systems" :key="systems.title">
            <img :src="system.icon" alt="">
            <h3><span>{{ system.category }}</span> 시스템</h3>
            <p>{{ system.desc }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="join_section">
      <div class="inner">
        <div class="flex j_space a_center">
          <div class="join_left">
            <img src="~/assets/images/join_img.png" alt="">
          </div>
          <div class="join_right">
            <h3>
              어디를 선택해야<br />
              <span>이 걱정들이 해결될까요?</span>
            </h3>
            <div class="flex j_start a_center">
              <div>
                <p>엑셀 등 수기로 하는 예약관리</p>
                <p>해외 예약자의 시차 관리 어려움</p>
                <p>원하는 사람에게만 예약 받기</p>
              </div>
              <v-btn color="#50b999" to="/auth/register" class="join_btn" x-large dark depressed>무료회원 가입하기</v-btn>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      systems: [
        {category: '숙박', icon: '', desc: '호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템'},
        {category: '액티비티', icon: '', desc: '호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템'},
        {category: '공연', icon: '', desc: '호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템'},
        {category: '공유', icon: '', desc: '호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템'},
        {category: '여행', icon: '', desc: '호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템'},
      ],
    }
  },
  methods: {
    async logout(){
      await this.$auth.logout();
    }
  },
}
</script>

<style>
  .header_height { height:100px; }
  .logo { width:300px; }
  .nav { width:calc(100% - 600px); }
  .nav li { width:20%; }
  .logo img { width:160px; }
  .header_auth { width:300px; }
  .header_auth a { text-decoration: none; }
  .header_btn { width:50%; color:#444; font-size:14px; display:inline-block; text-align:center; border:1px solid #ddd; border-radius:50px; padding:10px 0; }
  .header_btn.colored { color:#fff; background-color:#4676bb; margin-left:5px; }
  .systems { padding:60px 0; }
  .systems h3 { margin:20px 0; }
  .systems p { font-size:13px; }
  .systems_item { width:calc(20% - 10px); }
  .systems_item h3 { font-weight:300; }
  .systems_item span { font-weight:bold; }
  .join_section { background-color:#f3f5f7; padding:70px 0; }
  .join_left { width:40%; }
  .join_left img { width:100%; }
  .join_right { width:60%; padding-left:70px; }
  .join_right h3 { font-size:40px; font-weight:400; margin-bottom:30px; }
  .join_right h3 span { font-weight:bold; }
  .join_right p { margin-bottom:20px; }
  .join_right .join_btn { margin-left:30px; }
</style>
