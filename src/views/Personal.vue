<template>
  <div class="personal">
    <div class="personal__info-wrap">
      <div v-if="user.avatar || avatarPath" class="personal__logo">
        <img :src="serverUrl + avatarPath" />
        <div
          v-if="!user.avatar && !avatarPath"
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
      </div>
      <div v-else class="personal__logo empty"></div>
      <div class="personal__name-wrap">
        <div class="name">
          {{ user.fio }}
        </div>
        <div class="role">
          {{ getRole() }}
        </div>
      </div>
    </div>
    <div class="personal__title">
      Общая информация
    </div>
    <div class="personal__form">
      <b-form>
        <b-row class="mb-4">
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <b-form-input
                v-model="user.fio"
                :placeholder="$t('name')"
                required
                :class="{
                  'is-danger':
                    ($v.user.fio.$invalid && user.fio) ||
                    (!user.fio && showFormErrors)
                }"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <v-select
                class="personal-select"
                :placeholder="$t('country')"
                :options="['Россия', 'Украина']"
                v-model.trim="user.country"
              >
              </v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <v-select
                class="personal-select"
                :placeholder="$t('locality')"
                :options="['Россия', 'Украина']"
                v-model.trim="user.locality"
              >
              </v-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <b-form-input
                v-model="user.site"
                :placeholder="$t('site')"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <b-form-input
                v-model="user.phone"
                :placeholder="$t('phone')"
                v-mask="'+7 (###) ###-##-##'"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <b-form-input
                v-model="user.company"
                :placeholder="$t('companyName')"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-btn class="personal__btn">
          {{ $t("save") }}
        </b-btn>
      </b-form>
    </div>

    <!--modals-->
    <b-modal
      v-model="showAvatarModal"
      hide-footer
      :title="$t('add_image')"
      centered
    >
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
    </b-modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required } from "vuelidate/lib/validators";
import { serverUrl } from "@/store/urls";
export default {
  name: "Personal",
  data() {
    return {
      showFormErrors: false,
      serverUrl: serverUrl,
      showAvatarModal: false,
      files: [],
      loading: false
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      avatarPath: state => state.user.avatarPath
    })
  },
  validations: {
    user: {
      fio: { required }
    }
  },
  methods: {
    getRole() {
      return this.$i18n.messages[this.$i18n.locale][
        this.user.userRoleList[0].authorities.split("_")[1].toLowerCase()
      ];
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
.personal {
  padding: 50px;
  background: rgba(255, 255, 255, 0.3);
  font-family: $ffamily !important;
  text-align: left;
  border-radius: 4px;
  @media all and(max-width: 960px) {
    padding: 15px;
  }
  &__info-wrap {
    display: flex;
    margin-bottom: 40px;
  }
  &__logo {
    border-radius: 50%;
    margin-right: 44px;
    &.empty {
      background: #b1b9ca;
    }
    img {
      max-width: 100%;
      width: auto;
      height: 81px;
    }
  }
  &__name-wrap {
    text-align: left;
    .name {
      font-size: 20px;
      line-height: 23px;
      color: #080e31;
    }
    .role {
      margin-top: 5px;
      font-size: 17px;
      color: #999;
    }
  }
  &__title {
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.01em;
    color: #688e74;
    padding-bottom: 15px;
    position: relative;
    margin-bottom: 115px;
    &:before {
      content: "";
      display: block;
      position: absolute;
      top: auto;
      left: 0;
      bottom: 0;
      width: 50px;
      height: 3px;
      background: #364b3c;
    }
  }
  &__form {
    input,
    select {
      background: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border: none;
      border-radius: 0;
      padding: 8px 0;
      color: #717171;
      border-bottom: 2px solid #eef0f4;
      &::placeholder {
        color: #999;
      }
    }
  }
  &__btn {
    margin-top: 40px;
    background: #688e74;
    border-radius: 30px;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.01em;
    color: #ffffff;
    padding: 8px 15px;
    width: 300px;
    max-width: 100%;
  }
  .edit-avatar {
    margin-top: 5px;
    cursor: pointer;
  }
}
</style>
