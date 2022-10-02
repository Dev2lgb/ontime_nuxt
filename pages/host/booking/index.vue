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
      <h3>새 예약 만들기 (1/4)</h3>
    </div>
    <div class="px-5">
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
    <div class="pa-5">
      <div class="mb-7">
        <p class="font-weight-bold ma-0">국문과 별도로 영문 예약페이지가 필요하신 경우 아래 버튼을 클릭해주세요.</p>
        <div>
          <v-checkbox
          v-model="checkbox"
          label="영문 예약 페이지 추가"
          ></v-checkbox>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0">등록하시려는 예약의 상품명을 등록해주세요.</p>
        <p class="font_small_text mt-1">상품명은 예약을 희망하는 참가자들에게 보여집니다.</p>
        <div>
          <v-text-field
            placeholder="대표 상품명을 입력해주세요."
            outlined
          ></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <div class="font-weight-bold ma-0 flex j_start a_center">
          <span>예약 상품에 대한 간단한 소개를 입력해주세요.</span>
          <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
        </div>
        <p class="font_small_text mt-1">예약 프로그램을 다른 채널로 공유할 때 이미지와 함께 표시됩니다.</p>
        <div>
          <v-text-field
            placeholder="예약 시 궁금한점이 있으시다면 자유롭게 작성해주세요."
            outlined
          ></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <div class="font-weight-bold ma-0 flex j_start a_center">
          <span>예약 프로그램 해쉬태그를 입력해주세요.</span>
          <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
        </div>
        <p class="font_small_text mt-1">등록하시려는 예약 상품을 더욱 돋보이게 할 수 있습니다!</p>
        <div>
          <v-text-field
            placeholder="태그 입력 구분 최대 3개"
            outlined
          ></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 flex j_start a_center">
          <span>예약 상품의 대표이미지를 등록해주세요.</span>
        </p>
        <p class="font_small_text mt-1">3MB 이하로 5개까지 첨부가 가능합니다.</p>
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
        <p class="font-weight-bold ma-0 mb-3">등록하실 예약 상품의 카테고리를 선택해주세요.</p>
        <div class="border_a pa-3">
          <v-btn-toggle
            v-model="selectedItem"
            multiple
            color="primary"
            group
            outlined
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              v-for="(item, i) in keywordItems" :key="i"
              width="calc(25% - 8px)"
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              :value="item.text"
            >
              {{ item.text }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <p class="font_small_text mt-3 mb-3">찾으시는 카테고리가 없으신가요?</p>
        <div>
          <v-text-field outlined placeholder="카테고리 직접 입력"></v-text-field>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-3">등록하실 예약 상품에 대해 자세히 소개해주세요.</p>
        <div>
          <v-textarea class="f_width" outlined placeholder="이곳에 행사 정보를 입력하세요."></v-textarea>
        </div>
      </div>
      <div class="mb-7">
        <div class="font-weight-bold ma-0 flex j_start a_center">
          <span>등록하실 예약 상품의 온/오프라인 진행 여부를 선택해주세요.</span>
          <v-btn fab text small><v-icon>mdi-information</v-icon></v-btn>
        </div>
        <div>
          <v-btn-toggle
            color="primary"
            v-model="selectedMethod"
            group
            outlined
            mandatory
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="offline"
            >
              오프라인에서만 진행합니다.
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="online"
            >
              온라인에서 진행합니다.
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7" v-show="selectedMethod == 'offline'">
        <p class="font-weight-bold ma-0 mb-3 flex j_start a_center">
          예약프로그램이 진행되는 오프라인 장소를 알려주세요.
        </p>
        <div>
          <GoogleMap :coordinate="coordinate" class="mb-6" @update-coordinate="coordinate = $event"/>
          <v-text-field placeholder="상세주소 입력"  v-model="address" :error-messages="errors.address" outlined></v-text-field>
        </div>
      </div>
      <div class="mb-7" v-show="selectedMethod == 'online'">
        <p class="font-weight-bold ma-0 mb-3 flex j_start a_center">
          온타임으로 예약을 접수 받고 난 후, 예약 프로그램이 진행되는 플랫폼은 어디인가요?
        </p>
        <div class="border_a pa-3">
          <v-btn-toggle
            v-model="selectedOnlinePlatform"
            multiple
            color="primary"
            group
            outlined
            dense
            class="d-flex flex-wrap justify-start align-center"
          >
            <v-btn
              v-for="(item, i) in plaformItems" :key="i"
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              :value="item.text"
            >
              {{ item.text }}
            </v-btn>
          </v-btn-toggle>
        </div>
        <p class="font_small_text mt-3 mb-3">찾으시는 플랫폼이 없으신가요?</p>
        <div>
          <v-text-field hide-details="auto" outlined placeholder="카테고리 직접 입력"></v-text-field>
        </div>
      </div>
      <div class="mb-7" v-show="selectedMethod == 'online'">
        <div class="font-weight-bold ma-0 flex j_start a_center">
          <span>링크 입력</span>
        </div>
        <p class="font_small_text mt-1">접속주소 또는 회의링크를 입력해주세요.</p>
        <div>
          <v-text-field
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
          large
          dark
          color="#4455ff"
          to="/host/booking/second"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedMethod: 'offline', //예약방법
    errors: [],
    images: [],
    urls: [],
    address: '',
    selectedOnlinePlatform: [],
    plaformItems: [
      { text: '카카오톡', icon:'' },
      { text: '전화', icon:'' },
      { text: 'Skype', icon:'' },
      { text: 'ZOOM', icon:'' },
      { text: 'Google hangout', icon:'' },
    ],
    keywordItems: [
      { text: '운영 요원 모집' },
      { text: '숙박 예약' },
      { text: '면접' },
      { text: '액티비티' },
      { text: '레스토랑 예약' },
    ]
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
      this.urls.splice(index, 1)
      this.images.splice(index, 1)
    },
  },
}
</script>

<style scoped>
.active_border { border:4px solid #ff0000; position:absolute; left:0; top:0; right:0; bottom:0; }
.deleteImageBtn { position:absolute; right:0px; top:0px; z-index: 9; }
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }

</style>
