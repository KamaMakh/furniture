<template>
  <div class="verify-mail">
    <div v-if="step === 1" class="verify-mail__inner">
      <div class="verify-mail__title">
        {{ $t("verify.title1") }}
      </div>
      <div class="verify-mail__text">
        {{ $t("verify.text1") }} <br /><span>"{{ user.email }}"</span>. <br />
        {{ $t("verify.text2") }}
      </div>
      <b-form @submit.prevent="sendCode">
        <b-form-group
          id="input-group-2"
          :label="$t('enterCode')"
          label-for="input-2"
          :class="{
            'is-danger': $v.code.$invalid && (code || showFormErrors)
          }"
        >
          <b-form-input
            id="name"
            v-model="code"
            required
            name="name"
            :placeholder="$t('enterCode')"
          ></b-form-input>
        </b-form-group>
        <div class="verify-mail__resend" @click="step = 2">
          {{ $t("verify.noMessage") }}
        </div>
        <b-button type="submit" squared class="submit-btn">
          ok
        </b-button>
      </b-form>
    </div>
    <div v-else class="verify-mail__inner">
      <div class="verify-mail__title">
        {{ $t("verify.title1") }}
      </div>
      <div class="verify-mail__text">
        {{ $t("verify.title2") }}
      </div>
      <b-form @submit.prevent="sendEmail">
        <b-form-group
          id="input-group-2"
          :label="$t('email')"
          label-for="input-2"
          :class="{
            'is-danger': $v.email.$invalid && (email || showFormErrors)
          }"
        >
          <b-form-input
            id="name"
            v-model="email"
            required
            name="name"
            :placeholder="$t('email')"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" squared class="submit-btn">
          ok
        </b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapState } from "vuex";
export default {
  name: "VerifyMail",
  data() {
    return {
      code: null,
      email: null,
      showFormErrors: false,
      step: 1,
      loading: false
    };
  },
  validations: {
    code: { required },
    email: { required, email }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    sendCode() {
      if (
        this.$v.code.$pending ||
        this.$v.code.$error ||
        this.$v.code.$invalid
      ) {
        this.$notify({
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
      let formData = new FormData();
      formData.append("codeMail", this.code);

      this.$store
        .dispatch("user/sendVerifyCode", formData)
        .then(() => {
          this.$emit("hideModal");
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
    sendEmail() {
      if (
        this.$v.email.$pending ||
        this.$v.email.$error ||
        this.$v.email.$invalid
      ) {
        this.$notify({
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
        .dispatch("user/getVerifyCode")
        .then(() => {
          this.$notify({
            group: "warn",
            type: "success",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["getCodeMessage"]
          });
          this.step = 1;
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
  }
};
</script>

<style scoped lang="scss">
.verify-mail {
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  &__title {
    color: #4f4f4f;
    opacity: 0.6;
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  &__text {
    color: #000;
    font-size: 16px;
    font-weight: 200;
    margin-bottom: 20px;
    span {
      color: #688e74;
    }
  }
  form {
    width: 100%;
    max-width: 100%;
    margin: 0 auto;
    .form-group {
      margin-bottom: 17px;
      input {
        text-align: center;
        width: 200px;
        font-size: 20px;
        color: #000;
        background: none;
        border: none;
        border-bottom: 1px solid #e0e0e0;
        border-radius: 0;
        padding: 0 0 10px 0;
        outline: none;
        margin: 0 auto;
        @media all and(max-width: 480px) {
          font-size: 13px;
        }
        &:focus {
          outline: none;
          -webkit-box-shadow: none;
          -moz-box-shadow: none;
          box-shadow: none;
        }
        &::placeholder {
          color: #e0e0e0;
        }
      }
    }
    .submit-btn {
      background: #688e74;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      border: none;
      display: block;
      margin: 27px auto 0;
      padding: 12px 8px;
      transition: all 0.3s;
      width: 120px;
      @media all and(max-width: 480px) {
        font-size: 13px;
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
  &__resend {
    color: #0029fe;
    font-size: 12px;
    cursor: pointer;
  }
}
</style>
