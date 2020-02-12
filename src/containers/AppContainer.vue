<template>
  <div style="height: 100%">
    <div class="container-wrap">
      <div class="container-wrap__navigation">
        <AppTop
          :leftMenuShow="leftMenuShow"
          @clicked-to-logo="leftMenuToggle"
        />
      </div>
      <div class="container-wrap__content content">
        <div class="content__left-menu" :class="{ opened: leftMenuShow }">
          <AppLeft :navsType="navsType" />
        </div>
        <perfect-scrollbar class="content__body">
          <router-view />
        </perfect-scrollbar>
      </div>
    </div>

    <!--modals-->
    <b-modal
      v-model="showVerifyModal"
      content-class="verify-modal-content"
      hide-footer
      hide-header
      centered
    >
      <VerifyMail @hideModal="showVerifyModal = false" />
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppTop from "@/components/AppTop";
import AppLeft from "@/components/AppLeft";
import VerifyMail from "@/components/VerifyMail";
export default {
  name: "AppContainer",
  components: {
    AppTop,
    AppLeft,
    VerifyMail
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.navsType = to.name;
      if (!vm.user.isEmailAccepted) {
        vm.showVerifyModal = true;
      }
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.navsType = to.name;
    if (!this.user.isEmailAccepted) {
      this.showVerifyModal = true;
    }
    next();
  },
  data() {
    return {
      leftMenuShow: true,
      navsType: null,
      showVerifyModal: false
    };
  },
  methods: {
    leftMenuToggle(data) {
      this.leftMenuShow = data;
    }
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.lang;
      },
      set(lang) {
        this.$i18n.locale = lang;
        this.$store.commit("setLang", lang);
      }
    },
    ...mapState({
      user: state => state.user.user
    })
  }
};
</script>

<style scoped lang="scss">
.container-wrap {
  height: 100%;
  display: flex;
  flex-flow: nowrap column;
  &__navigation {
    background: #364b3c;
    height: 45px;
  }
  &__content {
    height: 100%;
    max-width: 1920px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
}
.content {
  &__left-menu {
    transition: 0.8s;
    margin-left: -100%;
    height: 100%;
    &.opened {
      margin-left: 0;
    }
  }
  &__body {
    display: block;
    max-width: 100%;
    flex: 1 1 auto;
    padding: 50px 20px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    overflow: hidden;
    background: url("../assets/authbg2.png") fixed no-repeat;
  }
}

@media screen and(max-width: 1200px) {
  .content {
    &__body {
      overflow-x: scroll;
    }
  }
}
@media screen and(max-width: 959px) {
  .content {
    flex-flow: wrap;
    align-content: flex-start;
    justify-content: center;
    &__body {
      padding: 20px 25px;
    }
    &__left-menu {
      position: absolute;
      top: 45px;
      left: -100%;
      bottom: 0;
      z-index: 10;
      &.opened {
        left: 0;
      }
    }
  }
}
</style>
