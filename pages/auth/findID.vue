<template>
  <v-container class="mypageBg" fluid>
    <v-row class="justify-center content-center">
      <div class="vCardLoginBg">
        <v-col class="pa-0">
          <v-card flat>
            <NuxtLink to="/">
              <div class="loginLogo">
                <img src="~/assets/images/logo.png" alt="logo" />
              </div>
            </NuxtLink>
          </v-card>
          <v-card flat>
            <div class="loginTextB">
              <p class="firstTextTitle">아이디찾기 <img src="~/assets/images/padlock.png" alt="padlock" /></p>
              <p class="lastTextTitle">가입시 등록하신 이름을 입력해주세요.</p>
            </div>

            <v-card-text class="pa-0">
              <v-text-field  outlined  hide-details="auto" v-model="form.name" :error-messages="errors.name" class="inpBottom vinpuT" placeholder="가입하신 이름을 입력해주세요."></v-text-field>
              <v-select
                :items="callingCodeItems"
                v-model="form.mobile_country_calling_code"
                :error-messages="errors.mobile_country_calling_code"
                outlined hide-details="auto"
                item-text="text"
                item-value="value"
                class="inpBottom vinpuT"
                label="국가번호"
              ></v-select>
              <v-text-field  hide-details="auto" v-model="form.mobile" :error-messages="errors.mobile"  class="inpBottom vinpuT" outlined placeholder="핸드폰 번호를 입력해주세요."></v-text-field>
            </v-card-text>
            <v-btn color="primary" block large class="btn-size" @click="findIdSubmit">아이디 찾기</v-btn>

            <div v-show="hidedEmail" class="text-center pa-5">
              고객님의 아이디는 {{ hidedEmail }} 입니다.
            </div>
            <div class="settingBox2">
              <router-link to="/auth/login"><v-icon color="primary" class="iconMa3">mdi-chevron-left</v-icon>로그인 돌아가기</router-link>
            </div>
          </v-card>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'guest',
  async fetch() {
    this.loading = true;
    try {
      let url = 'auth/register';
      const response = await this.$axios.get(url,
        {
          headers: {
            "Accept-Language" : "ko"
          }
        });

      this.callingCodeItems = response.data.callingCodeItems;
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    form: {
      name: '',
      mobile_country_calling_code: '',
      mobile: '',
    },
    hidedEmail: '',
    errors:[],
    callingCodeItems: [],
  }),
  methods: {
    async findIdSubmit() {
      this.loading = true;
      try {
        let url = '/auth/forgot-id';
        let data = [];
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form,
          headers: {
            "Accept-Language" : "ko"
          }
        })
        if (response.data.result) {
          this.hidedEmail = response.data.data;
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
  },
}
</script>

<style scoped>
  .loginLogo {margin-bottom: 2rem;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;}
  .loginLogo img {height: 30px;}
  .absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
  ::v-deep .vinpuT .v-label {color: #969696;}
  ::v-deep .vinpuT .v-input__slot {padding: 0 18px!important;}
  ::v-deep .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {border: 1px solid #d4d3d5;}
  ::v-deep .fText .v-label {font-size: 14px;}
  .firstTextTitle {margin: 0px 0px 0.375rem;font-size: 1.25rem;line-height: 1.334;color: rgba(58, 53, 65, 0.87);font-weight: 600;}
  .lastTextTitle {font-weight: 400; font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.15px; color: rgba(58, 53, 65, 0.68);}
  .loginTextB {margin-bottom: 1.5rem;}
  .inpBottom {margin-bottom: 16px;}
  .settingBox2 {margin: 28px 0; text-align: center; font-size: 14px; color: rgba(58, 53, 65, 0.68);}
  .settingBox2 a {text-decoration: none;}
  .firstTextTitle img {height: 28px;}
  .btn-size {margin-bottom: 5px;}

@media (min-width: 600px){
  .vCardLoginBg {
      width: 448px;
  }

}
</style>
