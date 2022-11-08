<template>
  <div class="sizedbox layout_format">
    <SubHeader :link="'/home'" :title="'예약완료'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <v-chip dark color="#03a9f4" label small>{{ booking.on_off_line }}</v-chip>
        <v-chip dark :color="getStatusColor(bookedBooking.status_name)" label small>{{ bookedBooking.status_name }}</v-chip>
        <p class="mt-3">[{{ getCategoryName(booking) }}] {{ booking.title }}</p>

      </div>
      <p class="ma-0">예약이 완료되었습니다.</p>
      <p class="ma-0 mb-3">예약 취소규정에 따라 취소 시 추후 불이익이 발생될 수 있습니다.</p>
      <div class="flex j_start a_center">
        <router-link to="/home">홈으로 이동</router-link>
        <v-btn outlined class="ml-3" @click="addGoogleCalendar">구글캘린더 연동</v-btn>
      </div>
      <div class="mt-5 border_t">
        <div v-for="(item, index) in items" :key="index" class="border_a mb-3 pa-5 position_rel">

          <p class="font-weight-bold ma-0">{{ item.option.title }} ({{ item.personnel }}명)</p>
          <p class="font_small_text ma-0 mb-1">{{ item.option.desc }}</p>
          <p class="color_main ma-0">
            {{ item.booking_date }}
            <span v-show="item.booking_time" class="ml-3">{{ item.booking_time }}</span>
          </p>
          <p class="ma-0 font_small_text mt-1">({{ item.option.timezone }})</p>
        </div>
      </div>

      <div v-show="booking.on_off_line == 'ONLINE'">
        <div class="flex j_space a_center">
          <div>
            {{ getOnlineName(booking) }}
          </div>
          <v-btn :href="booking.online_link" depressed target="_blank">회의참여</v-btn>
        </div>
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
        <div class="area_line"></div>
      </div>


      <div class="">
        <div class="mt-10">
          <v-btn class="next_btn" x-large depressed dark block color="#28b487" @click="openChatDialog(booking.id, booking.member_id)" outlined>문의하기</v-btn>
          <v-btn class="next_btn mt-3" x-large depressed dark block color="#28b487" @click="cancelConfirm">예약취소</v-btn>
          <chat-dialog ref="chatDialog" :is-button="false"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      let bookedId = this.$route.query.id;

      let url = '/my/bookings/' + bookedId;
      const response = await this.$axios.$get(url);

      this.bookedBooking = response.data.booked_booking;
      this.booking = response.data.booked_booking.booking;
      this.items = response.data.booked_booking.items;
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    booking: {},
    bookedBooking: {},
  }),
  methods: {
    addGoogleCalendar() {
      this.$axios.$post('/my/bookings/google-calendar', {bookedId: this.$route.query.id, redirect: this.$route.path})
        .then(data => {
          if (data.result) {
            if (data.data.authUrl) {
              window.location.href = data.data.authUrl
            }
            if (data.data.events) {
              this.$toast.success('구글 캘린더 연동이 완료되었습니다.');
            }
          }
        });
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
    },
    getOnlineName(item) {
      if (item.on_off_line == 'ONLINE') {
        if (item.online_text) {
          return item.online_text;
        }
        if (item.hasOwnProperty('online_name')){
          return item.online_name.name_ko;
        }
      }
    },
    openChatDialog(booking_id, host_id) {
      this.$refs.chatDialog.openDialog(booking_id, host_id);
    },
    getCategoryName(item) {
      // return item;
      if (item.category_id) {
        if (item.hasOwnProperty('category_name')) {
          if (item.category_name){
            return item.category_name.name_ko;
          }
        }
      } else {
        if (item.category_text) {
          return item.category_text;
        }
      }
    },
    cancelConfirm() {
      this.$confirm(
        {
          message: '예약을 취소시겠습니까? 예약취소후 복구는 불가능합니다.',
          button: {
            no: '닫기',
            yes: '예약취소'
          },
          /**
           * Callback Function
           * @param {Boolean} confirm
           */
          callback: confirm => {
            if (confirm) {
              this.cancelBooked();
            }
          }
        }
      )
    },
    async cancelBooked() {
      this.loading = true;
      try {
        let url = '/my/bookings/' + this.booking.id + '/booked/' + this.$route.params.id + '/revoke';
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('예약이 취소되었습니다.');
          this.$router.push('/my-bookings');
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

.user_nik {margin: 60px 0 50px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span { color: #4487fa;}
.user_nik p span span {color: #28b487;}

.select_hide_option {margin-top: 30px;}
.user_num {margin-bottom: 14px;}
.user_num p {font-size: 14px; color: #ff5722;}

.next_btn {font-size: 15px;}
.position_rel { position:relative; }
.ab_btn { position:absolute; top:10px; right:10px; }
</style>
