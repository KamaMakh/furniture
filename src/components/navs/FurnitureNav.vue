<template>
  <div class="sidebar">
    <div class="sidebar__user-info">
      <div v-if="user.avatar" style="background: none" class="logo">
        <img :src="serverUrl + user.avatar.pathUrl" />
      </div>
      <div v-else class="logo"></div>
      <div
        v-if="!user.avatar"
        class="edit-avatar"
        @click="showAvatarModal = true"
      >
        <fa-icon icon="plus" />
        {{ $t("add_avatar") }}
      </div>
      <div v-else class="edit-avatar" @click="showAvatarModal = true">
        <fa-icon icon="plus" />
        {{ $t("upd_avatar") }}
      </div>
      <div class="role">{{ $t("cabinet") }} {{ role }}</div>
      <div class="name">
        {{ user.fio }}
      </div>
    </div>
    <div
      class="sidebar__btn"
      @click="
        showAddModal = true;
        newConstruction = {};
      "
    >
      {{ $t("add_constr") }}
      <span class="icon">
        <svg
          width="19"
          height="19"
          viewBox="0 0 19 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.8889 0H2.11111C0.939444 0 0 0.95 0 2.11111V16.8889C0 18.05 0.939444 19 2.11111 19H16.8889C18.05 19 19 18.05 19 16.8889V2.11111C19 0.95 18.05 0 16.8889 0ZM16.8891 16.8889H2.11133V2.11111H16.8891V16.8889ZM10.5555 14.7778H8.44439V10.5556H4.22217V8.44444H8.44439V4.22222H10.5555V8.44444H14.7777V10.5556H10.5555V14.7778Z"
            fill="#868686"
          />
        </svg>
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
              @click.stop="showRemoveModal(item)"
              class="icon-delete"
            >
              <svg
                version="1.1"
                id="IconsRepoEditor"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 60.167 60.167"
                style="enable-background:new 0 0 60.167 60.167;"
                xml:space="preserve"
                width="18px"
                height="18px"
                fill="#999"
                stroke="#999"
                stroke-width="2px"
              >
                <g id="IconsRepo_bgCarrier"></g>
                <path
                  d="M54.5,11.667H39.88V3.91c0-2.156-1.754-3.91-3.91-3.91H24.196c-2.156,0-3.91,1.754-3.91,3.91v7.756H5.667 c-0.552,0-1,0.448-1,1s0.448,1,1,1h2.042v40.5c0,3.309,2.691,6,6,6h32.75c3.309,0,6-2.691,6-6v-40.5H54.5c0.552,0,1-0.448,1-1 S55.052,11.667,54.5,11.667z M22.286,3.91c0-1.053,0.857-1.91,1.91-1.91H35.97c1.053,0,1.91,0.857,1.91,1.91v7.756H22.286V3.91z M50.458,54.167c0,2.206-1.794,4-4,4h-32.75c-2.206,0-4-1.794-4-4v-40.5h40.75V54.167z M38.255,46.153V22.847c0-0.552,0.448-1,1-1 s1,0.448,1,1v23.306c0,0.552-0.448,1-1,1S38.255,46.706,38.255,46.153z M29.083,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1 v23.306c0,0.552-0.448,1-1,1S29.083,46.706,29.083,46.153z M19.911,46.153V22.847c0-0.552,0.448-1,1-1s1,0.448,1,1v23.306 c0,0.552-0.448,1-1,1S19.911,46.706,19.911,46.153z"
                ></path>
              </svg>
            </span>
            <span
              v-if="item.creatorId === user.id"
              @click.stop="editConstruction(item)"
              class="icon"
            ></span>
            {{ item.name }}</a
          >
        </li>
      </ul>
    </div>
    <transition name="fade-none">
      <div v-if="showAddModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <form @submit="addConstruction">
                    <!--<div class="form-group">-->
                    <b-form-group
                      id="input-group-1"
                      :label="$t('address')"
                      label-for="input-1"
                    >
                      <b-form-input
                        id="input-1"
                        v-model="newConstruction.address"
                        :placeholder="$t('address')"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <!--<input type="text" class="form-control" v-model="newConstruction.address" :placeholder="$t('address')">-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                    <b-form-group
                      id="input-group-2"
                      :label="$t('construct_name')"
                      label-for="input-2"
                    >
                      <b-form-input
                        id="input-2"
                        v-model="newConstruction.name"
                        :placeholder="$t('construct_name')"
                        type="text"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <!--<input type="text" class="form-control" v-model="newConstruction.name" :placeholder="$t('construct_name')">-->
                    <!--</div>-->
                    <!--<div class="form-group">-->
                    <b-form-group
                      id="input-group-3"
                      :label="$t('nds')"
                      label-for="input-3"
                    >
                      <b-form-input
                        id="input-3"
                        v-model="newConstruction.nds"
                        :placeholder="$t('nds')"
                        type="number"
                        required
                      ></b-form-input>
                    </b-form-group>
                    <!--<input type="number" step="any" class="form-control" v-model="newConstruction.nds" :placeholder="$t('nds')">-->
                    <!--</div>-->
                  </form>
                </div>
                <div v-if="!loading" class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    style="border-radius: 14px"
                    @click="showAddModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="addConstruction"
                  >
                    {{ $t("save") }}
                  </button>
                </div>
                <div v-else class="modal-footer">
                  <button type="button" class="btn btn-custom">
                    <b-spinner small></b-spinner>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <b-modal
      v-model="showSubscribeModal"
      dialog-class="subscribe-modal"
      body-class="subscribe-modal"
      hide-footer
      hide-header
    >
      <BuySubscribe @hideModal="hideSubscribeModal" />
    </b-modal>
    <b-modal
      v-model="removeModal"
      dialog-class="subscribe-modal"
      body-class="subscribe-modal"
      hide-footer
      :title="$t('remove_const_text')"
    >
      <div v-if="!loading" class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          style="border-radius: 14px"
          @click="removeModal = false"
        >
          {{ $t("cancel") }}
        </button>
        <button
          type="button"
          class="btn btn-custom"
          @click="removeConstruction"
        >
          {{ $t("close") }}
        </button>
      </div>
      <div v-else class="modal-footer">
        <button class="btn btn-custom">
          <b-spinner small></b-spinner>
        </button>
      </div>
    </b-modal>
    <b-modal v-model="showAvatarModal" hide-footer :title="$t('add_image')">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-group row">
            <b-form-file
              v-model="files"
              :state="Boolean(files)"
              :placeholder="$t('add_image')"
              drop-placeholder="Drop file here..."
              accept="image/jpeg, image/png, image/gif"
            ></b-form-file>
          </div>
        </div>
        <div v-if="!loading" class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="showAvatarModal = false"
          >
            {{ $t("close") }}
          </button>
          <button
            type="button"
            class="btn btn-custom"
            @click="addAvatar"
            :disabled="typeof files == 'Array'"
          >
            {{ $t("save") }}
          </button>
        </div>
        <div v-else class="modal-footer">
          <button type="button" class="btn btn-custom">
            <b-spinner small></b-spinner>
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BuySubscribe from "@/components/BuySubscribe";
import { serverUrl } from "@/store/urls";
export default {
  name: "FurnitureNav",
  components: {
    BuySubscribe
  },
  data() {
    return {
      showAddModal: false,
      showSubscribeModal: false,
      showAvatarModal: false,
      removeModal: false,
      newConstruction: {},
      loading: false,
      files: [],
      serverUrl: serverUrl
    };
  },
  computed: {
    ...mapState({
      construction: state => state.furniture.construction,
      constructions: state => state.furniture.constructions,
      user: state => state.user.user,
      role: state => {
        if (state.user.roles[0]) {
          return state.user.roles[0].split("_")[1];
        }
      }
    })
  },
  methods: {
    hideSubscribeModal() {
      this.showSubscribeModal = false;
    },
    addConstruction() {
      if (!this.newConstruction.name || !this.newConstruction.nds) {
        this.$notify({
          group: "warn",
          type: "error",
          title: this.$i18n.messages[this.$i18n.locale]["attention"],
          text: this.$i18n.messages[this.$i18n.locale]["register_invalid"]
        });
        return;
      }
      this.loading = true;
      if (this.newConstruction.id === undefined) {
        this.$store
          .dispatch("furniture/addConstruction", this.newConstruction)
          .then(() => {
            this.showAddModal = false;
          })
          .catch(error => {
            if (error.subscribeError) {
              this.showAddModal = false;
              this.showSubscribeModal = true;
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
          });
      } else {
        let formData = new FormData();
        formData.append("projectId", this.newConstruction.id);
        formData.append("name", this.newConstruction.name);
        formData.append("address", this.newConstruction.address);
        formData.append("nds", this.newConstruction.nds);
        this.$store
          .dispatch("furniture/updateConstruction", formData)
          .then(() => {
            this.showAddModal = false;
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
      this.newConstruction = {};
    },
    chooseConstruction(item) {
      this.$store.dispatch("furniture/getFurniture", { projectId: item.id });
      this.$store.dispatch("furniture/setConstruction", item);
    },
    editConstruction(item) {
      this.newConstruction = item;
      this.showAddModal = true;
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
        .dispatch("furniture/updateConstruction", formData)
        .then(() => {
          this.removeModal = false;
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

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.sidebar {
  height: 100%;
  position: relative;
  &__user-info {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-bottom: 28px;
    .logo {
      width: 75px;
      height: 75px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #c4c4c4;
      margin-bottom: 5px;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .edit-avatar {
      cursor: pointer;
    }
    .role {
      font-weight: bold;
      font-size: 18px;
      line-height: 21px;
      text-align: right;
      color: #868686;
      margin-top: 19px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 18px;
      line-height: 21px;
      text-align: right;
      color: #868686;
    }
  }
  &__btn {
    font-family: $ffamily;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    text-align: right;
    color: #868686;
    margin-bottom: 12px;
    cursor: pointer;
    .icon {
      width: 19px;
      height: 19px;
      margin-left: 11px;
      cursor: pointer;
    }
  }
}
.menu-left {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    li {
      a {
        text-decoration: none;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        text-align: right;
        color: #868686;
        font-size: 18px;
        font-family: $ffamily;
        transition: 0.3s;
        padding: 13px 10px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        background: #f5f5f6;
        border-bottom: 1px solid #dadada;
        cursor: pointer;
        &:hover,
        &.active {
          background: #999;
          color: #fff;
          .icon {
            background: url(data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2220%22%20viewBox%3D%220%200%2018%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.877%209.99998C15.877%2010.3116%2015.8495%2010.605%2015.8129%2010.8983L17.747%2012.4108C17.9212%2012.5483%2017.967%2012.7958%2017.857%2012.9975L16.0237%2016.1691C15.9412%2016.3158%2015.7854%2016.3983%2015.6295%2016.3983C15.5745%2016.3983%2015.5195%2016.3891%2015.4645%2016.3708L13.182%2015.4541C12.7054%2015.8116%2012.192%2016.1233%2011.6329%2016.3525L11.2845%2018.7816C11.257%2019.0016%2011.0645%2019.1666%2010.8354%2019.1666H7.16872C6.93955%2019.1666%206.74705%2019.0016%206.71955%2018.7816L6.37122%2016.3525C5.81205%2016.1233%205.29872%2015.8208%204.82205%2015.4541L2.53955%2016.3708C2.49372%2016.3891%202.43872%2016.3983%202.38372%2016.3983C2.21872%2016.3983%202.06288%2016.3158%201.98038%2016.1691L0.14705%2012.9975C0.0370501%2012.7958%200.0828834%2012.5483%200.25705%2012.4108L2.19122%2010.8983C2.15455%2010.605%202.12705%2010.3025%202.12705%209.99998C2.12705%209.69748%202.15455%209.39498%202.19122%209.10165L0.25705%207.58915C0.0828834%207.45165%200.0278834%207.20415%200.14705%207.00248L1.98038%203.83081C2.06288%203.68415%202.21872%203.60165%202.37455%203.60165C2.42955%203.60165%202.48455%203.61081%202.53955%203.62915L4.82205%204.54581C5.29872%204.18831%205.81205%203.87665%206.37122%203.64748L6.71955%201.21831C6.74705%200.998313%206.93955%200.833313%207.16872%200.833313H10.8354C11.0645%200.833313%2011.257%200.998313%2011.2845%201.21831L11.6329%203.64748C12.192%203.87665%2012.7054%204.17915%2013.182%204.54581L15.4645%203.62915C15.5104%203.61081%2015.5654%203.60165%2015.6204%203.60165C15.7854%203.60165%2015.9412%203.68415%2016.0237%203.83081L17.857%207.00248C17.967%207.20415%2017.9212%207.45165%2017.747%207.58915L15.8129%209.10165C15.8495%209.39498%2015.877%209.68831%2015.877%209.99998ZM14.0437%209.99998C14.0437%209.80748%2014.0346%209.61498%2013.9979%209.33081L13.8696%208.29498L14.6854%207.65331L15.6662%206.87415L15.0246%205.76498L13.8604%206.23248L12.8887%206.62665L12.0546%205.98498C11.6879%205.70998%2011.3212%205.49915%2010.9271%205.33415L9.95538%204.93998L9.80872%203.90415L9.63455%202.66665H8.36038L8.17705%203.90415L8.03038%204.93998L7.05872%205.33415C6.68288%205.48998%206.30705%205.70998%205.91288%206.00331L5.08788%206.62665L4.13455%206.24165L2.97038%205.77415L2.32872%206.88331L3.31872%207.65331L4.13455%208.29498L4.00622%209.33081C3.97872%209.60581%203.96038%209.81665%203.96038%209.99998C3.96038%2010.1833%203.97872%2010.3941%204.00622%2010.6783L4.13455%2011.7141L3.31872%2012.3558L2.32872%2013.1258L2.97038%2014.235L4.13455%2013.7675L5.10622%2013.3733L5.94038%2014.015C6.30705%2014.29%206.67372%2014.5008%207.06788%2014.6658L8.03955%2015.06L8.18622%2016.0958L8.36038%2017.3333H9.64372L9.82705%2016.0958L9.97372%2015.06L10.9454%2014.6658C11.3212%2014.51%2011.6971%2014.29%2012.0912%2013.9966L12.9162%2013.3733L13.8696%2013.7583L15.0337%2014.2258L15.6754%2013.1166L14.6854%2012.3466L13.8696%2011.705L13.9979%2010.6691C14.0254%2010.3941%2014.0437%2010.1925%2014.0437%209.99998ZM9.00204%206.33331C6.97621%206.33331%205.33537%207.97415%205.33537%209.99998C5.33537%2012.0258%206.97621%2013.6666%209.00204%2013.6666C11.0279%2013.6666%2012.6687%2012.0258%2012.6687%209.99998C12.6687%207.97415%2011.0279%206.33331%209.00204%206.33331ZM7.16872%209.99998C7.16872%2011.0083%207.99372%2011.8333%209.00205%2011.8333C10.0104%2011.8333%2010.8354%2011.0083%2010.8354%209.99998C10.8354%208.99165%2010.0104%208.16665%209.00205%208.16665C7.99372%208.16665%207.16872%208.99165%207.16872%209.99998Z%22%20fill%3D%22%23ffffff%22%2F%3E%0A%3C%2Fsvg%3E%0A);
          }
          .icon-delete {
            svg {
              fill: #fff;
              stroke: #fff;
            }
          }
        }
        .icon {
          width: 18px;
          height: 19px;
          margin-right: 11px;
          background: url(data:image/svg+xml,%3Csvg%20width%3D%2218%22%20height%3D%2220%22%20viewBox%3D%220%200%2018%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M15.877%209.99998C15.877%2010.3116%2015.8495%2010.605%2015.8129%2010.8983L17.747%2012.4108C17.9212%2012.5483%2017.967%2012.7958%2017.857%2012.9975L16.0237%2016.1691C15.9412%2016.3158%2015.7854%2016.3983%2015.6295%2016.3983C15.5745%2016.3983%2015.5195%2016.3891%2015.4645%2016.3708L13.182%2015.4541C12.7054%2015.8116%2012.192%2016.1233%2011.6329%2016.3525L11.2845%2018.7816C11.257%2019.0016%2011.0645%2019.1666%2010.8354%2019.1666H7.16872C6.93955%2019.1666%206.74705%2019.0016%206.71955%2018.7816L6.37122%2016.3525C5.81205%2016.1233%205.29872%2015.8208%204.82205%2015.4541L2.53955%2016.3708C2.49372%2016.3891%202.43872%2016.3983%202.38372%2016.3983C2.21872%2016.3983%202.06288%2016.3158%201.98038%2016.1691L0.14705%2012.9975C0.0370501%2012.7958%200.0828834%2012.5483%200.25705%2012.4108L2.19122%2010.8983C2.15455%2010.605%202.12705%2010.3025%202.12705%209.99998C2.12705%209.69748%202.15455%209.39498%202.19122%209.10165L0.25705%207.58915C0.0828834%207.45165%200.0278834%207.20415%200.14705%207.00248L1.98038%203.83081C2.06288%203.68415%202.21872%203.60165%202.37455%203.60165C2.42955%203.60165%202.48455%203.61081%202.53955%203.62915L4.82205%204.54581C5.29872%204.18831%205.81205%203.87665%206.37122%203.64748L6.71955%201.21831C6.74705%200.998313%206.93955%200.833313%207.16872%200.833313H10.8354C11.0645%200.833313%2011.257%200.998313%2011.2845%201.21831L11.6329%203.64748C12.192%203.87665%2012.7054%204.17915%2013.182%204.54581L15.4645%203.62915C15.5104%203.61081%2015.5654%203.60165%2015.6204%203.60165C15.7854%203.60165%2015.9412%203.68415%2016.0237%203.83081L17.857%207.00248C17.967%207.20415%2017.9212%207.45165%2017.747%207.58915L15.8129%209.10165C15.8495%209.39498%2015.877%209.68831%2015.877%209.99998ZM14.0437%209.99998C14.0437%209.80748%2014.0346%209.61498%2013.9979%209.33081L13.8696%208.29498L14.6854%207.65331L15.6662%206.87415L15.0246%205.76498L13.8604%206.23248L12.8887%206.62665L12.0546%205.98498C11.6879%205.70998%2011.3212%205.49915%2010.9271%205.33415L9.95538%204.93998L9.80872%203.90415L9.63455%202.66665H8.36038L8.17705%203.90415L8.03038%204.93998L7.05872%205.33415C6.68288%205.48998%206.30705%205.70998%205.91288%206.00331L5.08788%206.62665L4.13455%206.24165L2.97038%205.77415L2.32872%206.88331L3.31872%207.65331L4.13455%208.29498L4.00622%209.33081C3.97872%209.60581%203.96038%209.81665%203.96038%209.99998C3.96038%2010.1833%203.97872%2010.3941%204.00622%2010.6783L4.13455%2011.7141L3.31872%2012.3558L2.32872%2013.1258L2.97038%2014.235L4.13455%2013.7675L5.10622%2013.3733L5.94038%2014.015C6.30705%2014.29%206.67372%2014.5008%207.06788%2014.6658L8.03955%2015.06L8.18622%2016.0958L8.36038%2017.3333H9.64372L9.82705%2016.0958L9.97372%2015.06L10.9454%2014.6658C11.3212%2014.51%2011.6971%2014.29%2012.0912%2013.9966L12.9162%2013.3733L13.8696%2013.7583L15.0337%2014.2258L15.6754%2013.1166L14.6854%2012.3466L13.8696%2011.705L13.9979%2010.6691C14.0254%2010.3941%2014.0437%2010.1925%2014.0437%209.99998ZM9.00204%206.33331C6.97621%206.33331%205.33537%207.97415%205.33537%209.99998C5.33537%2012.0258%206.97621%2013.6666%209.00204%2013.6666C11.0279%2013.6666%2012.6687%2012.0258%2012.6687%209.99998C12.6687%207.97415%2011.0279%206.33331%209.00204%206.33331ZM7.16872%209.99998C7.16872%2011.0083%207.99372%2011.8333%209.00205%2011.8333C10.0104%2011.8333%2010.8354%2011.0083%2010.8354%209.99998C10.8354%208.99165%2010.0104%208.16665%209.00205%208.16665C7.99372%208.16665%207.16872%208.99165%207.16872%209.99998Z%22%20fill%3D%22%23999999%22%2F%3E%0A%3C%2Fsvg%3E%0A);
          transition: 0.3s;
          &:hover {
            transform: rotate(180deg) scale(1.1);
          }
        }
        .icon-delete {
          height: 19px;
          margin-right: 5px;
          display: flex;
          align-items: center;
          transition: 0.5s;
          &:hover {
            transform: rotate3d(0, 1, 0, 180deg) scale(1.1);
          }
        }
      }
    }
  }
}
.vue-notification-group {
  z-index: 9999 !important;
}
.subscribe-modal {
  max-width: none;
}
.modal-body {
  /*padding: 0 19px;*/
}
.modal-footer {
  padding: 0;
  border: 0;
}
.modal-content {
  border: none;
}
</style>
