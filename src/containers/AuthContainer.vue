<template>
  <per class="auth">
    <div class="auth__form form">
      <div class="form__header">
        <div class="form__tabs">
          <router-link
            :to="{ name: 'Login' }"
            class="card-header-action btn-setting"
          >
            {{ $t("sign_in") }}
          </router-link>
          <router-link
            :to="{ name: 'Registration' }"
            class="card-header-action btn-setting"
          >
            {{ $t("sign_up") }}
          </router-link>
        </div>
        <div class="form__lang">
          <LocaleChanger :parentClass="'auth-locale'" />
        </div>
      </div>
      <div class="form__body">
        <router-view />
      </div>
    </div>
  </per>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import PrettyCheckbox from "pretty-checkbox-vue";
import LocaleChanger from "@/components/LocaleChanger";

Vue.use(PrettyCheckbox);
export default {
  name: "AuthContainer",
  components:{
    LocaleChanger
  }
};
</script>

<style lang="scss">
@import url(//fonts.googleapis.com/earlyaccess/tharlon.css);

$ffamily: "Roboto", sans-serif;

.auth {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background: url("../assets/authbg2.png") fixed no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  min-height: 100%;
  padding: 40px 10px;
  overflow: auto;
}
.form {
  display: flex;
  flex-flow: nowrap column;
  width: 457px;
  max-width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  padding: 43px 45px 54px 45px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75));
  box-shadow: 0px 60px 60px rgba(0, 0, 0, 0.8);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -ms-transition: all 0.3s;
  -o-transition: all 0.3s;
  transition: all 0.3s;
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 35px;
    @media all and(max-width: 400px) {
      flex-wrap: wrap;
    }
  }
  &__lang {
    @media all and(max-width: 400px) {
      order: -1;
      margin-left: auto;
      margin-bottom: 15px;
      flex: 1 1 100%;
    }
  }
  &__tabs {
    display: flex;
    text-transform: uppercase;
    a {
      text-decoration: none !important;
      font-family: $ffamily !important;
      font-style: normal;
      font-weight: normal;
      font-size: 21px;
      line-height: 30px;
      color: #fff !important;
      transition: all 0.3s;
      padding-bottom: 11px;
      border-bottom: 3px solid transparent;
      user-select: none;
      &:first-child {
        margin-right: 40px;
      }
      &:hover,
      &.active {
        border-bottom-color: #688E74;
      }
    }
  }
  &__body {
    form {
      -webkit-transition: all 0.6s;
      -moz-transition: all 0.6s;
      -ms-transition: all 0.6s;
      -o-transition: all 0.6s;
      transition: all 0.6s;
    }
  }
}

.error{
  color: #f57f6c;
  padding-top: 5px;
  font-size: 12px;
}
</style>
