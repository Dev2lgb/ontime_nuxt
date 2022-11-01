<template>
  <div class="layout_format">
    <SubHeader :link="'/home'" :title="'예약리스트'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p><span>ON<span>TIME</span></span> 에서 지금 바로<br>예약이 가능한 프로그램입니다.</p>
      </div>

      <div class="progrma_search">
        <input type="text" v-model="search.keyword" class="search_input" placeholder="어떤 예약에 참여하고 싶으신가요?">
        <input type="button" class="img_button" @click="this.$fetch" title="검색">
      </div>

      <div class="progrma_area">
        <p><span class="font-weight-bold">{{ items.length }}개</span>의 프로그램</p>
<!--        <v-select-->
<!--          class="select_reset"-->
<!--          prepend-inner-icon="mdi-filter-variant"-->
<!--          v-model="searchCategory"-->
<!--          :items="searchCategoryItems"-->
<!--          hide-details="auto"-->
<!--          height="50"-->
<!--          outlined-->
<!--          dense-->
<!--        ></v-select>-->
      </div>

      <div v-if="items.length > 0">
        <div class="pa-3 border_b card_action" v-for="(item, index) in items" :key="index" >
          <div>
            <v-chip dark color="#4487fa" class="mb-3" label small v-show="item.on_off_line == 'ONLINE'">
              {{ item.on_off_line }}
            </v-chip>
            <v-chip dark color="#333" class="mb-3"  label small v-show="item.on_off_line == 'OFFLINE'">
              {{ item.on_off_line }}
            </v-chip>
          </div>
          <div class="flex j_space a_center">
            <div class="thumbnail_width">
              <v-img
                :src="getThumbnail(item.title_images)"
                :lazy-src="`https://picsum.photos/10/6?image=10`"
                aspect-ratio="1"
                width="80"
                class="img_radius"
              ></v-img>
            </div>
            <router-link :to="'/bookings/' + item.id" class="non-deco card_subject">
              <h3 class="text_title">[{{ getCategoryName(item) }}] {{ item.title }}</h3>
              <p class="color_main font_small_text tag_text">
                <span v-for="(tag, tagIndex) in item.tags" :key="tagIndex + 't'">
                  {{ tag }}
                </span>
              </p>
              <p class="desc">
                {{  item.content }}
              </p>
            </router-link>
          </div>
          <div class="bookmark_width flex j_center a_center">
            <v-btn fab small depressed dark color="#ddd" @click="AddBookmarks(item.id)"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
          </div>
        </div>
      </div>

      <div class="text-center pt-10 color_gray" v-else>
        진행중인 예약프로그램이 없습니다.
      </div>
      <div class="sizedBox-20"></div>
      <div class="text-center">
        <v-pagination
          v-model="pagination.page"
          :length="pagination.last_page"
        ></v-pagination>
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
      let url = '/bookings';
      url += '?itemsPerPage=' + this.pagination.per_page + '&page=' + this.pagination.page;

      if (this.$route.query) {
        this.search.keyword = this.$route.query.keyword;
      }

      if (Object.keys(this.search).length > 0) url += '&search=' + JSON.stringify(this.search);
      const response = await this.$axios.get(url);

      this.pagination.page = response.data.meta.current_page;
      this.pagination.last_page = response.data.meta.last_page;
      this.pagination.total = response.data.meta.total;
      this.items = response.data.data;

      this.setBeforeData();
      this.loading = false;
    } catch (e) {
      // if (e.response.status === '401') {
      //   console.log(e);
      //   //this.$toast.error(e.response.data.message);
      // }
    }
  },
  data: () => ({
    items: [],
    searchCategory: '',
    pagination: {
      page : 1,
      per_page: 5,
    },
    search: {},
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
    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      } else {
        return item.category_name.name_ko
      }
    },
    getThumbnail(files) {
      if (files.length > 0) {
        return files[0].url
      }
    },
    async AddBookmarks(id) {
      this.loading = true;
      try {
        let url = '/my/bookings/bookmarks';
        let data = {
          booking_id : id
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
.img_button {background: url(~/assets/images/search.png) center no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 27px; position: absolute; right: 26px; top: 10px;}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.select_reset {max-width: 130px;}

.card_action {position: relative;margin-top: 12px;}
.text_title {font-size: 15px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.tag_text {margin: 5px 0;}
.desc {font-size: 13px; max-height:39px; overflow: hidden; }
.card_subject {padding-left: 20px; display:block; width:calc(100% - 80px); }
</style>
