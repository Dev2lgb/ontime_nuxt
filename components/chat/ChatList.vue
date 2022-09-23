<template>
  <v-app>

  <div>
    <v-list-item-group v-model="selected" active-class="primary--text">
      {{ chats }}
      <template v-for="(item, i) in chats">
        <v-list-item :key="i">
          <template v-slot:default="{ active }">
            <v-list-item-avatar>
              <v-img :alt="`${item.partner.name} avatar`" :src="item.partner.logo_url"/>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.partner.name"/>
            </v-list-item-content>
          </template>
        </v-list-item>
        <v-divider v-if="i < chats.length - 1" :key="`divider${i}`"/>
      </template>
    </v-list-item-group>
    <chat-dialog ref="chatDialog" :partner-id="partnerId" :contract-id="contractId" :is-button="false"/>

  </div>
  </v-app>
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
        //TODO
        this.contractId = 1;
        //this.contractId = this.chats[value].contract_id;
      }
    }
  },
  computed: {
    ...mapGetters('chat', ['chats'])
  },
  data: () => ({
    dialog: false,
    selected: null,
    partnerId: null,
    contractId: null
  })
}
</script>

<style scoped>
</style>
