<template>
  <div class="sizedbox">
    <SubHeader :link="'/home'" :title="'나의 예약리스트'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p><span>ON<span>TIME</span></span> 에서 <br>진행중인 예약 프로그램입니다.</p>
      </div>

      <div class="progrma_area">
        <p><span class="font-weight-bold">{{ count }}개</span>의 프로그램</p>
      </div>

      <div v-if="items.length > 0" v-show="!loading">
        <div class="pa-3 border_b card_action" v-for="(item, i) in items" :key="i">
          <div class="mb-3">
            <v-chip dark color="#03a9f4" label small>{{ item.booking.on_off_line }}</v-chip>
            <v-chip dark :color="getStatusColor(item.status_name)" label small>{{ item.status_name }}</v-chip>
          </div>
          <div class="flex j_space a_center">
            <div class="thumbnail_width">
              <v-img
                :src="getThumbnail(item.booking.title_images)"
                :lazy-src="`https://picsum.photos/10/6?image=10`"
                aspect-ratio="1"
                width="80"
                class="img_radius"
              ></v-img>
            </div>
            <router-link :to="'/my-bookings/' + item.id" class="non-deco card_subject">
              <h3 class="text_title">[{{ getCategoryName(item.booking) }}] {{ item.booking.title }}</h3>
              <p class="ma-0 font_small_text">{{ item.booking.content}}</p>
              <v-chip v-for="option in item.items" small class="mr-1" :key="option.id">{{ option.booking_date }} <span class="ml-1" v-show="option.booking_time">{{ option.booking_time }}</span> ({{ option.personnel }}명)</v-chip>
            </router-link>
          </div>
        </div>
      </div>
      <div class="text-center pt-10 color_gray" v-else>
        진행중인 예약이 없습니다.
      </div>
      <div class="mt-3">
        <div class="text-center">
          <v-pagination
            v-model="pagination.page"
            :length="pagination.last_page"
          ></v-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatDialog from "../../components/chat/ChatDialog";
export default {
  components: {ChatDialog},
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      let url = '/my/bookings';
      url += '?itemsPerPage=' + this.pagination.itemsPerPage + '&page=' + this.pagination.page;
      const response = await this.$axios.get(url);

      this.items = response.data.data;
      this.count = response.data.total;
      this.pagination.page = response.data.current_page;
      this.pagination.last_page = response.data.last_page;
      this.pagination.total = response.data.total;

      this.loading = false;
    } catch (e) {
      console.log(e);
      if (e.response.status === '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    loading: false,
    items:[],
    count: 0,
    pagination: {
      page:1,
      itemsPerPage: 5,
    },
    searchCategory: '',
    searchCategoryItems: [
      { text: '전체', value:'' },
      { text: '교육', value:'1' },
      { text: '관광', value:'2' },
      { text: '문화', value:'3' },
      { text: '패션', value:'4' },
      { text: '행사', value:'5' },
    ],
  }),
  watch: {
    pagination: { handler() { this.$fetch(); }, deep: true },
  },
  methods: {
    async cancelBooked(booking_id,id) {
      this.loading = true;
      try {
        let url = '/my/bookings/' + booking_id + '/booked/' + id + '/revoke';
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('예약이 취소되었습니다.');
          this.$fetch();
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
    },
    getStatusColor(status) {
      if (status == '취소') {
        return 'red';
      }
      if (status == '확정') {
        return '#28b487';
      }
      if (status == '완료') {
        return '#222';
      }
    }
  },
}
</script>

<style scoped>
.thumbnail_width { width:80px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width {width:60px; position: absolute; right: 0; top: 7px;}
.img_radius { border-radius: 10px; }

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 24px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span {font-weight: 800; color: #28b487;}
.user_nik p span span {color: #4487fa;}
.progrma_search {position: relative;}
.search_input {width: 100%; height: 60px; border: 2px solid #435689; border-radius: 10px; padding: 10px; /*background: url(/_nuxt/assets/images/search.png)no-repeat; box-sizing: border-box; background-position: right 24px center; background-size: 35px;*/}
.search_input::placeholder {color: #ccc;}
.search_input:focus-within {outline: #435689}
.img_button {background: url(/_nuxt/assets/images/search.png)no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 35px; position: absolute; right: 26px; top: 22px;}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.select_reset {max-width: 130px;}

.card_action {position: relative;margin-top: 12px;}
.text_title {font-size: 15px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.tag_text {margin: 5px 0;}
.desc {font-size: 13px; max-height:39px; overflow: hidden; }
.card_subject {padding-left: 20px; display:block; width:calc(100% - 80px); }
</style>
