<template>
  <div>
    <SubHeader :link="'/bookings'" :title="'예약하기'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p>예약옵션을 선택해주세요.<br>해당 예약은 <span><span>1개의 옵션</span></span>만 선택 가능.</p>
      </div>

      <div class="">


         <div class="flex j_space a_center mt-10">
          <v-btn class="next_btn" x-large depressed dark block color="#28b487" :to="'/bookings/' + this.$route.params.id + '/options/second'">다음단계</v-btn>
        </div>
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

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span { color: #4487fa;}
.user_nik p span span {color: #28b487;}

.select_hide_option {margin-top: 30px;}
.user_num {margin-bottom: 14px;}
.user_num p {font-size: 14px; color: #ff5722;}

.next_btn {font-size: 15px;}
</style>
