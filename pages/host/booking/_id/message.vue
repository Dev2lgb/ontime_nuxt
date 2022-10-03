<template>
  <div class="f_width">
    <HostSubHeader />
    <div class="host_head pa-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약관련하여<br>메세지를 확인해 주세요.</p>
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
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservation_items"
        item-text="title"
        item-value="id"
      ></v-select>
    </div>

    <div class="pa-5">
      <h3>진행중인 메세지만 표시됩니다.</h3>
      <v-btn text color="blue" class="pa-0">메세지창 편집</v-btn>
    </div>
  </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedItem: '125',
    reservation_items: [
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '125' },
      { title: '[전시] 사찰예절 배움 템플스테이 해맞이', id: '126' },
      { title: '[교육] 사찰예절 배움 템플스테이 해맞이', id: '127' },
    ],
  }),
  methods: {

  },
}
</script>

<style scoped>
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
