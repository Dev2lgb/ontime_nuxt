<template>
  <div class="main_wrap">
    <div class="header pc_v">
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
    <div class="header mo_v">
      <MobileMainHeader />
    </div>

    <div class="mv">
      <MainSlider />
    </div>

    <div class="systems">
      <div class="inner">
        <div class="flex j_space a_center system_wrap">
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
            <div class="my-10 flex j_start a_center process_wrap">
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
          <div class="chip_wrap">
            <div class="flex j_end a_center item_chips">
              <v-chip color="#f1f1f1"><span class="rec"></span>장소, 시간 없이도 OK</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>프라이빗 모드</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>Email 알림 시스템</v-chip>
            </div>
            <div class="chip_box flex j_end a_center item_chips">
              <v-chip color="#f1f1f1"><span class="rec"></span>다양한 예약 옵션 설정</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>글로벌 타임존 케어</v-chip>
              <v-chip color="#f1f1f1"><span class="rec"></span>간편한 가입절차</v-chip>
            </div>
          </div>
        </div>

        <div class="flex j_space a_center">
          <router-link to="/host/home" class="half_btn left flex j_space a_start">
            <div class="h_btn_title">
              <p>예약관리가 필요하시다면</p>
              <h3>예약만들기</h3>
            </div>
            <div>
              <img src="~/assets/images/btn_left.png" alt="">
            </div>
          </router-link>

          <router-link to="/home" class="half_btn right flex j_space a_start">
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
        <div class="inner flex j_space a_center">
          <div class="f_logo">
            <img src="~/assets/images/f_logo.png" alt="">
          </div>
          <div class="f_menu flex j_end a_center">
            <a href="">이용약관</a>
            <a href="">개인정보처리방침</a>
          </div>
        </div>
      </div>
      <div class="footer_body inner flex j_space a_center">
        <div class="f_left">
          <p>
            상호명 : 온타임  I  대표:홍길동  I  사업자등록번호: 012-34-56789  I  통신판매업신고 : 제0000-서울영등포-0000호
            I  주소 : 서울시 영등포구 양평로 33길 49 4층 405호
            이메일 : ontimeworld.manager@gmail.com
          </p>
          <p class="color_gray">Copyright© 2022 All rights reserved by ONTIME.</p>
        </div>
        <div class="text-right f_right">
          <p class="customer_tel">고객지원 <span>1000-0000</span></p>
          <p class="customer_time">운영시간 10:00 ~ 18:00  I  점심시간 12:00 ~ 13:00 (주말,공휴일 제외)</p>
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

</style>
