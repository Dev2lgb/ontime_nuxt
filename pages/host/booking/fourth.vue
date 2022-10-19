<template>
  <div>
    <HostSubHeader :title="'예약만들기'" />
    <div class="f_width user_padding">
      <div class="host_area">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 만들기<br>예약생성 진행중 (4/4)</p>
        </div>

        <div class="proceeding">
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
        <div class="">
          <div class="titleform">
            <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>예약설정</span>
          </div>

          <div class="mb-7">
            <p class="font-weight-bold ma-0 mb-5">1. 리마인드 메일을 발송할까요?</p>
            <div>
              <v-btn-toggle
                v-model="form.is_send_remind_email"
                :error-messages="errors.is_send_remind_email"
                color="primary"
                group
                outlined
                mandatory
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                   large
                  class="input_pd"
                  value="Y"
                >
                  <span class="font-weight-bold">발송</span>
                </v-btn>
                <v-btn
                   large
                  class="input_pd"
                  value="N"
                >
                  <span class="font-weight-bold">발송 안함</span>
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold ma-0">2. 예약자로부터 수집할 정보를 선택해주세요. (선택)</p>
            <p class="font_small_text mt-1">이름, 성별, 이메일주소, 휴대폰연락는 기본으로 수집됩니다.</p>
            <div class="border_a pa-3">
              <v-btn-toggle
                v-model="form.collect_user_infos1"
                :error-messages="errors.collect_user_infos1"
                multiple
                color="primary"
                group
                outlined
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                  v-for="(item, i) in getInfoItems" :key="i"
                  style="border:1px solid #ccc;"
                  class="ma-1"
                  :value="item"
                >
                  {{ item.question }}
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold ma-0">3. 원하는 수집항목이 없다면, 질문을 추가 할 수 있습니다. (선택)</p>
            <p class="font_small_text mt-1">
              개인의 기밀 정보(예: 신용카드 정보 또는 주민등록번호 등)는 반드시 필요한 경우에 한해 요청하셔야 합니다.
              개인정보가 유출, 오용, 남용되는 경우 개인정보 보호법이 적용될 수 있으며, 이에 대한 법적 책임은 개인정보수집 및 처리자인 예약관리자에게 있습니다.
            </p>
            <div class="mb-5">
              <v-btn text block large @click="addQuestion">+ 질문추가</v-btn>

              <div v-for="(item, qindex) in form.collect_user_infos2" :key="qindex" v-show="form.collect_user_infos2.length > 0">
                <div v-if="item.division == 'solo'" class="mb-5">
                  <v-text-field v-model="item.question" hide-details="auto" placeholder="질문 직접 입력" outlined></v-text-field>
                </div>
                <div v-show="item.division == 'multiple'" class="mb-5">
                  <v-text-field v-model="item.question" hide-details="auto" placeholder="질문 제목" ></v-text-field>
                  <div class="mt-3">
                    <div v-for="(answer, aindex) in item.answer_items" :key="aindex" class="mb-3">
                      <v-text-field v-model="item.answer_items[aindex]" hide-details="auto" placeholder="항목 입력" outlined></v-text-field>
                    </div>
                    <v-btn text block large @click="addAnswer(qindex)">+ 항목추가</v-btn>
                  </div>
                  <v-switch v-model="item.is_multiple" label="항목 복수 선택 가능" true-value="Y" false-value="N"></v-switch>
                </div>
              </div>
              <v-dialog
                v-model="questionDialog"
                max-width="300"
              >
              <div class="back_white">
                <v-btn block large @click="addQuestionItem('solo')">단답형 질문</v-btn>
                <v-btn block large @click="addQuestionItem('multiple')">항목선택형 질문</v-btn>
              </div>
              </v-dialog>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold ma-0">4. 예약관련 안내사항 및 기타파일을 첨부해주세요. (선택)</p>
            <p class="font_small_text mt-1">총 30MB 이하로 5개까지 첨부가 가능합니다.</p>
            <div class="flex j_center a_center border_a pa-3">
              {{ form.info_files }}
              <v-file-input
                v-model="files"
                label="파일명"
                multiple
                id="ImageFileUpload"
                @change="vistaPrevia"
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
              x-large
              dark
              color="#1976d2"
              @click="submitForm"
            >새 예약 등록완료</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapMutations} from "vuex";

export default {
  layout: 'host',
  data: () => ({
    questionDialog: false,
    selectedMail: 'N',
    selectedInfos: [],
    form: {
      collect_user_infos2: [],
      info_files: []
    },
    errors:[],
    getInfoItems: [
      { division: 'solo', question: '영문 이름' },
      { division: 'solo', question: '영문 성' },
      { division: 'solo', question: '소속' },
      { division: 'solo', question: '직함' },
      { division: 'solo', question: '전화번호' },
      { division: 'solo', question: '주소' },
      { division: 'solo', question: '우편번호' },
      { division: 'solo', question: '주/도' },
    ],
    files: [],
    filesNames: [],
  }),
  mounted() {
    this.setBeforeData();
  },
  methods: {
    handleFileImport() { //파일업로드 버튼
      let fileUpload = document.getElementById('ImageFileUpload')
      if (fileUpload != null) {
        fileUpload.click()
      }
    },
    addQuestion(){
      this.questionDialog = true;
    },
    vistaPrevia(file) {
      if (this.files.length > 5) {
        alert('파일은 5개까지만 등록 가능합니다.');
        return false;
      }
      try{
        this.files.forEach(element => {
          console.log(element);
          this.filesNames.push({'name':element.name});
          this.uploadFile(element);
          // this.createImage(element);
        });
      } catch(e) {}
    },
    async uploadFile(element) {
      try{
        //1: 이미지 2: 안내파일
        let url = '/files/2';
        let method = 'post';

        let formData = new FormData();
        formData.append('file', element);

        const response = await this.$axios({
          url: url, method: method, data:formData
        })

        this.form.info_files = [];
        // this.urls.push(process.env.BASEURL + response.data.thumbnail);
        this.form.info_files.push({id : response.data.id });

      } catch(e) {
        console.log(e);
      }
    },
    deleteFile(index) {
      console.log(index);
      this.files.splice(index, 1);
      this.filesNames.splice(index, 1);
    },
    classEnField() {
      if(this.form.is_en == 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
    async submitForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/4';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.clearBookingForm();
          this.$toast.success('예약상품이 등록되었습니다.');
          this.$router.push('/host/home');
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          // console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    ...mapMutations("common",['setBookingForm', 'clearBookingForm']),
    setBeforeData() {
      if (this.$store.state.common.bookingForm) {
        this.form = _.merge({}, this.form, JSON.parse(this.$store.state.common.bookingForm));
      }
      // if (localStorage.getItem('bookingForm')) {
      //   this.form = _.merge({}, this.form, JSON.parse(localStorage.getItem('bookingForm')))
      // }
    },
    addQuestionItem(division) {
      this.form.collect_user_infos2.push({
        division: division,
        question: '',
        answer_items : [],
        is_multiple: 'N'
      })
      this.questionDialog = false;
    },
    addAnswer(index) {
      this.form.collect_user_infos2[index].answer_items.push('');
    }
  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
.input_pd {padding: 24px 16px!important; border: 1px solid #ddd!important;}
</style>
