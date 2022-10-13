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
          <div class="systems_item">
            <img src="~/assets/images/system_1.png" alt="">
            <h3><span>숙박</span> 시스템</h3>
            <p>호텔,펜션,리조트,호스텔,캠핑 등 다양한 타입의 숙소관리만 필요한 업체를 위한 시스템</p>
          </div>
          <div class="systems_item">
            <img src="~/assets/images/system_2.png" alt="">
            <h3><span>액티비티</span> 시스템</h3>
            <p>해외 현지거래를 하는 많은 여행사 및 랜드사를 위한 판매관리 통합 시스템</p>
          </div>
          <div class="systems_item">
            <img src="~/assets/images/system_3.png" alt="">
            <h3><span>공연</span> 시스템</h3>
            <p>콘서트공연 및입장권 등의 실시간
              티켓 판매와 관리가 필요한 업체를
              위한 시스템  </p>
          </div>
          <div class="systems_item">
            <img src="~/assets/images/system_4.png" alt="">
            <h3><span>공유</span> 시스템</h3>
            <p>주방/사무실 등 다양한 형태의 공유
              공간 예약 및 관리 프로그램이 필요한
              업체를 위한 시스템</p>
          </div>
          <div class="systems_item">
            <img src="~/assets/images/system_5.png" alt="">
            <h3><span>여행</span> 시스템</h3>
            <p>택시/버스 투어 등 국내외 현지여행
              투어액티비티상품들을 판매하는
              업체를 위한 시스템 </p>
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
    <div class="service_section">
      <div class="inner">
        <div class="flex j_space a_center">
          <div class="service_left">
            <div class="service_logo"><img src="~/assets/images/logo.png"></div>
            <h3>
              당신의 예약관리를<br />
              위한 가장 좋은<br />
              예약 서비스 선택
            </h3>
            <p>
              하나의 계정으로 이용하는 무료 온라인 예약관리 시스템<br />
              다양한 기능을 통해 예약을 쉽고 편하게 관리해보세요.
            </p>
            <router-link to="" class="service_btn">바로 시작하기</router-link>
          </div>
          <div class="service_right">
            <img src="~/assets/images/notebook.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="service2_section">
      <div class="inner">
        <div class="flex j_space a_center">
          <div class="service2_left text-left">
            <img src="~/assets/images/service_1.png" alt="">
          </div>
          <div class="service2_right">
            <p class="underline_btn">더 알아보기</p>
            <h3>예약관리가 필요한<br>모든 업종에서 자유롭게!</h3>
            <div class="my-10 flex j_start a_center">
              <div class="process_item flex j_center a_center d_col">
                <div class="circle_icon">
                  <img src="~/assets/images/c_icon1.png" alt="">
                </div>
                <p>예약정보 입력</p>
              </div>
              <div class="process_item flex j_center a_center d_col">
                <div class="circle_icon">
                  <img src="~/assets/images/c_icon2.png" alt="">
                </div>
                <p>예약옵션 설정</p>
              </div>
              <div class="process_item flex j_center a_center d_col">
                <div class="circle_icon">
                  <img src="~/assets/images/c_icon3.png" alt="">
                </div>
                <p>시간/일정 설정</p>
              </div>
              <div class="process_item flex j_center a_center d_col">
                <div class="circle_icon">
                  <img src="~/assets/images/c_icon4.png" alt="">
                </div>
                <p>예약코드/링크 전달</p>
              </div>
            </div>

            <p class="s2_text">단! 5분 간편한 예약만들기와 예약 옵션별 시간과 장소를<br />
              자유롭게 설정하고, 예약자 정보를 보다 쉽게 관리합니다.</p>
            <p class="s2_text2">예약을 만들어 예약코드와 링크를 예약자에게 전달하세요.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="service_section">
      <div class="inner">
        <div class="flex j_space a_center">
          <div class="service_left">
            <p class="underline_btn">더 알아보기</p>
            <h3>
              예약관리에 어려움을<br />
              느끼고 계신다면<br />
              온타임으로!
            </h3>
            <p>
              ONTIME은 심플하지만 다양한 기능으로<br />
              맞춤형 예약페이지를 개선할 수 있도록 지원합니다.<br />
              예약 옵션별 시간과 장소를 자유롭게 설정하고,<br />
              예약자 정보를 보다 쉽고 편하게 관리해보세요.
            </p>
            <router-link to="" class="service_btn">바로 시작하기</router-link>
          </div>
          <div class="service_right">
            <img src="~/assets/images/service_2.png" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="book_section">
      <div class="inner">
        <div class="flex j_space a_center">
          <h3 class="book_h3">다양한 분야의 예약관리를<br /><span>온타임으로 해결하세요.</span></h3>
          <div>
            <div class="flex j_end a_center">
              <v-chip color="#f1f1f1"><span class="rec"></span>장소, 시간 없이도 OK</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>프라이빗 모드</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>Email 알림 시스템</v-chip>
            </div>
            <div class="chip_box flex j_end a_center">
              <v-chip color="#f1f1f1"><span class="rec"></span>다양한 예약 옵션 설정</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>글로벌 타임존 케어</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>간편한 가입절차</v-chip>
            </div>
          </div>
        </div>

        <div class="flex j_space a_center">
          <router-link to="" class="half_btn left flex j_space a_start">
            <div class="h_btn_title">
              <p>예약관리가 필요하시다면</p>
              <h3>예약만들기</h3>
            </div>
            <div>
              <img src="~/assets/images/btn_left.png" alt="">
            </div>
          </router-link>

          <router-link to="" class="half_btn right flex j_space a_start">
            <div class="h_btn_title">
              <p>예약관리을 참여하신다면</p>
              <h3>예약하기</h3>
            </div>
            <div>
              <img src="~/assets/images/btn_right.png" alt="">
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="footer_header">
        <div class="inner">

        </div>
      </div>
      <div class="inner">

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
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
  .systems_item img { width:30px; }
  .join_section { background-color:#f3f5f7; padding:70px 0; }
  .join_left { width:50%; }
  .join_left img { width:90%; }
  .join_right { width:50%; }
  .join_right h3 { font-size:40px; font-weight:400; margin-bottom:30px; }
  .join_right h3 span { font-weight:bold; }
  .join_right p { margin-bottom:20px; }
  .join_right .join_btn { margin-left:30px; }
  .service_section { padding:70px 0; background-color:#f9f9f9; }
  .service_left .service_logo img { width:100px; border-bottom:1px solid #ccc; padding-bottom:10px; }
  .service_left h3 { font-size:40px; margin-bottom:30px; color:#484848; }
  .service_btn { color:#4676bb; margin-top:20px; display:inline-block; }
  .service_left, .service_right { width:50%; }
  .service2_left, .service2_right { width:50%; }
  .service2_left img { width:80%; }
  .service2_right h3 { font-size:40px; margin-bottom:30px; color:#484848; }
  .service2_section { padding:0px 0; }
  .circle_icon { width:60px; height:60px; margin:0; display:flex; justify-content: center; align-items: center; border-radius:100%; border:1px solid #4676bb; text-align:center; }
  .process_item { text-align:center; width:100px; position:relative; }
  .process_item::after { position:absolute; content:""; opacity: .4; display:block; width:30px; height:1px; background-color:#4676bb; top:30px; left:85px; }
  .process_item:last-child::after { display:none; }
  .process_item p { font-size:12px; color:#4676bb; margin-top:5px; }
  .s2_text { margin:30px 0; }
  .s2_text2 { color:#aaa; }
  .underline_btn { border-bottom:1px solid #7f7f7f; color:#7f7f7f; font-weight:500; padding-bottom:5px; display:inline-block; margin-bottom:20px; }
  .book_section { padding:150px 0; }
  .rec { width:15px; height:15px; border:1px solid #222; background-color:#fff; display:inline-block; margin-right:5px; }
  .chip_box { margin-top:10px; }
  .book_h3 { font-size:35px; font-weight:400; }
  .book_h3 span { font-weight:bold; }
  .half_btn { width:calc(50% - 10px); padding:30px; border-radius:20px; margin-top:40px; color:#fff; }
  .half_btn.left { background-color:#3c81f9; }
  .half_btn.right { background-color:#50b999; }
  .half_btn h3 { font-size:35px; }
  .h_btn_title { padding-top:30px; }
</style>
