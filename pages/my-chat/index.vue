<template>
  <div>
    <SubHeader :link="'/home'" :title="'나의 메세지리스트'"/>
    <div class="user_dashboard full_height j_start pa-5">
      <div class="user_nik">
        <p>전체 메세지 내역입니다.</p>
      </div>
      <p class="ma-0">진행중인 메세지만 표시됩니다.</p>
      <v-btn text @click="editMessage" class="pa-0 mt-3" color="blue">{{ messageBtnText }}</v-btn>

      <div v-if="items.length > 0">
        <div class="pa-3 border_b card_action" v-for="(item, index) in items" :key="index" >
          <div class="flex j_start a_center">
            <div v-show="edit">
              <v-checkbox multiple v-model="selectedIds" :value="item.id"></v-checkbox>
            </div>
            <div class="thumbnail_width">
              <v-img
                :src="getThumbnail(item.booking.title_images)"
                :lazy-src="`https://picsum.photos/10/6?image=10`"
                aspect-ratio="1"
                width="80"
                class="img_radius"
              ></v-img>
            </div>
            <div class="ml-3 f_width">
              <a class="non-deco pa-0 flex j_space a_center f_width">
                <span class="font-weight-bold">{{ item.booking.title }}</span>
                <span>
                  {{ item.created_at.substr(0, 10) }}
                </span>
              </a>
              <div class="flex j_space a_center">
                <p class="ma-0 mt-1">{{ item.message }}</p>
                <v-chip color="blue" dark v-show="item.unread_count > 0" small>{{ item.unread_count }}</v-chip>
              </div>
            </div>
            <chat-dialog :partner-id="item.host_id" :booking-id="item.booking.id" :is-button="false"/>
          </div>
        </div>
      </div>
      <div class="text-center pt-10 color_gray" v-else>
        진행중인 메세지가 없습니다.
      </div>
    </div>
    <div class="border_t pa-5">
      <v-btn @click="deleteMessage">메세지 삭제</v-btn>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'user',
  async fetch() {
    this.loading = true;
    try {
      // alert('test');
      let url = '/chats';
      // url += '?itemsPerPage=' + this.pagination.per_page + '&page=' + this.pagination.page;
      const response = await this.$axios.get(url);

      this.items = response.data.chats;
      // this.pagination.page = response.data.meta.current_page;
      // this.pagination.last_page = response.data.meta.last_page;
      // this.pagination.total = response.data.meta.total;
      // this.items = response.data.bookingBookmarks;

      this.loading = false;
    } catch (e) {
      // if (e.response.status == '401') {
      //   console.log(e);
      //   //this.$toast.error(e.response.data.message);
      // }
    }
  },
  data: () => ({
    selectedIds: [],
    dialog: false,
    edit: false,
    items: [],
    messageBtnText: '메세지창 편집',
  }),
  methods: {
    async deleteMessage() {
      this.loading = true;
      try {
        let url = '/chats/' + this.selectedIds.join();
        let method = 'delete';

        const response = await this.$axios({
          url: url, method: method, data:''
        })
        if (response.data.result) {
          this.$toast.success('메세지가 삭제되었습니다.');
          this.$fetch();
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
    getThumbnail(files) {
      if (files.length > 0) {
        return files[0].url
      }
    },
    editMessage() {
      this.edit = !this.edit;
      if (this.edit) {
        this.messageBtnText = '편집완료';
      } else {
        this.messageBtnText = '메세지창 편집';
      }
    },
  },
}
</script>

<style scoped>
.thumbnail_width { width:80px; }
.res_content_width { width:calc(100% - 210px); }
.bookmark_width {width:60px; position: absolute; right: 0; top: 7px;}
.img_radius { border-radius: 10px; }

.user_nik {margin: 60px 0px 0px;}
.user_nik p {font-size: 28px; font-weight: 500; letter-spacing: -1px;}
.user_nik p span { color: #4487fa;}
.user_nik p span span {color: #28b487;}
.progrma_search {position: relative;}
.search_input {width: 100%; height: 60px; border: 2px solid #435689; border-radius: 10px; padding: 10px; /*background: url(/_nuxt/assets/images/search.png)no-repeat; box-sizing: border-box; background-position: right 24px center; background-size: 35px;*/}
.search_input::placeholder {color: #ccc;}
.search_input:focus-within {outline: #435689}
.img_button {background: url(/_nuxt/assets/images/search.png)no-repeat; border: none; width: 35px; height: 40px; cursor: pointer; background-size: 35px; position: absolute; right: 26px; top: 22px;}
.progrma_area {display: flex; justify-content: space-between; align-items: center; margin-top: 30px; border-bottom: 1px solid #ddd; padding-bottom: 20px;}
.progrma_area p {margin: 0;}
.select_reset {max-width: 130px;}

.card_action {position: relative;margin-top: 12px;}
.text_title {font-size: 15px; margin-top: 10px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.tag_text {margin: 5px 0;}
.desc {font-size: 13px; max-height:39px; overflow: hidden; }
.card_subject {padding-left: 20px; display:block; width:calc(100% - 80px); }
</style>
