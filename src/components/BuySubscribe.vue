<template>
  <div class="buy-subscribe">
    <div
      class="buy-subscribe__inner step-1"
      :class="{
        'step-2': step === 2,
        'step-3': step === 3,
        'step-4': step === 4
      }"
    >
      <div class="buy-subscribe-left">
        <div class="step-1__title">
          {{ $t("subscription") }}
        </div>
        <div
          v-for="(subscribe, key) in subscribes"
          :key="key"
          class="step-1__list"
        >
          <div
            v-if="subscribe.id === selectedSubscribeId"
            class="step-1__list-item list-item"
            @click="shooseSubscribe(subscribe, 'annual', subscribe.priceYear)"
          >
            <b-row>
              <b-col cols="6" class="align-items-center">
                <div class="list-item__title">
                  {{ $t("subscription") }} "{{ subscribe.name }}"
                </div>
                <div class="list-item__sub-title">
                  {{ $t("annual") }}
                </div>
              </b-col>
              <b-col
                cols="3"
                class="d-flex justify-content-end align-items-center"
              >
                <div
                  class="list-item__radio"
                  :class="{
                    active: subscribe.id === selectedSub.id && type === 'annual'
                  }"
                ></div>
              </b-col>
              <b-col
                cols="3"
                class="d-flex justify-content-end align-items-center"
              >
                <div class="list-item__price">
                  ₽{{ subscribe.priceYear }}
                </div>
              </b-col>
            </b-row>
          </div>
          <div
            v-if="subscribe.id === selectedSubscribeId"
            class="step-1__list-item list-item"
            @click="shooseSubscribe(subscribe, 'monthly', subscribe.priceMonth)"
          >
            <b-row>
              <b-col cols="6" class="align-items-center">
                <div class="list-item__title">
                  {{ $t("subscription") }} "{{ subscribe.name }}"
                </div>
                <div class="list-item__sub-title">
                  {{ $t("monthly") }}
                </div>
              </b-col>
              <b-col
                cols="3"
                class="d-flex justify-content-end align-items-center"
              >
                <div
                  class="list-item__radio"
                  :class="{
                    active:
                      subscribe.id === selectedSub.id && type === 'monthly'
                  }"
                ></div>
              </b-col>
              <b-col
                cols="3"
                class="d-flex justify-content-end align-items-center"
              >
                <div class="list-item__price">
                  ₽{{ subscribe.priceMonth }}
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="step-1__list">
          <div class="step-1__list-item list-item total">
            <b-row>
              <b-col cols="6" class="align-items-center">
                <div class="list-item__title">
                  {{ $t("total") }}
                </div>
              </b-col>
              <b-col
                cols="6"
                class="d-flex justify-content-end align-items-center"
              >
                <div class="total-price">
                  ₽{{ total }}
                </div>
              </b-col>
            </b-row>
          </div>
        </div>
        <div class="step-2__info info">
          <div class="info-title" :class="{ shown: cardsAnimate }">
            {{ $t("subscription") }}
          </div>
          <b-row class="price-block" :class="{ shown: cardsAnimate }">
            <b-col
              cols="8"
              class="align-items-start subscribe justify-content-end"
            >
              <div class="subscribe__title">
                {{ selectedSub.name }}
              </div>
              <div class="subscribe__sub-title">
                {{ $t(type) }}
              </div>
            </b-col>
            <b-col
              cols="4"
              class="d-flex justify-content-end align-items-start"
            >
              <div class="subscribe__price">
                ₽{{ total }}
              </div>
            </b-col>
          </b-row>
          <b-row class="price-block" :class="{ shown: cardsAnimate }">
            <b-col cols="6" class="align-items-center total">
              <div class="total__title">
                {{ $t("total") }}
              </div>
            </b-col>
            <b-col
              cols="6"
              class="d-flex justify-content-end align-items-center"
            >
              <div class="total__price">
                ₽{{ total }}
              </div>
            </b-col>
          </b-row>
        </div>
        <b-col cols="12" md="4" class="step-3__info">
          <div class="info-title" :class="{ shown: cardsAnimate }">
            {{ $t("subscription") }}
          </div>
          <b-row width="100%">
            <b-col cols="6" class="align-items-center total">
              <div class="total__title">
                {{ $t("total") }}
              </div>
            </b-col>
            <b-col
              cols="6"
              class="d-flex justify-content-end align-items-center"
            >
              <div class="total__price">
                ₽{{ total }}
              </div>
            </b-col>
          </b-row>
        </b-col>
      </div>
      <div class="buy-subscribe-right" :class="{ 'pos-rel': subsRightAnimate }">
        <div class="step-1__btn" @click="chooseCard">
          {{ $t("pay") }}
        </div>
        <b-col cols="12" md="12" class="step-2__cards cards">
          <div
            class="cards__close close"
            :class="{ shown: cardsAnimate }"
            @click="step = 1"
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-6.10352e-05 31.8198L31.8197 1.69125e-05L32.5269 0.707124L0.707046 32.5269L-6.10352e-05 31.8198Z"
                fill="#E0E0E0"
              />
              <path
                d="M0.707031 0L32.5268 31.8198L31.8197 32.5269L-7.55191e-05 0.707107L0.707031 0Z"
                fill="#E0E0E0"
              />
            </svg>
          </div>
          <div class="cards__title" :class="{ shown: cardsAnimate }">
            {{ $t("choose_payment") }}
          </div>
          <div class="cards__list" :class="{ shown: cardsAnimate }">
            <div
              v-for="(card, key) in cards"
              :key="key"
              class="cards__card"
              @click="formPage"
            >
              <span v-html="card.img"></span>
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="8" class="step-3__cards cards">
          <div class="cards__close" @click="step = 2">
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M-6.10352e-05 31.8198L31.8197 1.69125e-05L32.5269 0.707124L0.707046 32.5269L-6.10352e-05 31.8198Z"
                fill="#E0E0E0"
              />
              <path
                d="M0.707031 0L32.5268 31.8198L31.8197 32.5269L-7.55191e-05 0.707107L0.707031 0Z"
                fill="#E0E0E0"
              />
            </svg>
          </div>
          <b-form
            onsubmit="pay(this);   return false;"
            @submit.prevent="submitTinkoff"
          >
            <b-form-group
              id="input-group-2"
              :label="$t('name')"
              label-for="input-2"
              :class="{
                'is-danger':
                  $v.form.name.$invalid && (form.name || showFormErrors)
              }"
            >
              <b-form-input
                id="name"
                v-model="form.name"
                required
                name="name"
                :placeholder="$t('name')"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              :label="$t('email')"
              label-for="input-2"
              :class="{
                'is-danger':
                  $v.form.email.$invalid && (form.email || showFormErrors)
              }"
            >
              <b-form-input
                v-model="form.email"
                type="email"
                name="email"
                required
                :placeholder="$t('email')"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-2"
              :label="$t('phone')"
              label-for="input-2"
            >
              <b-form-input
                v-model="form.phone"
                v-mask="'+7 (###) ###-##-##'"
                required
                name="phone"
                :placeholder="$t('phone')"
              ></b-form-input>

              <input
                class="tinkoffPayRow"
                type="hidden"
                name="terminalkey"
                value="1576306066627DEMO"
              />
              <input
                class="tinkoffPayRow"
                type="hidden"
                name="frame"
                value="true"
              />
              <input
                class="tinkoffPayRow"
                type="hidden"
                name="language"
                :value="lang"
              />
              <input
                class="tinkoffPayRow"
                type="hidden"
                name="amount"
                :value="form.amount"
              />
              <input
                class="tinkoffPayRow"
                type="hidden"
                name="order"
                :value="form.orderId"
              />
            </b-form-group>
            <b-button type="submit" squared class="submit-btn">
              {{ $t("pay") }}
            </b-button>
          </b-form>
        </b-col>
        <div class="step-4__title" :class="{ shown: step4Animate }">
          {{ $t("thanks") }}!
        </div>
        <div class="step-4__sub-title" :class="{ shown: step4Animate }">
          {{ $t("redirect_bank") }}
        </div>
        <div
          class="step-4__btn"
          :class="{ shown: step4Animate }"
          @click="$emit('hideModal')"
        >
          Ok
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import Validations from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import VueMask from "v-mask";
Vue.use(VueMask);
Vue.use(Validations);
export default {
  name: "BuySubscribe",
  props: ["selectedSubscribeId"],
  data() {
    return {
      form: {},
      step: 1,
      total: 0,
      type: null,
      selectedSub: {},
      showFormErrors: false,
      cards: [
        {
          name: "Visa",
          img:
            '<svg style="max-width: 100%;" width="202" height="66" viewBox="0 0 202 66" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<g clip-path="url(#clip0)">\n' +
            '<path d="M87.5331 65.0478H71.1697L81.4045 1.15808H97.7671L87.5331 65.0478Z" fill="#00579F"/>\n' +
            '<path d="M146.852 2.72004C143.624 1.42732 138.505 0 132.175 0C116.016 0 104.637 8.69943 104.567 21.137C104.433 30.3134 112.714 35.4102 118.908 38.4699C125.239 41.5965 127.391 43.6372 127.391 46.424C127.326 50.7042 122.275 52.6772 117.564 52.6772C111.031 52.6772 107.53 51.66 102.211 49.2787L100.056 48.2579L97.7662 62.5997C101.604 64.3649 108.675 65.9314 116.016 66C133.186 66 144.364 57.4352 144.496 44.181C144.561 36.908 140.188 31.3351 130.761 26.7812C125.037 23.8579 121.532 21.8868 121.532 18.8957C121.6 16.1766 124.497 13.3915 130.957 13.3915C136.277 13.2551 140.186 14.546 143.147 15.8378L144.627 16.5163L146.852 2.72004Z" fill="#00579F"/>\n' +
            '<path d="M168.6 42.414C169.948 38.7436 175.133 24.5381 175.133 24.5381C175.065 24.6745 176.478 20.8 177.286 18.4214L178.43 23.9265C178.43 23.9265 181.529 39.2196 182.201 42.414C179.644 42.414 171.832 42.414 168.6 42.414ZM188.799 1.15808H176.142C172.239 1.15808 169.273 2.31258 167.589 6.45904L143.283 65.0469H160.453C160.453 65.0469 163.28 57.1614 163.887 55.4631C165.771 55.4631 182.473 55.4631 184.897 55.4631C185.366 57.7062 186.849 65.0469 186.849 65.0469H202L188.799 1.15808Z" fill="#00579F"/>\n' +
            '<path d="M57.5024 1.15808L41.4772 44.7248L39.7261 35.8889C36.7633 25.6935 27.4716 14.6164 17.1025 9.10862L31.781 64.9801H49.0849L74.8053 1.15808H57.5024Z" fill="#00579F"/>\n' +
            '<path d="M26.5965 1.15808H0.269337L0 2.44899C20.5368 7.75085 34.1379 20.5308 39.726 35.8916L34.0028 6.5286C33.0606 2.44809 30.165 1.29268 26.5965 1.15808Z" fill="#FAA61A"/>\n' +
            "</g>\n" +
            "<defs>\n" +
            '<clipPath id="clip0">\n' +
            '<rect width="202" height="66" fill="white"/>\n' +
            "</clipPath>\n" +
            "</defs>\n" +
            "</svg>\n"
        },
        {
          name: "MasterCard",
          img:
            '<svg style="max-width: 100%;" width="305" height="126" viewBox="0 0 305 126" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
            '<rect width="305" height="126" fill="url(#pattern0)"/>\n' +
            "<defs>\n" +
            '<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">\n' +
            '<use xlink:href="#image0" transform="translate(-0.00204918) scale(0.00286885 0.00694444)"/>\n' +
            "</pattern>\n" +
            '<image id="image0" width="350" height="144" xlink:href="data:image/png;base64,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"/>\n' +
            "</defs>\n" +
            "</svg>\n"
        }
      ],
      cardsAnimate: false,
      subsRightAnimate: false,
      step4Animate: false
    };
  },
  validations: {
    form: {
      email: {
        required,
        email
      },
      name: {
        required
      },
      phone: {
        required
      }
    }
  },
  mounted() {
    this.$store.dispatch("furniture/getSubscribesList");
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      subscribes: state => state.furniture.subscribes,
      lang: state => state.lang
    })
  },
  methods: {
    shooseSubscribe(subscribe, type, price) {
      this.type = type;
      this.selectedSub = subscribe;
      this.total = price;
    },
    chooseCard() {
      if (this.selectedSub && this.type) {
        this.getOrderInfo();
        this.step = 2;
      }
    },
    formPage() {
      this.step = 3;
      this.form["name"] = this.user.name;
      this.form["email"] = this.user.email;
    },
    submitTinkoff() {
      this.step = 4;
      setTimeout(() => {
        this.$emit("hideModal");
      }, 2000);
    },
    getOrderInfo() {
      let formData = new FormData(),
        mounthCount = this.type === "annual" ? "12" : "1";
      formData.append("subscriptionId", this.selectedSub.id);
      formData.append("countMonth", mounthCount);
      this.$store
        .dispatch("furniture/createOrder", formData)
        .then(response => {
          if (
            response.hasOwnProperty("currentPrice") &&
            response.hasOwnProperty("orderId")
          ) {
            this.form["amount"] = response.currentPrice * 62;
            this.form["orderId"] = response.orderId;
          }
        })
        .catch(() => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: this.$i18n.messages[this.$i18n.locale]["register_error"]
          });
        });
    }
  },
  watch: {
    step(value) {
      if (value === 2) {
        setTimeout(() => {
          this.subsRightAnimate = true;
        }, 300);
        setTimeout(() => {
          this.cardsAnimate = true;
        }, 500);
        setTimeout(() => {
          this.step4Animate = false;
        }, 500);
      } else if (value === 3) {
        setTimeout(() => {
          this.subsRightAnimate = true;
        }, 300);
        setTimeout(() => {
          this.cardsAnimate = false;
        }, 500);
        setTimeout(() => {
          this.step4Animate = false;
        }, 500);
      } else if (value === 4) {
        setTimeout(() => {
          this.step4Animate = true;
        }, 500);
      } else {
        setTimeout(() => {
          this.cardsAnimate = false;
        }, 500);
        setTimeout(() => {
          this.subsRightAnimate = false;
        }, 300);
      }
    }
  }
};
</script>

<style scoped lang="scss">
@import url("https://fonts.googleapis.com/css?family=Raleway:400,600,700&display=swap");
.tinkoffPayRow {
  display: block;
  margin: 1%;
  width: 160px;
}
.buy-subscribe {
  font-family: "Raleway", sans-serif !important;
  * {
    transition: all 0.5s !important;
  }
  .step-1 {
    padding: 0;
    display: flex;
    flex-direction: column;
    max-width: 100%;
    height: 380px;
    width: 508px;
    overflow: hidden;
    @media all and(max-width: 480px) {
      height: 290px;
    }
    .close,
    .step-2__cards,
    .step-3__cards.cards,
    .info,
    .step-3__info {
      display: none;
      opacity: 0;
      position: absolute;
    }
    .step-4__title,
    .step-4__sub-title,
    .step-4__btn {
      position: absolute;
      top: -100%;
      opacity: 0;
      z-index: -1;
    }
    .cards__list {
      position: absolute;
      opacity: 0;
      left: -100%;
    }
    .cards__title,
    .info-title {
      position: absolute;
      opacity: 0 !important;
      right: -50px;
    }
    .price-block {
      position: absolute;
      left: -100%;
      opacity: 0;
    }
    .cards__close {
      display: none;
    }
    .buy-subscribe-left {
      padding: 15px 15px 0 15px;
    }
    .buy-subscribe-right {
      margin: 21px auto 15px auto;
      background: rgba(#364b3c, 1);
      height: 36px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      transition-timing-function: ease;
      align-self: flex-end;
      width: 100%;
      max-width: 90%;
      min-width: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: width 0.5s, height 0.8s !important;
      position: initial;
      left: auto;
      top: auto;
      bottom: 0;
      right: 0;
      &.pos-rel {
        position: relative !important;
      }
    }
    &.step-2 {
      flex-direction: row;
      .step-1__title,
      .step-1__list,
      .step-1__btn {
        display: none;
      }
      .cards__close {
        display: block;
      }
      .info {
        display: flex;
      }
      .buy-subscribe-left,
      .buy-subscribe-right {
        width: 50%;
        padding: 0;
        margin: 0;
        height: 100%;
        flex-grow: 0;
      }
      .buy-subscribe-right {
        background: rgba(#364b3c, 1);
        position: absolute;
        bottom: 0;
      }
      .close,
      .step-2__cards,
      .info {
        /*display: none;*/
        opacity: 1;
        position: relative;
        left: 0;
      }
      .close {
        position: absolute;
      }
      .step-2__cards {
        position: relative;
      }
    }
    &.step-3 {
      flex-direction: row;
      .step-1__title,
      .step-1__list,
      .step-1__btn {
        display: none;
      }
      .step-2__cards {
        display: none;
        opacity: 0;
        position: absolute;
      }
      .buy-subscribe-left {
        padding: 0;
        margin: 0;
        max-width: none;
        width: 30%;
        @media all and(max-width: 480px) {
          width: 40%;
        }
      }
      .buy-subscribe-right {
        background: #688e74;
        box-shadow: 0 0 18px rgba(255, 255, 255, 0.25);
        bottom: 0;
        width: 70%;
        margin: 0;
        height: 100%;
        flex-grow: 0;
        padding: 32px 35px;
        max-width: none;
        @media all and(max-width: 480px) {
          padding: 15px 0;
          width: 60%;
        }
      }
      .info-title {
        position: relative;
        opacity: 0.6 !important;
        right: 0;
      }
      .buy-subscribe .step-2__info .price-block {
        position: absolute;
        right: -100%;
        opacity: 0;
      }
      .step-3__cards,
      .step-3__info {
        display: flex;
        opacity: 1;
        position: relative;
        left: 0;
      }
      .step-3__cards {
        position: relative;
        max-width: none;
      }
      .step-3__info {
        width: 100%;
        max-width: none;
        height: 100%;
        justify-content: space-between;
        padding-bottom: 60px;
        @media all and(max-width: 480px) {
          padding-bottom: 0;
        }
      }
    }
    &.step-4 {
      padding: 0;
      .step-1__title,
      .step-1__list,
      .step-1__btn {
        display: none;
      }
      .step-2__cards,
      .step-3__cards {
        display: none;
        opacity: 0;
        position: absolute;
      }
      .buy-subscribe-left {
        display: none;
      }
      .buy-subscribe-right {
        display: flex;
        flex-direction: column;
        background: #688e74;
        box-shadow: 0 0 18px rgba(255, 255, 255, 0.25);
        bottom: 0;
        width: 100%;
        margin: 0;
        height: 100%;
        flex-grow: 1;
        padding: 32px 35px;
        max-width: none;
        @media all and(max-width: 480px) {
          padding: 15px;
          width: 60%;
        }
      }
      .step-4__title,
      .step-4__sub-title,
      .step-4__btn {
        /*opacity: 1;*/
        /*position: relative;*/
        /*display: flex;*/
        &.shown {
          position: relative !important;
          top: 0 !important;
          opacity: 1 !important;
          z-index: 1 !important;
        }
      }
    }
    &__title {
      font-size: 22px;
      font-weight: bold;
      color: #4f4f4f;
      text-align: center;
      margin-bottom: 24px;
      @media all and(max-width: 480px) {
        margin-bottom: 10px;
        font-size: 16px;
      }
    }
    &__list {
      .list-item {
        cursor: pointer;
        align-items: center;
        padding-bottom: 15px;
        border-bottom: 1px solid #e0e0e0;
        margin-bottom: 15px;
        @media all and(max-width: 480px) {
          margin-bottom: 0;
          border: none;
          padding-bottom: 10px;
        }
        &__title {
          font-size: 15px;
          font-weight: 600;
          color: #4f4f4f;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
        &__sub-title {
          font-weight: 500;
          color: #828282;
          font-size: 14px;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
        &__radio {
          width: 20px;
          height: 20px;
          background: url("../assets/radio-bg.png") 0 0 no-repeat;
          -webkit-background-size: contain;
          background-size: contain;
          &.active {
            background: url("../assets/radio-bg-active.png") 0 0 no-repeat;
            -webkit-background-size: contain;
            background-size: contain;
          }
          @media all and(max-width: 480px) {
            width: 15px;
            height: 15px;
          }
        }
        &__price {
          font-size: 16px;
          font-weight: 600;
          color: #4f4f4f;
          @media all and(max-width: 480px) {
            font-size: 14px;
          }
        }
        &.total {
          .total-price {
            font-size: 16px;
            color: #4f4f4f;
            font-weight: 800;
            text-align: right;
          }
        }
      }
    }
    &__btn {
      /*margin-top: 21px;*/
      background: #364b3c;
      box-sizing: border-box;
      font-weight: 600;
      font-size: 16px;
      line-height: 16px;
      font-feature-settings: "pnum" on, "lnum" on;
      color: #ffffff;
      /*padding: 10px;*/
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 100%;
      height: 100%;
    }
  }
  .step-2 {
    &__info {
      background: #fff;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      padding: 20px 10px;
      height: 100%;
      .info-title {
        font-size: 22px;
        color: #4f4f4f;
        opacity: 0.6;
        font-weight: bold;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        &.shown {
          opacity: 0.6 !important;
          position: relative !important;
          right: 0 !important;
        }
        @media all and(max-width: 480px) {
          font-size: 16px;
        }
      }
      .price-block {
        padding-left: 20px;
        width: 100%;
        margin-bottom: -30px;
        &.shown {
          opacity: 1 !important;
          position: relative !important;
          left: 0 !important;
        }
        &:last-child {
          padding-bottom: 30px;
          margin-bottom: 0;
        }
        @media all and(max-width: 480px) {
          padding-left: 0;
        }
      }
      .subscribe {
        width: 100%;
        margin-bottom: 20px;
        &__title {
          font-size: 16px;
          font-weight: 600;
          color: #4f4f4f;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
        &__sub-title {
          font-size: 14px;
          font-weight: 500;
          color: #828282;
          @media all and(max-width: 480px) {
            font-size: 12px;
          }
        }
        &__price {
          font-size: 16px;
          font-weight: 600;
          color: #959595;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
      }
      .total {
        &__title {
          font-size: 16px;
          font-weight: bold;
          color: #4f4f4f;
          opacity: 0.6;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
        &__price {
          font-size: 16px;
          font-weight: bold;
          color: #4f4f4f;
          opacity: 0.6;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
      }
    }
    .cards {
      background: #364b3c;
      padding: 20px 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      height: 100%;
      @media all and(max-width: 480px) {
        padding: 10px;
      }
      &__title {
        font-size: 22px;
        font-weight: bold;
        color: #f2f2f2;
        text-align: center;
        margin-bottom: 20px;
        &.shown {
          opacity: 1 !important;
          position: relative !important;
          right: 0 !important;
        }
        @media all and(max-width: 480px) {
          font-size: 16px;
        }
      }
      &__list {
        display: flex;
        flex-flow: wrap column;
        &.shown {
          position: relative !important;
          left: 0 !important;
          opacity: 1 !important;
        }
      }
      &__card {
        width: 190px;
        height: 110px;
        box-shadow: 0px 0px 18px rgba(255, 255, 255, 0.25);
        border-radius: 16px;
        background: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        padding: 10px;
        @media all and(max-width: 480px) {
          width: 100px;
          height: 70px;
        }
        span {
          display: block;
          max-width: 100%;
        }
        svg {
          max-width: 100%;
        }
        &:first-child {
          margin-bottom: 15px;
        }
      }
      &__close {
        cursor: pointer;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 40px;
        left: 9px !important;
        z-index: 5 !important;
        @media all and(max-width: 480px) {
          width: 15px;
          height: 15px;
          top: 0;
          left: 0;
        }
        svg {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .row {
      width: 100%;
      margin: 0;
    }
  }
  .step-3 {
    &__info {
      background: #fff;
      padding: 20px 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      margin: 0;
      .info-title {
        font-size: 16px;
        color: #4f4f4f;
        opacity: 0.6;
        font-weight: bold;
        width: 100%;
        text-align: center;
        margin-bottom: 30px;
        &.shown {
          opacity: 0.6 !important;
          position: relative !important;
          right: 0 !important;
        }
      }
      @media all and(max-width: 480px) {
        font-size: 13px;
      }
      .subscribe {
        width: 100%;
        margin-bottom: 15px;
      }
      .total {
        &__title {
          font-size: 16px;
          font-weight: bold;
          color: #4f4f4f;
          opacity: 0.6;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
        &__price {
          font-size: 16px;
          font-weight: bold;
          color: #4f4f4f;
          opacity: 0.6;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
        }
      }
    }
    .cards {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      width: 100%;
      flex: 1;
      form {
        width: 100%;
        max-width: 100%;
        margin: 0 auto;
        .form-group {
          input {
            font-size: 16px;
            color: #e0e0e0;
            background: none;
            border: none;
            border-bottom: 1px solid #e0e0e0;
            border-radius: 0;
            padding: 0 0 10px 0;
            outline: none;
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
          background: rgba(255, 255, 255, 0.2);
          font-size: 16px;
          font-weight: 600;
          color: #fff;
          border: none;
          display: block;
          width: 100%;
          margin-top: 40px;
          padding: 12px 8px;
          @media all and(max-width: 480px) {
            font-size: 13px;
          }
          &:hover {
            background: #fff;
            color: #364b3c;
          }
        }
      }
      &__close {
        display: block;
        cursor: pointer;
        position: absolute;
        width: 20px;
        height: 20px;
        top: 0;
        left: -15px;
        @media all and(max-width: 480px) {
          width: 15px;
          height: 15px;
          left: auto;
          top: 5px;
          right: 10px;
        }
        svg {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
    .row {
      width: 100%;
      margin: 0;
    }
  }
  .step-4 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 0 18px rgba(255, 255, 255, 0.25);
    padding: 15px;
    &__title {
      font-size: 30px;
      font-weight: 600;
      color: #fff;
      @media all and(max-width: 480px) {
        font-size: 20px;
      }
    }
    &__sub-title {
      font-size: 14px;
      color: #fff;
      font-weight: normal;
      @media all and(max-width: 480px) {
        font-size: 12px;
      }
    }
    &__btn {
      cursor: pointer;
      margin-top: 25px;
      width: 180px;
      height: 50px;
      background: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: 600;
      color: #364b3c;
      @media all and(max-width: 480px) {
        font-size: 14px;
      }
    }
  }
}
</style>
