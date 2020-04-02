<template>
  <v-form
    v-model="registerValid"
    ref="registerForm"
    @submit.prevent="register"
    autocomplete="off"
  >
    <div class="register">
      <v-text-field
        v-model="form.email"
        :label="$t('email')"
        :placeholder="$t('email')"
        :rules="[rules.required, rules.email]"
        type="email"
        autocomplete="off"
        dark
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="form.password"
        :label="$t('password')"
        :placeholder="$t('password')"
        autocomplete="off"
        :rules="[rules.required, rules.min, rules.passwordRules]"
        dark
        :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass = !showPass"
        :type="showPass ? 'text' : 'password'"
        class="mb-2"
      ></v-text-field>
      <v-text-field
        v-model="form.c_password"
        :label="$t('c_password')"
        :placeholder="$t('c_password')"
        autocomplete="off"
        :rules="[rules.required, rules.sameAs]"
        dark
        :append-icon="showPass2 ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPass2 = !showPass2"
        :type="showPass2 ? 'text' : 'password'"
        class="mb-2"
      ></v-text-field>
      <div class="register__item">
        <v-checkbox
          v-model="policy"
          color="green"
          :rules="[rules.required]"
          :label="$t('agree_text')"
          dark
          append-icon="mdi-download"
          @click:append="downloadWithVueResource()"
        ></v-checkbox>
      </div>
      <div class="register__button">
        <v-btn
          color="green"
          dark
          rounded
          large
          :loading="loading"
          @click.prevent="register"
          :disabled="!policy || !registerValid"
        >
          {{ $t("registration") }}
        </v-btn>
      </div>
    </div>
  </v-form>
</template>

<script>
import Vue from "vue";
import {
  required,
  isHasNumber,
  isNotCyrillic,
  isHasEnglishLetter,
  isEmail,
  minLength,
  sameAs
} from "@/shared/validator";
import "vue-select/dist/vue-select.css";
import VueMask from "v-mask";
import { mapState } from "vuex";
Vue.use(VueMask);

export default {
  name: "Registration",
  data() {
    return {
      showFormErrors: false,
      roles_value: ["SUPERVISOR", "MAGAZINE", "CLIENT", "ARCHITECT"],
      showModal: false,
      form: {
        email: "",
        role: ""
      },
      policy: false,
      loading: false,
      url: "https://stroy-assist.ru/confirm.pdf",
      isClient: false,
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
          sameAs(v, this.form.password) || this.$t("invalid_password_confirm"),
        passwordRules: v => {
          return (
            (isHasNumber(v) && isNotCyrillic(v) && isHasEnglishLetter(v)) ||
            this.$t("invalid_password_content")
          );
        }
      },
      showPass: false,
      showPass2: false,
      registerValid: true
    };
  },
  computed: {
    ...mapState({
      currencies: state => {
        let array = [];
        state.user.currencies.forEach(item => {
          array.push({
            label: item.name,
            code: item.id
          });
        });
        return array;
      },
      lang: state => state.lang
    }),
    roles() {
      return [
        this.$i18n.messages[this.$store.state.lang]["supervisor"],
        this.$i18n.messages[this.$store.state.lang]["magazine"],
        this.$i18n.messages[this.$store.state.lang]["client"],
        this.$i18n.messages[this.$store.state.lang]["architect"]
      ];
    }
  },
  methods: {
    downloadWithVueResource() {
      window.open(this.url, "_blank");
    },
    register() {
      if (!this.$refs.registerForm.validate() || !this.policy) {
        this.loading = false;
        return;
      }
      let role = "SUPERVISOR",
        currency = 1,
        hostName = document.location.hostname;

      this.loading = true;
      this.$store
        .dispatch("user/register", {
          fio: this.form.name,
          email: this.form.email,
          password: this.form.password.toLowerCase(),
          phone: this.form.phone,
          role: role,
          currencyId: currency,
          info: this.form.info || "",
          adrSite: hostName
        })
        .then(() => {
          setTimeout(() => {
            this.$store.dispatch("user/getVerifyCode");
          }, 2000);
          this.$router.push({ name: "Personal" });
        })
        .catch(() => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["register_error"]
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    defaultData() {
      /*eslint-disable*/
      if (window.location.href.indexOf("?") > -1) {
        let href = decodeURIComponent(window.location.href).split("?")[1].split("&"),
          arr = [];
        href.forEach(item => {
          if (item.indexOf("=") > -1) {
            let localItem = item.split("=");
            arr[localItem[0]] = localItem[1];
          }
        });
        if (arr["mail"] !== undefined) {
          this.form.email = decodeURI(arr["mail"]);
        }
        if (arr["role"] !== undefined && arr["role"] === "client") {
          this.isClient = true;
          this.form.role = this.$i18n.messages[this.$store.state.lang][
            "client"
          ];
        }
      }
    }
  },
  watch: {
    lang() {
      this.$store.dispatch("user/setCurrencies");
    }
  },
  mounted() {
    this.defaultData();
    // eslint-disable-next-line
    ym(57324937, "hit", "#/registration", {
      title: "Регистрация",
      referer: document.referrer
    });
    this.$store.dispatch("user/setCurrencies");
    localStorage.setItem("alreadyOpen", "1");
  }
};
</script>

<style lang="scss">
@import "~pretty-checkbox/src/pretty-checkbox.scss";
$ffamily: "Roboto", sans-serif;

.register {
  display: flex;
  flex-direction: column;
  &__item {
    margin-bottom: 35px;
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
    textarea {
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
    .agree-text-wrap {
      display: block;
      white-space: normal;
      text-align: right;
      cursor: pointer;
    }
  }

  &__button {
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
    &.disabled {
      opacity: 0.8;
      pointer-events: none;
    }
  }

  .style-chooser {
    .vs__search {
      padding: 0;
      margin: 0;
    }
    .vs__search::placeholder {
      color: #fff !important;
    }
    .vs__dropdown-toggle {
      border: none;
    }
    .vs__selected {
      color: #fff;
      font-size: 19px;
      font-family: $ffamily;
      padding: 0;
      margin: 0;
      border: none;
    }
    .vs__clear,
    .vs__open-indicator {
      fill: #fff !important;
      cursor: pointer;
    }
    input {
      width: 50% !important;
      border: none !important;
    }
    .vs__selected-options {
      border-bottom: 2px solid rgba(255, 255, 255, 0.72);
      -webkit-border-radius: 0;
      -moz-border-radius: 0;
      border-radius: 0;
    }
  }

  .pretty {
    input {
      min-width: 0;
      width: 17px;
      height: 17px;
    }
    img {
      width: 17px !important;
      height: 17px !important;
      transform: none !important;
      top: -1px !important;
    }
    label {
      color: #fff;
      font-size: 14px;
      font-family: $ffamily;
      padding-left: 20px;
      &:after,
      &:before {
        width: 17px;
        height: 17px;
        top: -1px;
      }
    }
  }
}

.vs--disabled .vs__clear, .vs--disabled .vs__dropdown-toggle, .vs--disabled .vs__open-indicator, .vs--disabled .vs__search, .vs--disabled .vs__selected {
  background: transparent;
  opacity: 0.8;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
