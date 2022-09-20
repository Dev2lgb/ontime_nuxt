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
      <v-select outlined hide-details="auto" dense v-model="selectedItem" :items="reservation_items"
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
      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
          to="/host/reservation/second"
        >다음 단계로 이동</v-btn>
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
    handleFileImport() { //파일업로드 버튼
      let fileUpload = document.getElementById('ImageFileUpload')
      if (fileUpload != null) {
        fileUpload.click()
      }
    },
    vistaPrevia(file) {
      if (this.images.length > 10) {
        alert('이미지는 최대 10장까지만 등록 가능합니다.');
        return false;
      }
      try{
        this.images.forEach(element => {
          this.urls.push({'src':URL.createObjectURL(element)})
          // this.createImage(element);
        });
      } catch(e) {}
    },
    deleteFile(index) {
      this.urls.splice(dashboard, 1)
      this.images.splice(dashboard, 1)
    },
  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }

</style>
