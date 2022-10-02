<template>
  <swiper class="swiper pb-10" :options="swiperOption">
    <swiper-slide class="slider_item">
      <div >
        <v-img
          aspect-ratio="1.4"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <div class="pa-3">
          <h3 class="mb-3 font_small_text">[교육]사찰 배움 템플스테이</h3>
          <p class="ma-0 font_small_text">템플 스테이 예절 교육 집중</p>
          <p class="ma-0 font_small_text">2022-09-10 16:00 외 1</p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="slider_item">
      <div >
        <v-img
          aspect-ratio="1.4"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <div class="pa-3">
          <h3 class="mb-3 font_small_text">[교육]사찰 배움 템플스테이</h3>
          <p class="ma-0 font_small_text">템플 스테이 예절 교육 집중</p>
          <p class="ma-0 font_small_text">2022-09-10 16:00 외 1</p>
        </div>
      </div>
    </swiper-slide>
    <swiper-slide class="slider_item">
      <div >
        <v-img
          aspect-ratio="1.4"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>
        <div class="pa-3">
          <h3 class="mb-3 font_small_text">[교육]사찰 배움 템플스테이</h3>
          <p class="ma-0 font_small_text">템플 스테이 예절 교육 집중</p>
          <p class="ma-0 font_small_text">2022-09-10 16:00 외 1</p>
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
  title: 'Loop mode / Infinite loop',
  components: {
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 20,
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
.slider_item { width:55%; border-radius:20px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; }
</style>

