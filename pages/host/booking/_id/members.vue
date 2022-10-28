<template>
  <div class="sizedbox">
    <Loading :loading="loading"/>
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area layout_format">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약내역<br>상세현황을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>

<div class="user_dashboard full_height j_start layout_format">
      <div class="pa-5">

        <div>
          <v-text-field prepend-inner-icon="mdi-magnify" v-model="search.keyword" outlined dense hide-details="auto" placeholder="예약자명/전화번호 검색" height="50"></v-text-field>
          <div class="flex j_space a_center my-3">
            <div class="t_width">
              <v-select  height="50" hide-details="auto" dense @change="dateTerm" outlined v-model="selectedSearchTermItem" :items="searchTermItems"></v-select>
            </div>
            <div class="f_width ml-3">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="search.dates"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    height="50"
                    v-model="dateRangeText"
                    prepend-inner-icon="mdi-calendar"
                    outlined
                    hide-details="auto"
                    dense
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="search.dates"
                  no-title
                  range
                  scrollable
                >
                  <v-spacer></v-spacer>
                  <v-btn
                    text
                    color="primary"
                    @click="menu = false"
                  >
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(search.dates)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </div>
            <v-btn @click="this.$fetch" class="ml-3" height="50" depressed color="#1976d2" dark>검색</v-btn>
          </div>
        </div>
        <div class="flex j_start a_center f_width">
          <v-btn-toggle
            v-model="toggle_one"
            mandatory
            group
            class="outlined_btn_group f_width flex j_space a_center"
            dense
            active-class="active"
          >
            <v-btn outlined @click="searchStatus('')">전체</v-btn>
            <v-btn outlined @click="searchStatus('confirmed')">확정</v-btn>
            <v-btn outlined @click="searchStatus('unconfirmed')">대기</v-btn>
            <v-btn outlined @click="searchStatus('completed')">완료</v-btn>
            <v-btn outlined @click="searchStatus('revoked')">취소</v-btn>
          </v-btn-toggle>
        </div>
        <div class="matching_option">
          <h3>예약자 ({{ bookedBookings.length }}명)</h3>
          <div class="flex j_space a_center py-3">
            <v-checkbox label="전체선택" dense hide-details="auto"></v-checkbox>
            <div>
              <v-btn small height="40" class="btnTcolor" outlined @click="excelDownLoad">엑셀다운</v-btn>
              <v-btn small height="40" class="btnTcolor" outlined @click="checkedApprove">일괄승인</v-btn>
              <v-btn small height="40" class="btnTcolor" outlined @click="sendNoticePop">공지발송</v-btn>
            </div>
          </div>
        </div>
        <div v-for="(booked, bindex) in bookedBookings" :key="bindex" class="mb-5">
          <div class="matching_list">
            <div class="list_group">
              <v-checkbox v-model="selectedIds" :value="booked.id" hide-details="auto" class="matching_inp"></v-checkbox>
              <div :class="'matching_state ' + getStatusColor(booked.status_name)">{{ booked.status_name }}</div>
              <p class="list_title">{{ booked.member.name }} <v-icon>mdi-message-text</v-icon></p>
            </div>
            <div class="btn_group mt-3">
              <v-btn small depressed dark color="#c54a41" @click="cancelBooked(booked.id)" v-show="booked.status_name != '취소'">예약취소</v-btn>&nbsp;
              <v-btn small depressed dark color="#4caf50" @click="confirmBooked(booked.id)" v-show="booked.status_name != '완료'">이용완료</v-btn>&nbsp;
            </div>
          </div>
          <div class="matching_hidden">
            <div class="hidden_title">
              <p>예약자 정보</p>
            </div>
            <div class="hidden_table">
              <table>
                <tr>
                  <th>신청일</th>
                  <td>{{ booked.created_at.substr(0, 10) }}</td>
                  <th>예약자명</th>
                  <td>{{ booked.member.name }}</td>
                </tr>
                <tr>
                  <th>연락처</th>
                  <td>{{ booked.member.ccc_mobile }}</td>
                  <th>이메일</th>
                  <td>{{ booked.member.email }}</td>
                </tr>
                <tr>
                  <th>국적</th>
                  <td>{{ booked.member.timezone }}</td>
                  <th>성별</th>
                  <td>{{ booked.member.sex_name }}</td>
                </tr>
                <tr>
                  <th>출생연도</th>
                  <td colspan="3">{{ booked.member.birthday_year }}</td>
<!--                  <th>예약인원</th>-->
<!--                  <td>{{ booked.personnel }}</td>-->
                </tr>
              </table>
            </div>
            <div class="hidden_title">
              <p>예약 옵션정보</p>
            </div>
            <div class="hidden_table">
              <table>
                <tr v-for="option in booked.items" :key="option.id">
                  <td>{{ option.option.title }}</td>
                  <td>
                    {{ option.booking_date }}
                    <span v-show="option.booking_time">{{ option.booking_time }}</span>
                  </td>
                  <td>{{ option.personnel }}명</td>
                </tr>
              </table>
            </div>

            <div class="hidden_title">
              <p>요청사항</p>
            </div>
            <div class="hidden_area">
              <textarea class="hidden_txtarea" readonly>{{ booked.memo }}</textarea>
            </div>

          </div>
        </div>
      </div>
  </div>
    <v-dialog
      v-model="isSendNoticePop"
      max-width="400"
    >
      <v-card class="dia_massage">
        <p class="dia_title">예약자에게 안내할 사항을 입력해주세요.</p>
        <v-card-subtitle class="mt-3">해당 예약과 관련이 없는 내용을 전송할 경우 별도의 공지없이 이용에 제한될 수 있습니다. (발신 이메일주소는  support@ontimewolrd.kr 입니다.)</v-card-subtitle>
        <v-card-text>
          <div>
            <p class="font-weight-bold">발송 형태</p>
            <div>
              <v-select
                v-model="push.type"
                :items="pushItems"
              >
              </v-select>
            </div>
          </div>
          <div>
            <v-textarea outlined class="mt-3" v-model="push.notice" placeholder="입력해주세요." hide-details="auto"></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submitPush" large elevation="0" color="#0099ff" dark width="100%">공지발송</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {DateTime} from "luxon";
DateTime.defaultZoneName = 'Asia/Seoul';

export default {
  layout: 'host',
  async fetch() {
    this.loading = true;

    try {
      if(this.$route.query.date) {
        this.search.dates = [];
        this.search.dates.push(this.$route.query.date);
        this.search.dates.push(this.$route.query.date);
      }
      let url = '/host/bookings/' + this.$route.params.id + '/booked?search=';
      url += JSON.stringify(this.search);

      const response = await this.$axios.get(url);
      this.bookedBookings = response.data.data;

      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    pushItems: [
      { text: '이메일', value: 'email' },
      { text: '푸시메시지', value: 'push' },
    ],
    push: {
      type: 'email',
      notice: '',
      booked_booking_ids: [24, 25]
    },
    loading: false,
    search: {
      keyword: '',
      dates: [],
      status: '',
    },
    selectedIds: [],
    isSendNoticePop: false,
    bookedBookings: [],
    isStatusOn: false,
    date: [],
    menu: false,
    selectedItem: '125',
    selectedSearchTermItem: '',
    searchTermItems: [
      {text: '전체', value: ''},
      {text: '이번달' , value: {type: 'last', start: {month: 0}}},
      {text: '지난달', value: {type: 'last', start: {month: 1}}},
      {text: '3개월', value: {type: 'this', start: {month: 3}}},
      {text: '6개월', value: {type: 'this', start: {month: 6}}},
    ],
    reservationItems: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
    memberItems: [
      {
        id:'12', status: '확정', name: '홍길동', phone:'010-1234-5678', email: 'test@test.com', birth:'1976', gender:'남성', nation:'Canada', reservation_count:'3',
        time: '2022-08-15 18:00',
        memo: '비가오면 못갈수도 있어요.',
        options: [
          { name: '템플 스테이 예절교육 집중 1', stime: '2022-08-20 16:00', etime: '2022-08-20 18:00'},
          { name: '템플 스테이 예절교육 집중 2', stime: '2022-08-20 16:00', etime: '2022-08-20 18:00'}
        ],
      },
      {
        id:'13', status: '확정', name: '홍길동', phone:'010-1234-5678', email: 'test@test.com', birth:'1976', gender:'남성', nation:'Canada', reservation_count:'3',
        time: '2022-08-15 18:00',
        memo: '비가오면 못갈수도 있어요.',
        options: [
          { name: '템플 스테이 예절교육 집중 1', stime: '2022-08-20 16:00', etime: '2022-08-20 18:00'},
          { name: '템플 스테이 예절교육 집중 2', stime: '2022-08-20 16:00', etime: '2022-08-20 18:00'}
        ],
      }
    ],
  }),
  computed: {
    dateRangeText () {
      return this.search.dates.join(' ~ ')
    },
  },
  methods: {
    async excelDownLoad() {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/booked/excel/24,25';
        const response = await this.$axios.get(url);
        this.excel = response.data.data;
        this.loading = false;
      } catch (e) {
        if (e.response.status == '401') {
          console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    async submitPush(){
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/booked/notice';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data: this.push
        })
        if (response.data.result) {
          this.$toast.success('메시지가 발송되었습니다.');
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
    searchStatus(status){
      this.search.status = status;
      this.$fetch();
    },
    async cancelBooked(id) {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/booked/' + id + '/revoke';
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('예약이 취소되었습니다.');
          this.$fetch();
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
    async confirmBooked(id) {
      this.loading = true;
      try {
        let url = '/host/bookings/' + this.$route.params.id + '/booked/' + id + '/complete';
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('예약 이용이 완료되었습니다.');
          this.$fetch();
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
    async checkedApprove() {
      this.loading = true;
      try {
        ///host/bookings/35/booked/confirm/24,25
        let url = '/host/bookings/' + this.$route.params.id + '/booked/confirm/';
        let ids = '';
        for(let i = 0; i < this.selectedIds.length; i++) {
          ids += this.selectedIds[i];
          if (i < this.selectedIds.length - 1) {
            ids += ',';
          }
        }
        url += ids;

        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('승인처리되었습니다.');
          this.$fetch();
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
    sendNoticePop() {
      this.isSendNoticePop = true;
    },
    dateTerm(searches) {
      this.search.dates = [];
      //console.log(searches);
      let now = DateTime.now();
      let startdate = '';
      let enddate = '';
      if (searches.type === 'this') {
        startdate = now.minus(searches.start).startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.toFormat('yyyy-MM-dd');
      }
      if (searches.type === 'last') {
        now = now.minus(searches.start);
        startdate = now.startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.endOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
      }
      if (startdate && enddate)  {
        this.search.dates = [startdate, enddate];
      }
    },
    leftPad(value) {
      if (value >= 10) {
        return value;
      }
      return `0${value}`;
    },
    toStringByFormatting(source, delimiter = '-') {
      const year = source.getFullYear();
      const month = this.leftPad(source.getMonth() + 1);
      const day = this.leftPad(source.getDate());

      return [year, month, day].join(delimiter);
    },
    getStatusColor(status) {
      if (status == '취소') { return 'cancel'; }
      if (status == '완료') { return 'complate'; }
    },
  },
}
</script>

<style scoped>
.sub_title { width:150px; }
.rounded_item { border:1px solid #ddd; border-radius:20px; }
.create_a {background: #4961e5; height: 60px; padding: 0 24px;}
::v-deep .search_box .v-select__selection{color: #fff;}
::v-deep .search_box .theme--light.v-icon{color: #fff;}
::v-deep .search_box .v-input__slot:before {border-style: unset!important;}
.progrma_option {background: #f5f5f5; border-radius: 10px; padding: 8px 0; margin-top: 25px;}
.progrma_option p {margin-top: 10px; margin-bottom: 0;}
.sub_nav {margin-top: -7px;}
::v-deep .sub_nav .v-slide-group__wrapper {background: #0087e1;}
.select-box {padding: 0 20px;}

.matching_option {margin: 20px 0; border-bottom: 2px solid #eee; padding-bottom: 5px;}
.btnTcolor {color: #838383;}
.dia_massage {padding: 25px 10px;}
.dia_title {font-size: 1.1rem; font-weight: 500; letter-spacing: 0.0125em; padding: 0 24px;}
</style>
