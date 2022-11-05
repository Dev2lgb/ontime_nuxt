<template>
  <div style="position:relative;">
    <swiper class="swiper pb-10" :options="swiperOption">
      <swiper-slide class="slider_item" v-for="(item, i) in items" :key="i">
        <div>
          <v-img
            aspect-ratio="1.4"
            :src="item.url"
            :lazy-src="`https://picsum.photos/10/6?image=10`"
          ></v-img>
        </div>
      </swiper-slide>
    </swiper>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
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
        // pagination: {
        //   el: '.swiper-pagination',
        //   clickable: true
        // },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
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
.slider_item { width:100%; }
</style>

