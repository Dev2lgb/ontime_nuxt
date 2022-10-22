<template>
  <div class="f_width">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약관련하여<br>메세지를 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start">
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
