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
                <router-link to="">예약만들기</router-link>
              </li>
              <li>
                <router-link to="">예약하기</router-link>
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
</style>
