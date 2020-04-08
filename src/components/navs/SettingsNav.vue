<template>
  <div class="sidebar">
    <div class="sidebar__user-info">
      <div
        v-if="user.avatar || avatarPath"
        style="background: none"
        class="logo"
      >
        <img :src="serverUrl + avatarPath" />
      </div>
      <div v-else class="logo"></div>
      <div class="name">
        {{ user.fio | truncate }}
      </div>
    </div>
    <div class="sidebar_list menu-left">
      <ul>
        <li>
          <router-link :to="{ name: 'Personal' }">
            {{ $t("personalCabinet") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Finances' }">
            {{ $t("finances") }}
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Contacts' }">
            {{ $t("contacts") }}
          </router-link>
        </li>
        <li>
          <a @click="downloadWithVueResource">
            {{ $t("privacy") }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
export default {
  name: "SettingsNav",
  data() {
    return {
      url: "https://stroy-assist.ru/confirm.pdf",
      serverUrl: serverUrl
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      snackBar: state => state.snackBar,
      avatarPath: state => state.user.avatarPath,
      role: state => {
        if (state.user.roles[0]) {
          return state.user.roles[0].split("_")[1];
        }
      }
    })
  },
  methods: {
    downloadWithVueResource() {
      window.open(this.url, "_blank");
    }
  }
};
</script>
<style scoped>
@import url("./assets/css/navs.css");
</style>
