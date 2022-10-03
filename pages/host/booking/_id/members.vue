<template>
  <div class="f_width">
    <HostSubHeader />
    <div class="host_head pa-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약내역<br>상세현황을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <p style="color:#5b7ade">예약관리 서비스</p>

          <v-tabs class="sub_nav" height="50" slider-color="#fff" color="#fff" dark>
            <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/dashboard'">대시보드</v-tab>
            <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/members'">예약현황</v-tab>
            <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/message'">메시지</v-tab>
            <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/statistics'">통계</v-tab>
            <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/items/'">예약상품</v-tab>
          </v-tabs>
          
        </div>
      </div>
    </div>

<div class="user_dashboard full_height j_start pa-5">
    <div class="select-box">
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservationItems"
                item-text="title"
                item-value="id"
      ></v-select>
    </div>

    <div class="pa-5">
      <div>
        <v-text-field prepend-inner-icon="mdi-magnify" outlined dense hide-details="auto" placeholder="예약자명/전화번호 검색"></v-text-field>
        <div class="flex j_space a_center my-3">
          <div class="h_width">
            <v-select hide-details="auto" dense outlined v-model="selectedSearchTermItem" :items="searchTermItems"></v-select>
          </div>
          <div class="h_width ml-3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="date"
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
                v-model="date"
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
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
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
          <v-btn outlined>전체</v-btn>
          <v-btn outlined>확정</v-btn>
          <v-btn outlined>대기</v-btn>
          <v-btn outlined>완료</v-btn>
          <v-btn outlined>취소</v-btn>
        </v-btn-toggle>
      </div>
      <div class="mt-5">
        <h3>예약자 (3명)</h3>
        <div class="flex j_space a_center py-3">
          <v-checkbox label="전체선택" dense hide-details="auto"></v-checkbox>
          <div>
            <v-btn small outlined>엑셀다운</v-btn>
            <v-btn small outlined>일괄승인</v-btn>
            <v-btn small outlined>공지발송</v-btn>
          </div>
        </div>
      </div>
      <div>
        <div class="rounded_item px-5 py-2 mb-4" v-for="memberItem in memberItems" :key="memberItem.id">
          <div>
            <v-checkbox value="memberItem.id" hide-details="auto"></v-checkbox>
          </div>
          <div class="flex j_start a_center">
            <span class="status_circle">{{ memberItem.status }}</span>
            <h3 class="ml-3">{{ memberItem.name }} <v-icon>mdi-message-text</v-icon></h3>
          </div>
          <div class="mt-5">
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">연락처</span>
              <p class="ma-0">{{ memberItem.phone }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">이메일</span>
              <p class="ma-0">{{ memberItem.email }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">출생연도</span>
              <p class="ma-0">{{ memberItem.birth }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">성별</span>
              <p class="ma-0">{{ memberItem.gender }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">국적</span>
              <p class="ma-0">{{ memberItem.nation }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">예약인원</span>
              <p class="ma-0">{{ memberItem.reservation_count }} 명</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">예약옵션</span>
              <div>
                <div v-for="option in memberItem.options" :key="option.id" class="mb-3">
                  <p class="mb-1">{{ option.name }}</p>
                  <v-chip small>{{ option.stime }}</v-chip>
                  <v-chip small>{{ option.etime }}</v-chip>
                </div>
              </div>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">신청시간</span>
              <p class="ma-0">{{ memberItem.time }}</p>
            </div>
            <div class="flex j_start a_start mb-1">
              <span class="sub_title">요청사항</span>
              <p class="ma-0">{{ memberItem.memo }}</p>
            </div>
            <div class="flex j_start a_start mt-3">
              <v-btn small depressed>예약취소</v-btn>
              <v-btn small depressed class="ml-3">이용완료</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    date: [],
    menu: false,
    selectedItem: '125',
    selectedSearchTermItem: '이번달',
    searchTermItems: [
      '이번달', '다음달', '지난달'
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
  methods: {

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
::v-deep .sub_nav .v-slide-group__wrapper {background: #173bb3;}
.select-box {padding: 0 20px;}
</style>
