// const LOGIN = "LANG";


export const common = {
  namespaced: true,
  state: () => ({
    bookingEditForm: localStorage.getItem("bookingEditForm"),
    bookingForm: localStorage.getItem("bookingForm"),
    bookingOptionForm: localStorage.getItem("bookingOptionForm"),
    bookingOptionEditForm: localStorage.getItem("bookingOptionEditForm"),
    userBookingForm: localStorage.getItem("userBookingForm"),
    userBookingOptionForm: localStorage.getItem("userBookingOptionForm"),
    userBookingFinData: localStorage.getItem("userBookingFinData"),

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
    setUserBookingForm(state, p) {
      localStorage.setItem("userBookingForm", p);
      state.userBookingForm = p;
    },
    setUserBookingOptionForm(state, p) {
      let userBookingOptionForm = [];
      if (state.userBookingOptionForm) {
        userBookingOptionForm = JSON.parse(state.userBookingOptionForm);
      }
      if (userBookingOptionForm) {
        userBookingOptionForm.push(JSON.parse(p));
      } else {
        userBookingOptionForm = [JSON.parse(p)];
      }
      state.userBookingOptionForm = JSON.stringify(userBookingOptionForm);

      localStorage.setItem("userBookingOptionForm", state.userBookingOptionForm);
    },
    clearUserBookingForm(state) {
      localStorage.removeItem('userBookingForm');
      state.bookingOptionForm = '';
    },
    setUserBookingOptionFinData(state, p) {
      localStorage.setItem("userBookingFinData", p);
      state.userBookingFinData = p;
    },
    setBookingForm(state, p) {
      localStorage.setItem("bookingForm", p);
      state.bookingForm = p;
    },

    clearUserBookingOptionFinData(state) {
      localStorage.removeItem('userBookingFinData');
      state.userBookingFinData = '';
    },
    clearBookingForm(state) {
      localStorage.removeItem('bookingForm');
      state.bookingForm = '';
    },
    setBookingEditForm(state, p) {
      localStorage.setItem("bookingEditForm", p);
      state.bookingEditForm = p;
    },
    clearBookingEditForm(state) {
      localStorage.removeItem('bookingEditForm');
      state.bookingEditForm = '';
    },
    setBookingOptionForm(state, p) {
      localStorage.setItem("bookingOptionForm", p);
      state.bookingOptionForm = p;
    },
    clearBookingOptionForm(state) {
      localStorage.removeItem('bookingOptionForm');
      state.bookingOptionForm = '';
    },
    setBookingOptionEditForm(state, p) {
      localStorage.setItem("bookingOptionEditForm", p);
      state.bookingOptionEditForm = p;
    },
    clearBookingOptionEditForm(state) {
      localStorage.removeItem('bookingOptionEditForm');
      state.bookingOptionEditForm = '';
    },
    clearUserBookingOptionForm(state) {
      localStorage.removeItem('userBookingOptionForm');
      state.userBookingOptionForm = '';
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
    bookingEditForm: (state) => {
      return state.bookingEditForm;
    },
    bookingOptionForm: (state) => {
      return state.bookingOptionForm;
    },
    bookingOptionEditForm: (state) => {
      return state.bookingOptionEditForm;
    },
    userBookingForm: (state) => {
      return state.userBookingForm;
    },
    userBookingOptionForm: (state) => {
      return state.userBookingOptionForm;
    },
    userBookingFinData: (state) => {
      return state.userBookingFinData;
    },
  },
};
