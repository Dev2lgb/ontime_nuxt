<template>
  <div>
    <HostHeader />
    <div class="host_head pa-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 환영합니다.<br>예약 프로그램을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <p>예약이 필요 하신가요?</p>
          <NuxtLink to="/host/booking" class="create_a">
            <div class="create_btn">
              <p>+ 새로운 예약 만들기</p>
            </div>
           </NuxtLink>

        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start pa-5">

    <div class="host_area">
      <div class="progrma_area">
        <p><v-icon color="#111">mdi-calendar-text</v-icon> 내 예약목록</p>
        <p><span class="font-weight-bold">2개</span> 예약접수 진행중</p>
      </div>

      <div class="progrma_list">
          <div class="reservation_item mb-3" v-for="item in reservationItems" :key="item.id">
            <router-link :to="'/host/booking/' + item.id + '/dashboard'" class="non-deco">
            <div class="flex j_space a_center">
              <div>
                <v-chip dark color="#4487fa" label small>{{ item.division }}</v-chip>
                <v-chip dark color="#28b487" label small>{{ item.status }}</v-chip>
              </div>
              <span class="view_icon">
                <v-icon>mdi-eye</v-icon>
                {{ item.hit }}
              </span>
            </div>

            <div class="list-area flex j_space a_center">
              <div class="list_title">
                <p class="text-ellipsis">{{ item.title }}</p>
                <p class="color_main font_small_text tag_text">#자연휴식형 #친환경 #힐링</p>
              </div>
              <div class="list_btbt">
                <p>예약상품 ({{ item.goodsCount }})</p>
              </div>
            </div>

            <div class="flex j_space a_center mb-5 progrma_option">
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/list_icon01.png" height="30">
                <p class="font_small_text">예약확정 ({{ item.count.fin }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/list_icon02.png" height="30">
                <p class="font_small_text">예약대기 ({{ item.count.ready }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/list_icon03.png" height="30">
                <p class="font_small_text">예약취소 ({{ item.count.cancel }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/list_icon04.png" height="30">
                <p class="font_small_text">저장 ({{ item.count.saved }})</p>
              </div>
            </div>
            </router-link>

        </div>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  layout: 'host',

  data: () => ({
    reservationItems: [
      { id:'123', status:'진행중', title: '[교육] 사찰예절 배움 템플스테이 해맞이...', hit:'311', division:'online', goodsCount:'3', count:{ fin: '4', ready: '5', cancel: '6', saved: '7'} },
      { id:'123', status:'진행중', title: '[교육] 사찰예절 배움 템플스테이 해맞이...', hit:'311', division:'online', goodsCount:'3', count:{ fin: '4', ready: '5', cancel: '6', saved: '7'} },

    ],
  }),
}
</script>

<style scoped>
.reservation_item {border-bottom: 1px solid #ddd; }
.reservation_status_items > div { background-color:#ddd; width:calc(25% - 20px); border-radius: 10px}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.progrma_area p:first-child {font-weight: 700; font-size: 17px;}
.progrma_area p:last-child {color: #818181;}
.progrma_area p:last-child span {color: #111;}
.progrma_list {margin: 20px 0; position: relative;}
.view_icon {font-size: 14px; color: #818181;}
.list-area {display: flex; justify-content: space-between;}
.list_title p {font-size: 16px; font-weight: 700; margin: 10px 0 0}
.list_title p:nth-child(2) {margin: 4px 0; font-size: 15px;}
.list_title p:nth-child(3) {font-size: 14px; margin: 14px 0;}
.list_lettbox {padding-bottom: 20px;}
.progrma_option {background: #f5f5f5; border-radius: 10px; padding: 8px 0; margin-top: 10px;}
.progrma_option p {margin-top: 10px; margin-bottom: 0;}

.list_title { width:calc(100% - 70px); padding-right:5px; }
.list_btbt { width:80px; background: #ef911b; text-align:center; line-height:35px; color: #fff; border-radius: 10px; font-size: 12px; height: 35px; }
.list_btbt:hover {background: #df871a;}

.text-ellipsis { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
</style>
