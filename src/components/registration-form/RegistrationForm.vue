<template>
  <div class>
    <div class="user-credentials">
      <h1 class="user-credentials__heading1">New user</h1>
      <h2
        class="user-credentials__heading2"
      >{{ userCredentials.firstName}} {{ userCredentials.lastName }} <span v-if="userCredentials.lastName">/</span> {{ userCredentials.login }}</h2>
      <h2 class="user-credentials__heading2">{{ userCredentials.email }}</h2>
      <h1>{{ getErrors }}</h1>
    </div>
    <form @submit.prevent="checkForm" class="registration-form">
      <div class="registration-form__content">
        <div class="registration-form__form-group">
          <label class="registration-form__label-required">login</label>
          <input
          v-model="user.login"
            @input="updateField('login',user.login)"
            type="text"
            class="registration-form__input"
          > 
        </div>
        <div class="registration-form__form-group">
          <label class="registration-form__label-required">e-mail</label>
          <input
          v-model="user.email"
            @input="updateField('email',user.email)"
            type="text"
            class="registration-form__input"
          >
        </div>
        <div class="registration-form__form-group">
          <label class="registration-form__label-required">password</label>
          <input
          v-model="user.password"
            @input="updateField('password',user.password)"
            type="text"
            class="registration-form__input"
          >
        </div>
        <div class="registration-form__bottom-row">
          <div class="registration-form__form-group">
            <label class="registration-form__label">firstname</label>
            <input
            v-model="user.firstname"
              @input="updateField('firstName',user.firstname)"
              type="text"
              class="registration-form__input"
            >
          </div>
          <div class="registration-form__form-group">
            <label class="registration-form__label">lastname</label>
            <input
              v-model="user.lastname"
              @input="updateField('lastName',user.lastname)"
              type="text"
              class="registration-form__input"
            >
          </div>
          <div class="registration-form__form-group">
            <label class="registration-form__label">country</label>
            <v-select class="registration-form__select"  :options="getCountries" label="title">
  
              </v-select>
          </div>

          <div class="registration-form__form-group">
            <label class="registration-form__label">city</label>
            <input
              v-model="user.city"
              :disabled="!userCredentials.country"
              @change="updateField('city',user.city)"
              type="text"
              class="registration-form__input"
            >
          </div>

          <div class="registration-form__form-group">
            <label class="registration-form__label">date of birth</label>
            <datetime input-class="registration-form__input" v-model="user.birth" type="datetime"    @input="updateField('birth',user.birth)"  format="D"></datetime>
          </div>

          <div class="registration-form__form-group">
            <label class="registration-form__label">zip code</label>
            <input
              v-model="user.zip"
              @input="updateField('zip',user.zip)"
              type="text"
              class="registration-form__input"
            >
          </div>
        </div>
        <div class="registration-form__form-group">
          <input class="registration-form__register-button" type="submit" value="sign up">
        </div>
        <p v-if="getSuccessMessage">Регистрация успешна</p>
      </div>
    </form>
  </div>
</template>

<script>

import 'vue-datetime/dist/vue-datetime.css';
import 'vue-select/dist/vue-select.css';

import { Datetime } from 'vue-datetime';
import { mapGetters } from 'vuex';

export default {
  components:{
    datetime: Datetime,

  },
  name: "RegistrationForm",
  //User object contains data from v-model 
  data(){
    return{
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
    }
  },
  //Making a http request to get all countries names
  mounted() {
      this.$store.dispatch('fetchCountries');

  },
  //Using commit function to update fields in user object
  methods: {
    updateField(field, value) {
      this.$store.commit("updateField", { [field]: value });
    },
    fillErrors(value) {
      this.$store.commit("fillErrors", value);
    },
    changeSuccessMessage(value) {
      this.$store.commit("changeSuccessMessage", value);
    },
    checkForm() {
      if (!this.userCredentials.login) {
        this.fillErrors("Login required.");
        this.changeSuccessMessage(false);
      } else if (!this.userCredentials.email) {
        this.fillErrors("Email required.");
        this.changeSuccessMessage(false);
      } else if (!this.userCredentials.password) {
        this.fillErrors("Password required");
        this.changeSuccessMessage(false);
      }
      if (
        this.userCredentials.login &&
        this.userCredentials.email &&
        this.userCredentials.password
      ) {
        this.fillErrors("");
        this.changeSuccessMessage(true);
      }
    },
  },
  //Get information about user
  computed: mapGetters([
    'userCredentials',
    'getErrors',
    'getSuccessMessage',
    'getCountries'
  ])

 
};
</script>

<style src="./css/RegistrationForm.css">
</style>
