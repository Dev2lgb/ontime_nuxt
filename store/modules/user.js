
export const user = {
  namespaced: true,
  state: () => ({
    isAuthenticated: false,
    isMemberType: 'MEMBER',
    expire_time: 0,
    user: {},
  }),
//mutation : state의 변수 값 수정 함수
  mutations: {
    updateIsAuthenticated(state, p) {
      state.expire_time = (p.isAuthenticated) ? Math.round((new Date()).getTime() / 1000) + 36000 : 0;
      state.isAuthenticated = p.isAuthenticated;
      state.user = p.user;
    },
    switchMemberType(state) {
      if (state.isMemberType === 'MEMBER') {
        state.isMemberType = 'HOST';
      }
      if (state.isMemberType === 'HOST') {
        state.isMemberType = 'MEMBER';
      }
    }
  },
//action : mutation 호출 및 처리
  actions: {

  },
  getters: {
    isAuthenticated(state) {
      //console.log(state.expire_time, Math.round((new Date()).getTime() / 1000), state.expire_time - Math.round((new Date()).getTime() / 1000));
      if (state.expire_time < Math.round((new Date()).getTime() / 1000)) {
        return false;
      }
      return state.isAuthenticated;
    },
    user(state) {
      return state.user;
    },
    isMember(state) {
      return state.isMemberType === 'MEMBER';
    },
    isHost(state) {
      return state.isMemberType === 'HOST';
    },
    isAdmin(state, rootState) {
      console.log(rootState);
      return state.user.level === rootState._CONST_._ADMIN_LEVEL_;
    }
  },
};
