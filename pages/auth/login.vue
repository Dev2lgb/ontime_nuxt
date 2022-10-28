<template>
  <v-container class="mypageBg" fluid>
    <v-row class="justify-center content-center">
      <div class="vCardLoginBg">
        <v-col class="pa-0">
          <v-card flat v-if="!isMobile()">
            <NuxtLink to="/">
              <div class="loginLogo">
                <img src="~/assets/images/logo.png" alt="logo" />
              </div>
            </NuxtLink>
          </v-card>
          <v-card flat v-else>
            <div class="loginLogo">
              <img src="~/assets/images/logo.png" alt="logo" />
            </div>
          </v-card>

          <v-card flat>
            <div class="loginTextB">
              <p class="firstTextTitle">{{$t('_login.title')}}</p>
              <p class="lastTextTitle">{{$t('_login.desc')}}</p>
            </div>
            <v-card-text class="pa-0">
              <v-select outlined dense v-model="selectedLang" hide-details="auto" :items="langItems" class="language"
                item-text="text"
                item-value="value" @change="changeLocale"
              ></v-select>
              <v-text-field v-model="form.email" :error-messages="errors.email"  outlined label="E-Mail" hide-details="auto" class="inpBottom vinpuT" placeholder="이메일을 입력해주세요."></v-text-field>
              <v-text-field v-model="form.password" :error-messages="errors.password"  hide-details="auto" class="inpBottom vinpuT" outlined label="Password" placeholder="비밀번호를 입력해주세요." @keyup.enter="login" :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"  :type="show1 ? 'text' : 'password'"  @click:append="show1 = !show1" ></v-text-field>
            </v-card-text>
            <div class="settingBox">
              <router-link to="/auth/findID">{{$t('_login.forgot_id')}}</router-link>
              <router-link to="/auth/findPassword">{{$t('_login.forgot_password')}}</router-link>
            </div>
            <v-card-actions class="pa-0">
              <v-btn color="primary" block x-large @click="login">LOGIN</v-btn>
            </v-card-actions>
            <div class="settingBox2">
              <span>{{$t('_login.desc2')}}</span>&emsp;<router-link to="/auth/register">{{$t('_login.register')}}</router-link>
            </div>
          </v-card>
          <div class="snsform">
            <span>or</span>
          </div>
          <div class="snsSetting">
            <v-btn text small @click="policy = true">이용약관</v-btn>
            <span class="mx-1">&nbsp;I&nbsp;</span>
            <v-btn text small @click="privacy = true">개인정보처리방침</v-btn>
          </div>
          <v-dialog v-model="policy" max-width="320">
            <v-card class="py-10">
              <v-card-text>
                <Policy />
              </v-card-text>
            </v-card>
          </v-dialog>
          <v-dialog v-model="privacy" max-width="320">
            <v-card class="py-10">
              <v-card-text>
                <Privacy />
              </v-card-text>
            </v-card>
          </v-dialog>
        </v-col>
      </div>
    </v-row>
  </v-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  name: 'login',
  layout: 'guest',
  data: () => ({
    policy: false,
    privacy: false,
    show1: false,
    password: 'Password',
    form: {
      email: '',
      password: '',
    },
    errors: [],
    selectedLang: localStorage.getItem("locale") ?? 'ko',
    langItems: [
      { text:'Korean', value: 'ko' },
      { text:'English', value: 'en' },
    ],
  }),
  methods: {
    isMobile() {
      var user = navigator.userAgent;
      var is_mobile = false;
      if( user.indexOf("iPhone") > -1
        || user.indexOf("Android") > -1
        || user.indexOf("iPad") > -1
        || user.indexOf("iPod") > -1
      ) {
        is_mobile = true;
      }
      return is_mobile;
    },
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
        if (e.response.status == '422') {
          this.errors = e.response.data.errors;
        }
        this.$toast.error(e.response.data.message);
      }
    },
    changeLocale() {
      this.$i18n.locale = this.selectedLang;
      this.setLocale(this.selectedLang);
    },
    ...mapMutations("common",['setLocale']),
  },
}
</script>

<style scoped>
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
.language {margin-bottom: 10px; font-size: 12px;}
::v-deep .vinpuT .v-label {color: #969696;}
::v-deep .vinpuT .v-input__slot {padding: 0 18px!important;}
::v-deep .v-text-field fieldset, .v-text-field .v-input__control, .v-text-field .v-input__slot {border: 1px solid #d4d3d5;}
::v-deep .fText .v-label {font-size: 14px;}
.loginLogo {margin-bottom: 2rem;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;}
.loginLogo img {height: 30px;}
.firstTextTitle {margin: 0px 0px 0.375rem;font-size: 1.25rem;line-height: 1.334;color: rgba(58, 53, 65, 0.87);font-weight: 600;}
.lastTextTitle {font-weight: 400; font-size: 0.875rem; line-height: 1.5; letter-spacing: 0.15px; color: rgba(58, 53, 65, 0.68);}
.loginTextB {margin-bottom: 1.5rem; text-align: center;}
.inpBottom {margin-bottom: 16px;}
.settingBox {font-size: 14px; margin-bottom: 28px; display: flex; -webkit-box-align: center; align-items: center; flex-wrap: wrap; -webkit-box-pack: justify; justify-content: space-between;}
.settingBox2 {margin: 28px 0; text-align: center; font-size: 14px; color: rgba(58, 53, 65, 0.68);}
.snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin-bottom: 14px;}
.snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(0.3rem);}
.snsform::before {position: relative; width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.snsSetting {display: flex; -webkit-box-align: center; align-items: center; -webkit-box-pack: center; justify-content: center; color: #888;}
.firstTextTitle img {height: 28px;}
.snsSetting a {text-decoration: none; color: rgba(58, 53, 65, 0.87); font-size: 14px;}

@media (min-width: 600px){
  .vCardLoginBg {
      width: 448px;
  }

}
</style>
