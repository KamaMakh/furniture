<template>
  <b-row class="settings-blocks">
    <b-col class="block" sm="6" md="3" xs="12">
      <div class="photo">
        <img
          src="data:image/png;base64,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"
        />
      </div>
      <div class="subtitle">
        {{ $t("tariffsPage.free.subTitle") }}
      </div>
      <div class="price">
        {{ $t("tariffsPage.free.price") }}
      </div>
      <div class="options">
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.free.ability1") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.free.ability2") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.free.ability3") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.free.ability4") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.free.ability5") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.free.ability6") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.free.ability7") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.free.ability8") }}
        </div>
      </div>
      <div
        v-if="
          user.userSubscription &&
            user.userSubscription.name === $t('tariffsPage.free.tariffName')
        "
        class="btn"
      >
        {{ $t("tariffsPage.free.btnText") }}
      </div>
    </b-col>

    <b-col class="block" sm="6" md="3" xs="12">
      <div v-if="true" class="flag">
        {{ $t("tariffsPage.optimal.flag") }}
      </div>
      <div class="photo">
        <img src="../assets/monthly.svg" />
      </div>
      <div class="subtitle">
        {{ $t("tariffsPage.optimal.subTitle") }}
      </div>
      <div class="price">
        {{ $t("tariffsPage.optimal.price") }}
      </div>
      <div class="options">
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.optimal.ability1") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.optimal.ability2") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.optimal.ability3") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.optimal.ability4") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.optimal.ability5") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.optimal.ability6") }}
        </div>
        <div class="option" :class="{ notAvailable: true }">
          {{ $t("tariffsPage.optimal.ability7") }}
        </div>
      </div>
      <div
        v-if="
          user.userSubscription &&
            user.userSubscription.name !== $t('tariffsPage.premium.tariffName')
        "
        class="btn"
      >
        <b-button
          v-if="
            user.userSubscription &&
              user.userSubscription.name !==
                $t('tariffsPage.optimal.tariffName')
          "
          variant="success"
          @click="
            showSubscribeModal = true;
            subId = 2;
          "
        >
          {{ $t("tariffsPage.optimal.btnText") }}
        </b-button>
        <div v-else class="btn">
          {{ $t("tariffsPage.free.btnText") }}
        </div>
      </div>
    </b-col>

    <b-col class="block" sm="6" md="3" xs="12">
      <div v-if="true" class="flag">
        {{ $t("tariffsPage.premium.flag") }}
      </div>
      <div class="photo">
        <img src="../assets/loan.svg" />
      </div>
      <div class="subtitle">
        {{ $t("tariffsPage.premium.subTitle") }}
      </div>
      <div class="price">
        {{ $t("tariffsPage.premium.price") }}
      </div>
      <div class="options">
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability1") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability2") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability3") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability4") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability5") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability6") }}
        </div>
        <div class="option" :class="{ notAvailable: false }">
          {{ $t("tariffsPage.premium.ability7") }}
        </div>
      </div>
      <div class="btn">
        <b-button
          v-if="
            user.userSubscription &&
              user.userSubscription.name !==
                $t('tariffsPage.premium.tariffName')
          "
          variant="success"
          @click="
            showSubscribeModal = true;
            subId = 3;
          "
        >
          {{ $t("tariffsPage.premium.btnText") }}
        </b-button>
        <div v-else class="btn">
          {{ $t("tariffsPage.free.btnText") }}
        </div>
      </div>
    </b-col>

    <!--modals-->
    <b-modal
      v-model="showSubscribeModal"
      dialog-class="subscribe-modal"
      body-class="subscribe-modal"
      hide-footer
      hide-header
      centered
    >
      <BuySubscribe
        @hideModal="showSubscribeModal = false"
        :selectedSubscribeId="subId"
      />
    </b-modal>
  </b-row>
</template>

<script>
import BuySubscribe from "@/components/BuySubscribe";
import { mapState } from "vuex";
export default {
  name: "SettingsBlocks",
  data() {
    return {
      showSubscribeModal: false,
      subId: null
    };
  },
  components: {
    BuySubscribe
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>

<style scoped lang="scss">
.settings-blocks {
  display: flex;
  flex-flow: wrap row;
  justify-content: space-around;
  background: #cad7cf;
  padding: 35px;
  margin: 0 auto;
  .block {
    background: #fff;
    padding: 30px 20px 30px;
    display: flex;
    flex-direction: column;
    margin: 10px;
    position: relative;
    .photo {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      margin: 0 auto 10px;
      img {
        max-width: 100%;
      }
    }
    .subtitle {
      margin: 8px 0 4px;
      font-weight: bold;
    }
    .price {
      font-size: 14px;
      margin-bottom: 8px;
      font-weight: bold;
    }
    .options {
      display: flex;
      flex-direction: column;
      .option {
        color: #2d2d2d;
        font-size: 13px;
        text-align: left;
        padding-left: 25px;
        margin-bottom: 8px;
        position: relative;
        display: flex;
        align-items: center;
        &:before {
          content: "";
          display: block;
          position: absolute;
          width: 15px;
          height: 10px;
          left: 0;
          top: 50%;
          margin-top: -6px;
          background: url("../assets/settings_ico.png") 0 0 no-repeat;
          -webkit-background-size: contain;
          background-size: contain;
        }
        &.notAvailable {
          color: gray;
          filter: grayscale(100%);
          user-select: none;
        }
      }
    }
    .btn {
      margin-top: auto;
      button {
        border-radius: 7px;
        font-size: 13px;
        font-weight: bold;
        background: none;
        color: #364b3c;
        border: 2px solid #364b3c;
        &:hover {
          background: #688e74;
          color: #fff;
          border: 2px solid transparent;
        }
      }
    }
    .flag {
      display: flex;
      align-items: center;
      text-transform: uppercase;
      position: relative;
      background: #364b3c;
      left: -20px;
      top: 0;
      font-size: 13px;
      font-weight: bold;
      color: #fff;
      padding: 0 12px;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      height: 25px;
      max-width: 140px;
      text-align: left;
      margin-bottom: 23px;
      &:before {
        position: absolute;
        content: "";
        display: block;
        top: 0;
        left: auto;
        right: -1px;
        bottom: 0;
        width: 9px;
        background: url("../assets/settings_flag.png") 0 0 no-repeat;
        -webkit-background-size: contain;
        background-size: contain;
      }
    }
  }
}
@media all and(max-width: 960px) {
  .settings-blocks {
    .block {
      flex: 0 1 45%;
    }
  }
}

@media all and(max-width: 768px) {
  .settings-blocks {
    padding: 15px;
  }
}

@media all and(max-width: 640px) {
  .settings-blocks {
    .block {
      flex: 1 1 auto;
    }
  }
}
</style>
