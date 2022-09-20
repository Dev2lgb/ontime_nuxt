<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/host/dashboard"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약관리</h3>
    </div>
    <div class="px-5">
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservationItems"
                item-text="title"
                item-value="id"
      ></v-select>
    </div>
    <div class="pa-5">
      <v-tabs>
        <v-tab :link="true" to="/host/booking/125/dashboard">대시보드</v-tab>
        <v-tab :link="true" to="/host/booking/125/members">예약현황</v-tab>
        <v-tab :link="true" to="/host/booking/125/message">메시지</v-tab>
        <v-tab :link="true" to="/host/booking/125/statistics">통계</v-tab>
        <v-tab :link="true" to="/host/booking/125/items/">예약상품</v-tab>
      </v-tabs>
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
        <div class="rounded_item" v-for="memberItem in memberItems" :key="memberItem.id">

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
      { status: '확정', name: '홍길동', phone:'010-1234-5678', email: 'test@test.com' }
    ],
  }),
  methods: {

  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }

</style>
