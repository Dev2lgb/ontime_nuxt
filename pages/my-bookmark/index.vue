<template>
  <div>
    <SubHeader :link="'/home'" :title="'나의 위시리스트'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p class="font-weight-bold">위시리스트</p>
      </div>

      <div class="progrma_area">
        <p><span class="font-weight-bold">{{ items.length }}개</span>의 프로그램</p>
<!--        <v-select-->
<!--          class="select_reset"-->
<!--          prepend-inner-icon="mdi-filter-variant"-->
<!--          v-model="searchCategory"-->
<!--          :items="searchCategoryItems"-->
<!--          hide-details="auto"-->
<!--          outlined-->
<!--          dense-->
<!--        ></v-select>-->
      </div>
      <div v-if="items.length > 0">
        <div class="pa-3 border_b card_action" v-for="(item, index) in items" :key="index" >
          <div>
            <v-chip dark color="#4487fa" class="mb-3" label small v-show="item.booking.on_off_line == 'ONLINE'">
              {{ item.booking.on_off_line }}
            </v-chip>
            <v-chip dark color="#333" class="mb-3"  label small v-show="item.booking.on_off_line == 'OFFLINE'">
              {{ item.booking.on_off_line }}
            </v-chip>
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
            <router-link :to="'/bookings/' + item.booking.id" class="non-deco card_subject">
              <h3 class="text_title">[{{ getCategoryName(item.booking) }}] {{ item.booking.title }}</h3>
              <p class="color_main font_small_text tag_text">
                <span v-for="(tag, tagIndex) in item.booking.tags" :key="tagIndex + 't'">
                  {{ tag }}
                </span>
              </p>
              <p class="desc">
                {{  item.booking.content }}
              </p>
            </router-link>
          </div>
          <div class="bookmark_width flex j_center a_center">
<!--            <v-btn fab small depressed dark color="#ddd" @click="AddBookmarks(item.id)"><v-icon>mdi-bookmark-outline</v-icon></v-btn>-->
          </div>
        </div>
      </div>

      <div class="text-center pt-10 color_gray" v-else>
        위시리스트가 없습니다.
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
      // alert('test');
      let url = '/my/bookings/bookmarks';
      // url += '?itemsPerPage=' + this.pagination.per_page + '&page=' + this.pagination.page;
      const response = await this.$axios.get(url);

      console.log(response);
      // this.pagination.page = response.data.meta.current_page;
      // this.pagination.last_page = response.data.meta.last_page;
      // this.pagination.total = response.data.meta.total;
      this.items = response.data.bookingBookmarks;

      this.loading = false;
    } catch (e) {
      // if (e.response.status == '401') {
      //   console.log(e);
      //   //this.$toast.error(e.response.data.message);
      // }
    }
  },
  data: () => ({
    items: [],
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
  methods: {
    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      } else {
        // return item.category_name.name_ko
      }
    },
    getThumbnail(files) {
      if (files.length > 0) {
        return files[0].url
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
.img_button {background: url(/_nuxt/assets/images/search.png)no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 35px; position: absolute; right: 26px; top: 22px;}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.select_reset {max-width: 130px;}

.card_action {position: relative;margin-top: 12px;}
.text_title {font-size: 15px; margin-top: 10px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.tag_text {margin: 5px 0;}
.desc {font-size: 13px; max-height:39px; overflow: hidden; }
.card_subject {padding-left: 20px; display:block; width:calc(100% - 80px); }
</style>
