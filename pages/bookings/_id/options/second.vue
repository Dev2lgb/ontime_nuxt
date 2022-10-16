<template>
  <div>
    <SubHeader :link="'/bookings'" :title="'예약하기'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p>[{{ booking.category_name }}] {{ booking.title }}</p>
      </div>
      <p class="ma-0">아라 예약정보를 다시한번 확인해주세요.</p>
      <p class="ma-0 mb-3">예약 취소규정에 따라 취소 시 추후 불이익이 발생될 수 있습니다.</p>

      <div>
        <div v-for="(item, index) in items" :key="index" class="border_a mb-3 pa-5 position_rel">
          <v-btn text class="ab_btn" fab><v-icon>mdi-pencil-box</v-icon>{{ item.id }}</v-btn>
          <p class="font-weight-bold ma-0">{{ item.title }}</p>
          <p class="font_small_text ma-0 mb-1">{{ item.desc }}</p>
          <p class="color_main ma-0">
            <v-chip class="mr-2" small v-for="(date, dateIndex) in item.date_times" :key="dateIndex">{{ date }}</v-chip>
          </p>
          <p class="ma-0 font_small_text mt-1">({{ item.timezone }})</p>
        </div>
        <v-btn block depressed text color="#5544aa" class="font-weight-bold" :to="'/bookings/' + this.$route.params.id + '/options'">+ 항목 추가</v-btn>
      </div>
      <div class="mt-10">
        <div v-for="(qItem, q) in booking.collect_user_infos1" :key="q + 'q'">
          <div v-show="qItem.division == 'solo'" class="mb-5">
            <v-text-field :label="qItem.question" outlined hide-details="auto" v-model="qItem.answer"></v-text-field>
          </div>
          <div v-show="qItem.division == 'multiple'" class="mb-5">
            <p>
              {{ qItem.question }}
              <span v-if="qItem.is_multiple == 'Y'">(복수선택 가능)</span>
            </p>
            <v-btn-toggle
              color="primary"
              v-model="qItem.answer"
              group
              outlined
              mandatory
              :multiple="qItem.is_multiple == 'Y'"
              dense
              class="d-flex flex-wrap justify-start align-center"
            >
              <v-btn
                style="border:1px solid #ccc; border-radius:10px"
                class="ma-1 text-left"
                v-for="(answer, a) in qItem.answer_items"
                :key="a + 'l'"
                :value="answer"
                block
              >
                {{ answer }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div v-for="(qItem2, q2) in booking.collect_user_infos2" :key="q2">
          <div v-show="qItem2.division == 'solo'" class="mb-5">
            <v-text-field :label="qItem2.question" outlined hide-details="auto" v-model="qItem2.answer"></v-text-field>
          </div>
          <div v-show="qItem2.division == 'multiple'" class="mb-5">
            <p>
              {{ qItem2.question }}
              <span v-if="qItem2.is_multiple == 'Y'">(복수선택 가능)</span>
            </p>
            <v-btn-toggle
              color="primary"
              group
              v-model="qItem2.answer"
              outlined
              :multiple="qItem2.is_multiple == 'Y'"
              dense
              class="d-flex flex-wrap justify-start align-center"
            >
              <v-btn
                style="border:1px solid #ccc; border-radius:10px"
                class="ma-1"
                v-for="(answer, a2) in qItem2.answer_items"
                :key="a2 + 'l'"
                :value="answer"
                block
              >
                {{ answer }}
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <h3 class="mb-3">요청하실 내용이 있다면 남겨주세요.</h3>
        <v-textarea v-model="form.memo" outlined></v-textarea>
      </div>
      <div class="">
         <div class="flex j_space a_center mt-10">
          <v-btn class="next_btn" x-large depressed dark block color="#28b487" @click="submitForm">예약완료</v-btn>
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
      let url = '/bookings/' + this.$route.params.id;
      const response = await this.$axios.get(url);
      this.booking = response.data.data.booking;

      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    searchCategory: '',
    form: {
      items: [],
      collect_user_infos1: [],
      collect_user_infos2: [],
    },
    booking: {
      collect_user_infos1: [],
      collect_user_infos2: [],
    },
    searchCategoryItems: [
      { text: '전체', value:'' },
      { text: '교육', value:'1' },
      { text: '관광', value:'2' },
      { text: '문화', value:'3' },
      { text: '패션', value:'4' },
      { text: '행사', value:'5' },
    ],
    items: [],
    errors: [],
  }),
  mounted() {
    this.setData();
  },
  methods: {
    setData() {
      if (this.$store.state.common.userBookingOptionForm) {
        this.items = JSON.parse(this.$store.state.common.userBookingOptionForm);
        for(let itemIndex = 0; itemIndex < this.items.length; itemIndex++) {
          this.form.items.push({
            id: this.items[itemIndex].id,
            type: this.items[itemIndex].type,
            personnel: this.items[itemIndex].personnel,
            date_times: this.items[itemIndex].date_times,
          });
        }
      }
      // if (localStorage.getItem('bookingOptionForm')) {
      //   this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingOptionForm')))
      // }
    },
    async submitForm() {
      this.loading = true;
      try {
        let url = '/bookings/' + this.$route.params.id;
        let method = 'post';

        for(let itemIndex = 0; itemIndex < this.booking.collect_user_infos1.length; itemIndex++) {
          this.form.collect_user_infos1.push({ question: this.booking.collect_user_infos1[itemIndex].question, answer: this.booking.collect_user_infos1[itemIndex].answer });
        }

        for(let itemIndex = 0; itemIndex < this.booking.collect_user_infos2.length; itemIndex++) {
          this.form.collect_user_infos2.push({ question: this.booking.collect_user_infos2[itemIndex].question, answer: this.booking.collect_user_infos2[itemIndex].answer });
        }

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.clearUserBookingOptionForm();
          this.$toast.success('예약 신청이 완료되었습니다.');
          this.$router.push('/home');
        } else {
          this.clearUserBookingOptionForm();
          this.$toast.error(response.data.message);
          this.$router.push('/home');
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
    ...mapMutations("common",['clearUserBookingOptionForm']),
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
