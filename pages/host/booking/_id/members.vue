<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약내역<br>상세현황을 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <p style="color:#5b7ade">예약관리 서비스</p>
          <HostTabMenu />
        </div>
      </div>
    </div>

<div class="user_dashboard full_height j_start">
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
      <div class="matching_option">
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

      <!-- 예약자 반복카드 -->
      <div class="matching_card" v-for="memberItem in memberItems" :key="memberItem.id">
        <div class="matching_list">
          <div class="list_group">
             <v-checkbox value="memberItem.id" hide-details="auto" class="matching_inp"></v-checkbox>
             <div class="matching_state">{{ memberItem.status }}</div>
             <p class="list_title">{{ memberItem.name }} 외{{ memberItem.reservation_count-1 }} 예약 <v-icon>mdi-message-text</v-icon></p>
          </div>
          <div class="btn_group">
            <v-btn small depressed dark color="#c54a41">예약취소</v-btn>&nbsp;
            <v-btn small depressed dark color="#4caf50">이용완료</v-btn>&nbsp;
            <v-btn small depressed dark color="#173bb3" @click="toggleOnOff">상세</v-btn>
          </div>
        </div>
        <div v-if="isStatusOn" class="matching_hidden">
          <div class="hidden_title">
            <p>예약자 정보</p>
          </div>
          <div class="hidden_table">
            <table>
              <tr>
                <th>신청일</th>
                <td>{{ memberItem.time }}</td>
                <th>예약자명</th>
                <td>{{ memberItem.name }}</td>
              </tr>
              <tr>
                <th>연락처</th>
                <td>{{ memberItem.phone }}</td>
                <th>이메일</th>
                <td>{{ memberItem.email }}</td>
              </tr>
              <tr>
                <th>예약인원</th>
                <td>{{ memberItem.reservation_count }}명</td>
                <th>국적</th>
                <td>{{ memberItem.nation }}</td>
              </tr>
              <tr>
                <th>출생연도</th>
                <td>{{ memberItem.birth }}</td>
                <th>성별</th>
                <td>{{ memberItem.gender }}</td>
              </tr>
            </table>
          </div>

          <div class="hidden_title">
            <p>예약 옵션정보</p>
          </div>
          <div class="hidden_table">
            <table>
              <tr v-for="option in memberItem.options" :key="option.id">
                <td>{{ option.name }}</td>
                <td>{{ option.stime }}</td>
                <td>{{ option.etime }}</td>
              </tr>
            </table>
          </div>

           <div class="hidden_title">
            <p>요청사항</p>
          </div>
          <div class="hidden_area">
            <textarea class="hidden_txtarea">{{ memberItem.memo }}</textarea>
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
    isStatusOn: false,
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
    toggleOnOff: function() {
    this.isStatusOn = !this.isStatusOn;
  }
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

.matching_option {margin: 20px 0; border-bottom: 2px solid #eee; padding-bottom: 5px;}
</style>
