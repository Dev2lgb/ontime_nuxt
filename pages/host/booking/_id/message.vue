<template>
  <div class="sizedbox">
    <HostSubHeader :title="'예약프로그램 상세보기'" :link="'/host/home'"/>
    <div class="host_head px-5 pt-5">
      <div class="host_area layout_format">
        <div class="host_nik">
        <p><span>관리자</span> 님, 예약관련하여<br>메세지를 확인해 주세요.</p>
        </div>
        <div class="host_create">
          <HostTabMenu />
        </div>
      </div>
    </div>

    <div class="user_dashboard full_height j_start layout_format">
      <div class="pa-5">
        <h3>진행중인 메세지만 표시됩니다.</h3>
        <v-btn text @click="editMessage" class="pa-0 mt-3" color="blue">{{ messageBtnText }}</v-btn>
      </div>
      <div>
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
              <div class="ml-3 f_width" @click="openChatDialog(item.booking.id, item.booking.member_id)">
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
            </div>
          </div>
        </div>
        <div class="text-center pt-10 color_gray" v-else>
          진행중인 메세지가 없습니다.
        </div>
      </div>
      <chat-dialog ref="chatDialog" :is-button="false"/>
      <div class="border_t pa-5">
        <v-btn @click="deleteMessage">메세지 삭제</v-btn>
      </div>
    </div>
  </div>
</template>
<script>
import ChatDialog from "../../../../components/chat/ChatDialog";
export default {
  components: {ChatDialog},
  layout: 'host',
  async fetch() {
    this.loading = true;
    try {
      // alert('test');
      let url = '/chats/booking/' + this.$route.params.id;
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
    selectedItem: '125',
    items: [],
    messageBtnText: '메세지창 편집',
    edit: false,
  }),
  methods: {
    openChatDialog(booking_id, host_id) {
      this.$refs.chatDialog.openDialog(booking_id, host_id);
    },
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
.create_a {background: #4961e5; height: 60px; padding: 0 24px;}
::v-deep .search_box .v-select__selection{color: #fff;}
::v-deep .search_box .theme--light.v-icon{color: #fff;}
::v-deep .search_box .v-input__slot:before {border-style: unset!important;}
.progrma_option {background: #f5f5f5; border-radius: 10px; padding: 8px 0; margin-top: 25px;}
.progrma_option p {margin-top: 10px; margin-bottom: 0;}
.sub_nav {margin-top: -7px;}
::v-deep .sub_nav .v-slide-group__wrapper {background: #0087e1;}
.select-box {padding: 0 20px;}
</style>
