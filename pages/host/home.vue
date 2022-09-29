<template>
  <div>
    <HostHeader />
    <div class="host_dashboard flex d_col full_height j_center a_start pa-5">
      <div class="f_width">
        <h3>예약 관리자 페이지</h3>
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
          class="my-5"
          to="/host/booking"
        >+ 새로운 예약 만들기</v-btn>
      </div>
      <div class="f_width">
        <h3 class="mb-3">내 예약 목록 (2)</h3>
        <div class="f_width">
          <div class="reservation_item border_a pa-3 mb-3" v-for="item in reservationItems" :key="item.id">
            <router-link :to="'/host/booking/' + item.id + '/dashboard'" class="non-deco">
            <div class="flex j_space a_center">
              <div>
                <v-chip>{{ item.division }}</v-chip>
                <v-chip>{{ item.status }}</v-chip>
              </div>
              <span>
                <v-icon>mdi-eye</v-icon>
                {{ item.hit }}
              </span>
            </div>
            <div>
              <p class="font_sub_title font-weight-bold ma-0 mt-2">{{ item.title }}</p>
              <v-btn text small color="blue" class="pa-0">예약상품 ({{ item.goodsCount }})</v-btn>
            </div>
            <div class="flex j_space a_center reservation_status_items">
              <div class="text-center py-3">
                <p class="font_big_title ma-0">{{ item.count.fin }}</p>
                <p class="ma-0">예약 확정</p>
              </div>
              <div class="text-center py-3">
                <p class="font_big_title ma-0 ">{{ item.count.ready }}</p>
                <p class="ma-0">예약 대기</p>
              </div>
              <div class="text-center py-3">
                <p class="font_big_title ma-0 ">{{ item.count.cancel }}</p>
                <p class="ma-0">예약 취소</p>
              </div>
              <div class="text-center py-3">
                <p class="font_big_title ma-0 ">{{ item.count.saved }}</p>
                <p class="ma-0">저장</p>
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
.reservation_item { border-radius:10px; }
.reservation_status_items > div { background-color:#ddd; width:calc(25% - 20px); border-radius: 10px}
</style>
