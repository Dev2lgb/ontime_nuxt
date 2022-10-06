<template>
  <div>
    <div class="mb-7">
      <div class="border_a pa-3">
        <p class="font-weight-bold ma-0 mb-2">날짜&시간 선택형 예약</p>
        <p>
          관리자는 원하는 날짜를 시간 또는 분 단위로 나누어 예약을 받아요.<br/>
          예약자는 원하는 상품의 날짜와 시간을 선택할 수 있어요.
        </p>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">예약 시작과 종료시간을 알려주세요.</p>
      <div class="flex j_space a_center">
        <div class="h_width">
          <v-select v-model="form.start_time" :error-messages="errors.start_time" :items="timeItems" outlined dense hide-details="auto" placeholder="시작시간"></v-select>
        </div>
        <div class="h_width ml-3">
          <v-select v-model="form.end_time" :error-messages="errors.end_time" :items="timeItems" outlined dense hide-details="auto" placeholder="종료시간"></v-select>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">몇 시간 단위로 예약을 받으세요?</p>
      <div>
        <v-radio-group
          v-model="form.interval_minute"
          :error-messages="errors.interval_minute"
          row
        >
          <v-radio label="30분" value="30"></v-radio>
          <v-radio label="60분" value="60"></v-radio>
          <v-radio label="120분" value="120"></v-radio>
          <v-radio label="직접입력" value="0"></v-radio>
        </v-radio-group>
        <v-text-field v-show="form.interval_minute == '0'" v-model="form.interval_minute" type="number" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">예약가능한 최소-최대 선택 갯수 을 설정해주세요.</p>
      <div>
        <v-btn-toggle
          color="primary"
          v-model="form.booking_time_number"
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
            제한 없어요.
          </v-btn>
          <v-btn
            style="border:1px solid #ccc; border-radius:10px"
            class="ma-1"
            value="Y"
          >
            직접입력
          </v-btn>
        </v-btn-toggle>

        <div class="flex j_center a_center mt-3" v-show="form.booking_time_number == 'Y'">
          <v-select
            class="h_width"
            :items="time_number_items"
            v-model="form.min_booking_time_number"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="최소 1개 타임"
          ></v-select>

          <v-select
            class="h_width ml-3"
            :items="time_number_items"
            v-model="form.max_booking_time_number"
            item-text="text"
            item-value="value"
            outlined
            dense
            hide-details="auto"
            placeholder="최대 1개 타임"
          ></v-select>
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
          <div class="h_width ml-2" v-show="selectedMaxMinOption == 0">
            <v-text-field type="number" prefix="최대" suffix="명" outlined hide-details="auto" dense></v-text-field>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">시간 당 예약가능 수량(인원)을 입력해주세요.</p>
      <div>
        <v-radio-group
          v-model="form.interval_minute"
          :error-messages="errors.interval_minute"
          row
        >
          <v-radio label="30분" value="30"></v-radio>
          <v-radio label="60분" value="60"></v-radio>
          <v-radio label="120분" value="120"></v-radio>
          <v-radio label="직접입력" value="0"></v-radio>
        </v-radio-group>
        <v-text-field v-show="form.interval_minute == '0'" v-model="form.interval_minute" type="number" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['errors'],
  data: () => ({
    form: [],
    time_number_items: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
      { text: '4', value: '4' },
      { text: '5', value: '5' },
    ],
    selectedMaxMinOption: '',
    MaxMinOptionItems: [
      { text:'제한없음', value:'1' },
      { text:'최대인원설정', value:'0' },
    ],
  })
}
</script>
