<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/home"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약리스트</h3>
    </div>
    <div class="pa-5">
      <h3>ONTIME에서 지금 바로 예약이 가능한 프로그램입니다.</h3>
    </div>
    <div class="px-5">
      <v-text-field prepend-inner-icon="mdi-magnify" placeholder="어떤 예약에 참여하고 싶으신가요?" outlined hide-details="auto"></v-text-field>
    </div>
    <div class="flex j_end a_center">
      <div class="t_width px-5">
        <v-select
          prepend-icon="mdi-filter-variant"
          v-model="searchCategory"
          :items="searchCategoryItems"
        ></v-select>
      </div>
    </div>
    <div class="mt-5 px-5 border_b">
      <p><span class="font-weight-bold">2개</span>의 프로그램</p>
    </div>
    <div class="flex j_space a_center pa-3 border_b">
      <div class="thumbnail_width">
        <v-img
          :src="`https://picsum.photos/500/300?image=10`"
          :lazy-src="`https://picsum.photos/10/6?image=10`"
          aspect-ratio="1"
          class="img_radius"
        ></v-img>
      </div>
      <div class="res_content_width ml-3">
        <div>
          <v-chip dark color="#0057FF" label x-small>Online</v-chip>
          <v-chip dark color="#000" label x-small>New</v-chip>
          <v-chip dark color="#000" label x-small>마감임박</v-chip>
        </div>
        <h3>[교육] 사찰예절 배움 템플스테이 해맞이...</h3>
        <p class="tag">#자연휴식형 #친환경 #힐링</p>
        <p class="desc">
          온전한 나만의 시간 + 간단한 티타임(선택가능) + 자유일정의 휴식형 프로그램을 경험하실 수 있습니 ...
        </p>
      </div>

      <div class="bookmark_width flex j_center a_center">
        <v-btn fab small depressed dark color="#ddd"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
      </div>
    </div>
    <div class="flex j_space a_center pa-3 border_b">
      <div class="thumbnail_width">
        <v-img
          :src="`https://picsum.photos/500/300?image=10`"
          :lazy-src="`https://picsum.photos/10/6?image=10`"
          aspect-ratio="1"
          class="img_radius"
        ></v-img>
      </div>
      <div class="res_content_width ml-3">
        <div>
          <v-chip dark color="#0057FF" label x-small>Online</v-chip>
          <v-chip dark color="#000" label x-small>New</v-chip>
          <v-chip dark color="#000" label x-small>마감임박</v-chip>
        </div>
        <h3>[교육] 사찰예절 배움 템플스테이 해맞이...</h3>
        <p class="tag">#자연휴식형 #친환경 #힐링</p>
        <p class="desc">
          온전한 나만의 시간 + 간단한 티타임(선택가능) + 자유일정의 휴식형 프로그램을 경험하실 수 있습니 ...
        </p>
      </div>

      <div class="bookmark_width flex j_center a_center">
        <v-btn fab small depressed dark color="#ddd"><v-icon>mdi-bookmark-outline</v-icon></v-btn>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  layout: 'user',
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
.bookmark_width { width:60px }
.img_radius { border-radius: 10px; }
</style>
