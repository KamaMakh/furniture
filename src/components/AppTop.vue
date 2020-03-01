<template>
  <div>
    <div class="header" :class="{ scrollable: headerScroll }">
      <a class="header__logo" @click="toggleLeftMenu"></a>
      <div class="header__menu header-menu">
        <ul>
          <li v-if="modules.indexOf('Furniture') > -1">
            <router-link :to="{ name: 'Furniture' }">
              <span class="header-menu__icon">
                <IconCart width="19" height="18" />
              </span>
              {{ $t("furniture") }}
            </router-link>
          </li>
          <li v-if="modules.indexOf('Projects') > -1">
            <router-link :to="{ name: 'Projects' }">
              <span class="header-menu__icon">
                <IconHome width="22" height="19" />
              </span>
              {{ $t("projects") }}
            </router-link>
          </li>
          <li v-if="modules.indexOf('Statistics') > -1">
            <router-link :to="{ name: 'Statistics' }">
              <span class="header-menu__icon">
                <IconTransport width="25" height="19" />
              </span>
              {{ $t("statistics") }}
            </router-link>
          </li>
          <li v-if="modules.indexOf('Documents') > -1">
            <router-link :to="{ name: 'Documents' }">
              <span class="header-menu__icon">
                <IconDocuments width="20" height="19" />
              </span>
              {{ $t("documents") }}
            </router-link>
          </li>
          <li v-if="modules.indexOf('Users') > -1">
            <router-link :to="{ name: 'Users' }">
              <span class="header-menu__icon">
                <IconUsers width="20" height="19" />
              </span>
              {{ $t("users") }}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="header__options options">
        <router-link :to="{ name: 'Settings' }" class="options__btn">
          <span class="options__icon"></span>
          {{ $t("settings") }}
        </router-link>
        <div class="options__lang" @click="toggleLang">
          <LocaleChanger :parentClass="'app-top'" bgColor="#688e74" />
        </div>
        <div class="options__logout" @click="logout">
          <span class="options__logout-icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import LocaleChanger from "@/components/LocaleChanger";
import IconCart from "@/components/common/icons/IconCart";
import IconHome from "@/components/common/icons/IconHome";
import IconTransport from "@/components/common/icons/IconTransport";
import IconDocuments from "@/components/common/icons/IconDocuments";
import IconUsers from "@/components/common/icons/IconUsers";
export default {
  name: "AppTop",
  props: ["leftMenuShow"],
  components: {
    LocaleChanger,
    IconCart,
    IconHome,
    IconTransport,
    IconDocuments,
    IconUsers
  },
  data() {
    return {
      headerScroll: true
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
      if (
        e.target &&
        (e.target.classList.contains("vs__selected-options") ||
          e.target.classList.contains("vs__dropdown-toggle") ||
          e.target.classList.contains("vs__actions") ||
          e.target.classList.contains("vs__selected") ||
          e.target.classList.contains("vs__open-indicator") ||
          e.target.classList.value === "")
      ) {
        this.headerScroll = false;
      } else {
        this.headerScroll = true;
      }
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
  height: 45px;
  &__logo {
    width: 50px;
    height: 45px;
    margin-right: 11px;
    background: url("../assets/logo.svg") 0 -3px no-repeat;
    cursor: pointer;
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
        font-weight: normal;
        font-size: 0;
        line-height: 21px;
        display: flex;
        min-width: 0;
        width: 45px;
        height: 45px;
        align-items: center;
        text-align: center;
        justify-content: center;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 13px 7px;
        margin-right: 1px;
        text-decoration: none;
        color: transparent;
        background: #688e74;
        transition: all 0.3s;
        overflow: hidden;
        &:hover,
        &.active {
          background: #999;
          width: auto;
          min-width: 185px;
          font-size: 18px;
          color: #fff;
          .header-menu__icon {
            margin-right: 11px;
          }
        }
      }
    }
  }
  &__icon {
    width: 22px;
    height: 22px;
    margin-right: 0;
  }
}
.options {
  display: flex;
  &__btn {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    background: #688e74;
    font-family: "Roboto", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    color: #d6e8ce;
    display: flex;
    align-items: center;
    padding: 13px 13px 13px 30px;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -ms-transition: all 0.3s;
    -o-transition: all 0.3s;
    transition: all 0.3s;
    text-decoration: none;
    &:hover,
    &.active {
      background: #999;
      width: auto;
      color: #fff;
      .header-menu__icon {
        margin-right: 11px;
      }
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
    width: 42px;
    height: 45px;
    background: #688e74;
    margin-left: 1px;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      background: #999;
    }
  }
}

@media screen and(max-width: 768px) {
  .header-menu {
    ul {
      display: flex;
      padding: 0;
      margin: 0;
      list-style: none;

      li {
        a {
          font-size: 0 !important;
          width: 45px !important;
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
    &.scrollable {
      overflow: scroll;
    }
    &__logo {
      flex: 1 0 auto;
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
