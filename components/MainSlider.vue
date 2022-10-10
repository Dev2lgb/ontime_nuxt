<template>
  <swiper class="swiper pb-10" :options="swiperOption">
    <swiper-slide class="slider_item">
      <div class="flex j_space a_center inner">
        <div class="mv_left">
          <h3>
            비대면 시대에<br>
            최적화된 예약 서비스,<br>
            ONTIME!
          </h3>
          <p>
            당신의 예약관리를 위한 ONTIME<br>
            쉽고 간편한 예약 서비스를 찾고 계시나요?
          </p>
          <v-btn color="#4676bb" to="/home" x-large dark depressed>서비스 시작하기</v-btn>
        </div>
        <div class="mv_right">
          <img src="~/assets/images/mv1.png" alt="">
        </div>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'swiper-example-loop',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 0,
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        // navigation: {
        //   nextEl: '.swiper-button-next',
        //   prevEl: '.swiper-button-prev'
        // }
      }
    }
  }
}
</script>

<style scoped>
.mv_left { margin-bottom:50px; }
.mv_left h3 { font-size:50px; }
.mv_left p { font-size:20px; margin:30px 0; color:#483dff; font-weight:bold; }
.slider_item { background-color:#ddfdff; padding:80px 0 0; }
</style>

