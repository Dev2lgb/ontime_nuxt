// const LOGIN = "LANG";

export const common = {
  namespaced: true,
  state: () => ({
    locale: localStorage.getItem("locale") ?? 'ko',
    _CONST_: {
      _ADMIN_LEVEL_: 1,
      _DEFAULT_TIMEZONE_: 'Asia/Seoul',
      _DEFAULT_LOCALE_: 'ko',
      _LOCATION_OFFLINE_ID_: 21,
    }
  }),
//mutation : state의 변수 값 수정 함수
  mutations: {
    setLocale(state, p) {
      localStorage.setItem("locale", p);
      state.locale = p;
    },
  },
//action : mutation 호출 및 처리
  actions: {

  },
  getters: {
    locale: (state) => {
      return state.locale;
    },
  },
};
