import Vue from 'vue'

export const state = () => ({
  chats: []
})

export const getters = {
  chats: state => {
    return state.chats;
  },
  unreadCount: state => {
    //console.log(state.chats);
    return state.chats.reduce((previousValue, currentValue) => previousValue + Number(currentValue.unread_count), 0);
  }
}

export const mutations = {
  setChats(state, payload) {
    state.chats = [...payload];
  }
}

export const actions = {
  setChats({commit}, payload) {
    //console.log('payload', payload);
    commit("setChats", payload);
  }
}
