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
      <b-form @submit.prevent="updateProfile">
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
                :options="countries"
                v-model.trim="country"
                v-debounce:300ms="getCountries"
              >
              </v-select>
            </b-form-group>
          </b-col>
          <b-col cols="12" sm="6" md="4">
            <b-form-group>
              <v-select
                class="personal-select"
                :placeholder="$t('locality')"
                :options="cities"
                :disabled="!country"
                v-model.trim="city"
                v-debounce:300ms="getCities"
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
                v-model="user.nameOrganization"
                :placeholder="$t('companyName')"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-btn v-if="!loading" class="personal__btn" type="submit">
          {{ $t("save") }}
        </b-btn>
        <b-btn v-else class="personal__btn">
          <b-spinner small></b-spinner>
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
      loading: false,
      country: "",
      city: "",
      site: ""
    };
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      avatarPath: state => state.user.avatarPath,
      countries(state) {
        let countryList = [];
        state.user.countries.forEach(item => {
          countryList.push({
            label: item.title,
            name: item.title,
            id: item.countryId
          });
        });
        return countryList;
      },
      cities(state) {
        let cityList = [];
        state.user.cities.forEach(item => {
          let region = item.region ? item.region : "";
          cityList.push({
            label: item.title + " " + region,
            name: item.title,
            id: item.cityId,
            countryId: item.countryId
          });
        });
        return cityList;
      }
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
    },
    getCountries(search) {
      this.$store.dispatch("user/getCountries", {
        title: search || "",
        page: 0
      });
    },
    getCities(city) {
      if (this.country !== undefined) {
        this.$store.dispatch("user/getCities", {
          countryId: this.country.id || 0,
          title: city || "",
          page: 0
        });
      }
    },
    updateProfile() {
      let formData = new FormData();
      if (this.country && this.country.id) {
        formData.append("countryId", this.country.id);
        if (this.city && this.city.id) {
          formData.append("cityId", this.city.id);
        } else {
          formData.append("cityId", -1);
        }
      } else {
        formData.append("countryId", -1);
      }
      formData.append("fio", this.user.fio);
      formData.append("phone", this.user.phone);
      formData.append("site", this.user.site);
      formData.append("nameOrganization", this.user.nameOrganization);
      this.loading = true;
      this.$store.dispatch("user/updateProfile", formData).finally(() => {
        this.loading = false;
      });
    }
  },
  watch: {
    country(country) {
      if (country && country.id) {
        this.city = undefined;
        this.$store.dispatch("user/getCities", {
          countryId: country.id,
          title: this.city || "",
          page: 0
        });
      } else {
        this.$store.dispatch("user/getCities", {
          countryId: 0,
          title: "",
          page: 0
        });
      }
    }
  },
  mounted() {
    if (this.user.country && this.user.country.countryId) {
      this.getCountries(this.user.country.title);
      this.country = {
        label: this.user.country.title,
        id: this.user.country.countryId
      };
      setTimeout(() => {
        this.city = {
          label: this.user.city.title,
          name: this.user.city.title,
          id: this.user.city.cityId,
          countryId: this.user.city.countryId
        };
      }, 800);
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
