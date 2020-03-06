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
      <div class="role">{{ role }}</div>
      <div class="name">
        {{ user.fio | truncate }}
      </div>
    </div>
    <div class="sidebar_list menu-left">
      <ul v-if="constructions">
        <li v-for="(item, key) in constructions" :key="key">
          <a
            :class="{ active: construction.id === item.id }"
            @click="chooseConstruction(item)"
          >
            {{ item.name | truncate }}
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
  name: "PhotoFixationsNav",
  data() {
    return {
      serverUrl: serverUrl
    };
  },
  computed: {
    ...mapState({
      construction: state => state.photofixations.construction,
      constructions: state => state.photofixations.constructions,
      user: state => state.user.user,
      avatarPath: state => state.user.avatarPath,
      role: state => {
        if (state.user.roles[0]) {
          return state.user.roles[0].split("_")[1];
        }
      }
    })
  },
  methods: {
    chooseConstruction(item) {
      this.$store.commit("photofixations/setLoadingStatus", true);
      this.$store
        .dispatch("photofixations/getAllPhotos", {
          projectId: item.id,
          page: 0
        })
        .then(() => {
          this.$store.commit("photofixations/setLoadingStatus", false);
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
      this.$store.dispatch("photofixations/setConstruction", item);
    }
  }
};
</script>

<style scoped lang="scss">
@import url("./assets/css/navs.css");
</style>
