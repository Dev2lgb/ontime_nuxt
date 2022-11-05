<template>
  <div class="sizedbox layout_format">
    <SubHeader :link="'/bookings'" :title="'예약상세'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div>
        <BookingDetailSlider :items="booking.title_images"/>
      </div>
      <div class="progrma_subject">
        <h3>[{{ getCategoryName(booking) }}] {{ booking.title }}</h3>
        <p class="color_main my-1">
          <span v-for="(tag, tagIndex) in booking.tags" :key="tagIndex + 't'">
            {{ tag }}
          </span>
        </p>
        <div class="flex j_space a_center mb-5 progrma_option">
          <div class="q_width flex d_col j_center a_center py-3">
            <img src="~/assets/images/progrma_icon1.png" height="40">
            <p class="font_small_text">6시간 이용가능</p>
          </div>
          <div class="q_width flex d_col j_center a_center py-3">
            <img src="~/assets/images/progrma_icon2.png" height="40">
            <p class="font_small_text" v-show="booking.on_off_line == 'ONLINE'">온라인 진행</p>
            <p class="font_small_text" v-show="booking.on_off_line == 'OFFLINE'">오프라인 진행</p>
          </div>
          <div class="q_width flex d_col j_center a_center py-3">
            <img src="~/assets/images/progrma_icon3.png" height="40">
            <p class="font_small_text" v-show="booking.is_booking_confirm == 'N'">예약즉시 확정</p>
            <p class="font_small_text" v-show="booking.is_booking_confirm == 'Y'">승인후 확정</p>
          </div>
          <div class="q_width flex d_col j_center a_center py-3">
            <img src="~/assets/images/progrma_icon4.png" height="40">
            <p class="font_small_text">실시간 응대가능</p>
          </div>
        </div>
        <h3 class="font_sub_title"><v-icon>mdi-calendar-text</v-icon> 예약 프로그램을 소개합니다</h3>
        <p class="progrma_text">
          {{ booking.content }}
        </p>
        <p class="progrma_text">
          {{ booking.desc }}
        </p>
        <div class="area_line"></div>
        <h3 class="font_sub_title mt-5"><v-icon>mdi-whatsapp</v-icon> 예약에 대한 문의사항이 있으신가요?</h3>
        <p class="call_time" v-show="booking.is_operating_time == 'Y'">담당문의 가능 및 운영시간 : {{ booking.operating_start_time }} ~ {{ booking.operating_end_time }}</p>

        <div class="flex j_space a_center wrap progrma_call">
          <div class="flex j_start a_center h_width pa-2">
            <img src="~/assets/images/p_icon01.png" height="30">&emsp;
            <p class="ma-0 ml-1">{{ booking.host_name }}</p>
          </div>
          <div class="flex j_start a_center h_width pa-2">
            <img src="~/assets/images/p_icon02.png" height="30">&emsp;
            <p class="ma-0 ml-1">{{ booking.email }}</p>
          </div>
          <div class="flex j_start a_center h_width pa-2">
            <img src="~/assets/images/p_icon03.png" height="30">&emsp;
            <a :href="'tel:' + booking.ccc_telephone" class="non-deco ma-0 ml-1">{{ booking.ccc_telephone }}</a>
          </div>
          <div class="flex j_start a_center h_width pa-2">
            <img src="~/assets/images/p_icon04.png" height="30">&emsp;
            <a :href="booking.homepage_url" target="_blank" class="non-deco ma-0 ml-1">{{ booking.homepage_url }}</a>
          </div>
        </div>
        <div class="area_line"></div>
        <div v-show="booking.facebook_url || booking.instagram_url || booking.youtube_url">
          <h3 class="font_sub_title"><v-icon>mdi-share</v-icon> SNS채널 바로가기</h3>
          <div class="progrma_sns">
            <v-btn :href="booking.facebook_url" target="_blank" v-show="booking.facebook_url" icon dark><img src="~/assets/images/facebook.svg" width="40"></v-btn>&nbsp;&nbsp;
            <v-btn :href="booking.instagram_url" target="_blank" v-show="booking.instagram_url" icon dark><img src="~/assets/images/instar.svg" width="40"></v-btn>&nbsp;&nbsp;
            <v-btn :href="booking.youtube_url" target="_blank" v-show="booking.youtube_url" icon dark><img src="~/assets/images/youtube.svg" width="40"></v-btn>&nbsp;&nbsp;
          </div>
          <div class="area_line"></div>
        </div>
        <div v-show="booking.on_off_line == 'OFFLINE'">
          <h3 class="font_sub_title my-6"><v-icon>mdi-map-marker-circle</v-icon> 예약 프로그램이 진행되는 장소를 안내드려요</h3>
          <div class="border_a pa-3 mb-5">
            <template>
                <gmap-map v-if="booking.coordinate" :center="booking.coordinate" style="width: 100%; height: 200px;" :zoom="10"
                          :options="{mapTypeControl: false, streetViewControl: false}">
                  <gmap-marker label="" :position="booking.coordinate" />
                </gmap-map>
              <p class="mt-3">{{ booking.address }}</p>
            </template>
          </div>
          <div class="area_line" v-show="isShow(booking.info_files)"></div>
        </div>
        <h3 class="font_sub_title my-6" v-show="isShow(booking.info_files)"><v-icon>mdi-file-plus</v-icon> 첨부파일</h3>
        <div class="border_a pa-3 mb-5" v-show="isShow(booking.info_files)">
          <div v-for="(file, f) in booking.info_files">
            <v-btn text :href="file.url" target="_blank" color="#0000ff">{{ file.name }}</v-btn>
          </div>

        </div>

        <div class="flex j_space a_center mt-10 ">
          <div class="flex j_start a_center">
            <v-btn depressed outlined large>문의하기</v-btn>
            <v-btn depressed dark class="ml-3" color="#28b487" :to="'/bookings/' + this.$route.params.id + '/options'" large>예약하기</v-btn>
          </div>
          <div class="flex j_end a_center">
            <v-btn fab small depressed dark color="#ddd" @click="share()"><v-icon>mdi-share-variant</v-icon></v-btn>
            <v-btn fab small depressed dark color="#ddd" class="ml-3" @click="AddBookmarks"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
          </div>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      let url = '/bookings/' + this.$route.params.id;
      const response = await this.$axios.get(url);

      this.booking = response.data.data.booking;

      // this.setBeforeData();
      this.loading = false;
    } catch (e) {
      if (e.response.status === '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  computed: {
    webShareApiSupported() {
      return navigator.share
    }
  },
  data: () => ({
    url: '',
    searchCategory: '',
    booking: {},
    searchCategoryItems: [
      { text: '전체', value:'' },
      { text: '교육', value:'1' },
      { text: '관광', value:'2' },
      { text: '문화', value:'3' },
      { text: '패션', value:'4' },
      { text: '행사', value:'5' },
    ],
  }),
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
      if (Array.isArray(files)) {
        return files[0].url
      }
    },
    isShow(items) {
      if (Array.isArray(items) && items.length === 0 ) {
        return false;
      }
      return true;
    },
    isMobile() {
      var user = navigator.userAgent;
      var is_mobile = false;
      if( user.indexOf("iPhone") > -1
        || user.indexOf("Android") > -1
        || user.indexOf("iPad") > -1
        || user.indexOf("iPod") > -1
      ) {
        is_mobile = true;
      }
      return is_mobile;
    },
    share(){
      if (this.isMobile()) {
        this.shareViaWebShare();
      } else {
        this.url = location.href;
        this.$copyText(this.url);
        this.$toast.success("복사되었습니다.");
      }
    },
    shareViaWebShare() {
      navigator.share({
        title: this.booking.title,
        text: this.booking.desc,
        url: location.href,
      })
    },
    async AddBookmarks() {
      this.loading = true;
      try {
        let url = '/my/bookings/bookmarks';
        let data = {
          booking_id : this.$route.params.id
        };
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data: data
        })
        if (response.data.result) {
          this.$toast.success('위시리스트에 추가됐습니다.');
        } else {
          this.$toast.error(response.data.message);
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
  },
}
</script>

<style scoped>
  .thumbnail_width { width:150px; }
  .res_content_width { width:calc(100% - 210px); }
  .bookmark_width { width:60px }
  .img_radius { border-radius: 10px; }
  .progrma_subject h3 {margin: 30px 0 10px;}
  .progrma_subject>p {font-size: 14px;}
  .progrma_option {background: #f5f5f5; border-radius: 14px; padding: 10px; margin-top: 30px;}
  .progrma_option p {margin-top: 10px; margin-bottom: 0;}
  .progrma_call {margin: 10px 0 30px;}
  .progrma_call p {margin: 0; font-size: 14px;}
  .progrma_text {padding: 10px; margin-top: 14px;}
  .call_text {margin: 0;}
  .call_time {background: #00bcd4; color: #fff; padding: 10px 0; border-radius: 30px; margin: 20px 0 0; text-align: center;}
  .progrma_sns {padding: 10px 10px 30px; margin-top: 14px;}
</style>
