<template>
  <div class="sizedbox layout_format">
    <SubHeader :link="'/bookings'" :title="'예약하기'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p>[{{ getCategoryName(booking) }}] {{ booking.title }}</p>
      </div>
      <p class="ma-0">예약이 완료되었습니다.</p>
      <p class="ma-0 mb-3">예약 취소규정에 따라 취소 시 추후 불이익이 발생될 수 있습니다.</p>
      <router-link to="/home">홈으로 이동</router-link>
      <div>
        <div v-for="(item, index) in items" :key="index" class="border_a mb-3 pa-5 position_rel">
          <v-btn text class="ab_btn" @click="deleteItem(index)" fab color="red"><v-icon>mdi-delete</v-icon></v-btn>
          <p class="font-weight-bold ma-0">{{ item.title }}</p>
          <p class="font_small_text ma-0 mb-1">{{ item.desc }}</p>
          <p class="color_main ma-0">
            <v-chip class="mr-2" small v-for="(date, dateIndex) in item.date_times" :key="dateIndex">{{ date }}</v-chip>
          </p>
          <p class="ma-0 font_small_text mt-1">({{ item.timezone }})</p>
        </div>
      </div>
      <div class="">
        <div class="mt-10">
          <v-btn class="next_btn" x-large depressed dark block color="#28b487" outlined>문의하기</v-btn>
          <v-btn class="next_btn mt-3" x-large depressed dark block color="#28b487" @click="submitForm">예약취소</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      let url = '/bookings/' + this.$route.params.id;
      const response = await this.$axios.get(url);
      this.booking = response.data.data.booking;


      this.loading = false;
    } catch (e) {
      // if (e.response.status == '401') {
      //   console.log(e);
      //   //this.$toast.error(e.response.data.message);
      // }
    }
  },
  data: () => ({
    searchCategory: '',
    form: {
      items: [],
      collect_user_infos1: [],
      collect_user_infos2: [],
    },
    booking: {
      collect_user_infos1: [],
      collect_user_infos2: [],
    },
    searchCategoryItems: [
      { text: '전체', value:'' },
      { text: '교육', value:'1' },
      { text: '관광', value:'2' },
      { text: '문화', value:'3' },
      { text: '패션', value:'4' },
      { text: '행사', value:'5' },
    ],
    items: [],
    errors: [],
  }),
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      // this.items = JSON.parse(this.$store.state.common.userBookingFinData);
    },

    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      }
      if (item.hasOwnProperty('category_name')){
        return item.category_name.name_ko;
      }
    },
    deleteItem(index) {

    },
    ...mapMutations("common",['clearUserBookingOptionForm']),
  },
}
</script>

<style scoped>
.thumbnail_width { width:150px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width { width:60px }
.img_radius { border-radius: 10px; }

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span { color: #4487fa;}
.user_nik p span span {color: #28b487;}

.select_hide_option {margin-top: 30px;}
.user_num {margin-bottom: 14px;}
.user_num p {font-size: 14px; color: #ff5722;}

.next_btn {font-size: 15px;}
.position_rel { position:relative; }
.ab_btn { position:absolute; top:10px; right:10px; }
</style>
