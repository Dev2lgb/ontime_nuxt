<template>
  <div class="register f_width">
    <div class="flex j_start a_center">
      <div>
        <v-btn
          fab
          text
          to="/home"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </div>
      <h3>프로필 관리</h3>
    </div>

  <div class="host_area">
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p><span>ON<span>TIME</span></span> 에 등록된 프로필<br>수정이 필요하신가요?</p>
      </div>

      <div class="snsform">
        <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>회원정보</span>
      </div>

      <div class="form_size">
        <v-text-field
          placeholder="이름"
          label="이름"
          v-model="form.name"
          hide-details="auto"
          outlined
        ></v-text-field>
        <div class="sized_box_h"></div>
        <v-text-field
          v-model="form.mobile"
          placeholder="연락처"
          label="연락처"
          hide-details="auto"
          outlined
        ></v-text-field>
        <div class="sized_box_h"></div>
        <v-text-field
          v-model="form.birthday_year"
          label="생년월일"
          placeholder="출생연도 4자리"
          hide-details="auto"
          outlined
        ></v-text-field>


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
        <div class="sized_box_h"></div>

        <v-select
          prepend-inner-icon="mdi-alarm-check"
          class="inpBottom vinpuT"
          label="시간대선택"
          v-model="form.timezone"
          :error-messages="errors.timezone"
          outlined
          :items="timezoneItems"
        ></v-select>

      </div>

      <div class="snsform">
        <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>비밀번호 변경</span>
      </div>

      <div>
        <v-text-field
          type="password"
          placeholder="새 비밀번호 (8자리 이상)"
          v-model="form.password"
          :error-messages="errors.password"
          outlined
          hide-details="auto"
        ></v-text-field>
      <div class="sized_box_h"></div>
        <v-text-field
          type="password"
          v-model="form.password_confirmation"
          :error-messages="errors.password_confirmation"
          placeholder="새 비밀번호 확인"
          outlined
        ></v-text-field>
      </div>

      <div class="snsform">
        <v-icon class="iconMa3">mdi-checkbox-marked-outline</v-icon><span>서비스 정보</span>
      </div>
      <div class="checBox">
        <v-checkbox append-icon="mdi-magnify" label="메일 수신 동의" hide-details />
        <v-checkbox append-icon="mdi-magnify" label="PUSH 알림 동의" hide-details />
      </div>

    <div class="flex j_space a_center btn-marign">
      <div class="h_width">
        <v-btn
          block
          depressed
          tile
          x-large
          dark
          color="#ccc"
          @click="deleteSubmit"
        >회원탈퇴</v-btn>
      </div>
      <div class="h_width ml-3">
        <v-btn
          block
          depressed
          tile
          x-large
          dark
          @click="modifySubmit"
          color="#4455ff"
        >정보수정</v-btn>
      </div>
    </div>

  </div>
  </div>
  </div>
</template>
<script>
export default {
  layout: 'user',
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

      let userUrl = 'auth/user';
      const responseUser = await this.$axios.get(userUrl,
        {
          headers: {
            "Accept-Language" : "ko"
          }
        });

      this.callingCodeItems = response.data.callingCodeItems;
      this.countryItems = response.data.countryItems;
      this.sexItems = response.data.sexItems;
      this.timezoneItems = response.data.timezoneItems;
      this.form = responseUser.data;
      this.loading = false;
    } catch (e) {
      if (e.response.status == '401') {
        // console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    form: {
      name: '',
      sex_id: 24,
      country: '',
    },
    errors: [],
    sexItems: [],
    countryItems: [],
    timezoneItems: [],
  }),
  methods: {
    async modifySubmit() {
      this.loading = true;
      try {
        let url = '/auth/profile';
        let data = [];
        let method = 'post';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.$toast.success('회원정보 수정이 완료됐습니다.');
          this.$router.push('/home');
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
.snsform {flex-shrink: 0; display: flex; white-space: nowrap; text-align: center; border: 0px;  margin: 14px 0; font-weight: bold;}
.snsform span {display: inline-block; padding-left: calc(0.3rem); padding-right: calc(1rem);}
.snsform::after {position: relative;  width: 100%; border-top: thin solid rgba(58, 53, 65, 0.12); top: 50%; content: ""; transform: translateY(50%);}
.form_size {margin-top: 24px;}
.btn-marign {margin: 50px 0 90px;}
</style>
