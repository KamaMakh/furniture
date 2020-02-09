<template>
  <form @submit.prevent="register">
    <div class="register">
      <div class="register__item">
        <input
          type="text"
          name="fio"
          autocomplete="username"
          v-model="form.name"
          :placeholder="$t('name')"
          required
        />
      </div>
      <div
        class="register__item"
        :class="{
          'is-danger': $v.form.email.$invalid && (form.email || showFormErrors)
        }"
      >
        <input
          type="email"
          name="email"
          autocomplete="email"
          v-model.trim="form.email"
          :placeholder="$t('email')"
          required
        />
        <div class="error" v-if="!$v.form.email.email && form.email">
          {{ $t("invalid_email") }}
        </div>
      </div>
      <div class="register__item">
        <input
          type="text"
          name="phone"
          v-mask="'+7 (###) ###-##-##'"
          autocomplete="phone"
          v-model="form.phone"
          :placeholder="$t('phone')"
          required
        />
      </div>
      <div
        class="register__item"
        :class="{
          'is-danger':
            $v.form.password.$invalid && (form.password || showFormErrors)
        }"
      >
        <input
          type="password"
          name="password"
          autocomplete="current-password"
          v-model="form.password"
          :placeholder="$t('password')"
          required
        />
        <div class="error" v-if="!$v.form.password.minLength">
          {{
            $t("invalid_password_length", {
              length: $v.form.password.$params.minLength.min
            })
          }}
        </div>
        <div
          class="error"
          v-if="
            (!$v.form.password.isHasNumber ||
              !$v.form.password.isNotCyrillic ||
              !$v.form.password.isHasEnglishLetter) &&
              form.password
          "
        >
          {{ $t("invalid_password_content") }}
        </div>
      </div>
      <div
        class="register__item"
        :class="{ 'is-danger': $v.form.c_password.$invalid && form.c_password }"
      >
        <input
          type="password"
          name="c_password"
          autocomplete="current-password"
          v-model="form.c_password"
          :placeholder="$t('c_password')"
          required
        />
        <div
          class="error"
          v-if="!$v.form.c_password.sameAsPassword && form.c_password"
        >
          {{ $t("invalid_password_confirm") }}
        </div>
      </div>
      <div
        class="register__item"
        :class="{
          'is-danger': $v.form.role.$invalid && (form.role || showFormErrors)
        }"
      >
        <v-select
          class="style-chooser"
          :placeholder="$t('role')"
          :options="[
            $t('supervisor'),
            // $t('magazine'),
            // $t('client'),
            $t('architect')
          ]"
          v-model="form.role"
        >
        </v-select>
      </div>
      <div
        class="register__item"
        :class="{
          'is-danger':
            $v.form.currency.$invalid && (form.currency || showFormErrors)
        }"
      >
        <v-select
          class="style-chooser"
          :placeholder="$t('currency')"
          :options="currencies"
          v-model="form.currency"
        >
        </v-select>
      </div>
      <div class="register__item">
        <textarea
          name="info"
          cols="30"
          rows="3"
          :placeholder="$t('info')"
          v-model="form.info"
          required
        ></textarea>
      </div>
      <div class="register__item">
        <label>
          <p-check
            class="pretty p-image p-plain"
            @click="policy"
            name="test"
            v-model="policy"
          >
            <img slot="extra" class="image" src="../assets/policycheck.svg" />
            <span class="agree-text-wrap" @click="downloadWithVueResource()">{{
              $t("agree_text")
            }}</span>
          </p-check>
        </label>
      </div>
      <div class="register__button">
        <button
          v-if="!loading"
          class="btn"
          type="button"
          @click.prevent="register"
        >
          {{ $t("registration") }}
        </button>
        <button v-else class="btn" type="button">
          <b-spinner small></b-spinner>
        </button>
      </div>
    </div>

    <!--modals-->
    <transition name="fade">
      <div v-if="showModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  Тут будет текст...
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <!--<button type="button" class="btn btn-custom" @click="addConstruction">{{ $t("save") }}</button>-->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </form>
</template>

<script>
import Vue from "vue";
import Validations from "vuelidate";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import {
  isHasNumber,
  isNotCyrillic,
  isHasEnglishLetter
} from "@/shared/validator";
import "vue-select/dist/vue-select.css";
import VueMask from "v-mask";
import { mapState } from "vuex";
Vue.use(VueMask);
Vue.use(Validations);

export default {
  name: "Registration",
  data() {
    return {
      showFormErrors: false,
      // roles: [
      //   this.$i18n.messages[this.$store.state.lang]["supervisor"],
      //   // this.$i18n.messages[this.$store.state.lang]["magazine"],
      //   // this.$i18n.messages[this.$store.state.lang]["client"],
      //   this.$i18n.messages[this.$store.state.lang]["architect"]
      // ],
      roles_value: ["SUPERVISOR", "MAGAZINE", "CLIENT", "ARCHITECT"],
      showModal: false,
      form: {},
      policy: false,
      loading: false,
      url: "https://stroy-assist.ru/confirm.pdf"
    };
  },
  validations: {
    form: {
      name: { required },
      role: { required },
      currency: { required },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8),
        isHasNumber,
        isNotCyrillic,
        isHasEnglishLetter
      },
      c_password: {
        sameAsPassword: sameAs("password")
      }
    }
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
      let role, currency;
      if (this.form.role) {
        role = this.roles_value[this.roles.indexOf(this.form.role)];
      }
      if (this.form.currency) {
        currency = this.form.currency.code;
      }

      if (
        this.$v.form.$pending ||
        this.$v.form.$error ||
        this.$v.form.$invalid ||
        !this.policy ||
        !role ||
        !currency
      ) {
        Vue.notify({
          group: "warn",
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"],
          type: "warn",
          closeOnClick: true,
          duration: 4000
        });
        this.showFormErrors = true;
        return;
      }
      this.loading = true;
      this.$store
        .dispatch("user/register", {
          fio: this.form.name,
          email: this.form.email,
          password: this.form.password.toLowerCase(),
          phone: this.form.phone,
          role: role,
          currencyId: currency,
          info: this.form.info
        })
        .then(() => {
          this.$router.push({ name: "Furniture" });
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
    }
  },
  watch: {
    lang() {
      this.$store.dispatch("user/setCurrencies");
    }
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/registration", {
      title: "Регистрация",
      referer: document.referrer
    });
    this.$store.dispatch("user/setCurrencies");
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
