<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500" scrollable>

      <template v-if="isButton" v-slot:activator="{ on, attrs }">
        <!--v-btn color="primary" dark v-bind="attrs" v-on="on">메시지</v-btn-->
        <v-badge bordered icon="mdi-bell" overlap class="dashBtn" :content="unreadCount" :value="unreadCount > 0">
          <v-btn v-bind="attrs" v-on="on" small elevation="0" dark color="#d39046" class="snsFont2"><span>메시지</span> </v-btn>
        </v-badge>
      </template>

      <v-card class="chat-dialog" elevation="0">
        <div class="chat-close-box">
          <v-btn color="#3076ff" text @click="dialog = false">Close</v-btn>
        </div>

        <div class="chat-title-info">
          <v-avatar class="profile" color="grey">
            <v-img :alt="`${partner.company_name} avatar`" :src="partner.logo_url"/>
          </v-avatar>
          <h3>{{ partner.company_name }}</h3>
        </div>

        <v-card-text ref="container" style="height: 500px;">
          <template v-for="(item, i) in chats">
            <v-list-item :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
              <!-- <v-list-item-avatar v-if="item.type === 'partner'"> <v-img :src="item.avatar"/> </v-list-item-avatar> -->
              <v-list-item-content >
                <v-list-item-title :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
                  <div :class="`message message-${item.type === 'me'? 'right' : 'left'}`">
                  {{item.message}}
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle :class="`d-flex justify-${item.type === 'me' ? 'end' : 'start'}`">
                  {{ item.type === 'partner' ? partner.name : '' }}<br />
                  {{ $dayjsFormat(item.created_at, 'YY.MM.DD HH:mm') }}
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
                <v-icon :color="(disabledSend) ? 'gray': 'primary'" > mdi-send </v-icon>
              </v-btn>
            </template>
          </v-textarea>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>

export default {
  name: "ChatDialog",
  //props: {'partnerId', 'isButton'},
  props: {
    partnerId: {type: Number, default: null},
    contractId: {type: Number, default: null},
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
      let result = [Number(this.$auth.user.id), Number(this.partnerId)].sort((a, b) => a - b).join('_');
      result += '_' + this.contractId;
      return result;
    }
  },
  watch: {
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
      contract: {}
    }
  },
  methods: {
    /*isMine(id) {
      return id === this.$auth.user.id;
    },
    test() {
      console.log('test');
    }*/
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

      //TODO
      //const response = await this.$axios.get('/chats/' + this.partnerId + '/' + this.contractId);
      const response = await this.$axios.get('/api/chats/1/1');
      this.partner = response.data.partner;
      this.chats = response.data.chats;
      this.contract = response.data.contract;

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
          type: 'me', from_user_id: this.$auth.user.id, to_user_id: this.partnerId,
          created_at: new Date(), message: message,
          contract_id: this.contractId
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
