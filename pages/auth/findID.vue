<template>
  <div class="findID f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/auth/login"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>아이디 찾기</h3>
    </div>
    <div class="pa-8">
      <div class="flex d_col j_center a_center">
        <v-text-field
          outlined
          placeholder="가입하신 이름을 입력해주세요."
          class="f_width mb-2"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          outlined
          placeholder="핸드폰 번호를 입력해주세요."
          class="f_width"
          hide-details="auto"
        ></v-text-field>
      </div>
      <div class="pt-10">
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
        >아이디 찾기</v-btn>
        <v-btn
          block
          depressed
          tile
          large
          outlined
          class="mt-5"
          color="#4455ff"
          to="/auth/findPassword"
        >비밀번호 찾기</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'guest',
  data: () => ({
  }),
}
</script>

<style scoped>
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
