<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          to="/host/booking/third"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 만들기 (4/4)</h3>
    </div>
    <div class="px-5">
      <template>
        <v-progress-linear value="100"></v-progress-linear>
      </template>
      <div class="flex j_center a_center mt-1">
        <p class="q_width text-center font_small_text">기초설정</p>
        <p class="q_width text-center font_small_text">관리자 정보</p>
        <p class="q_width text-center font_small_text">확정방법</p>
        <p class="q_width text-center font_small_text">추가정보</p>
      </div>
    </div>
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">리마인드 메일을 발송할까요?</p>
        <div>
          <v-btn-toggle
            v-model="selectedMail"
            color="primary"
            group
            outlined
            mandatory
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="N"
            >
              <span class="font-weight-bold">발송</span>
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              <span class="font-weight-bold">발송 안함</span>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0">예약자로부터 수집할 정보를 선택해주세요. (선택)</p>
        <p class="font_small_text mt-1">이름, 성별, 이메일주소, 휴대폰연락는 기본으로 수집됩니다.</p>
        <div class="border_a pa-3">
          <v-btn-toggle
            v-model="selectedInfos"
            multiple
            color="primary"
            group
            outlined
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              v-for="(item, i) in getInfoItems" :key="i"
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              :value="item.text"
            >
              {{ item.text }}
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0">원하는 수집항목이 없다면, 질문을 추가 할 수 있습니다. (선택)</p>
        <p class="font_small_text mt-1">
          개인의 기밀 정보(예: 신용카드 정보 또는 주민등록번호 등)는 반드시 필요한 경우에 한해 요청하셔야 합니다.
          개인정보가 유출, 오용, 남용되는 경우 개인정보 보호법이 적용될 수 있으며, 이에 대한 법적 책임은 개인정보수집 및 처리자인 예약관리자에게 있습니다.
        </p>
        <div class="mb-5">
          <v-text-field outlined hide-details="auto" class="mb-3" placeholder="질문 직접 입력" v-for="(item, i) in questionItems" :key="i"></v-text-field>
          <v-btn text block large @click="addQuestion">+ 질문추가</v-btn>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0">예약관련 안내사항 및 기타파일을 첨부해주세요. (선택)</p>
        <p class="font_small_text mt-1">총 30MB 이하로 5개까지 첨부가 가능합니다.</p>
        <div class="flex j_center a_center border_a pa-3">
          <v-file-input
            v-model="files"
            label="파일명"
            multiple
            id="ImageFileUpload"
            @change="vistaPrevia"
            accept="image/png, image/jpeg"
            prepend-icon=""
            append-icon=""
            class="hide_input"
          >
          </v-file-input>
          <v-btn depressed @click="handleFileImport">+ 파일 첨부하기</v-btn>
        </div>
        <div>
          <div v-for="(file, i) in filesNames" :key="i" class="pa-3">
            <v-icon>mdi-paperclip</v-icon>
            <span>{{ file.name }}</span>
            <v-btn fab small text @click="deleteFile(i)"><v-icon>mdi-close-circle</v-icon></v-btn>
          </div>
        </div>
      </div>
      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
          to="/host/booking/fourth"
        >새 예약 등록완료</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedMail: 'N',
    selectedInfos: [],
    questionItems: [
      {id: ''},
    ],
    getInfoItems: [
      { text: '영문 이름' },
      { text: '영문 성' },
      { text: '소속' },
      { text: '직함' },
      { text: '전화번호' },
      { text: '주소' },
      { text: '우편번호' },
      { text: '주/도' },
    ],
    files: [],
    filesNames: [],
  }),
  methods: {
    handleFileImport() { //파일업로드 버튼
      let fileUpload = document.getElementById('ImageFileUpload')
      if (fileUpload != null) {
        fileUpload.click()
      }
    },
    addQuestion(){
      this.questionItems.push(
        { id: '' }
      );
    },
    vistaPrevia(file) {
      try{
        this.files.forEach(element => {
          console.log(element);
          this.filesNames.push({'name':element.name})
          // this.createImage(element);
        });
      } catch(e) {}
    },
    deleteFile(index) {
      console.log(index);
      this.files.splice(index, 1);
      this.filesNames.splice(index, 1);
    },
  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
</style>
