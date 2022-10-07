<template>
  <div>
    <div class="mb-7">
      <div class="border_a pa-3">
        <p class="font-weight-bold ma-0 mb-2">날짜 선택형 예약</p>
        <p>
          관리자는 시간 설정 없이 하루 단위로만 예약을 받아요.<br/>
          예약자는 원하는 상품의 날짜만 선택하면 돼요.
        </p>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">예약이 가능한 기간이 있나요?</p>
      <v-btn-toggle
        color="primary"
        v-model="form.is_available_term"
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
          상시 가능해요
        </v-btn>
        <v-btn
          style="border:1px solid #ccc; border-radius:10px"
          class="ma-1"
          value="Y"
        >
          설정된 날짜에서 가능해요
        </v-btn>
      </v-btn-toggle>

      <div class="flex j_center a_center mt-5" v-show="form.is_available_term == 'Y'">
        <v-menu
          v-model="available_start"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.available_start_date"
              label="예약 가능 시작일자"
              readonly
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.available_start_date"
            @input="available_start = false"
          ></v-date-picker>
        </v-menu>

        <v-menu
          v-model="available_end"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="auto"

        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="form.available_end_date"
              label="예약 종료 시작일자"
              readonly
              class="ml-3"
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="form.available_end_date"
            @input="available_end = false"
          ></v-date-picker>
        </v-menu>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">날짜 당 예약가능 수량(인원)을 입력해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.is_available_count"
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
            제한없어요
          </v-btn>
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="Y"
          >
            가능인원설정
          </v-btn>
        </v-btn-toggle>
        <v-text-field v-show="form.is_available_count == 'Y'" v-model="form.interval_minute" type="number" suffix="명" outlined hide-details="auto" class="mt-3"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">예약가능한 최소~최대 기간을 설정해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.min_max_term"
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
            제한없어요
          </v-btn>
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="Y"
          >
            직접입력
          </v-btn>
        </v-btn-toggle>
        <div v-show="form.min_max_term == 'Y'" class="flex j_center a_center mt-5">
            <v-text-field type="number" class="h_width"
                          v-model="form.min_booking_time_number"
                          outlined
                          hide-details="auto"
                          placeholder="최소 1일"></v-text-field>
            <v-text-field type="number" class="h_width ml-3"
                          v-model="form.max_booking_time_number"
                          outlined
                          hide-details="auto"
                          placeholder="최대 1일"></v-text-field>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">하나의 계정으로 최대 몇 명을 예약할 수 있나요?</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.max_booking_personnel_number"
          group
          outlined
          mandatory
          dense
          class="d-flex flex-wrap justify-start align-center"
        >
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="1"
          >
            한 계정당 한 명씩만 받을게요.
          </v-btn>
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="0"
          >
            한 계정으로 여려명 예약이 가능해요
          </v-btn>
        </v-btn-toggle>
        <div class="flex j_space a_center mt-3" v-show="form.max_booking_personnel_number == '0'">
          <div class="h_width">
            <v-select
              item-text="text"
              item-value="value"
              outlined
              dense
              hide-details="auto"
              v-model="selectedMaxMinOption"
              :items="MaxMinOptionItems"
            ></v-select>
          </div>
          <div class="h_width ml-2" v-show="selectedMaxMinOption == '0'">
            <v-text-field type="number" prefix="최대" suffix="명" outlined hide-details="auto" dense></v-text-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errors'],
  data: () => ({
    form: [],
    selectedMaxMinOption: '1',
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
    available_start: false,
    available_end: false,
  })
}
</script>
