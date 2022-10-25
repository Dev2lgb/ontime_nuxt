<template>
  <div>
    <HostSubHeader :title="'예약만들기'" :link="'/host/home'"/>
    <div class="f_width user_padding">
      <div class="host_area layout_format">
        <div class="user_nik">
          <p><span>ON<span>TIME</span></span> 예약 프로그램 만들기<br>예약생성 진행중 (1/4)</p>
        </div>

        <div class="proceeding">
          <template>
            <v-progress-linear value="25"></v-progress-linear>
          </template>
          <div class="flex j_center a_center mt-1">
            <p class="q_width text-center font_small_text">기초설정</p>
            <p class="q_width text-center font_small_text">관리자 정보</p>
            <p class="q_width text-center font_small_text">확정방법</p>
            <p class="q_width text-center font_small_text">추가정보</p>
          </div>
        </div>
        <div class="">
          <div class="mb-7">
            <p class="font-weight-bold ma-0">국문과 별도로 영문 예약페이지가 필요하신 경우 아래 버튼을 클릭해주세요.</p>
            <div>
              <v-switch v-model="form.is_en" true-value="Y" false-value="N" :label="$t('_host_booking_form1.label1')" ></v-switch>
            </div>
          </div>

          <div class="titleform">
            <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>기본정보</span>
          </div>

          <div class="mb-7">
            <p class="font-weight-bold">1. 등록하시려는 예약의 상품명을 등록해주세요.</p>
            <div>
              <v-text-field v-model="form.title" :error-messages="errors.title" outlined :label="$t('_host_booking_form1.label2')" placeholder="대표 상품명을 입력해주세요." hide-details="auto"></v-text-field>
              <div class="sized_box_h"></div>
              <v-text-field v-model="form.title_en" :error-messages="errors.title_en" :class="classEnField()" outlined :label="$t('_host_booking_form1.label3')" hide-details="auto"></v-text-field>
              <p class="font_small_text mt-1">상품명은 예약을 희망하는 참가자들에게 보여집니다.</p>
            </div>
          </div>
          <div class="mb-7">
            <div class="font-weight-bold flex j_start a_center">
              <span>2. 예약 상품에 대한 간단한 소개를 입력해주세요.</span>
              <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
            </div>
            <div>
              <v-text-field v-model="form.content" :error-messages="errors.content" outlined label="예약 상품의 간단 소개를 입력하세요." hide-details="auto"></v-text-field>
              <div class="sized_box_h"></div>
              <v-text-field v-model="form.content_en" :error-messages="errors.content_en" :class="classEnField()" outlined label="예약 상품의 간단 소개를 입력하세요." hide-details="auto"></v-text-field>
              <p class="font_small_text mt-1">예약 프로그램을 다른 채널로 공유할 때 이미지와 함께 표시됩니다.</p>
            </div>
          </div>
          <div class="mb-7">
            <div class="font-weight-bold flex j_start a_center">
              <span>3. 예약 프로그램 해쉬태그를 입력해주세요.</span>
              <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
            </div>
            <div>
              <v-text-field
                placeholder="태그 입력 구분 최대 3개"
                outlined
                v-model="tagInput"
                @keydown.enter="updateTags"
                 hide-details="auto"
              ></v-text-field>
              <p class="font_small_text mt-1">등록하시려는 예약 상품을 더욱 돋보이게 할 수 있습니다!</p>
              <div>
                <v-chip close v-for="(tag, keyIndex) in form.tags"
                        :key="keyIndex"
                        color="success"
                        text-color="white"
                        @click:close="deleteTag(keyIndex)"
                        >
                  &nbsp; {{tag}}
                </v-chip>
              </div>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold flex j_start a_center">
              <span>4. 예약 상품의 대표이미지를 등록해주세요.</span>
            </p>
            <div class="flex j_center a_center border_a pa-3">
              <v-file-input
                v-model="images"
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
              <v-btn depressed @click="handleFileImport">+ 대표 이미지 첨부하기</v-btn>
            </div>
            <p class="font_small_text mt-1">3MB 이하로 5개까지 첨부가 가능합니다.</p>
            <div>
              <v-item-group
                v-model="selectedItem"
                color="primary"
                group
                outlined
                mandatory
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-item
                  v-slot="{ active, toggle, index }"
                  v-for="(f, i) in urls" :key="i"
                  width="70px"
                  height="70px"
                  style="height:auto; padding:0; border-radius:10px"
                  class="ma-1 icon_btn flex-column justify-center align-center"
                  :value="i"
                >
                  <div style="position:relative">
                    <v-btn icon class="deleteImageBtn" dark @click="deleteFile(i)">
                      <v-icon>mdi-close-circle</v-icon>
                    </v-btn>
                    <v-img
                      @click="toggle"
                      lazy-src="https://picsum.photos/id/11/10/6"
                      height="70"
                      width="70"
                      :src="f.src"
                    ></v-img>
                  </div>
                </v-item>
              </v-item-group>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold ma-0 mb-3">5. 등록하실 예약 상품의 카테고리를 선택해주세요.</p>
            <div class="border_a pa-3">
              <v-btn-toggle
                v-model="form.category_id"
                color="primary"
                group
                outlined
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                  v-for="(item, i) in categoryItems" :key="i"
                  style="border:1px solid #ccc; border-radius:10px"
                  class="ma-1"
                  :value="item.value"
                >

                  <span v-if="$i18n.locale === 'ko' || !$i18n.locale">
                    {{ item.text_ko }}
                  </span>
                  <span v-else>
                    {{ item.text_en }}
                  </span>
                </v-btn>
              </v-btn-toggle>
            </div>
            <p class="font_small_text mt-3 mb-3">찾으시는 카테고리가 없으신가요?</p>
            <div>
              <v-text-field outlined placeholder="카테고리 직접 입력" v-model="form.category_text" hide-details="auto"></v-text-field>
            </div>
          </div>
          <div class="mb-7">
            <p class="font-weight-bold ma-0 mb-3">6. 등록하실 예약 상품에 대해 자세히 소개해주세요.</p>
            <div>
              <v-textarea v-model="form.desc" :error-messages="errors.desc" outlined :label="$t('_host_booking_form1.label4')" hide-details="auto"></v-textarea>
              <div class="sized_box_h"></div>
              <v-textarea v-model="form.desc_en" :error-messages="errors.desc_en" :class="classEnField()" outlined :label="$t('_host_booking_form1.label5')" hide-details="auto"></v-textarea>
            </div>
          </div>
          <div class="mb-7">
            <div class="font-weight-bold ma-0 flex j_start a_center">
              <span>7. 등록하실 예약 상품의 온/오프라인 진행 여부를 선택해주세요.</span>
              <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
            </div>
            <div>
              <v-btn-toggle
                color="primary"
                v-model="form.on_off_line"
                group
                outlined
                mandatory
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                  style="border:1px solid #ccc; border-radius:10px"
                  class="ma-1"
                  value="OFFLINE"
                >
                  오프라인에서만 진행합니다.
                </v-btn>
                <v-btn
                  style="border:1px solid #ccc; border-radius:10px"
                  class="ma-1"
                  value="ONLINE"
                >
                  온라인에서 진행합니다.
                </v-btn>
              </v-btn-toggle>
            </div>
          </div>
          <div class="mb-7" v-show="form.on_off_line === 'OFFLINE'">
            <p class="font-weight-bold ma-0 mb-3 flex j_start a_center">
              8. 예약프로그램이 진행되는 오프라인 장소를 알려주세요.
            </p>
            <div>
              <GoogleMap :coordinate="form.coordinate" class="mb-6" @update-coordinate="form.coordinate = $event"/>
              <v-text-field placeholder="상세주소 입력"  v-model="form.address" :error-messages="errors.address" outlined></v-text-field>
              <v-text-field placeholder="영문 상세주소 입력"  v-model="form.address_en" :class="classEnField()" :error-messages="errors.address_en" outlined></v-text-field>
            </div>
          </div>
          <div class="mb-7" v-show="form.on_off_line === 'ONLINE'">
            <p class="font-weight-bold ma-0 mb-3 flex j_start a_center">
              온타임으로 예약을 접수 받고 난 후, 예약 프로그램이 진행되는 플랫폼은 어디인가요?
            </p>
            <div class="border_a pa-3">
              <v-btn-toggle
                v-model="form.online_id"
                :error-messages="errors.online_id"
                color="primary"
                group
                outlined
                dense
                class="d-flex flex-wrap justify-start align-center"
              >
                <v-btn
                  v-for="(item, i) in onlineItems" :key="i"
                  style="border:1px solid #ccc; border-radius:10px"
                  class="ma-1"
                  :value="item.value"
                >
                  {{ item.text }}
                </v-btn>
              </v-btn-toggle>
            </div>
            <p class="font_small_text mt-3 mb-3">찾으시는 플랫폼이 없으신가요?</p>
            <div>
              <v-text-field hide-details="auto" v-model="form.online_text" :error-messages="errors.online_text" outlined placeholder="플랫폼 직접 입력"></v-text-field>
            </div>
          </div>
          <div class="mb-7" v-show="form.on_off_line === 'ONLINE'">
            <div class="font-weight-bold ma-0 flex j_start a_center">
              <span>링크 입력</span>
            </div>
            <p class="font_small_text mt-1">접속주소 또는 회의링크를 입력해주세요.</p>
            <div>
              <v-text-field
                v-model="form.online_link"
                :error-messages="errors.online_link"
                hide-details="auto"
                placeholder="URL주소 입력"
                outlined
              ></v-text-field>
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
              @click="nextForm"
            >다음 단계로 이동</v-btn>
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
  async fetch() {

    this.loading = true;
    try {
      let url = 'host/bookings/init';
      const response = await this.$axios.get(url);

      this.callingCodeItems = response.data.callingCodeItems;
      this.categoryItems = response.data.categoryItems;
      this.onlineItems = response.data.onlineItems;
      this.timezoneItems = response.data.timezoneItems;

      this.setBeforeData();
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    onlineItems: [],
    categoryItems: [],
    form: {
      is_en: 'N',
      selectedMethod: 'offline', //예약방법
      tags: [],
      address: '',
      title_images: [],
    },
    tagInput: '',
    errors: [],
    images: [],
    urls: [],
    selectedItem: '',
  }),
  watch: {
    isEngBookForm(val) {
      if (val) {
        let enInput = document.getElementsByClassName('en_input');

      }
    },
  },
  methods: {
    handleFileImport() { //파일업로드 버튼
      let fileUpload = document.getElementById('ImageFileUpload')
      if (fileUpload != null) {
        fileUpload.click()
      }
    },
    vistaPrevia(file) {
      if (this.images.length > 5) {
        alert('이미지는 최대 10장까지만 등록 가능합니다.');
        return false;
      }
      try{
        this.images.forEach(element => {
          this.urls.push({'src':URL.createObjectURL(element)})
          this.uploadFile(element);
          // this.createImage(element);
        });
      } catch(e) {}
    },
    async uploadFile(element) {
      try{
        //1: 이미지 2: 안내파일
        let url = '/files/1';
        let method = 'post';

        let formData = new FormData();
        formData.append('file', element);

        const response = await this.$axios({
          url: url, method: method, data:formData
        })

        // this.urls.push(process.env.BASEURL + response.data.thumbnail);
        this.form.title_images.push({id : response.data.id });

      } catch(e) {
        console.log(e);
      }
    },
    deleteFile(index) {
      this.urls.splice(index, 1)
      this.images.splice(index, 1)
    },
    classEnField() {
      if(this.form.is_en === 'Y') {
        return 'show_field';
      } else {
        return 'en_field';
      }
    },
    updateTags() {
      this.form.tags.push(this.tagInput);
      this.$nextTick(() => {
          this.tagInput = "";
      });
    },
    deleteTag(index) {
      this.form.tags.splice(index, 1);
    },
    async nextForm() {
      this.loading = true;
      try {
        let url = '/host/bookings/1';
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.setBookingForm(JSON.stringify(this.form));
          // localStorage.setItem('bookingForm', JSON.stringify(this.form));
          this.$router.push('/host/booking/second');
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
    ...mapMutations("common",['setBookingForm']),
    setBeforeData() {
      if (this.$store.state.common.bookingForm) {
        this.form = JSON.parse(this.$store.state.common.bookingForm);
      }
      // if (localStorage.getItem('bookingForm')) {
      //   this.form = JSON.parse(localStorage.getItem('bookingForm'));
      // }
    }
  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
