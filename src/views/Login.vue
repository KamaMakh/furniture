<template>
  <form v-if="!restore" @submit.prevent="login">
    <div class="login">
      <div
        class="login__item"
        :class="{
          'is-danger': $v.form.email.$invalid && (form.email || showFormErrors)
        }"
      >
        <input
          type="email"
          name="email"
          autocomplete="email"
          :placeholder="$t('email')"
          v-model.trim="form.email"
        />
        <div class="error" v-if="!$v.form.email.email && form.email">
          {{ $t("invalid_email") }}
        </div>
      </div>
      <div
        class="login__item"
        :class="{
          'is-danger':
            $v.form.password.$invalid && (form.password || showFormErrors)
        }"
      >
        <input
          type="password"
          name="password"
          autocomplete="current-password"
          :placeholder="$t('password')"
          v-model="form.password"
        />
      </div>
      <div class="login__button">
        <button
          v-if="!loading"
          class="btn"
          type="button"
          @click.prevent="login"
        >
          {{ $t("login") }}
        </button>
        <button v-else class="btn">
          <b-spinner small></b-spinner>
        </button>
      </div>
    </div>
    <div class="login__forgot" @click.prevent="restore = true">
      {{ $t("forgotPassword") }}
    </div>
  </form>
  <form v-else>
    <div class="login">
      <div v-if="restoreStep === 1">
        <div
          class="login__item"
          :class="{
            'is-danger':
              $v.restoreEmail.$invalid && (restoreEmail || showFormErrors)
          }"
        >
          <input
            type="email"
            name="email"
            autocomplete="email"
            :placeholder="$t('email')"
            v-model.trim="restoreEmail"
          />
          <div class="error" v-if="!$v.restoreEmail.email && restoreEmail">
            {{ $t("invalid_email") }}
          </div>
        </div>
        <div class="login__button">
          <button
            v-if="!loading"
            class="btn"
            type="button"
            @click.prevent="sendEmail"
          >
            {{ $t("restorePassword") }}
          </button>
          <button v-else class="btn" type="button">
            <b-spinner small></b-spinner>
          </button>
        </div>
        <div class="login__back" @click="restore = false">
          {{ $t("back") }}
        </div>
      </div>
      <div v-else-if="restoreStep === 2">
        <div
          class="login__item"
          :class="{
            'is-danger':
              $v.restoreCode.$invalid && (restoreCode || showFormErrors)
          }"
        >
          <input
            type="text"
            name="code"
            :placeholder="$t('enterCode')"
            v-model.trim="restoreCode"
          />
        </div>
        <div class="login__button">
          <button
            v-if="!loading"
            class="btn"
            type="button"
            @click.prevent="sendCode"
          >
            {{ $t("sendCode") }}
          </button>
          <button v-else class="btn" type="button">
            <b-spinner small></b-spinner>
          </button>
        </div>
        <div class="login__back" @click="restoreStep = 1">
          {{ $t("back") }}
        </div>
      </div>
      <div v-else-if="restoreStep === 3">
        <div
          class="register__item"
          :class="{
            'is-danger':
              $v.restorePassword.$invalid && (restorePassword || showFormErrors)
          }"
        >
          <input
            type="password"
            name="password"
            autocomplete="current-password"
            v-model="restorePassword"
            :placeholder="$t('password')"
            required
          />
          <div class="error" v-if="!$v.restorePassword.minLength">
            {{
              $t("invalid_password_length", {
                length: $v.restorePassword.$params.minLength.min
              })
            }}
          </div>
          <div
            class="error"
            v-if="
              (!$v.restorePassword.isHasNumber ||
                !$v.restorePassword.isNotCyrillic ||
                !$v.restorePassword.isHasEnglishLetter) &&
                restorePassword
            "
          >
            {{ $t("invalid_password_content") }}
          </div>
        </div>
        <div
          class="register__item"
          :class="{
            'is-danger': $v.restoreCPassword.$invalid && restoreCPassword
          }"
        >
          <input
            type="password"
            name="c_password"
            autocomplete="current-password"
            v-model="restoreCPassword"
            :placeholder="$t('c_password')"
            required
          />
          <div
            class="error"
            v-if="!$v.restoreCPassword.sameAsPassword && restoreCPassword"
          >
            {{ $t("invalid_password_confirm") }}
          </div>
        </div>
        <div class="login__button">
          <button
            v-if="!loading"
            class="btn"
            type="button"
            @click.prevent="sendNewPassword"
          >
            {{ $t("restorePassword") }}
          </button>
          <button v-else class="btn" type="button">
            <b-spinner small></b-spinner>
          </button>
        </div>
        <div class="login__back" @click="restoreStep = 1">
          {{ $t("back") }}
        </div>
      </div>
    </div>
  </form>
</template>

<script>
/* eslint-disable */
import Vue from "vue";
import Validations from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import {
  isHasNumber,
  isNotCyrillic,
  isHasEnglishLetter
} from "@/shared/validator";

Vue.use(Validations);

export default {
  name: "Login",
  data() {
    return {
      form: {},
      restoreEmail: null,
      restoreCode: null,
      restorePassword: null,
      restoreCPassword: null,
      showFormErrors: false,
      restore: false,
      restoreStep: 1,
      loading: false
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
    },
    restoreEmail: {
      required,
      email
    },
    restoreCode: {
      required
    },
    restorePassword: {
      required,
      minLength: minLength(8),
      isHasNumber,
      isNotCyrillic,
      isHasEnglishLetter
    },
    restoreCPassword: {
      sameAsPassword: sameAs("restorePassword")
    }
  },
  methods: {
    login() {
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
      this.loading = true;
      this.$store.dispatch('user/login', {
        email: this.form.email,
        password: this.form.password.toLowerCase(),
      })
        .then(() => {
          this.$router.push({ name: 'Furniture' })
        })
        .catch(() => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["login_invalid"]
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendEmail() {
      if(this.$v.restoreEmail.$pending || this.$v.restoreEmail.$error || this.$v.restoreEmail.$invalid){
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
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);

      this.$store.dispatch('user/getCode', formData)
        .then(() => {
          this.$notify({
            group: 'warn',
            type: 'success',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["getCodeMessage"]
          });
          this.restoreStep = 2;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendCode() {
      if(this.$v.restoreEmail.$pending || this.$v.restoreEmail.$error || this.$v.restoreEmail.$invalid){
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
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);
      formData.append("codeMail", this.restoreCode);

      this.$store.dispatch('user/sendCode', formData)
        .then(() => {
          this.restoreStep = 3;
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendNewPassword() {
      if(this.$v.restorePassword.$pending || this.$v.restorePassword.$error || this.$v.restorePassword.$invalid){
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
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);
      formData.append("codeMail", this.restoreCode);
      formData.append("newPassword", this.restorePassword.toLowerCase());

      this.$store.dispatch('user/sendNewPassword', formData)
        .then(() => {
          this.$router.push({ name: 'Furniture' })
        })
        .catch((error) => {
          this.$notify({
            group: 'warn',
            type: 'error',
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/login", {
      title: "Авторизация",
      referer: document.referrer
    });
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.login {
  display: flex;
  flex-direction: column;
  &__item {
    margin-bottom: 35px;
    text-align: left;
    label {
      color: #fff;
      font-size: 18px;
      margin-bottom: 5px;
      font-family: $ffamily;
      opacity: 0.8;
    }
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
    /*margin-top: 40px;*/
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
  &__forgot {
    text-align: center;
    margin-top: 25px;
    color: #fff;
    font-family: $ffamily;
    font-size: 16px;
    cursor: pointer;
  }
  &__back {
    cursor: pointer;
    font-size: 15px;
    margin-top: 25px;
    font-family: $ffamily;
    color: #fff;
    opacity: 0.7;
  }
}
</style>
