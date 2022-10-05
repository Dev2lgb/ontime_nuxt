<template>
  <div>
    <div class="mb-7">
      <div class="border_a pa-3">
        <p class="font-weight-bold ma-0 mb-2">기간 선택형 예약</p>
        <p>
          관리자는 날짜나 시간단위의 최소-최대 기간을 설정하여 예약을 받아요.<br >
          예약자는 우너하는 상품의 시작 &middot; 종료 시점을 선택할 수 있어요.
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
        <v-select
          v-model="form.interval_minute"
          :items="timeUnitItems"
          item-text="text"
          item-value="value"
          outlined
          dense
          hide-details="auto"
          placeholder="단위 선택"
        ></v-select>
        <v-text-field v-show="form.interval_minute == '0'" v-model="form.interval_minute" type="number" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">시간 당 예약가능 수량(인원)을 입력해주세요.</p>
      <div>
        <v-select
          v-model="selectedQuantity"
          :items="QuantityItems"
          item-text="text"
          item-value="value"
          outlined
          dense
          hide-details="auto"
          placeholder="단위 선택"
        ></v-select>
        <v-text-field v-show="selectedQuantity == 'Y'" type="number" suffix="명" outlined hide-details="auto" dense class="mt-3"></v-text-field>
      </div>
    </div>
    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">예약가능한 최소-최대 시간을 설정해주세요.</p>
      <div>
        <v-select
          v-model="selectedMaxMinTime"
          :items="MaxMinTimeItems"
          item-text="text"
          item-value="value"
          outlined
          dense
          hide-details="auto"
          placeholder="최소/최대 시간 선택"
        ></v-select>
        <div class="flex j_space a_center" v-show="selectedMaxMinTime == 'Y'">
          <div class="h_width">
            <v-text-field type="number" prefix="최소" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
          </div>
          <div class="h_width ml-2">
            <v-text-field type="number" prefix="최대" suffix="분" outlined hide-details="auto" dense class="mt-3"></v-text-field>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-7">
      <p class="font-weight-bold ma-0 mb-3">하나의 계정으로 최대 몇 명을 예약할 수 있나요?</p>
      <div>
        <v-select
          v-model="selectedMaxMinMan"
          :items="MaxMinManItems"
          item-text="text"
          item-value="value"
          outlined
          dense
          hide-details="auto"
          placeholder="예약인원설정 선택"
        ></v-select>
        <div class="flex j_space a_center mt-3" v-show="selectedMaxMinMan == '0'">
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
  </div>
</template>

<script>
export default {
  props: ['errors'],
  data: () => ({
    form: [],
  })
}
</script>
