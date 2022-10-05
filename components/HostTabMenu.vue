<template>
  <v-tabs class="sub_nav" height="50" slider-color="#fff" color="#fff" dark>
    <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/dashboard'">대시보드</v-tab>
    <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/members'">예약현황</v-tab>
    <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/message'">메시지</v-tab>
    <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/statistics'">통계</v-tab>
    <v-tab :link="true" :to="'/host/booking/' + this.$route.params.id + '/items/'">예약상품</v-tab>
  </v-tabs>
</template>

<script>
export default {
  data: () => ({
  }),
  methods: {

  },
}
</script>
