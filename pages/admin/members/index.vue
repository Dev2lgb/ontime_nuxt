<template>
  <div>
    <h3 class="mb-3 fontW"><v-icon>mdi-comment-account-outline</v-icon> 회원정보 조회</h3>
    <div class="flex j_start a_center line_area">
      <div class="basic_width">
        <v-select  height="50" hide-details="auto" dense @change="dateTerm" outlined v-model="selectedSearchTermItem" :items="searchTermItems"></v-select>
      </div>
      <div class="q_width">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="search.dates"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="dateRangeText"
              prepend-inner-icon="mdi-calendar"
              outlined
              dense
              placeholder="날짜선택"
              class="ml-3"
              height="50"
              hide-details="auto"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="search.dates"
            no-title
            scrollable
            range
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(search.dates)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </div>
      <div class="q_width">
        <v-text-field v-model="search.keyword" outlined dense hide-details="auto" class="mx-3" height="50" placeholder="검색어입력"></v-text-field>
      </div>
      <v-btn height="50" elevation="0" color="#2ab588" @click="$fetch()" dark>검색</v-btn>
    </div>
    <div class="btn_margin flex j_space">
      <h3 class="fontW"><v-icon>mdi-account-search</v-icon> 회원 리스트</h3>
      <div>
        <v-btn elevation="0" color="#03a9f4" dark @click="sendNoticePop">푸시발송</v-btn>
        <v-btn elevation="0" color="#00bcd4" @click="excelDown" dark>엑셀다운</v-btn>
      </div>
    </div>
    <div class="table_in">
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="items"
        :single-select="false"
        item-key="id"
        show-select
      >
        <template v-slot:item.actions="{ item }">
          <v-btn small dark depressed color="#888" @click="editMember(item)">수정</v-btn>
          <v-btn small dark depressed color="#888">탈퇴</v-btn>
        </template>
        <template v-slot:top>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card class="boxditale text-center">
              <p class="text-h6 font-weight-bold font-color2 titleTop"><v-icon color="6c6c6c">mdi-account-off</v-icon>&nbsp; 고객을 삭제 하시겠습니까?</p>
              <v-card-text>
                <span>삭제시 복구되지 않습니다.</span>
              </v-card-text>
              <v-card-actions class="justify-center top-padding-0">
                <v-btn large color="#a9a8a8" outlined height="48" elevation="0" @click="closeDelete" width="100">취소</v-btn>
                <v-btn large  color="#f44336" dark height="48" elevation="0" @click="" width="100">삭제</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
      </v-data-table>
    </div>
    <v-dialog
      v-model="dialog"
      max-width="800"
    >
      <v-card>
        <v-card-title>회원정보수정</v-card-title>
        <v-card-text>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">이메일</p>
            <v-text-field v-model="form.email" :error-messages="errors.email"></v-text-field>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">비밀번호</p>
            <v-text-field v-model="form.password" placeholder="8자리 이상" :error-messages="errors.password"></v-text-field>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">비밀번호 확인</p>
            <v-text-field v-model="form.password_confirmation" placeholder="8자리 이상" :error-messages="errors.password_confirmation"></v-text-field>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">이름</p>
            <v-text-field v-model="form.name" :error-messages="errors.name"></v-text-field>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">휴대전화번호</p>
            <div class="flex j_space a_center">
              <div style="width:35%">
                <v-select
                  :items="callingCodeItems"
                  v-model="form.mobile_country_calling_code"
                  :error-messages="errors.mobile_country_calling_code"
                  item-text="text"
                  item-value="value"
                  dense
                  class="inpBottom vinpuT"
                  label="국가번호"
                ></v-select>
              </div>
              <div style="width:65%;" class="ml-2">
                <v-text-field dense v-model="form.mobile" :error-messages="errors.mobile" label="연락처" />
              </div>
            </div>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">출생연도</p>
            <v-text-field v-model="form.birthday_year" :error-messages="errors.birthday_year" label="출생연도 4자리"></v-text-field>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">성별</p>
            <div>
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
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">국적</p>
            <v-select
              class="inpBottom vinpuT"
              label="국적선택"
              dense
              v-model="form.country"
              :error-messages="errors.country"
              :items="countryItems"
            ></v-select>
          </div>
          <div class="flex j_start a_center mb-5 form_row">
            <p class="ma-0 mr-3">타임존</p>
            <v-select
              label="시간대선택"
              dense
              v-model="form.timezone"
              :error-messages="errors.timezone"
              :items="timezoneItems"
            ></v-select>
          </div>
        </v-card-text>
        <v-card-actions class="flex j_center a_center">
          <v-btn depressed dark color="#999" @click="submitDeleteMember">회원삭제</v-btn>
          <v-btn depressed dark color="#999" @click="submitForm">정보수정</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="isSendNoticePop"
      max-width="400"
    >
      <v-card class="dia_massage">
        <p class="dia_title">푸시내용을 입력해주세요.</p>
        <v-card-text>
          <div>
            <p class="font-weight-bold">발송 형태</p>
            <div>
              <v-select
                v-model="push.type"
                :items="pushItems"
                :error-messages="errors.type"
              >
              </v-select>
            </div>
          </div>
          <div>
            <v-textarea outlined class="mt-3" v-model="push.notice" :error-messages="errors.notice" placeholder="입력해주세요." hide-details="auto"></v-textarea>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="submitPush" large elevation="0" color="#0099ff" dark width="100%">공지발송</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import {DateTime} from "luxon";
DateTime.defaultZoneName = 'Asia/Seoul';

export default {
  layout: 'admin',
  async fetch() {
    this.loading = true;
    try {
      let url = '/admin/members?search=';
      if (this.search) {
        url += JSON.stringify(this.search);
      }
      const response = await this.$axios.get(url);
      let urlInit = 'auth/register';
      const responseInit = await this.$axios.get(urlInit);

      this.callingCodeItems = responseInit.data.callingCodeItems;
      this.countryItems = responseInit.data.countryItems;
      this.sexItems = responseInit.data.sexItems;
      this.timezoneItems = responseInit.data.timezoneItems;

      this.items = response.data.data;
      this.count = this.items.length;

      this.loading = false;
    } catch (e) {
      console.log(e);
      if (e.response.data.status == '401') {
        console.log(e);
        this.$toast.error(e.response.data.message);
      }
    }
  },
  data: () => ({
    push: {
      type: 'email',
      notice: '',
      member_ids: [],
    },
    pushItems: [
      { text: '이메일', value: 'email' },
      { text: '푸시메시지', value: 'push' },
    ],
    isSendNoticePop: false,
    dialogDelete : false,
    dialog: false,
    dates: [],
    items: [],
    sexItems: [],
    callingCodeItems: [],
    countryItems: [],
    timezoneItems: [],
    form: {},
    errors: [],
    selected: [],
    search: {
      dates: [],
      keyword: '',
    },
    headers: [
      {
        text: '이름',
        align: 'start',
        sortable: false,
        value: 'name',
      },
      { text: '연락처', value: 'ccc_mobile' },
      { text: '이메일', value: 'email' },
      { text: '출생연도', value: 'birthday_year' },
      { text: '성별', value: 'sex_name' },
      { text: '국적', value: 'country' },
      { text: '타임존', value: 'timezone' },
      { text: '가입일시', value: 'created_at' },
      { text: '수정/탈퇴', value: 'actions', width: '150' },
    ],
    menu: false,
    selectedSearchTermItem: '',
    searchTermItems: [
      {text: '전체', value: ''},
      {text: '이번달' , value: {type: 'last', start: {month: 0}}},
      {text: '지난달', value: {type: 'last', start: {month: 1}}},
      {text: '3개월', value: {type: 'this', start: {month: 3}}},
      {text: '6개월', value: {type: 'this', start: {month: 6}}},
    ],
    editedIndex: -1,
    defaultItem: {},
    excel: [],
  }),
  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
    pagination: {
      handler() {
        this.$fetch()
      },
      deep: true,
    },
  },
  computed: {
    dateRangeText () {
      return this.search.dates.join(' ~ ')
    },
  },
  methods: {
    sendNoticePop() {
      if (this.selected.length > 0) {
        this.isSendNoticePop = true;
      } else {
        this.$toast.error('회원을 선택해주세요.');
        return false;
      }
    },
    async submitPush(){
      this.loading = true;
      try {
        let url = '/admin/members/notice';
        let method = 'post';

        let selectedIds = [];
        this.selected.forEach(function(value, index) {
          selectedIds.push(value.id);
        });
        this.push.member_ids = selectedIds;

        const response = await this.$axios({
          url: url, method: method, data: this.push
        })
        if (response.data.result) {
          this.$toast.success('메시지가 발송되었습니다.');
        }
        this.loading = false;
      } catch (e) {
        console.log(e.response);
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
    async excelDown() {
      this.loading = true;
      try {
        let url = '/admin/members/export';
        const response = await this.$axios.get(url);
        this.excel = response.data;

        this.loading = false;
      } catch (e) {
        console.log(e);
        if (e.response.data.status == '401') {
          console.log(e);
          this.$toast.error(e.response.data.message);
        }
      }
    },
    async submitForm() {
      this.loading = true;
      try {
        let url = '/admin/members/' + this.form.id;
        let method = 'put';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.$toast.success('수정되었습니다.');
          this.close();
          this.$fetch();
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
    async submitDeleteMember(){
      this.loading = true;
      try {
        let url = '/admin/members/' + this.form.id;
        let method = 'delete';

        const response = await this.$axios({
          url: url, method: method, data:this.form
        })
        if (response.data.result) {
          this.$toast.success('탈퇴 처리되었습니다.');
          this.close();
          this.$fetch();
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
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem)
        this.errors = Object.assign({}, '')
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.form = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    deleteMember(item){
      this.dialogDelete = true;
    },
    editMember(item) {
      this.editedIndex = this.items.indexOf(item)
      this.form = Object.assign({}, item)
      this.dialog = true
    },

    dateTerm(searches) {
      this.search.dates = [];
      //console.log(searches);
      let now = DateTime.now();
      let startdate = '';
      let enddate = '';
      if (searches.type === 'this') {
        startdate = now.minus(searches.start).startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.toFormat('yyyy-MM-dd');
      }
      if (searches.type === 'last') {
        now = now.minus(searches.start);
        startdate = now.startOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
        enddate = now.endOf(Object.keys(searches.start)[0]).toFormat('yyyy-MM-dd');
      }
      if (startdate && enddate)  {
        this.search.dates = [startdate, enddate];
      }
    },
  },
}
</script>

<style scoped>
.form_row p { width:120px; }
.basic_width { width:150px; }
.adm_dash_item { width:calc((100% / 6)  - 20px); }
.btn_margin {margin: 40px 0 20px;}
.fontW {font-weight: 400;}
.table_in {border-top: 4px solid #ddd}
.line_area {border: 1px solid #ddd; padding: 20px 30px;}
.dia_massage {padding: 25px 10px;}
.dia_title {font-size: 1.1rem; font-weight: 500; letter-spacing: 0.0125em; padding: 0 24px;}
</style>
