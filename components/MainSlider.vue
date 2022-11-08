<template>
  <swiper class="swiper pb-10" :options="swiperOption">
    <swiper-slide class="slider_item">
      <div class="flex j_space a_center inner mv-item">
        <div class="mv_left">
          <h3>
            {{$t('_main.main_banner_text1')}}<br>
            {{$t('_main.main_banner_text2')}}
          </h3>
          <img src="~/assets/images/logo.png" alt="" class="main_logo">
          <p>
            {{$t('_main.main_banner_text3')}}<br>
            {{$t('_main.main_banner_text4')}}
          </p>
          <v-btn color="#00cc99" to="/home" x-large dark depressed class="mv_btn">{{$t('_main.main_banner_btn')}}</v-btn>
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
.slider_item { overflow: hidden }
.main_logo {height: 45px; margin-top: 20px;}
</style>

