import axios from "axios";

const registerModule = {
  state: {
    strict: true,
    user: {
      login: "",
      email: "",
      password: "",
      lastName: "",
      firstName: "",
      country: "",
      city: "",
      birth: "",
      zip: ""
    },
    errorMessage: "",
    successMessage: false,
    countries: []
  },
  mutations: {
    //Update user object
    updateField(state, value) {
      Object.assign(state.user, value);
    },
    updateDate(state, value) {
      state.user.birth = value;
    },
    //Update error message
    fillErrors(state, value) {
      state.errorMessage = value;
    },
    //Update success message
    changeSuccessMessage(state, value) {
      state.successMessage = value;
    },
    //Update countries array
    setCountries(state, countries) {
      state.countries = countries;
    }
  },
  actions: {
    //Async request to countries API
    fetchCountries({ commit }) {
      axios.get("https://restcountries.eu/rest/v2/all").then(response => {
        let countries = [];
        for (let i = 0; i < response.data.length; i++) {
          countries.push(response.data[i].name);
        }

        commit("setCountries", countries);
      });
    }
  },
  getters: {
    //Get user object properties
    userCredentials(state) {
      return state.user;
    },
    //Get errors error message
    getErrors(state) {
      return state.errorMessage;
    },
    //Get success message
    getSuccessMessage(state) {
      return state.successMessage;
    },
    //Get countries array
    getCountries(state) {
      return state.countries;
    }
  }
};
export default registerModule;
