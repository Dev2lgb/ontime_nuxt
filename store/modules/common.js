// const LOGIN = "LANG";


export const common = {
  namespaced: true,
  state: () => ({
    bookingForm: localStorage.getItem("bookingForm"),
    bookingOptionForm: localStorage.getItem("bookingOptionForm"),

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
    setBookingForm(state, p) {
      localStorage.setItem("bookingForm", p);
      state.bookingForm = p;
    },
    clearBookingForm(state) {
      localStorage.clear('bookingForm');
      state.bookingForm = '';
    },
    setBookingOptionForm(state, p) {
      localStorage.setItem("bookingOptionForm", p);
      state.bookingOptionForm = p;
    },
    clearBookingOptionForm(state) {
      localStorage.clear('bookingOptionForm');
      state.bookingForm = '';
    },
  },
//action : mutation 호출 및 처리
  actions: {
    // updateBookingForm({commit}, p) {
    //   commit(setBookingForm, p);
    // },
    // updateBookingOptionForm({commit}, p) {
    //   commit(setBookingForm, p);
    // }
  },
  getters: {
    locale: (state) => {
      return state.locale;
    },
    bookingForm: (state) => {
      return state.bookingForm;
    },
    bookingOptionForm: (state) => {
      return state.bookingOptionForm;
    },
  },
};
