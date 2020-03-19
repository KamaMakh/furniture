<template>
  <v-form
    ref="loginForm"
    v-if="!restore"
    v-model="loginValid"
    @submit.prevent="login"
    lazy-validation
  >
    <div class="login">
      <v-text-field
        v-model="form.email"
        :label="$t('email')"
        :placeholder="$t('email')"
        :rules="[rules.required, rules.email]"
        type="email"
        dark
        autocomplete="email"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :rules="[rules.required]"
        :type="showPass ? 'text' : 'password'"
        :label="$t('password')"
        :placeholder="$t('password')"
        dark
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass = !showPass"
        class="mb-2"
      ></v-text-field>
      <div class="login__button">
        <v-btn
          color="green"
          dark
          rounded
          large
          :loading="loading"
          @click.prevent="login"
        >
          {{ $t("login") }}
        </v-btn>
      </div>
    </div>
    <div class="login__forgot" @click.prevent="restore = true">
      {{ $t("forgotPassword") }}
    </div>
  </v-form>
  <v-form
    v-else-if="restoreStep === 1"
    v-model="step1Valid"
    ref="step1Form"
    @submit.prevent="sendEmail"
    lazy-validation
  >
    <div class="login">
      <v-text-field
        v-model="restoreEmail"
        :label="$t('email')"
        :placeholder="$t('email')"
        :rules="[rules.required, rules.email]"
        type="email"
        dark
        autocomplete="email"
        class="mb-2"
      ></v-text-field>
      <div class="login__button">
        <v-btn
          color="green"
          dark
          rounded
          large
          :loading="loading"
          @click.prevent="sendEmail"
        >
          {{ $t("restorePassword") }}
        </v-btn>
      </div>
      <div class="login__back" @click="restore = false">
        {{ $t("back") }}
      </div>
    </div>
  </v-form>
  <v-form
    v-else-if="restoreStep === 2"
    v-model="step2Valid"
    ref="step2Form"
    @submit.prevent="sendCode"
    lazy-validation
  >
    <div class="login">
      <v-text-field
        v-model="restoreCode"
        :label="$t('enterCode')"
        :placeholder="$t('enterCode')"
        :rules="[rules.required]"
        dark
        class="mb-2"
      ></v-text-field>
      <div class="login__button">
        <v-btn
          color="green"
          dark
          rounded
          large
          :loading="loading"
          @click.prevent="sendCode"
        >
          {{ $t("sendCode") }}
        </v-btn>
      </div>
      <div class="login__back" @click="restoreStep = 1">
        {{ $t("back") }}
      </div>
    </div>
  </v-form>
  <v-form
    v-else-if="restoreStep === 3"
    v-model="step3Valid"
    ref="step3Form"
    @submit.prevent="sendNewPassword"
    lazy-validation
  >
    <div class="login">
      <v-text-field
        v-model="restorePassword"
        :label="$t('password')"
        :placeholder="$t('password')"
        :rules="[rules.required, rules.min, rules.passwordRules]"
        dark
        :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass2 = !showPass2"
        :type="showPass2 ? 'text' : 'password'"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="restoreCPassword"
        :label="$t('c_password')"
        :placeholder="$t('c_password')"
        :rules="[rules.required, rules.sameAs]"
        dark
        autocomplete="current-password"
        :append-icon="showPass3 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass3 = !showPass3"
        :type="showPass3 ? 'text' : 'password'"
        class="mb-2"
      ></v-text-field>
      <div class="login__button">
        <v-btn
          color="green"
          dark
          rounded
          large
          :loading="loading"
          @click.prevent="sendNewPassword"
        >
          {{ $t("restorePassword") }}
        </v-btn>
      </div>
      <div class="login__back" @click="restoreStep = 1">
        {{ $t("back") }}
      </div>
    </div>
  </v-form>
</template>

<script>
import {
  required,
  isHasNumber,
  isNotCyrillic,
  isHasEnglishLetter,
  minLength,
  isEmail,
  sameAs
} from "@/shared/validator";

export default {
  name: "Login",
  // eslint-disable-next-line
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("alreadyOpen")) {
      next();
    } else {
      next(vm => {
        vm.$router.push({ name: "Registration" });
      });
    }
  },
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
      loading: false,
      loginValid: true,
      step1Valid: true,
      step2Valid: true,
      step3Valid: true,
      rules: {
        required: value => required(value) || this.$t("required"),
        min: v =>
          minLength(v, 8) ||
          this.$t("invalid_password_length", {
            length: 8
          }),
        emailMatch: () => "The email and password you entered don't match",
        email: v => isEmail(v) || this.$t("invalid_email"),
        sameAs: v =>
          sameAs(v, this.restorePassword) ||
          this.$t("invalid_password_confirm"),
        passwordRules: v => {
          return (
            (isHasNumber(v) && isNotCyrillic(v) && isHasEnglishLetter(v)) ||
            this.$t("invalid_password_content")
          );
        }
      },
      showPass: false,
      showPass2: false,
      showPass3: false,
      password: "Password"
    };
  },
  methods: {
    login() {
      if (!this.$refs.loginForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("user/login", {
          email: this.form.email,
          password: this.form.password.toLowerCase()
        })
        .then(() => {
          this.$router.push({ name: "Furniture" });
        })
        .catch(() => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["login_invalid"]
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendEmail() {
      if (!this.$refs.step1Form.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);

      this.$store
        .dispatch("user/getCode", formData)
        .then(() => {
          this.$notify({
            group: "warn",
            type: "success",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["getCodeMessage"]
          });
          this.restoreStep = 2;
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendCode() {
      if (!this.$refs.step2Form.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);
      formData.append("codeMail", this.restoreCode);

      this.$store
        .dispatch("user/sendCode", formData)
        .then(() => {
          this.restoreStep = 3;
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendNewPassword() {
      if (!this.$refs.step3Form.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("mail", this.restoreEmail);
      formData.append("codeMail", this.restoreCode);
      formData.append("newPassword", this.restorePassword.toLowerCase());

      this.$store
        .dispatch("user/sendNewPassword", formData)
        .then(() => {
          this.$router.push({ name: "Furniture" });
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
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
    &.is-danger {
      input,
      .vs__selected-options {
        border-bottom-color: #f04124 !important;
        color: #f04124;
      }
    }
  }
  &__button {
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
      background: #2aad54;
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
