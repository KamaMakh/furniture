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
    <div class="sidebar__btn" @click="showAddConstModal">
      {{ $t("add_constr") }}
      <span class="icon">
        <IconPlusSquared width="19" height="19" />
      </span>
    </div>
    <div class="sidebar_list menu-left">
      <ul v-if="constructions">
        <li v-for="(item, key) in constructions" :key="key">
          <a
            :class="{ active: construction.id === item.id }"
            @click="chooseConstruction(item)"
          >
            <span
              v-if="item.creatorId === user.id"
              @click="editConstruction(item)"
              class="icon"
            ></span>
            {{ item.name | truncate }}
          </a>
        </li>
      </ul>
    </div>
    <!--dialogs-->
    <v-dialog v-model="showAddModal" width="500">
      <v-card>
        <v-card-title class="headline">
          {{ $t("add_constr") }}
        </v-card-title>
        <v-card-text>
          <v-form ref="addForm" v-model="addValid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newConstruction.address"
                  :label="$t('address')"
                  :placeholder="$t('address')"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newConstruction.name"
                  :label="$t('construct_name')"
                  :placeholder="$t('construct_name')"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="newConstruction.nds"
                  :label="$t('nds')"
                  :placeholder="$t('nds')"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text @click="showAddModal = false">
            {{ $t("close") }}
          </v-btn>

          <v-btn
            color="#688e74"
            text
            :disabled="!addValid"
            :loading="loading"
            @click="addConstruction"
          >
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showEditModal"
      width="700"
      content-class="construction-settings-dialog"
    >
      <v-card>
        <div class="close-btn" @click="showEditModal = false">
          <IconClose width="30" height="30" fill="#868686" />
        </div>
        <v-col cols="12" sm="8" md="8" class="pb-0">
          <v-card-text>
            <v-form ref="editForm" v-model="editValid" lazy-validation>
              <v-text-field
                v-model="newConstruction.name"
                :label="$t('construct_name')"
                outlined
                :rules="rules"
                dense
                color="#688e74"
                background-color="#fff"
              ></v-text-field>
              <v-textarea
                v-model="newConstruction.address"
                :label="$t('address')"
                outlined
                dense
                color="#688e74"
                background-color="#fff"
                rows="3"
              ></v-textarea>
              <v-text-field
                v-model="newConstruction.nds"
                :label="$t('nds')"
                type="number"
                outlined
                dense
                color="#688e74"
                background-color="#fff"
                style="max-width: 120px"
                append-icon="%"
              ></v-text-field>
            </v-form>
          </v-card-text>
        </v-col>
        <v-col cols="12" class="pt-0">
          <v-card-text>
            <div class="invite-title">
              {{ $t("inviteList") }}
            </div>
            <v-form
              v-model="inviteValid"
              ref="inviteForm"
              @submit.prevent="inviteUser"
            >
              <v-row>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="invitedUser.email"
                    :label="$t('inviteUser')"
                    type="email"
                    outlined
                    dense
                    :rules="isYourEmail"
                    color="#688e74"
                    background-color="#fff"
                  ></v-text-field>

                  <v-checkbox
                    v-model="invitedUser.accessFurniture"
                    :label="$t('furniture')"
                    hide-details
                    color="#688e74"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="invitedUser.accessEstimate"
                    :label="$t('documents')"
                    hide-details
                    color="#688e74"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="invitedUser.accessPhotofixation"
                    :label="$t('photofixation')"
                    hide-details
                    color="#688e74"
                  ></v-checkbox>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-btn
                    class="invite"
                    small
                    :disabled="
                      !invitedUser.email ||
                        isEmail(invitedUser.email) ||
                        (!invitedUser.accessFurniture &&
                          !invitedUser.accessEstimate &&
                          !invitedUser.accessPhotofixation)
                    "
                    :loading="loading"
                    @click="inviteUser"
                  >
                    {{ $t("invite") }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
            <v-row>
              <perfect-scrollbar style="max-height: 670px">
                <!--regInvites-->
                <v-col cols="12">
                  <div class="invite-title mt-3">
                    {{ $t("userStatus") }}
                  </div>
                </v-col>
                <v-row
                  v-for="(item, key) in newConstruction.regInvites"
                  :key="key"
                  class="ma-0"
                  style="position: relative;"
                >
                  <v-card v-if="currentRemoveUser === item" class="remove-user">
                    <v-card-text class="remove-user__text">
                      {{
                        $t("confirmRemoveUser", {
                          email: item.email,
                          construction: construction.name
                        })
                      }}
                    </v-card-text>
                    <v-card-actions class="d-flex justify-space-between">
                      <v-btn width="150" @click="removeUser" :loading="loading">
                        {{ $t("yes") }}
                      </v-btn>
                      <v-btn width="150" @click="currentRemoveUser = null">
                        {{ $t("no") }}
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-row class="ma-0" style="flex-basis: 100%;">
                    <v-col cols="12" sm="4">
                      <v-text-field
                        :label="$t('invited')"
                        type="email"
                        :value="item.email"
                        outlined
                        dense
                        color="#688e74"
                        background-color="#fff"
                        hide-details
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-btn
                        small
                        disabled
                        class="invite"
                        :class="{
                          greenCustom: item.registration,
                          redCustom: !item.registration
                        }"
                      >
                        {{ item.registration ? $t("attached") : $t("invited") }}
                      </v-btn>
                    </v-col>
                    <v-col
                      class="d-flex align-center"
                      style="cursor: pointer;"
                      @click="currentRemoveUser = item"
                    >
                      <IconClose width="17" height="17" fill="#999" />
                    </v-col>
                  </v-row>
                  <v-row class="ma-0">
                    <v-col cols="12">
                      <v-checkbox
                        v-model="item.accessFurniture"
                        :label="$t('furniture')"
                        hide-details
                        color="#688e74"
                        class="mt-0"
                        :loading="loading"
                        @click.native="updateUserStatus(item)"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="item.accessEstimate"
                        :label="$t('documents')"
                        hide-details
                        color="#688e74"
                        :loading="loading"
                        @click.native="updateUserStatus(item)"
                      ></v-checkbox>
                      <v-checkbox
                        v-model="item.accessPhotofixation"
                        :label="$t('photofixation')"
                        hide-details
                        color="#688e74"
                        :loading="loading"
                        @click.native="updateUserStatus(item)"
                      ></v-checkbox>
                    </v-col>
                  </v-row>
                </v-row>
              </perfect-scrollbar>
            </v-row>
            <v-card-actions class="d-flex justify-space-between pl-0 pr-0">
              <v-btn
                color="#688e74"
                @click="addConstruction"
                :loading="loading"
                dark
                large
                width="150"
              >
                {{ $t("save") }}
              </v-btn>
              <v-btn
                color="blue-grey"
                dark
                large
                width="150"
                @click="showRemoveModal(newConstruction)"
              >
                {{ $t("delete") }}
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-col>
      </v-card>
    </v-dialog>

    <v-dialog v-model="removeModal" width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("delete") }} {{ this.construction.name }}?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-grey" dark @click="removeModal = false">
            {{ $t("cancel") }}
          </v-btn>
          <v-btn
            color="#688e74"
            dark
            :loading="loading"
            @click="removeConstruction"
          >
            {{ $t("delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import IconPlusSquared from "@/components/common/icons/IconPlusSquared";
import IconClose from "@/components/common/icons/IconClose";
export default {
  name: "ConstructionsList",
  props: ["module", "showConst"],
  components: {
    IconPlusSquared,
    IconClose
  },
  data() {
    return {
      showAddModal: false,
      showEditModal: false,
      showSubscribeModal: false,
      showAvatarModal: false,
      showInviteModal: false,
      removeModal: false,
      newConstruction: {},
      loading: false,
      files: [],
      serverUrl: serverUrl,
      invitedUser: {},
      showFormErrors: false,
      isClient: false,
      addValid: true,
      editValid: true,
      inviteValid: true,
      rules: [v => !!v || this.$t("required")],
      currentRemoveUser: null,
      emailRules: [
        v => !!v || this.$t("required"),
        v => /.+@.+\..+/.test(v) || this.$t("invalid_email")
      ],
      isYourEmail: [v => v !== this.user.email || this.$t("isYourEmail")]
    };
  },
  computed: {
    ...mapState({
      construction(state) {
        return state[this.module].construction;
      },
      constructions(state) {
        return state[this.module].constructions;
      },
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
    showAddConstModal() {
      this.showAddModal = true;
      this.newConstruction = {
        nds: 0
      };
    },
    isEmail(v) {
      return !/.+@.+\..+/.test(v);
    },
    inviteUser() {
      if (!this.$refs.inviteForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append("email", this.invitedUser.email);
      formData.append("projectId", this.newConstruction.id);
      formData.append("accessFurniture", !!this.invitedUser.accessFurniture);
      formData.append("accessEstimate", !!this.invitedUser.accessEstimate);
      formData.append(
        "accessPhotofixation",
        !!this.invitedUser.accessPhotofixation
      );

      this.$store
        .dispatch(`constructions/inviteMultipartUser`, formData)
        .then(() => {
          this.invitedUser = {};
          this.editConstruction(this.newConstruction);
        })
        .catch(e => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: e.message ? e.message : ""
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    removeUser() {
      this.loading = true;
      let formData = new FormData();
      formData.append("email", this.currentRemoveUser.email);
      formData.append("projectId", this.newConstruction.id);
      this.$store
        .dispatch(`constructions/removeUser`, formData)
        .then(() => {
          this.invitedUser = {};
          this.editConstruction(this.newConstruction);
          this.currentRemoveUser = null;
        })
        .catch(e => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: e.message ? e.message : ""
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updateUserStatus(user) {
      this.loading = true;
      let formData = new FormData();
      formData.append("email", user.email);
      formData.append("projectId", this.newConstruction.id);
      formData.append("accessFurniture", !!user.accessFurniture);
      formData.append("accessEstimate", !!user.accessEstimate);
      formData.append("accessPhotofixation", !!user.accessPhotofixation);

      this.$store
        .dispatch(`constructions/inviteMultipartUser`, formData)
        .then(() => {
          // this.invitedUser = {};
          // this.editConstruction(this.newConstruction);
        })
        .catch(e => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: e.message ? e.message : ""
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    addConstruction() {
      this.loading = true;
      if (
        this.newConstruction.nds === undefined ||
        this.newConstruction.nds === null ||
        this.newConstruction.nds < 0 ||
        this.newConstruction.nds === ""
      ) {
        this.newConstruction.nds = 0;
      }
      if (this.newConstruction.id === undefined) {
        if (!this.$refs.addForm.validate()) {
          this.loading = false;
          return;
        }
        this.$store
          .dispatch(`${this.module}/addConstruction`, this.newConstruction)
          .then(response => {
            this.showAddModal = false;
            this.chooseConstruction(response);
          })
          .catch(error => {
            if (error.subscribeError) {
              this.showAddModal = false;
              // this.showSubscribeModal = true;
              this.$router.push({ name: "Finances" });
            } else {
              this.$notify({
                group: "warn",
                type: "error",
                title: this.$i18n.messages[this.$i18n.locale]["attention"],
                text: error
              });
            }
          })
          .finally(() => {
            this.loading = false;
            this.newConstruction = {};
          });
      } else {
        if (!this.$refs.editForm.validate()) {
          this.loading = false;
          return;
        }
        let formData = new FormData();
        formData.append("projectId", this.newConstruction.id);
        formData.append("name", this.newConstruction.name);
        if (this.newConstruction.address) {
          formData.append("address", this.newConstruction.address);
        }
        formData.append("nds", this.newConstruction.nds);
        this.$store
          .dispatch(`${this.module}/updateConstruction`, formData)
          .then(() => {
            this.showAddModal = false;
            this.showEditModal = false;
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
            this.newConstruction = {};
          });
      }
    },
    chooseConstruction(item) {
      this.$emit("choose", item);
    },
    editConstruction(item) {
      this.$store.dispatch(`${this.module}/getConstruction`, item).then(() => {
        this.newConstruction = this.construction;
        this.invitedUser = {};
        this.showEditModal = true;
      });
    },
    showRemoveModal(item) {
      this.newConstruction = item;
      this.removeModal = true;
    },
    removeConstruction() {
      this.loading = true;
      let formData = new FormData();
      formData.append("projectId", this.newConstruction.id);
      formData.append("active", false);
      this.$store
        .dispatch(`${this.module}/updateConstruction`, formData)
        .then(() => {
          this.removeModal = false;
          this.showEditModal = false;
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
      this.newConstruction = {};
    },
    addAvatar() {
      this.loading = true;
      let formData = new FormData();
      formData.append(`file`, this.files);
      this.$store
        .dispatch("user/uploadAvatar", formData)
        .then(() => {
          this.showAvatarModal = false;
          this.files = [];
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

<style scoped>
@import url("./assets/css/navs.css");
</style>
