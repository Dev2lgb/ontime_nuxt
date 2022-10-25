<template>
  <div>
    <Header />
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_form layout_format">
        <div class="user_nik">
          <p><span>홍길동</span> {{$t('_home.hello')}}<br>{{$t('_home.find_program')}}</p>
        </div>
        <div class="program_form">
          <ul>
            <li>예약검색</li>
            <li>I</li>
            <li><NuxtLink to="bookings">예약프로그램 보기</NuxtLink></li>
          </ul>
          <div class="progrma_search">
            <input type="text" class="search_input" placeholder="프로그램명을 검색 해주세요.">
            <input type="button" class="img_button" title="검색">
          </div>
        </div>
        <div class="area_line"></div>
        <div class="reservation_form">
          <div class="reservation_state">
            <div class="reservation_title">
              <ul>
                <li>진행중인 예약</li>
                <li>온타임에서 예약 진행중인 프로그램</li>
              </ul>
            </div>
            <div class="reservation_more">
              <NuxtLink to="/my-bookings">
                전체보기
              </NuxtLink>
            </div>
          </div>

          <div class="reservation_slid pb-10" v-if="items.length > 0">
            <BookingSlider :items="items" />
          </div>
          <div class="text-center pt-10 color_gray" v-else>
            진행중인 예약이 없습니다.
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
      let url = '/my/bookings';
      const response = await this.$axios.get(url);
      console.log(response);
      this.items = response.data.data;
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
  }),
}
</script>

<style scoped>
  .user_nik {margin: 60px 0 50px;}
  .user_nik p {font-size: 24px; font-weight: 500; letter-spacing: -1px;}
  .user_nik p span {font-weight: bold; color: #435689;}
  .program_form {margin: 10px 0;}
  .program_form ul {padding: 0; margin-bottom: 20px;}
  .program_form ul li {list-style: none; display: inline-block; font-size: 16px; margin-right: 10px; color: #888;}
  .program_form ul li:first-child {color: #435689; font-weight: 600;}
  .program_form ul li:last-child a {text-decoration: none; color: #888;}
  .progrma_search {position: relative;}
  .search_input {width: 100%; height: 60px; border: 2px solid #435689; border-radius: 10px; padding: 10px; /*background: url(/_nuxt/assets/images/search.png)no-repeat; box-sizing: border-box; background-position: right 24px center; background-size: 35px;*/}
  .search_input::placeholder {color: #ccc;}
  .search_input:focus-within {outline: #435689}
  .img_button {background: url(~/assets/images/search.png) center no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 27px; position: absolute; right: 26px; top: 10px;}
  .area_line {width: 100%; height: 14px; background: #f7f8fa; margin: 40px auto;}
  .reservation_state {display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 40px;}
  .reservation_title ul {padding: 0;}
  .reservation_title ul li {list-style: none;}
  .reservation_title ul li:first-child {font-size: 24px; font-weight: 700; margin-bottom: 4px;}
  .reservation_title ul li:last-child {font-size: 15px;}
  .reservation_more a {text-decoration: underline; color: #888;}

</style>
