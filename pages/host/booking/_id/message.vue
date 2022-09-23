<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/host/home"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>예약관리</h3>
    </div>
    <div class="px-5">
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservation_items"
                item-text="title"
                item-value="id"
      ></v-select>
    </div>
    <div class="pa-5">
      <v-tabs>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/dashboard'">대시보드</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/members'">예약현황</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/message'">메시지</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/statistics'">통계</v-tab>
        <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/items/'">예약상품</v-tab>
      </v-tabs>
    </div>
    <div class="pa-5">
      <h3>진행중인 메세지만 표시됩니다.</h3>
      <v-btn text color="blue" class="pa-0">메세지창 편집</v-btn>
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

</style>
