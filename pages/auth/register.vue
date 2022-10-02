<template>
  <v-container class="mypageBg" fluid>
    <v-row class="justify-center content-center">
      <div class="vCardLoginBg joinMargin">
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
              <p class="firstTextTitle">간편예약의 새로움, ONTIME</p>
              <p class="lastTextTitle">서비스 이용을 위해 회원가입을 진행해주세요</p>
            </div>
            <v-form>

              <v-card-text class="pa-0">
                  <div class="snsform">
                    <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>계정정보</span>
                  </div>

                <v-card elevation="0" class="pa-0 ma-0 d-flex">
                  <v-text-field label="이메일 (아이디)" outlined v-model="form.email" :error-messages="errors.email" hide-details="auto" class="inpBottom vinpuT"/>&emsp;
                  <v-btn large elevation="0" color="primary" @click="sendVerifyCode" height="56">인증요청</v-btn>
                </v-card>
                <v-card elevation="0" class="pa-0 ma-0 d-flex" v-if="isVerify">

                  <v-text-field label="인증번호" outlined v-model="form.code" :error-messages="errors.code"  hide-details="auto" class="inpBottom vinpuT"/>&emsp;
                  <v-btn large elevation="0" color="primary" height="56" @click="verifyCode" v-if="!isVerifyCode">인증확인</v-btn>
                  <v-btn large elevation="0" color="#ddd" height="56" v-else>인증완료</v-btn>
                </v-card>
                <v-text-field  label="비밀번호" outlined class="vinpuT"
                              autocomplete="new-password" v-model="form.password" :error-messages="errors.password"  persistent-hint hint="비밀번호는 8자리이상 영문,숫자, 특수문자의 조합으로 입력해주세요."
                              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'"  @click:append="show1 = !show1"
                              />
                <v-text-field class="vinpuT"
                              label="비밀번호 확인"  outlined autocomplete="new-password"
                              v-model="form.password_confirmation"
                              :error-messages="errors.password_confirmation"
                              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'" :type="show2 ? 'text' : 'password'"  @click:append="show2 = !show2"
                              />
              </v-card-text>

              <v-card-text class="pa-0">
                <div class="snsform">
                  <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>회원정보</span>
                </div>
                <v-text-field prepend-inner-icon="mdi-account" v-model="form.name" :error-messages="errors.name" label="이름" outlined hide-details="auto" class="inpBottom vinpuT"/>
                <div class="flex j_space a_center">
                  <div style="width:35%">
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
                  </div>
                  <div style="width:65%;" class="ml-2">
                    <v-text-field prepend-inner-icon="mdi-phone" v-model="form.mobile" :error-messages="errors.mobile" label="연락처" outlined hide-details="auto" class="inpBottom vinpuT"/>
                  </div>
                </div>
                <v-text-field prepend-inner-icon="mdi-account-settings" v-model="form.birthday_year" :error-messages="errors.birthday_year" label="출생연도 4자리" outlined hide-details="auto" class="inpBottom vinpuT"/>

                <div class="flex j_space a_center ㅡ">
                  <p class="ma-0">성별</p>
                  <v-radio-group
                    v-model="form.sex_id"
                    :error-messages="errors.sex_id"
                    row
                  >
                    <v-radio
                      v-for="item in sexItems"
                      :key="item.value"
                      :label="item.text_ko"
                      :value="item.value"
                      class="mr-5"
                    ><v-btn>{{ item.text_ko }}</v-btn></v-radio>

                  </v-radio-group>
                </div>
                <v-select
                  prepend-inner-icon="mdi-earth"
                  class="inpBottom vinpuT"
                  label="국적선택"
                  outlined
                  v-model="form.country"
                  :error-messages="errors.country"
                  hide-details="auto"
                  :items="countryItems"
                ></v-select>


                <v-select
                  prepend-inner-icon="mdi-alarm-check"
                  class="inpBottom vinpuT"
                  label="시간대선택"
                  v-model="form.timezone"
                  :error-messages="errors.timezone"
                  outlined
                  :items="timezoneItems"
                ></v-select>
              </v-card-text>

              <v-card-text class="pa-0">
                  <div class="snsform">
                    <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>약관정보</span>
                  </div>
                  <div class="checBox">
                    <v-checkbox append-icon="mdi-magnify" v-model="form.is_agree_terms" label="(필수) 이용약관 동의" hide-details />
                    <v-checkbox append-icon="mdi-magnify" v-model="form.is_agree_privacy" required label="(필수) 개인정보 취급방침 동의" hide-details />
                  </div>
              </v-card-text>

              <v-card-actions class="pa-0 btnButton">
                <v-btn @click="registerSubmit" color="primary" block x-large>회원가입</v-btn>
              </v-card-actions>
              <div class="settingBox2">
                <span>이미 계정이 있으신가요?</span>&emsp;<router-link to="/auth/login">로그인하기</router-link>
              </div>

            </v-form>
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
      this.countryItems = response.data.countryItems;
      this.sexItems = response.data.sexItems;
      this.timezoneItems = response.data.timezoneItems;
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        console.log(e);
        //this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    loading: false,
    isVerify: false,
    isVerifyCode: false,
    selectedLang: 'Korean',
    langItems: ['Korean', 'english'],
    callingCodeItems: [],
    countryItems: [],
    sexItems: [],
    timezoneItems: [],
    show1: false,
    show2: false,
    form: {
      email:'',
      name: '',
      password: '',
      password_confirmation: '',
      mobile_country_calling_code: '',
      mobile: '',
      timezone: '',
      code: '',
      is_agree_terms: false,
      is_agree_privacy: false,
      birthday_year: '',
      sex_id: '24',
      country: '',
    },
    errors: [],
  }),
  methods: {
    async sendVerifyCode() {
      this.loading = true;
      try {
        let url = '/auth/verify-code';
        const response = await this.$axios.post(url, {email : this.form.email},
          {
            headers: {
              "Accept-Language" : "ko"
            }
          });
        if (response.data.result) {
          this.$toast.success('인증코드 메일이 발송되었습니다.');
          this.isVerify = true;
        }

        if (!response.data.result) {
          this.$toast.error(response.data.message);
        }
        this.loading = false;
      } catch (e) {
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
          this.$toast.error(e.response.data.message);
        }
        if (e.response.status == '401') {
          this.$toast.error(e.response.data.message);
        }
      }
    },
    async verifyCode() {
      this.loading = true;
      try {
        let url = '/auth/verify';
        const response = await this.$axios.post(url, {email : this.form.email, code: this.form.code},
        {
          headers: {
            "Accept-Language" : "ko"
          }
        });
        if (response.data.result) {
          this.$toast.success('인증이 완료되었습니다.');
          this.isVerifyCode = true;
        }

        if (!response.data.result) {
          this.$toast.error(response.data.message);
        }

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
    async registerSubmit() {
      this.loading = true;
      try {
        let url = '/auth/register';
        let data = [];
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.$toast.success('회원가입이 완료됐습니다.');
          this.$router.push('/auth/login');
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
  .absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
  .loginLogo {margin-bottom: 2rem;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;}
  .loginLogo img {height: 30px;}
  .loginTextB {margin-bottom: 1.5rem; text-align: center;}
  .firstTextTitle {margin: 0px 0px 0.375rem;font-size: 1.25rem;line-height: 1.334;color: rgba(58, 53, 65, 0.87);font-weight: 600;}
  .lastTextTitle {font-weight: 400; font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.15px; color: rgba(58, 53, 65, 0.68);}

  .inpBottom {margin-bottom: 16px!important;}
  .settingBox {font-size: 14px; margin-bottom: 28px; display: flex; -webkit-box-align: center; align-items: center; flex-wrap: wrap; -webkit-box-pack: justify; justify-content: space-between;}
  .settingBox2 {margin: 28px 0; text-align: center; font-size: 14px; color: rgba(58, 53, 65, 0.68);}
  .snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin: 14px 0; font-weight: bold;}
  .snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(1rem);}
  .snsform::before {position: relative; width: 1%;top: 50%; content: ""; transform: translateY(50%);}
  .snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
  .snsSetting {display: flex; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center;}
  .firstTextTitle img {height: 28px;}
  .snsform2 {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin-bottom: 14px;}
  .snsform2 span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(0.3rem);}
  .snsform2::before {position: relative; width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
  .snsform2::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
  .btnButton {margin-top: 40px;}
  .checBox {padding-left: 3px;}
  .joinMargin {margin: 0 0 20px;}
  .forwardingJoin {position: fixed; left: 0; right: 0; top: 0px; height: 70px; background: #1f8bca;border-bottom: 4px solid#6ab0d7;}
  .bottomFont {color: #fff; font-weight: 600; margin-right: 18px;}
  @media (min-width: 600px){
    .vCardLoginBg {
        width: 100%;
    }
  }
</style>
