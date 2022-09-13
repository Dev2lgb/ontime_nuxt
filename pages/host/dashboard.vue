<template>
  <div class="host_dashboard flex full_height j_start a_center pa-5">
    <div>
      <h3>예약 관리자 페이지</h3>
      <v-btn
        block
        depressed
        tile
        large
        dark
        color="#4455ff"
        class="mt-5"
        to="/host/reservation"
      >+ 새로운 예약 만들기</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'host',
  data: () => ({
  }),
}
</script>

<style scoped>
</style>
