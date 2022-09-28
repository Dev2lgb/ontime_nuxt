<template>
  <div class="user_dashboard full_height j_start pa-5">
    <div class="user_nik">
      <p><span>ON<span>TIME</span></span> 에서 지금 바로<br>예약이 가능한 프로그램입니다.</p>
    </div>

    <div class="progrma_search">
      <input type="text" class="search_input" placeholder="어떤 예약에 참여하고 싶으신가요?">
      <input type="button" class="img_button" title="검색">
    </div>

    <div class="progrma_area">
      <p><span class="font-weight-bold">2개</span>의 프로그램</p>
      <v-select
        class="select_reset"
        prepend-inner-icon="mdi-filter-variant"
        v-model="searchCategory"
        :items="searchCategoryItems"
        hide-details="auto"
        outlined
      ></v-select>
    </div>

    <div class="pa-3 border_b card_action">
      <div>
        <v-chip dark color="#0057FF" label small>Online</v-chip>
        <v-chip dark color="#000" label small>New</v-chip>
        <v-chip dark color="#000" label small>마감임박</v-chip>
      </div>
      <div class="flex j_space a_center">
        <div class="thumbnail_width">
          <v-img
            :src="`https://picsum.photos/500/300?image=10`"
            :lazy-src="`https://picsum.photos/10/6?image=10`"
            aspect-ratio="1"
            class="img_radius"
          ></v-img>
        </div>
        <router-link to="/bookings/13" class="non-deco card_subject">
          <h3 class="text_title">[교육] 사찰예절 배움 템플스테이 해맞이...</h3>
          <p class="color_main font_small_text tag_text">#자연휴식형 #친환경 #힐링</p>
          <p class="desc">
            온전한 나만의 시간 + 간단한 티타임(선택가능) + 자유일정의 휴식형 프로그램을 경험하실 수 있습니 ...
          </p>
        </router-link>
      </div>
      <div class="bookmark_width flex j_center a_center">
        <v-btn fab small depressed dark color="#ddd"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
      </div>
    </div>

    <!-- 카드반복 -->
      <div class="pa-3 border_b card_action">
        <div>
          <v-chip dark color="#0057FF" label small>Online</v-chip>
          <v-chip dark color="#000" label small>New</v-chip>
          <v-chip dark color="#000" label small>마감임박</v-chip>
        </div>
        <div class="flex j_space a_center">
          <div class="thumbnail_width">
            <v-img
              :src="`https://picsum.photos/500/300?image=10`"
              :lazy-src="`https://picsum.photos/10/6?image=10`"
              aspect-ratio="1"
              class="img_radius"
            ></v-img>
          </div>
          <router-link to="/bookings/13" class="non-deco card_subject">
            <h3 class="text_title">[교육] 사찰예절 배움 템플스테이 해맞이...</h3>
            <p class="color_main font_small_text tag_text">#자연휴식형 #친환경 #힐링</p>
            <p class="desc">
              온전한 나만의 시간 + 간단한 티타임(선택가능) + 자유일정의 휴식형 프로그램을 경험하실 수 있습니 ...
            </p>
          </router-link>
        </div>
        <div class="bookmark_width flex j_center a_center">
          <v-btn fab small depressed dark color="#ddd"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
        </div>
      </div>
    <!-- -->

  </div>
</template>
<script>
export default {
  layout: 'sub_common',
  data: () => ({
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

  },
}
</script>

<style scoped>
.thumbnail_width { width:150px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width {width:60px; position: absolute; right: 0; top: 7px;}
.img_radius { border-radius: 10px; }

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span {font-weight: 800; color: #28b487;}
.user_nik p span span {color: #4487fa;}
.progrma_search {position: relative;}
.search_input {width: 100%; height: 80px; border: 2px solid #435689; border-radius: 10px; padding: 20px; /*background: url(/_nuxt/assets/images/search.png)no-repeat; box-sizing: border-box; background-position: right 24px center; background-size: 35px;*/}
.search_input::placeholder {color: #ccc;}
.search_input:focus-within {outline: #435689}
.img_button {background: url(/_nuxt/assets/images/search.png)no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 35px; position: absolute; right: 26px; top: 22px;}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.select_reset {max-width: 160px;}

.card_action {position: relative;margin-top: 12px;}
.text_title {font-size: 17px; margin-top: 10px;}
.tag_text {margin: 5px 0;}
.desc {font-size: 14px;}
.card_subject {padding-left: 20px;}
</style>
