<template>
  <div>
    <div class="header" :class="{ scrollable: headerScroll }">
      <div class="header__logo-wrap" :class="{ opened: leftMenuShow }">
        <a class="header__logo" @click="toggleLeftMenu">
          <IconBurger width="30" height="30" />
        </a>
      </div>
      <div class="header__menu header-menu">
        <ul>
          <li>
            <router-link :to="{ name: 'Warehouse' }">
              <span class="header-menu__icon">
                <IconWarehouse width="30" height="30" fill="#fff" />
              </span>
              {{ $t("warehouse") }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Furniture' }">
              <span class="header-menu__icon">
                <IconCart width="30" height="30" />
              </span>
              {{ $t("furniture") }}
            </router-link>
          </li>
          <li v-if="modules.indexOf('Statistics') > -1">
            <router-link :to="{ name: 'Statistics' }">
              <span class="header-menu__icon">
                <IconStatistics width="30" height="30" />
              </span>
              {{ $t("statistics") }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'Documents' }">
              <span class="header-menu__icon">
                <IconDocuments width="30" height="30" />
              </span>
              {{ $t("documents") }}
            </router-link>
          </li>
          <li>
            <router-link :to="{ name: 'PhotoFixations' }">
              <span class="header-menu__icon">
                <IconPhoto width="30" height="30" />
              </span>
              {{ $t("photofixation") }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="header__options options">
        <div class="options__lang" @click="toggleLang">
          <LocaleChanger :parentClass="'app-top'" bgColor="transparent" />
        </div>
        <v-menu offset-y transition="slide-x-transition" bottom right offset-x>
          <template v-slot:activator="{ on }">
            <!--            :to="{ name: 'Settings' }"-->
            <div class="options__btn" v-on="on">
              <IconSettings width="30" height="30" />
            </div>
          </template>
          <v-list width="301" tile class="options-list">
            <v-list-item :to="{ name: 'Personal' }">
              <v-list-item-title>
                {{ $t("personalCabinet") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'Finances' }">
              <v-list-item-title>
                {{ $t("finances") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item :to="{ name: 'Contacts' }">
              <v-list-item-title>
                {{ $t("contacts") }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="downloadWithVueResource">
              <v-list-item-title>
                {{ $t("privacy") }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <div class="options__logout" @click="logout">
          <!--          <span class="options__logout-icon"></span>-->
          <IconLogout width="30" height="30" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LocaleChanger from "@/components/LocaleChanger";
import IconCart from "@/components/common/icons/IconCart";
import IconPhoto from "@/components/common/icons/IconPhoto";
import IconStatistics from "@/components/common/icons/IconStatistics";
import IconDocuments from "@/components/common/icons/IconDocuments";
import IconWarehouse from "@/components/common/icons/IconWarehouse";
import IconBurger from "@/components/common/icons/IconBurger";
import IconSettings from "@/components/common/icons/IconSettings";
import IconLogout from "@/components/common/icons/IconLogout";
export default {
  name: "AppTop",
  props: ["leftMenuShow"],
  components: {
    LocaleChanger,
    IconWarehouse,
    IconCart,
    IconStatistics,
    IconDocuments,
    IconPhoto,
    IconBurger,
    IconSettings,
    IconLogout
  },
  data() {
    return {
      headerScroll: true,
      url: "https://stroy-assist.ru/confirm.pdf"
    };
  },
  methods: {
    toggleLeftMenu() {
      this.$emit("clicked-to-logo", !this.leftMenuShow);
    },
    logout() {
      this.$store.dispatch("user/logout", {});
      this.$store.dispatch("furniture/clearState", {});
    },
    toggleLang(e) {
      this.headerScroll = !(
        e.target &&
        (e.target.classList.contains("vs__selected-options") ||
          e.target.classList.contains("vs__dropdown-toggle") ||
          e.target.classList.contains("vs__actions") ||
          e.target.classList.contains("vs__selected") ||
          e.target.classList.contains("vs__open-indicator") ||
          e.target.classList.value === "")
      );
    },
    downloadWithVueResource() {
      window.open(this.url, "_blank");
    }
  },
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.header {
  max-width: 1920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 80px;
  @media all and(max-width: 1280px) {
    max-width: 100%;
    height: 45px;
  }
  &__logo-wrap {
    position: relative;
    width: 50px;
    /*margin-right: 11px;*/
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    &.opened {
      width: 55px;
      margin-left: -55px;
      padding-right: 5px;
    }
    @media all and(max-width: 480px) {
      flex: 1 0 auto;
    }
  }
  &__logo {
    display: block;
    width: 35px;
    height: 34px;
    cursor: pointer;
    position: relative;
    z-index: 50;
  }
  &__menu {
    flex: 1 1 auto;
  }
  &__options {
  }
}
.header-menu {
  ul {
    display: flex;
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      a {
        font-family: $ffamily;
        font-style: normal;
        line-height: 21px;
        display: flex;
        height: 80px;
        align-items: center;
        text-align: center;
        justify-content: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 13px 23px;
        margin-right: 1px;
        text-decoration: none;
        color: #fff;
        transition: all 0.3s;
        overflow: hidden;
        min-width: 0;
        width: auto;
        font-size: 16px;
        font-weight: 300;
        letter-spacing: 1px;
        &:hover,
        &.active {
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.15) 51.06%,
            rgba(255, 255, 255, 0) 100%
          );
          width: auto;
          color: #fff;
          .header-menu__icon {
            margin-right: 11px;
          }
        }
        @media all and(max-width: 1280px) {
          font-size: 14px;
          min-width: 0;
          width: auto;
          padding: 8px 5px 8px 5px;
        }
      }
    }
  }
  &__icon {
    width: 30px;
    height: 30px;
    margin-right: 11px;
  }
}
.options {
  display: flex;
  width: 201px;
  @media all and(max-width: 768px) {
    width: auto;
  }
  &__btn {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #d6e8ce;
    display: flex;
    align-items: center;
    justify-content: center;
    /*padding: 13px 13px 13px 30px;*/
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    text-decoration: none;
    flex: 1 0 auto;
    &:hover,
    &.active {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 51.06%,
        rgba(255, 255, 255, 0) 100%
      );
      width: auto;
      color: #fff;
      .header-menu__icon {
        margin-right: 11px;
      }
    }
    @media all and(max-width: 1280px) {
      font-size: 13px;
      min-width: 0;
      width: auto;
      padding: 8px 5px 8px 10px;
    }
  }
  &__icon {
    width: 20px;
    height: 20px;
    background: url("../assets/settings.svg") 0 0 no-repeat;
    margin-right: 12px;
  }
  &__logout-icon {
    width: 20px;
    height: 22px;
    background: url("../assets/logout.svg") 0 0 no-repeat;
  }
  &__logout {
    margin-left: 1px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex: 1 0 auto;
    background: none;
    &:hover {
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.15) 51.06%,
        rgba(255, 255, 255, 0) 100%
      );
    }
    @media all and(max-width: 480px) {
      flex: 1 0 auto;
    }
  }
}

@media screen and(max-width: 1280px) {
  .header-menu {
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        a {
          font-size: 0 !important;
          height: 45px !important;
          min-width: 0 !important;
        }
      }
    }
    &__icon {
      margin: 0 !important;
    }
  }
  .header {
    &__logo {
      flex: 0 0 auto;
    }
    &.scrollable {
      overflow: auto;
    }
  }
}

@media screen and(max-width: 640px) {
  .options {
    &__btn {
      font-size: 0;
      padding: 13px;
    }
    &__icon {
      margin: 0;
    }
  }
}
</style>
