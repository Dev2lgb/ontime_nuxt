<template>
  <div class="sizedbox">
    <HostHeader />
    <div class="host_head pa-5">
      <div class="host_area layout_format">
        <div class="host_nik">
        <p><span>{{ $store.$auth.user.name }}</span> 님, 환영합니다.<br>예약 프로그램을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <p>예약이 필요 하신가요?</p>
          <NuxtLink to="/host/booking" class="create_a">
            <div class="create_btn">
              <p>+ 새로운 예약 만들기</p>
            </div>
           </NuxtLink>

        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start pa-5">

    <div class="host_area layout_format">
      <div class="progrma_area">
        <p><v-icon color="#111">mdi-calendar-text</v-icon> 내 예약목록</p>
        <p><span class="font-weight-bold">{{ items.length }}개</span> 예약접수 진행중</p>
      </div>

      <div class="progrma_list" v-if="items.length > 0">
          <div class="reservation_item" v-for="(item, index) in items" :key="item.index">
            <router-link :to="'/host/booking/' + item.id + '/dashboard'" class="non-deco">
            <div class="flex j_space a_center">
              <div>
                <v-chip dark color="#4487fa" label small>{{ item.on_off_line }}</v-chip>
                <v-chip dark color="#28b487" label small>{{ item.status_name.text_ko }}</v-chip>
              </div>
              <span class="view_icon">
                <v-icon>mdi-eye</v-icon>
                {{ item.views }}
              </span>
            </div>

            <div class="list-area flex j_space a_center">
              <div class="list_title">
                <p class="text-ellipsis">{{ item.title }}</p>
                <p class="color_main font_small_text tag_text">
                  <span class="mr-1" v-for="(tag, tagIndex) in item.tags" :key="tagIndex + 't'">{{ tag }}</span>
                </p>
              </div>
              <div class="list_btbt">
                <p>예약상품 ({{ item.options_count }})</p>
              </div>
            </div>

            <div class="flex j_space a_center mb-5 progrma_option">
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/deadline.png" height="30">
                <p class="font_small_text">예약확정 ({{ item.confirmed_number }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/deadline2.png" height="30">
                <p class="font_small_text">예약대기 ({{ item.unconfirmed_number }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/deadline3.png" height="30">
                <p class="font_small_text">예약취소 ({{ item.deleted_number }})</p>
              </div>
              <div class="q_width flex d_col j_center a_center py-3">
                <img src="~/assets/images/deadline4.png" height="30">
                <p class="font_small_text">저장 ({{ item.saved_number }})</p>
              </div>
            </div>
            </router-link>

        </div>
      </div>
      <div v-else class="text-center py-10 color_gray">등록된 예약이 없습니다.</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      let url = '/host/bookings';
      const response = await this.$axios.get(url);

      this.clearBookingForm();
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
  methods: {
    ...mapMutations("common",['clearBookingForm']),
  },
}
</script>

<style scoped>
.host_create>p {margin-bottom: 34px;}
.reservation_item {border-bottom: 1px solid #ebebeb; margin-bottom: 24px;}
.reservation_status_items > div { background-color:#ddd; width:calc(25% - 20px); border-radius: 10px}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.progrma_area p:first-child {font-weight: 700; font-size: 17px;}
.progrma_area p:last-child {color: #818181;}
.progrma_area p:last-child span {color: #111;}
.progrma_list {margin: 20px 0; position: relative;}
.view_icon {font-size: 14px; color: #818181;}
.list-area {display: flex; justify-content: space-between;}
.list_title p {font-size: 16px; font-weight: 700; margin: 10px 0 0}
.list_title p:nth-child(2) {margin: 4px 0; font-size: 15px;}
.list_title p:nth-child(3) {font-size: 14px; margin: 14px 0;}
.list_lettbox {padding-bottom: 20px;}
.progrma_option {background: #f5f5f5; border-radius: 10px; padding: 8px 0; margin-top: 10px;}
.progrma_option p {margin-top: 10px; margin-bottom: 0;}

.list_title { width:calc(100% - 70px); padding-right:5px; }
.list_btbt { width:80px; background: #ef911b; text-align:center; line-height:35px; color: #fff; border-radius: 4px; font-size: 12px; height: 35px; }
.list_btbt:hover {background: #df871a;}

.text-ellipsis { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
</style>
