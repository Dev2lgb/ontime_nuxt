<template>
  <div class="login f_width">
    <div class="flex j_end a_center pa-3 f_width">
      <div class="t_width">
        <v-select
          outlined
          dense
          v-model="selectedLang"
          hide-details="auto"
          :items="langItems"
        ></v-select>
      </div>
    </div>
    <div class="pa-3">
      <div class="flex j_center a_center pb-10">
        <h3>로그인</h3>
      </div>
      <div class="flex d_col j_center a_center">
        <v-text-field
          outlined
          v-model="form.email"
          placeholder="이메일을 입력해주세요."
          class="f_width mb-2"
          hide-details="auto"
        ></v-text-field>
        <v-text-field
          outlined
          type="password"
          v-model="form.password"
          placeholder="비밀번호를 입력해주세요."
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
          @click="login"
        >로그인</v-btn>
      </div>
      <div class="flex j_space a_center py-3">
        <router-link to="/auth/findID">아이디 &middot; 비밀번호 찾기</router-link>
        <router-link to="/auth/register">회원가입</router-link>
      </div>
      <div class="flex j_center a_center absolute_bottom py-4">
        <router-link to="">이용약관</router-link>
        <span class="mx-1">|</span>
        <router-link to="">개인정보처리방침</router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  layout: 'guest',
  data: () => ({
    form: {
      email: '',
      password: '',
    },
    selectedLang: 'Korean',
    langItems: ['Korean', 'english'],
  }),
  methods: {
    async login() {
      // this.loading = true;
      try {
        await this.$auth.loginWith('laravelSanctum', {
          data: {
            email: this.form.email,
            password : this.form.password,
          }
        })
      } catch (e) {
        console.log(e);
        // if (e.response.status == '422') {
        //   this.errors = e.response.data.errors;
        // }
        // if (e.response.status != '422') {
        //   console.log(e.response.data.message);
        //   // this.$toast.error(e.response.data.message);
        // }
      }
    },
  },
}
</script>

<style scoped>
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
