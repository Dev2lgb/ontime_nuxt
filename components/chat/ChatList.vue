<template>
  <v-container fluid>
    <v-row justify="center">
      <v-list class="pa-0 chat-line">
        <v-list-item-group v-model="selected" active-class="primary--text">
          <template v-for="(item, i) in chats">
            <v-list-item :key="i">
              <template v-slot:default="{ active }">
                <div class="chat-box d-flex justify-space-between">
                  <div class="chat-info d-flex">
                    <div class="chat-avatar">
                      <v-avatar class="profile" color="grey">
                        <v-img :alt="`${item.partner.company_name} avatar`" :src="item.partner.logo_url"/>
                      </v-avatar>
                    </div>
                    <div class="chat-name">
                      <h4>{{ item.partner.company_name }}</h4>
                      <p>{{ item.contract.schedule_info }}</p>
                      <v-list-item-title v-text="item.message"/>
                    </div>
                  </div>
                  <div class="chat-action">
                    <!--<h5>{{ $dayjsFormat(item.created_at, 'YY.MM.DD HH:mm') }}</h5>-->
                    <h5>{{ item.created_at }}</h5>
                    <p class="chat-num">{{ item.unread_count }}</p>
                  </div>
                </div>
              </template>
            </v-list-item>
            <v-divider v-if="i < chats.length - 1" :key="`divider${i}`"/>
          </template>
        </v-list-item-group>
      </v-list>

      <chat-dialog ref="chatDialog" :partner-id="partnerId" :contract-id="contractId" :is-button="true"/>
    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from "vuex";
import ChatDialog from "./ChatDialog";

export default {
  name: "ChatList",
  components: {ChatDialog},
  watch: {
    selected(value) {
      if (value > -1) {
        this.$refs.chatDialog.dialog = true;
        //console.log(value, this.chats[value], this.chats[value].partner_id);
        this.partnerId = this.chats[value].partner_id;
        this.contractId = this.chats[value].contract_id;
      }
    }
  },
  computed: {
    ...mapGetters('chat', ['chats'])
  },
  data: () => ({
    selected: null,
    partnerId: null,
    contractId: null
  })
}
</script>

<style scoped>
.vCardBg {padding: 20px 20px 45px;}
.padTitle {font-family: 'NanumSquare', sans-serif; font-size: 1.2rem; font-weight: 800; padding-top: 30px;}

.padSubtext {font-size: 0.875rem; margin-top: 4px;}
.iconTl {margin-top: -2px; margin-left: 2px;}

.chat-box {width: 100%; padding: 22px 10px 4px;}
.chat-name {margin-left: 20px;}
.chat-name p {font-size: 14px; color: rgb(131, 131, 131);}
.chat-action {display: flex; align-items: flex-end; flex-direction: column;}
.chat-action h5 {min-width: 80px; color: #858585; font-weight: 400; margin-bottom: 4px;}
.chat-num {width: 40px; height: auto; background: #0057ff; border-radius: 5px; text-align: center; font-size: 14px; color: #fff;}

@media (max-width: 500px){
  .chat-box{padding: 22px 0 4px;}
  .vCardBg .v-list-item {padding: 0;}
}
</style>
