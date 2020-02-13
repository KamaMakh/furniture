<template>
  <div class="personal">
    <div class="personal__info-wrap">
      <div v-if="user.avatar || avatarPath" class="personal__logo">
        <img :src="serverUrl + avatarPath" />
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
      serverUrl: serverUrl
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
      /*eslint-disable*/
      console.log(this.user.userRoleList[0].authorities.split("_")[1]);
      return this.$i18n.messages[this.$i18n.locale][
        this.user.userRoleList[0].authorities.split("_")[1].toLowerCase()
      ];
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
    width: 81px;
    height: 81px;
    border-radius: 50%;
    margin-right: 44px;
    &.empty {
      background: #b1b9ca;
    }
    img {
      max-width: 100%;
    }
  }
  &__name-wrap {
    text-align: left;
    .name {
      font-size: 20px;
      line-height: 23px;
      color: #080E31;
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
    color: #688E74;
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
      background: #364B3C;
    }
  }
  &__form {
    input, select {
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
    background: #688E74;
    border-radius: 30px;
    font-size: 20px;
    line-height: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    letter-spacing: 0.01em;
    color: #FFFFFF;
    padding: 8px 15px;
    width: 300px;
    max-width: 100%;
  }
}
</style>
