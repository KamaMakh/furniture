<template>
  <div class="verify-mail">
    <v-card>
      <div v-if="step === 1" class="verify-mail__inner">
        <div class="verify-mail__title">
          <v-card-title class="text-center justify-center">
            {{ $t("verify.title1") }}
          </v-card-title>
        </div>
        <div class="verify-mail__text">
          <v-card-text>
            {{ $t("verify.text1") }} <br /><span>"{{ user.email }}"</span>.
            <br />
            {{ $t("verify.text2") }}
          </v-card-text>
        </div>
        <v-form @submit.prevent="sendCode" ref="codeForm" v-model="formValid">
          <v-card-text class="justify-center">
            <v-col cols="10" class="ma-auto">
              <v-text-field
                v-model="code"
                :label="$t('enterCode')"
                :placeholder="$t('enterCode')"
                :rules="[rules.required]"
              ></v-text-field>
            </v-col>
          </v-card-text>
          <div class="verify-mail__resend" @click="sendEmail">
            {{ $t("verify.noMessage") }}
          </div>
          <v-card-actions class="justify-center mt-4">
            <v-btn
              color="#688e74"
              large
              :loading="loading"
              dark
              type="submit"
              class="mt-2"
            >
              {{ $t("ok") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </div>
    </v-card>
  </div>
</template>

<script>
import { required } from "@/shared/validator";
import { mapState } from "vuex";
export default {
  name: "VerifyMail",
  data() {
    return {
      code: null,
      email: null,
      showFormErrors: false,
      step: 1,
      loading: false,
      formValid: true,
      rules: {
        required: value => required(value) || this.$t("required")
      }
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    sendCode() {
      if (!this.$refs.codeForm.validate()) {
        this.loading = false;
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
        .catch(() => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["verify"]["wrongCode"]
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    sendEmail() {
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
