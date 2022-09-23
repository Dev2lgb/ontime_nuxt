<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          to="/bookings"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약하기</h3>
    </div>

    <div class="pa-5">
      <div>
        <h3>예약옵션을 선택해주세요.</h3>
        <p class="mt-2">해당 예약은 1개의 상품만 선택할 수 있어요.</p>
      </div>

      <v-select
        outlined
        hide-details="auto"
        placeholder="예약 옵션 선택"
      ></v-select>

      <div class="flex j_space a_center mt-10">
        <v-btn depressed dark block color="#0057FF">다음단계</v-btn>
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
