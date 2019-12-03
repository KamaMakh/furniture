<template>
  <form @submit="login">
    <div class="login">
      <div class="login__item" :class="{ 'is-danger': $v.form.email.$invalid && (form.email || showFormErrors)}">
        <input type="email" name="email" autocomplete="email" :placeholder="$t('email')" v-model.trim="form.email">
        <div class="error" v-if="!$v.form.email.email && form.email">{{ $t("invalid_email") }}</div>
      </div>
      <div class="login__item" :class="{ 'is-danger': $v.form.password.$invalid && (form.password || showFormErrors)}">
        <input type="password" name="password" autocomplete="current-password" :placeholder="$t('password')" v-model="form.password">
      </div>
      <div class="login__button">
        <button class="btn" type="button"  @click="login">
          {{ $t("login") }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import Vue from 'vue'
import Validations from 'vuelidate'
import { required, email } from "vuelidate/lib/validators";

Vue.use(Validations);

export default {
  name: "Login",
  data() {
    return {
      form: {},
      showFormErrors: false
    }
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
      password: {
        required,
      },
    }
  },
  methods: {
    login(e) {
      e.preventDefault();

      if(this.$v.form.$pending || this.$v.form.$error || this.$v.form.$invalid){
        Vue.notify({
          group: 'warn',
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"],
          type: 'warn',
          closeOnClick: true,
          duration: 4000
        });
        this.showFormErrors = true;
        return;
      }

      this.$store.dispatch('user/login', {
        email: this.form.email,
        password: this.form.password.toLowerCase(),
      })
        .then(() => {
          this.$router.push({ name: 'Furniture' })
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["login_invalid"]
          });
        });
    }
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Tharlon", sans-serif;
.login {
  display: flex;
  flex-direction: column;
  &__item {
    margin-bottom: 70px;
    text-align: left;
    input {
      border: none;
      background: none;
      border-bottom: 2px solid rgba(255, 255, 255, 0.72);
      width: 100%;
      font-size: 19px;
      line-height: 28px;
      color: #fff;
      font-family: $ffamily;
      &::placeholder {
        color: #fff;
      }
      &:focus {
        outline: none;
      }
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.is-danger{
      input, .vs__selected-options{
        border-bottom-color: #f04124 !important;
        color: #f04124;
      }
    }
  }
  &__button{
    margin-top: 40px;
    .btn {
      font-family: $ffamily;
      font-style: normal;
      font-weight: normal;
      font-size: 21px;
      line-height: 1;
      text-align: center;
      color: #fff;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border: none;
      background: #2AAD54;
      border-radius: 30px;
      padding: 11px 29px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      transition: 0.3s;
      cursor: pointer;
      &:hover {
        background: #47bf6d;
      }
    }
  }
}
</style>
