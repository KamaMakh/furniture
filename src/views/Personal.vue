<template>
  <div class="personal">
    <div class="personal__info-wrap">
      <div v-if="user.avatar || avatarPath" class="personal__logo">
        <v-img
          :src="serverUrl + avatarPath"
          contain
          class="lighten-2"
          max-height="140"
          light
        >
          <template v-slot:placeholder>
            <v-row class="ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
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
      <div v-else class="personal__logo">
        <div
          v-if="!user.avatar && !avatarPath"
          class="edit-avatar"
          @click="showAvatarModal = true"
        >
          <fa-icon icon="plus" />
          {{ $t("add_avatar") }}
        </div>
      </div>
      <div class="personal__name-wrap">
        <div class="name">
          {{ user.fio }}
        </div>
        <!--<div class="role">-->
        <!--{{ getRole() }}-->
        <!--</div>-->
      </div>
    </div>
    <div class="personal__title">
      {{ $t("myAccount") }}
    </div>
    <div class="personal__form">
      <v-form
        v-model="profileValid"
        ref="profileForm"
        @submit.prevent="updateProfile"
      >
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="user.fio"
              :label="$t('name')"
              :rules="[rules.required]"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              v-model="country"
              :items="countries"
              clearable
              hide-details
              item-text="label"
              item-value="id"
              :color="color"
              :label="$t('country')"
              v-debounce:300ms="getCountries"
            >
            </v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              :disabled="country === undefined"
              v-model="city"
              :items="cities"
              :search-input.sync="citySearch"
              clearable
              hide-details
              item-text="name"
              item-value="id"
              :label="$t('locality')"
              v-debounce:300ms="getCities"
              :color="color"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
        <v-row class="mb-4">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="user.site"
              :label="$t('site')"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="user.phone"
              :label="$t('phone')"
              v-mask="'+7 (###) ###-##-##'"
              :color="color"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="user.nameOrganization"
              :label="$t('companyName')"
              :color="color"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="4">
            <v-textarea
              :label="$t('info')"
              v-model="user.info"
              :color="color"
            ></v-textarea>
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="4"
            class="d-flex align-items-end align-self-end"
          >
            <v-text-field
              v-model="user.currency.name"
              :label="$t('currency')"
              :color="color"
              disabled
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          :color="color"
          dark
          rounded
          large
          :loading="loading"
          type="submit"
        >
          {{ $t("save") }}
        </v-btn>
      </v-form>
    </div>

    <!--modals-->
    <v-dialog v-model="showAvatarModal" width="400">
      <v-card>
        <v-form ref="avatarForm" v-model="avatarValid">
          <v-card-title>
            {{ $t("add_image") }}
          </v-card-title>
          <v-card-text>
            <v-file-input
              v-model="files"
              :label="$t('add_image')"
              prepend-icon="mdi-camera"
              accept="image/jpeg, image/png, image/gif"
              :rules="[rules.required, rules.max]"
              show-size
            ></v-file-input>
          </v-card-text>
          <v-card-actions>
            <v-btn color="grey" dark @click="showAvatarModal = false">
              {{ $t("close") }}
            </v-btn>
            <v-btn
              :color="color"
              dark
              :loading="loading"
              @click="addAvatar"
              :disabled="typeof files == 'Array'"
            >
              {{ $t("save") }}
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import { required, fileMaxSize } from "@/shared/validator";
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
      citySearch: "",
      site: "",
      rules: {
        required: value => required(value) || this.$t("required"),
        max: value =>
          fileMaxSize(value, 2000000) || this.$t("maxSize", { size: 2 })
      },
      avatarValid: true,
      profileValid: true,
      color: "#688e74"
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
  methods: {
    getRole() {
      return this.$i18n.messages[this.$i18n.locale][
        this.user.userRoleList[0].authorities.split("_")[1].toLowerCase()
      ];
    },
    addAvatar() {
      if (!this.$refs.avatarForm.validate()) {
        this.loading = false;
        return;
      }
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
      if (!this.$refs.profileForm.validate()) {
        this.loading = false;
        return;
      }
      let formData = new FormData();
      if (this.country) {
        let countryId = this.country.id ? this.country.id : this.country;
        formData.append("countryId", countryId);
        if (this.city) {
          let cityId = this.city.id ? this.city.id : this.city;
          formData.append("cityId", cityId);
        } else {
          formData.append("cityId", -1);
        }
      } else {
        formData.append("countryId", -1);
      }
      formData.append("fio", this.user.fio);

      if (this.user.phone) formData.append("phone", this.user.phone);
      if (this.user.site) formData.append("site", this.user.site);
      if (this.user.info) formData.append("info", this.user.info);
      if (this.user.nameOrganization)
        formData.append("nameOrganization", this.user.nameOrganization);
      this.loading = true;
      this.$store.dispatch("user/updateProfile", formData).finally(() => {
        this.loading = false;
      });
    }
  },
  watch: {
    country(country) {
      if (country) {
        this.city = undefined;
        this.citySearch = undefined;
        this.$store.dispatch("user/getCities", {
          countryId: country.id ? country.id : country,
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
        this.getCities();
        this.city = {
          label: this.user.city.title,
          name: this.user.city.title,
          id: this.user.city.cityId,
          countryId: this.user.city.countryId
        };
        this.citySearch = this.user.city.title;
        //this.city = this.user.city.title
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
    margin-bottom: 50px;
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
    select,
    textarea {
      background: none;
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      border: none;
      border-radius: 0;
      padding: 8px 0;
      color: #717171;
      border-bottom: 2px solid #999;
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
