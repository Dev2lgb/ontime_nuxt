<template>
  <div class="register f_width">
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
      <h3>회원가입</h3>
    </div>
    <div class="pa-8">
      <div class="flex j_start a_center">
        <v-text-field
          placeholder="이메일 (아이디)"
        ></v-text-field>
        <v-btn small tile depressed class="ml-5">인증요청</v-btn>
      </div>
      <div class="flex j_start a_center">
        <v-text-field
          placeholder="인증번호"
        ></v-text-field>
        <v-btn small tile depressed class="ml-5">인증확인</v-btn>
      </div>
      <div>
        <v-text-field
          placeholder="비밀번호 (8자리 이상)"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          placeholder="비밀번호 확인"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          placeholder="이름"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          placeholder="연락처"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          placeholder="출생연도 4자리"
        ></v-text-field>
      </div>
      <div class="flex j_space a_center border_b">
        <p class="ma-0">성별</p>
        <v-radio-group
          v-model="row"
          row
        >
          <v-radio
            label="남성"
            value="radio-1"
            class="mr-5"
          ></v-radio>
          <v-radio
            label="여성"
            value="radio-2"
          ></v-radio>
        </v-radio-group>
      </div>
      <div class="flex j_space a_center border_b">
        <p class="ma-0">국적</p>
        <div class="h_width">
          <v-select
            :items="['대한민국','미국']"
          ></v-select>
        </div>
      </div>
      <div class="flex j_space a_center border_b">
        <p class="ma-0">시간대</p>
        <div class="h_width">
          <v-select
            :items="['Asian/Soeul','USA']"
          ></v-select>
        </div>
      </div>
      <div class="py-10">
        <div class="flex j_space a_center">
          <v-checkbox label="이용약관 동의"></v-checkbox>
          <v-btn fab small text>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </div>
        <div class="flex j_space a_center">
          <v-checkbox label="개인정보처리방침 동의"></v-checkbox>
          <v-btn fab small text>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </div>
      </div>
      <div>
        <v-btn
          block
          depressed
          tile
          large
          dark
          color="#4455ff"
        >회원가입</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'guest',
  data: () => ({
    selectedLang: 'Korean',
    langItems: ['Korean', 'english'],
  }),
}
</script>

<style scoped>
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
