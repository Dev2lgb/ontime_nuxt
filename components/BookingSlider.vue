<template>
  <swiper class="swiper pb-10" :options="swiperOption">
    <swiper-slide class="slider_item" v-for="(item, i) in items" :key="i">
      <router-link class="non-deco" :to="'/my-bookings/' + item.booking_id" >
        <v-img
          aspect-ratio="1.4"
          :src="getThumbnail(item.booking.title_images)"
          :lazy-src="`https://picsum.photos/10/6?image=10`"
        ></v-img>
        <div class="pa-3">
          <h3 class="mb-3 font_small_text">[{{ getCategoryName(item.booking) }}] {{ item.booking.title }}</h3>
          <p class="ma-0 font_small_text">템플 스테이 예절 교육 집중</p>
          <p class="ma-0 font_small_text">{{ item.booking_date }} <span v-show="item.booking_time">{{ item.booking_time }}</span></p>
        </div>
      </router-link>
    </swiper-slide>
  </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  props: ['items'],
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
  },
  methods: {
    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      }
      if (item.hasOwnProperty('category_name')){
        return item.category_name.name_ko;
      }
    },
    getThumbnail(files) {
      if (files.length > 0) {
        return files[0].url
      }
    }
  }
}
</script>

<style scoped>
.slider_item { width:55%; border-radius:20px; overflow: hidden; box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; }
</style>

