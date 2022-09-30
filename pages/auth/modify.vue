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
      {{ form }}
    </div>
    <div class="pa-8">
      <div>
        <v-text-field
          placeholder="이름"
          v-model="form.name"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model="form.mobile"
          placeholder="연락처"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          v-model="form.birthday_year"
          placeholder="출생연도 4자리"
        ></v-text-field>
      </div>
      <div class="flex j_space a_center border_b">
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
      <div class="flex j_space a_center border_b">
        <p class="ma-0">국적</p>
        <div class="h_width">
          <v-select
            outlined
            v-model="form.country"
            :error-messages="errors.country"
            hide-details="auto"
            :items="countryItems"
          ></v-select>
        </div>
      </div>
      <div class="flex j_space a_center border_b">
        <p class="ma-0">시간대</p>
        <div class="h_width">
          <v-select
            v-model="form.timezone"
            :error-messages="errors.timezone"
            outlined
            :items="timezoneItems"
          ></v-select>
        </div>
      </div>
      <div>
        <v-text-field
          type="password"
          placeholder="새 비밀번호 (8자리 이상)"
          v-model="form.password"
          :error-messages="errors.password"
        ></v-text-field>
      </div>
      <div>
        <v-text-field
          type="password"
          v-model="form.password_confirmation"
          :error-messages="errors.password_confirmation"
          placeholder="새 비밀번호 확인"
        ></v-text-field>
      </div>
      <div class="py-10">
        <div class="flex j_space a_center">
          <v-checkbox label="메일 수신 동의"></v-checkbox>
          <v-btn fab small text>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </div>
        <div class="flex j_space a_center">
          <v-checkbox label="PUSH 알림 동의"></v-checkbox>
          <v-btn fab small text>
            <v-icon>mdi-information-outline</v-icon>
          </v-btn>
        </div>
      </div>
      <div class="flex j_space a_center">
        <div class="h_width">
          <v-btn
            block
            depressed
            tile
            large
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
            large
            dark
            @click="modifySubmit"
            color="#4455ff"
          >정보수정</v-btn>
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
          url: url, method: method, data:this.form,
          headers: {
            "Accept-Language" : "ko"
          }
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
    deleteSubmit() {

    },
  },
}
</script>

<style scoped>
.absolute_bottom { position:absolute; bottom:0; left:0; right:0; }
</style>
