<template>
  <div class="f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          exact
          to="/host/reservation/second"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>새 예약 만들기 (3/4)</h3>
    </div>
    <div class="px-5">
      <template>
        <v-progress-linear value="75"></v-progress-linear>
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
        <p class="font-weight-bold ma-0 mb-5">예약 승인 유형을 선택해주세요.</p>
        <div>
          <v-btn-toggle
            v-model="selectedApprove"
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
              <span class="font-weight-bold mr-3">자동</span>
              예약 신청과 동시에 예약이 확정됩니다.
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              <span class="font-weight-bold mr-3">수동</span>
              관리자의 승인 후 예약이 확정됩니다.
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">공개 여부를 선택해주세요.</p>
        <div>
          <v-btn-toggle
            v-model="selectedOpen"
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
              <span class="font-weight-bold mr-3">전체공개</span>
              온타임의 모든 접속자가 이 예약에 신청할 수 있어요.
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              <span class="font-weight-bold mr-3">부분공개</span>
              별도의 코드를 전달받은 예약자만 신청할 수 있어요.
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">예약 신청 가능한 기간이 따로 있나요?</p>
        <div class="mb-5">
          <v-btn-toggle
            v-model="selectedTerm"
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
                아니요, 없어요
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              네, 있어요
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="mb-1" v-show="selectedTerm == 'Y'">
          <p class="font_small_text mb-1">예약 신청 가능일자 선택</p>
          <div class="flex j_start a_center">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dates"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="dates"
                no-title
                locale="ko"
                range
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="menu = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </div>
        </div>
      </div>
      <div class="mb-7">
        <p class="font-weight-bold ma-0 mb-5">예약 신청 가능한 최소 시간이 따로 있나요?</p>
        <div class="mb-5">
          <v-btn-toggle
            v-model="selectedMinTime"
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
              아니요, 없어요
            </v-btn>
            <v-btn
              style="border:1px solid #ccc; border-radius:10px"
              class="ma-1"
              value="Y"
            >
              네, 있어요
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="mb-1" v-show="selectedMinTime == 'Y'">
          <v-select
            v-model="min_time" :items="minTimeItems" outlined
            item-text="text"
            item-value="value"
          ></v-select>
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
          to="/host/reservation/fourth"
        >다음 단계로 이동</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'host',
  data: () => ({
    selectedMinTime: 'N',
    selectedTerm: 'N',
    selectedOpen: 'N',
    selectedApprove: 'N',
    dates: [],
    menu: false,
    min_time: '1',
    minTimeItems: [
      {text: '예약시간 1시간 전', value: '1'},
      {text: '예약시간 2시간 전', value: '2'},
      {text: '예약시간 3시간 전', value: '3'},
      {text: '예약시간 4시간 전', value: '4'},
      {text: '예약시간 5시간 전', value: '5'},
    ],
  }),
  methods: {

  },
}
</script>

<style scoped>
.sns_logo { width:60px; }
.sns_input { width:calc(100% - 70px); }
</style>
