<template>
  <v-dialog v-model="dialog" persistent max-width="500" scrollable>
    <template v-if="isButton" v-slot:activator="{ on, attrs }">
      <!--v-btn color="primary" dark v-bind="attrs" v-on="on">메시지</v-btn-->
      <v-badge bordered icon="mdi-bell" overlap class="dashBtn" :content="unreadCount" :value="unreadCount > 0">
        <!-- <v-btn v-bind="attrs" v-on="on" small elevation="0" dark color="#d39046" class="snsFont2"><span>메시지</span></v-btn> -->
<!--        <v-btn v-bind="attrs" v-on="on" small depressed class="mt-3">문의하기</v-btn>-->
        <v-btn class="next_btn f_width" v-bind="attrs" v-on="on" x-large depressed dark block color="#28b487" outlined>문의하기</v-btn>
      </v-badge>
    </template>

    <v-card class="chat-dialog" elevation="0">
      <div class="chat-close-box">
        <v-btn color="#3076ff" text @click="dialog = false">Close</v-btn>
      </div>

      <div class="chat-title-info">
        <v-avatar class="profile" color="grey">
          <v-img :src="(booking.title_images) ? booking.title_images[0].url: null"/>
        </v-avatar>
        <h3><span>[{{ getCategoryName(booking) }}]</span>{{ booking.title }}</h3>
        <br/>
        <v-card-subtitle> {{booking.content}} </v-card-subtitle>
      </div>

      <v-card-text ref="container" style="height: 500px;">
        <template v-for="(item, i) in chats">
          <v-list-item :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
            <!-- <v-list-item-avatar v-if="item.type === 'partner'"> <v-img :src="item.avatar"/> </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
                <div :class="`message message-${item.type === 'me'? 'right' : 'left'}`">
                  {{ item.message }}
                </div>
              </v-list-item-title>
              <v-list-item-subtitle :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
                {{ item.type === 'partner' ? partner.name : '' }}<br/>
                {{ $dayjs(item.created_at).tz('Asia/Seoul').format('YY.MM.DD HH:mm') }}
                <!--{{ item.created_at }}-->
              </v-list-item-subtitle>
            </v-list-item-content>
            <!-- <v-list-item-avatar v-if="item.type === 'me'"> <v-img :src="item.avatar"/> </v-list-item-avatar> -->
          </v-list-item>
        </template>
      </v-card-text>
      <v-card-actions class="py-2">
        <!--          @keyup.enter="send"-->
        <v-textarea v-model="message"
                    id="chat-message-textarea"
                    class="asd"
                    :counter="counter" :rules="[rules.length(counter)]"
                    auto-grow rows="2"
                    filled label="메시지를 입력해주세요." placehoder="메시지를 입력해주세요."
                    :hide-details="false"
                    persistent-hint hint="Enter: 전송, Ctrl+Enter: 줄바꿈"
                    @keydown.enter.prevent.exact="send"
                    @keyup.ctrl.enter.prevent="newLine">
          <!--append-outer-icon="mdi-send" @click:append-outer="send"-->
          <template v-slot:append-outer>
            <v-btn icon :disabled="disabledSend" @click="send">
              <v-icon :color="(disabledSend) ? 'gray': 'primary'"> mdi-send</v-icon>
            </v-btn>
          </template>
        </v-textarea>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: "ChatDialog",
  //props: {'partnerId', 'isButton'},
  props: {
    partnerId: {type: Number, default: null},
    bookingId: {type: Number, default: null},
    isButton: {type: Boolean, default: true},
    unreadCount: {type: Number, default: 0},
  },
  mounted() {
    //this.dialog = true;//FORTEST
    //this.init();
    //console.log('echo', this.$echo);
  },
  /*updated() {
    // whenever data changes and the component re-renders, this is called.
    this.$nextTick(() => this.scrollToEnd());
  },*/
  computed: {
    disabledSend() {
      return this.message.length > this.counter;
    },
    channelName() {
      let result = [Number(this.$auth.user.id), Number(this.partner_id)].sort((a, b) => a - b).join('_');
      result += '_' + this.booking_id;
      return result;
    }
  },
  watch: {
    // partnerId(val) {
    //   this.partner_id = val;
    // },
    // bookingId(val) {
    //   this.booking_id = val;
    // },
    dialog: {
      immediate: false,
      handler(value) {
        if (value) {
          this.init();
        } else {
          this.partner = {};
          this.message = '';
          this.chats = [];
          this.$echo.private('chat.' + this.channelName).stopListening('ChatSent');
        }
      }
    }
  },
  data () {
    return {
      //isProduction: process.env.NODE_ENV === 'production',
      dialog: false, counter: 1000,
      rules: {length: len => v => (v || '').length <= len || `메시지는 ${len}자 이하로 입력하여 주십시오.`},
      partner: {}, message: '', chats: [],
      booking: {},
      partner_id: '',
      booking_id: '',
    }
  },
  methods: {
    /*isMine(id) {
      return id === this.$auth.user.id;
    },
    test() {
      console.log('test');
    }*/
    getCategoryName(item) {
      if (item.category_text) {
        return item.category_text;
      }
      if (item.hasOwnProperty('category_name')){
        return item.category_name.name_ko;
      }
    },
    openDialog(booking_id, host_id) {
      this.dialog = true;
      this.booking_id = booking_id;
      this.partner_id = host_id;
    },
    async init() {
      this.$echo.private('chat.' + this.channelName).listen('ChatSent', e => {
        //console.log(e.chat, this.$auth.user.id);
        if (e.chat.from_user_id !== this.$auth.user.id) {
          e.chat.type = 'partner';
          e.chat.read_at = this.$dayjs(new Date()).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
          this.chats.push(e.chat);
          this.$nextTick(() => this.scrollToEnd());

          //읽음처리
          this.$axios.put('/chats/' + e.chat.id + '/read');
        }
      });

      if (this.partnerId) {
        this.partner_id = this.partnerId;
      }
      if (this.bookingId) {
        this.booking_id = this.bookingId;
      }

      const data = await this.$axios.$get('/chats/' + this.partner_id + '/' + this.booking_id);
      this.partner = data.partner;
      this.chats = data.chats;
      this.booking = data.booking;

      //this.$nextTick(() => this.scrollToEnd());
      setTimeout(() => {
        this.scrollToEnd();
      }, 0);
    },
    newLine(e) {
      let caret = e.target.selectionStart;
      e.target.setRangeText("\n", caret, caret, "end");
      this.message = e.target.value;
    },
    async send() {
      if (!this.disabledSend) {
        const message = this.message.replace(/^\s+|\s+$/g, '');
        const chat = {
          type: 'me', from_user_id: this.$auth.user.id, to_user_id: this.partner_id,
          created_at: new Date(), message: message,
          booking_id: this.booking_id
        };
        this.chats.push(chat);
        this.message = '';
        this.$nextTick(() => this.scrollToEnd());
        const response = await this.$axios.post('/chats', chat);
      }
    },
    scrollToEnd() {
      //console.log('scroll');
      let container = this.$refs.container
      //console.log(container.scrollHeight, container.scrollTop);
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  }
}
</script>

<style scoped>
.message {
  width: auto;
  max-width: 330px;
  overflow: initial;
  text-overflow: initial;
  white-space: pre-line;
  padding: 0 16px 16px 16px;
  font-size: 12px;
  border-radius: 0!important;
}
.message-left {
  background-color: #e8e8e8;
  border-radius: 0 16px 16px 16px;
}
.message-right {
  background-color: #96bdff;
  border-radius: 16px 0 16px 16px;
}
/*.chat-compose-input::v-deep {
  textarea {
    max-height: 7rem;
    overflow: auto;
  }
}*/
>>> #chat-message-textarea {
  max-height: 10px;
  overflow-y: auto;
}
/*>>> .v-text-field__details {
  display: initial !important;
}
>>> .v-messages {
  display: initial !important;
}*/
.chat-dialog {
  padding: 20px 40px;
}
.chat-close-box {
  text-align: right;
}
.chat-title-info {
  width: 100%;
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
}
.chat-title-info h3 {margin-left: 15px;}
.chat-dialog .v-list-item {padding: 0;}
::v-deep .chat-dialog .v-card__text {padding: 0 14px 20px 0!important;}
::v-deep .chat-dialog .v-card__actions {padding-left: 0; padding-right: 0;}
.v-list-item__subtitle {margin-top: 6px; font-size: 12px;}


@media (max-width: 500px){
  ::v-deep .v-dialog {max-width: 100%!important; margin: 0; max-height: 100%;}
  .chat-dialog {padding: 20px;}
}
</style>
