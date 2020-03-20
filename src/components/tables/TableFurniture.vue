<template>
  <div v-if="construction && construction.id">
    <div class="custom-control custom-switch d-flex mb-2">
      <v-switch
        v-model="ndsColumns"
        :label="$t('nds')"
        @change="hideNdsColumns"
        light
        color="#688e74"
      ></v-switch>
    </div>
    <perfect-scrollbar style="padding-bottom: 20px;">
      <v-skeleton-loader
        :loading="tableLoading"
        ref="skeleton"
        type="table-tbody"
        transition="scale-transition"
        :tile="false"
        class="mx-auto"
      >
        <table class="table" id="furnitureTable">
          <thead>
            <tr>
              <td
                v-for="(item, key) in titles"
                :key="key"
                :width="tdWidths[key] + '%'"
                :title="item.name"
                @click="sort(item, $event)"
                style="cursor: pointer"
                :class="{ bold: item.code === currentSort }"
              >
                <span
                  v-if="key === 0"
                  @click="showModal"
                  :title="$t('add_group')"
                  class="icon"
                  style="cursor: pointer"
                >
                  <IconPlusSquared width="19" height="19" fill="#C4C4C4" />
                </span>
                <span
                  class="ellipsis"
                  :style="{ maxWidth: docNameWidth + 'px' }"
                >
                  {{ item.name }}
                </span>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr
              style="cursor: pointer"
              v-for="(item, key) in rows"
              :key="key"
              :class="{ odd: key % 2 === 0 || key === 0 }"
            >
              <td
                v-if="item.price === undefined && item.isTotal === undefined"
                colspan="12"
                class="d-table-cell border-right"
                @click="toggleGroupRows(item, $event)"
                :child="enabledGroups[item.id]"
              >
                <span class="d-flex align-items-center justify-content-start">
                  <span
                    v-if="!item.price && item.creatorId === user.id"
                    @click="showModal(item)"
                    :title="$t('edit_group')"
                    class="setting-icon"
                  >
                    <IconSettings width="18" height="18" fill="#dadada" />
                  </span>
                  <span
                    class="icon"
                    style="cursor: pointer"
                    :title="$t('add_nomenclature')"
                    @click="showNomenclature(item)"
                  >
                    <IconPlusSquared width="18" height="18" fill="#C4C4C4" />
                  </span>
                  {{ item.name }}
                </span>
              </td>
              <td v-else-if="item.isTotal"></td>
              <td
                v-else
                width="27%"
                style="display: table-cell; padding: 10px 5px;"
                @click="showEditNomenclature(item, $event)"
              >
                <div class="d-flex">
                  <span v-if="item.photos && item.photos[0]" class="icon">
                    <!--<img :src="serverUrl + item.photos[0]['pathUrl']" alt="" />-->
                    <v-img
                      :src="serverUrl + item.photos[0]['pathUrl']"
                      contain
                      class="grey lighten-2"
                      max-width="30"
                      max-height="30"
                      light
                    >
                      <template v-slot:placeholder>
                        <v-row
                          class="fill-height ma-0"
                          align="center"
                          justify="center"
                        >
                          <v-progress-circular
                            indeterminate
                            color="grey lighten-5"
                          ></v-progress-circular>
                        </v-row>
                      </template>
                    </v-img>
                  </span>
                  <span v-else class="icon no-img"></span>
                  <span
                    class="ellipsis ml-0"
                    :title="item.name"
                    :style="{ maxWidth: docNameWidth + 'px' }"
                  >
                    {{ item.name }}
                  </span>
                  <span
                    v-if="item.creatorId === user.id"
                    :title="$t('delete')"
                    style="width: 20px; height: 25px; cursor: pointer; margin-left: 5px;"
                    @click="showDeleteNomenModal(item)"
                  >
                    <IconBasket
                      width="18"
                      height="18"
                      fill="#999"
                      stroke="#999"
                    />
                  </span>
                </div>
              </td>
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.isTotal ? "" : item.count }}
              </td>
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.units ? item.units.abName : "" }}
              </td>

              <td
                v-if="item.price !== undefined || item.isTotal"
                width="10%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.isTotal ? "" : item.term }}
              </td>
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="9%"
                style="word-break: initial"
                @click="showEditNomenclature(item, $event)"
              >
                <div v-if="!item.isTotal" id="anim">
                  <span class="tooltip-custom">
                    <span
                      class="tooltip-html"
                      v-html="statusesHtml(item)"
                    ></span>
                    <span v-if="item.buy">
                      {{ $t("purchased") }}
                    </span>
                    <span
                      v-else-if="getStatus(item.status) === 'confirmed_simple'"
                    >
                      {{ $t("confirmed_simple") }}
                    </span>
                    <span v-else>
                      {{ $t("not_confirmed_simple") }}
                    </span>
                  </span>
                </div>
                <div v-else>{{ $t("total") }} "{{ item.group.name }}":</div>
              </td>
              <!--<td-->
              <!--v-if="item.price !== undefined && ndsColumns"-->
              <!--width="5%"-->
              <!--@click="showEditNomenclature(item, $event)"-->
              <!--&gt;-->
              <!--{{ item.nds }}-->
              <!--</td>-->
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                {{
                  item.isTotal ? item.sumWithoutNdsPrice : item.priceWithoutNds
                }}
              </td>
              <td
                v-if="(item.price !== undefined && ndsColumns) || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.isTotal ? item.sumPrice : item.price }}
              </td>
              <td
                v-if="(item.price !== undefined && ndsColumns) || item.isTotal"
                width="7%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.isTotal ? item.sumNdsValue : item.ndsValue }}
              </td>
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                {{ item.isTotal ? item.sumTotalPrice : item.totalPrice }}
              </td>
              <td
                v-if="item.price !== undefined || item.isTotal"
                width="5%"
                @click="showEditNomenclature(item, $event)"
              >
                <span class="ellipsis">
                  {{ item.magazine }}
                </span>
              </td>
              <td v-if="item.price !== undefined || item.isTotal" width="18%">
                <span
                  class="ellipsis"
                  style="max-width: 120px; text-align: left;"
                >
                  <a :href="item.link" target="_blank">{{ item.link }}</a>
                </span>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr
              style="background: rgb(225, 225, 225, 0.2); font-size: 13px;"
              class="white--text text-center"
            >
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>{{ $t("total") }}:</th>
              <th>
                {{ totalSum.sumWithoutNdsPrice }}
              </th>
              <th>
                {{ totalSum.sumPrice }}
              </th>
              <th class="pl-1 pr-1">
                {{ totalSum.sumNdsValue }}
              </th>
              <th>
                {{ totalSum.sumTotalPrice }}
              </th>
              <th></th>
              <th></th>
            </tr>
          </tfoot>
        </table>
      </v-skeleton-loader>
    </perfect-scrollbar>

    <!--modals-->
    <v-dialog v-model="showAddModal" width="400">
      <v-card>
        <v-card-title class="headline">
          {{ group && group.id ? $t("edit_group") : $t("add_group") }}
        </v-card-title>
        <v-card-text>
          <v-form
            ref="addGroupForm"
            v-model="addGroupValid"
            @submit.prevent="addGroup"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="group.name"
                  :label="$t('construct_name')"
                  :placeholder="$t('construct_name')"
                  :rules="rules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="showAddModal = false">
            {{ $t("close") }}
          </v-btn>

          <v-btn :color="color" text :loading="loading" @click="addGroup">
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRemoveNomekModal" width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("delete") }} "{{ nomenclature.name }}"?
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="grey darken-1"
            text
            @click="showRemoveNomekModal = false"
          >
            {{ $t("close") }}
          </v-btn>

          <v-btn
            color="color"
            text
            :loading="loading"
            @click="deleteNomenclature"
          >
            {{ $t("delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <transition name="fade-none">
      <div v-if="showAddPhotoModal">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="form-group row">
                    <uploader
                      v-model="files"
                      limit="1"
                      :title="$t('add_image')"
                      :autoUpload="false"
                      :multiple="true"
                    ></uploader>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-custom"
                    @click="addPhoto"
                  >
                    {{ $t("save") }}
                  </button>
                  <button
                    type="button"
                    class="btn btn-secondary"
                    @click="showAddPhotoModal = false"
                  >
                    {{ $t("close") }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <v-dialog v-model="showNomekModal" width="850">
      <v-card>
        <v-card-text>
          <v-form
            ref="addNomenclatureForm"
            v-model="addNomenclatureValid"
            @submit.prevent="addNomenclature"
            lazy-validation
          >
            <v-row class="ml-0 mr-0 nomenclature-column">
              <div class="body-left col col-lg-6 col-md-12">
                <div class="form-group row">
                  <div style="flex: 1 1 100%; padding-bottom: 5px">
                    <CustomGallery
                      :nomenclature="nomenclature"
                      :images="nomenclature.photos"
                      :isCreator="
                        nomenclature.creatorId === user.id && !absolutesDisabled
                      "
                      :files="files"
                      @on-delete-new="deleteNewPhoto"
                      @on-delete="deletePhotoModal"
                      @on-add-file="readFile"
                    />
                  </div>
                </div>
              </div>
              <div class="body-right col col-lg-6 col-md-12">
                <div class="form-group row">
                  <div class="col col-8">
                    <v-text-field
                      v-model="nomenclature.name"
                      :label="$t('construct_name')"
                      :placeholder="$t('construct_name')"
                      :rules="rules"
                      :disabled="absolutesDisabled"
                    ></v-text-field>
                  </div>
                  <div class="col col-4">
                    <div
                      v-if="
                        nomenclature.creatorId === user.id || !nomenclature.id
                      "
                      class="custom-control custom-switch"
                      :class="{ disabled: absolutesDisabled }"
                    >
                      <v-switch
                        v-model="nomenclature.ndsBool"
                        :label="$t('nds')"
                        light
                        color="#688e74"
                      ></v-switch>
                    </div>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-text-field
                      v-model="price"
                      :label="$t('price')"
                      :placeholder="$t('price')"
                      type="number"
                      step="1000"
                      :disabled="absolutesDisabled"
                    ></v-text-field>
                  </div>
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-text-field
                      v-model="nomenclature.magazine"
                      :label="$t('magazine')"
                      :placeholder="$t('magazine')"
                      :disabled="absolutesDisabled"
                    ></v-text-field>
                  </div>
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-select
                      :label="$t('unit_sh')"
                      :disabled="absolutesDisabled"
                      class="nomenclature-select w-100"
                      hide-details
                      light
                      :placeholder="
                        nomenclature.id
                          ? nomenclature.units.name
                          : $t('unit_sh')
                      "
                      :items="units"
                      item-text="abName"
                      item-value="id"
                      v-model="nomenclature.units"
                    >
                    </v-select>
                  </div>
                </div>
                <div class="form-group row">
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-text-field
                      v-model="nomenclature.count"
                      :label="$t('count')"
                      :placeholder="$t('count')"
                      :disabled="absolutesDisabled"
                      type="number"
                      step="1"
                    ></v-text-field>
                  </div>
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-menu
                      v-model="menu2"
                      :disabled="absolutesDisabled"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="nomenclature.term"
                          :label="$t('term')"
                          @blur="date = parseDate(nomenclature.term)"
                          light
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="date"
                        @input="menu2 = false"
                        :locale="lang"
                        first-day-of-week="1"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-text-field
                      v-model="nomenclature.link"
                      :label="$t('link')"
                      :placeholder="$t('link')"
                      :disabled="absolutesDisabled"
                    ></v-text-field>
                  </div>
                </div>
                <div class="form-group row">
                  <div
                    v-if="nomenclature.ndsBool"
                    class="col col-lg-4 col-md-4 col-sm-12"
                    :class="{ disabled: !nomenclature.ndsBool }"
                  >
                    <v-text-field
                      v-model="nomenclature.nds"
                      :label="$t('nds')"
                      :placeholder="$t('nds')"
                      :disabled="absolutesDisabled"
                      type="number"
                      step="1"
                      :rules="[newRules.nds]"
                      @change="updatePrices"
                    ></v-text-field>
                  </div>
                  <div
                    v-if="nomenclature.ndsBool"
                    class="col col-lg-4 col-md-4 col-sm-12"
                    :class="{ disabled: !nomenclature.ndsBool }"
                  >
                    <v-text-field
                      v-model="nomenclature.ndsValue"
                      :label="$t('ndsValue')"
                      :placeholder="$t('ndsValue')"
                      type="number"
                      step="any"
                      disabled
                    ></v-text-field>
                  </div>
                  <div class="col col-lg-4 col-md-4 col-sm-12">
                    <v-text-field
                      v-model="nomenclature.priceWithoutNds"
                      :label="$t('priceWithoutNds')"
                      :placeholder="$t('priceWithoutNds')"
                      type="number"
                      step="any"
                      disabled
                    ></v-text-field>
                  </div>
                </div>
                <div class="form-group">
                  <v-checkbox
                    small
                    v-for="(item, key) in nomenclature.status"
                    @click.native="updateConfirm(nomenclature)"
                    :loading="loading"
                    :key="key"
                    color="#688e74"
                    style="font-size: 12px"
                    v-model="nomenclature.status[key]['confirmed']"
                    :disabled="
                      nomenclature.id === updatingId ||
                        nomenclature.buy ||
                        absolutesDisabled ||
                        nomenclature.status[key]['mustConfirmedId'] !== user.id
                    "
                    :label="`${$t('confirmed')} ${item.nameMustConfirmed}`"
                  ></v-checkbox>
                </div>
                <div class="form-group row justify-space-between ml-0 mr-0">
                  <v-btn
                    v-if="
                      (nomenclature.creatorId === user.id ||
                        !nomenclature.id) &&
                        !nomenclature.buy
                    "
                    color="#688e74"
                    class="ma-1 ml-0"
                    dark
                    :disabled="!addNomenclatureValid"
                    :loading="loading"
                    @click="addNomenclature"
                  >
                    {{ $t("save") }}
                  </v-btn>

                  <v-btn
                    dark
                    @click="showNomekModal = false"
                    color="#999"
                    class="ma-1"
                  >
                    {{ $t("close") }}
                  </v-btn>

                  <v-btn
                    v-if="
                      getStatus(nomenclature.status) === 'confirmed_simple' &&
                        !nomenclature.buy
                    "
                    color="#688e74"
                    class="ma-1"
                    dark
                    :loading="loading"
                    @click="buyNomenclature(nomenclature)"
                  >
                    {{ $t("buy") }}
                  </v-btn>
                  <v-btn
                    v-else-if="
                      nomenclature.buy && nomenclature.buyerId === user.id
                    "
                    color="#688e74"
                    class="ma-1"
                    dark
                    :loading="loading"
                    @click="buyNomenclature(nomenclature)"
                  >
                    {{ $t("cancelPurchase") }}
                  </v-btn>
                </div>
              </div>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog v-model="showRemovePhotoModal" width="400">
      <v-card>
        <v-card-title class="headline">
          {{ $t("delete") }} "{{ image.id }}"?
        </v-card-title>
        <v-card-actions>
          <v-btn
            color="grey darken-1"
            text
            @click="showRemovePhotoModal = false"
          >
            {{ $t("close") }}
          </v-btn>

          <v-btn :color="color" text :loading="loading" @click="deletePhoto">
            {{ $t("delete") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <div
    v-else-if="empty"
    class="d-flex align-center justify-center"
    style="height: 300px"
  >
    <v-btn outlined large class="ma-auto" @click="createConstruction">
      <v-icon left>
        mdi-plus
      </v-icon>
      {{ $t("add_constr") }}
    </v-btn>
  </div>
</template>

<script>
import Vue from "vue";
import Uploader from "vux-uploader-component";
import { mapState } from "vuex";
import VueMask from "v-mask";
import { serverUrl } from "@/store/urls";
import VCalendar from "v-calendar";
import CustomGallery from "@/components/CustomGallery";
import { userUrls } from "@/store/urls";
import IconPlusSquared from "@/components/common/icons/IconPlusSquared";
import IconSettings from "@/components/common/icons/IconSettings";
import IconBasket from "@/components/common/icons/IconBasket";
import { ndsCount } from "@/shared/validator";

Vue.use(VCalendar);
Vue.use(VueMask);
export default {
  name: "TableFurniture",
  props: ["leftMenuShow"],
  components: {
    Uploader,
    CustomGallery,
    IconPlusSquared,
    IconSettings,
    IconBasket
  },
  data() {
    return {
      userUrls: userUrls,
      hideAllRows: false,
      showAddModal: false,
      showRemoveNomekModal: false,
      showNomekModal: false,
      showRemovePhotoModal: false,
      showAddPhotoModal: false,
      group: {},
      nomenclature: {},
      showFormErrors: false,
      serverUrl: serverUrl,
      tdWidths: [27, 5, 5, 7, 9, 5, 10, 5, 7, 5, 5, 16],
      updatingId: null,
      price: 0,
      photos: [],
      image: {},
      index: null,
      files: [],
      ndsColumns: true,
      currentSort: "",
      currentSortDir: "asc",
      loading: false,
      absolutesDisabled: false,
      addGroupValid: true,
      addNomenclatureValid: true,
      newRules: {
        nds: value => ndsCount(value) || this.$t("messages.error.nds")
      },
      rules: [v => !!v || this.$t("required")],
      color: "#688e74",
      emailRules: [
        v => !!v || this.$t("required"),
        v => /.+@.+\..+/.test(v) || this.$t("invalid_email")
      ],
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      docNameWidth: 230
    };
  },
  methods: {
    getDocNameWidth() {
      let table = document.getElementById("furnitureTable");
      if (table) {
        setTimeout(() => {
          this.docNameWidth = table.offsetWidth / 4;
        }, 700);
      }
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    statusesHtml(furniture) {
      let items = "",
        whoBought = "";
      if (furniture.status && furniture.status.length) {
        furniture.status.forEach(item => {
          let confirmed = item.confirmed
              ? this.$i18n.messages[this.$i18n.locale]["confirmed_simple"]
              : this.$i18n.messages[this.$i18n.locale]["not_confirmed_simple"],
            role = item.nameMustConfirmed;
          items +=
            '<div class="status-item"><b>' +
            role +
            ":</b>" +
            " " +
            confirmed +
            "</div>";
          if (furniture.buy && furniture.buyerId === item.whoConfirmedId) {
            whoBought += `<div class="mt-2">${
              this.$i18n.messages[this.$i18n.locale]["purchased"]
            } ${role}</div>`;
          }
        });
      }
      return `<div class="statuses d-flex justify-content-center align-items-center flex-column">
          ${items} ${whoBought}
        </div>`;
    },
    buyNomenclature(nomenclature) {
      this.loading = true;
      this.$store
        .dispatch("furniture/buyNomenclature", {
          data: { furnitureNomenclatureId: nomenclature.id },
          nomenclature: nomenclature
        })
        .then(response => {
          if (response && response.buy) {
            this.absolutesDisabled = response.buy;
          }
          this.showNomekModal = false;
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.save");
          this.snackBar.color = "success";
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
          this.nomenclature = {};
        });
    },
    getStatus(statuses) {
      let confirmText = "confirmed_simple";
      if (statuses && statuses.length) {
        statuses.forEach(item => {
          if (item.hasOwnProperty("confirmed") && !item.confirmed) {
            confirmText = "not_confirmed_simple";
          }
        });
        return confirmText;
      }
      return false;
    },
    toggleRows(item) {
      this.groups[item] = !this.groups[item];
    },
    hideAll() {
      this.hideAllRows = !this.hideAllRows;
    },
    addGroup() {
      if (!this.$refs.addGroupForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.group.id) {
        let formData = new FormData();
        formData.append("groupId", this.group.id);
        formData.append("name", this.group.name);

        this.$store
          .dispatch("furniture/updateGroup", {
            data: formData,
            group: this.group
          })
          .then(() => {
            this.showAddModal = false;
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.save");
            this.snackBar.color = "success";
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
      } else {
        this.$store
          .dispatch("furniture/addGroup", {
            furnitureId: this.furniture["id"],
            name: this.group.name
          })
          .then(() => {
            this.showAddModal = false;
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.createGroup");
            this.snackBar.color = "success";
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
    },
    addNomenclature() {
      if (!this.$refs.addNomenclatureForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      if (this.nomenclature.id) {
        formData.append("nomenclatureId", this.nomenclature.id);
        let unit = this.nomenclature.units.id
          ? this.nomenclature.units.id
          : this.nomenclature.units;
        formData.append("unitId", unit);
      } else {
        formData.append("groupId", this.nomenclature.groupId);
        if (this.nomenclature.units) {
          formData.append("unitId", this.nomenclature.units);
        } else if (this.units && this.units.length) {
          formData.append("unitId", this.units[0]["id"]);
        }
        for (let i = 0; i < this.files.length; i++) {
          formData.append(`file`, this.files[i]);
        }
      }
      formData.append("name", this.nomenclature.name);
      formData.append("count", this.nomenclature.count);

      // let term = this.parseDate(this.nomenclature.termString);
      if (!this.nomenclature.term) {
        this.nomenclature.term = this.formatDate(
          new Date().toISOString().substr(0, 10)
        );
      }
      formData.append("term", this.nomenclature.term);
      formData.append("ndsBool", this.nomenclature.ndsBool);

      if (this.nomenclature.ndsBool) {
        formData.append("price", this.nomenclature.price);
        formData.append("nds", this.nomenclature.nds);
        formData.append("ndsValue", this.nomenclature.ndsValue);
      } else {
        formData.append("price", "0");
        formData.append("nds", "0");
        formData.append("ndsValue", "0");
      }

      formData.append("priceWithoutNds", this.nomenclature.priceWithoutNds);

      if (this.nomenclature.link) {
        formData.append("link", this.nomenclature.link);
      }
      if (this.nomenclature.magazine) {
        formData.append("magazine", this.nomenclature.magazine);
      }

      if (this.nomenclature.id) {
        this.$store
          .dispatch("furniture/updateNomenclature", {
            data: formData,
            group: this.nomenclature.group,
            nomenclature: this.nomenclature
          })
          .then(() => {
            this.showNomekModal = false;
            this.$store.dispatch("furniture/getAllSum", {
              furnitureId: this.furniture["id"]
            });
            if (this.files.length) {
              this.addPhoto();
            }
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.save");
            this.snackBar.color = "success";
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
      } else {
        this.$store
          .dispatch("furniture/addNomenclature", {
            data: formData,
            group: this.nomenclature.group,
            onlyOne: this.enabledGroups[this.nomenclature.group.id]
          })
          .then(() => {
            this.$store.dispatch("furniture/getAllSum", {
              furnitureId: this.furniture["id"]
            });
            this.showNomekModal = false;
            if (!this.enabledGroups[this.nomenclature.group.id]) {
              // this.enabledGroups[this.nomenclature.group.id] = true;
              this.$store.dispatch("furniture/editEnabledGroups", {
                id: this.nomenclature.group.id,
                value: true
              });
              this.$store.dispatch(
                "furniture/setNomenclature",
                this.nomenclature.group
              );
            }
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.save");
            this.snackBar.color = "success";
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
    },
    showModal(group) {
      this.showAddModal = true;
      this.group = group || {};
    },
    formatDate(date) {
      // let d = new Date(date),
      //   month = "" + (d.getMonth() + 1),
      //   day = "" + d.getDate(),
      //   year = d.getFullYear();
      //
      // if (month.length < 2) month = "0" + month;
      // if (day.length < 2) day = "0" + day;
      //
      // return [day, month, year].join(".");
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
    },
    showNomenclature(item) {
      this.showNomekModal = true;
      this.showFormErrors = false;
      this.files = [];
      this.nomenclature = {
        group: item,
        groupId: item.id,
        nds: this.construction.nds || 0,
        price: 0,
        ndsValue: 0,
        count: 0,
        priceWithoutNds: 0,
        ndsBool: false,
        termString: new Date().toISOString().substr(0, 10),
        photos: []
      };
      this.$store.dispatch("furniture/setUnits").then(() => {
        if (this.units[0]) {
          this.nomenclature.unit = this.units[0];
        }
      });
      this.price = 0;
    },
    showEditNomenclature(item, event) {
      if (item.isTotal) return;
      let enableOpen = false;
      this.absolutesDisabled = item.buy;
      if (event) {
        let tagName = event.target.tagName,
          parentName = event.target.parentNode.tagName,
          classList = event.target.classList;
        enableOpen =
          tagName === "TD" ||
          tagName === "IMG" ||
          classList.contains("icon") ||
          classList.contains("ellipsis") ||
          parentName === "TD";
      } else {
        enableOpen = true;
      }

      if (enableOpen) {
        this.$store.dispatch("furniture/setUnits");
        this.showNomekModal = true;

        // let term = item.term.split(".");
        // term = term[2] + "." + term[1] + "." + term[0];
        /* eslint-disable */
        //new Date(term).toISOString().substr(0, 10);
        this.nomenclature = item;
        // this.nomenclature.units["label"] = item.units.abName;
        this.photos = [];
        this.files = [];
        this.price = item.price;
        if (item.photos) {
          item.photos.forEach(item => {
            this.photos.push(this.serverUrl + item.pathUrl + "&type=1000px");
          });
        }
        if (!item.ndsBool) {
          this.price = this.nomenclature.price = this.nomenclature.priceWithoutNds;
        }
      }
    },
    readFile(newFile) {
      if (newFile) {
        let reader = new FileReader();
        reader.onload = e => {
          if (!this.nomenclature.id) {
            this.nomenclature.photos = [];
          }
          this.nomenclature.photos.push({
            src: e.target.result,
            isNew: true
          });
        };
        reader.readAsDataURL(newFile);
        this.files.push(newFile);
      }
    },
    showDeleteNomenModal(item) {
      this.showRemoveNomekModal = true;
      this.nomenclature = item;
    },
    deleteNomenclature() {
      this.loading = true;
      this.$store
        .dispatch("furniture/deleteNomenclature", this.nomenclature)
        .then(() => {
          this.showRemoveNomekModal = false;
          this.$store.dispatch("furniture/getAllSum", {
            furnitureId: this.furniture["id"]
          });
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
    deletePhotoModal(image) {
      this.image = image;
      this.showRemovePhotoModal = true;
    },
    deletePhoto() {
      this.loading = true;
      this.$store
        .dispatch("furniture/deleteNomenclaturePhoto", {
          photoId: this.image.id,
          nomenclature: this.nomenclature
        })
        .then(() => {
          this.showRemovePhotoModal = false;
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
    deleteNewPhoto(image) {
      this.files = [];
      this.nomenclature.photos.splice(
        this.nomenclature.photos.indexOf(image),
        1
      );
    },
    addPhoto() {
      let formData = new FormData();
      formData.append("nomenclatureId", this.nomenclature.id);

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`file`, this.files[i]);
      }
      this.$store
        .dispatch("furniture/addNomenclaturePhoto", {
          data: formData,
          nomenclature: this.nomenclature
        })
        .then(() => {
          this.showAddPhotoModal = false;
          this.nomenclature = {};
          this.files = [];
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
        });
    },
    toggleGroupRows(group, event) {
      if (
        !event ||
        event.target.tagName === "TD" ||
        (event.target.tagName !== "svg" &&
          event.target.tagName !== "path" &&
          !event.target.classList.contains("icon"))
      ) {
        if (!this.enabledGroups[group.id]) {
          // this.enabledGroups[group.id] = true;
          this.$store.dispatch("furniture/editEnabledGroups", {
            id: group.id,
            value: true
          });
          this.$store
            .dispatch("furniture/setNomenclature", group)
            .then(() => {
              //ignore
            })
            .catch(error => {
              this.$notify({
                group: "warn",
                type: "error",
                title: this.$i18n.messages[this.$i18n.locale]["attention"],
                text: error
              });
            });
        } else {
          this.$store.dispatch("furniture/hideNomenclatures", group);
          // this.enabledGroups[group.id] = false;
          this.$store.dispatch("furniture/editEnabledGroups", {
            id: group.id,
            value: false
          });
        }
      }
    },
    updateConfirm(nomenclature) {
      this.updatingId = nomenclature.id;
      this.loading = true;
      this.$store
        .dispatch("furniture/statusConfirm", {
          furnitureNomenclatureId: nomenclature.id
        })
        .then(() => {
          this.updatingId = null;
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.success.save");
          this.snackBar.color = "success";
        })
        .catch(error => {
          this.$notify({
            group: "warn",
            type: "error",
            title: this.$i18n.messages[this.$i18n.locale]["attention"],
            text: error
          });
          this.updatingId = null;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    updatePrices() {
      if (this.nomenclature.price) {
        if (this.nomenclature.ndsBool) {
          if (!this.nomenclature.nds) {
            this.nomenclature.nds = this.construction.nds;
          }
          if (this.nomenclature.nds < 0) {
            this.nomenclature.nds = 0;
          }
          let ndsPercentValue = this.nomenclature.nds/100 + 100;
          this.nomenclature["priceWithoutNds"] = (
            this.nomenclature.price / parseFloat(ndsPercentValue)
          ).toFixed(2);
          this.nomenclature["ndsValue"] = (
            this.nomenclature.price - this.nomenclature["priceWithoutNds"]
          ).toFixed(2);
        } else {
          this.nomenclature.nds = 0;
          this.nomenclature["ndsValue"] = 0;
          this.nomenclature["priceWithoutNds"] = this.nomenclature.price;
        }
      }
    },
    hideNdsColumns() {
      // console.log(this.ndsColumns);
    },
    sort(column, event) {
      if (
        column.sortable &&
        (event.target.tagName === "TD" ||
          event.target.classList.contains("ellipsis"))
      ) {
        let groupKeys = [];
        this.rows.forEach((item, key) => {
          if (item.children && item.children > 1) {
            groupKeys.push({ start: key, length: item.children });
          }
        });
        groupKeys.forEach(item => {
          let children = this.rows.slice(
            item.start + 1,
            item.length + item.start
          );
          children.sort((a, b) => {
            if (this.currentSort === column.code) {
              return 0;
            }
            if (column.code === "term") {
              let date1 = a[column.code].split(".");
              let date2 = b[column.code].split(".");
              date1 = date1[2] + "-" + date1[1] + "-" + date1[0];
              date2 = date2[2] + "-" + date2[1] + "-" + date2[0];
              return new Date(date1) - new Date(date2);
            } else if (column.code === "status") {
              let intValsArr = {
                  not_confirmed_simple: 1,
                  confirmed_simple: 2,
                  purchased: 3
                },
                columnA = a["buy"]
                  ? 3
                  : intValsArr[this.getStatus(a[column.code])],
                columnB = b["buy"]
                  ? 3
                  : intValsArr[this.getStatus(b[column.code])];
              return columnA - columnB;
            } else {
              if (a[column.code] >= b[column.code]) {
                return -1;
              }
            }
          });
          if (this.currentSort === column.code) {
            children.reverse();
          }
          this.rows.splice(item.start + 1, children.length, ...children);
        });
        this.currentSort = column.code;
      }
    },
    getFirstLetter(role) {
      return role.split("_")[1][0];
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || [],
      furniture: state => state.furniture.furniture,
      empty: state => state.emptyConstructions,
      construction: state => state.furniture.construction,
      tableLoading: state => state.furniture.tableLoading,
      constructions: state => state.furniture.constructions,
      user: state => state.user.user,
      roles: state => state.user.roles,
      modules: state => state.user.modules,
      enabledGroups: state => state.furniture.enabledGroups,
      units: state => state.furniture.units,
      totalSum: state => state.furniture.totalSum,
      lang: state => state.lang,
      snackBar: state => state.snackBar,
      titles(state) {
        if (this.ndsColumns) {
          return [
            {
              name: state.furniture.construction.name,
              sortable: true,
              code: "name"
            },
            {
              name: this.$i18n.messages[state.lang]["count_sh"],
              sortable: true,
              code: "count"
            },
            {
              name: this.$i18n.messages[state.lang]["unit_sh"],
              sortable: false,
              code: "units"
            },
            {
              name: this.$i18n.messages[state.lang]["deadlines"],
              sortable: true,
              code: "term"
            },
            {
              name: this.$i18n.messages[state.lang]["status"],
              sortable: true,
              code: "status"
            },
            // {
            //   name: this.$i18n.messages[state.lang]["vatRate"],
            //   sortable: true,
            //   code: "nds"
            // },
            {
              name: this.$i18n.messages[state.lang]["priceWithoutNds"],
              sortable: true,
              code: "priceWithoutNds"
            },
            {
              name: this.$i18n.messages[state.lang]["price"],
              sortable: true,
              code: "price"
            },
            {
              name: this.$i18n.messages[state.lang]["nds"],
              sortable: true,
              code: "ndsValue"
            },
            {
              name: this.$i18n.messages[state.lang]["sum_price"],
              sortable: true,
              code: "totalPrice"
            },
            {
              name: this.$i18n.messages[state.lang]["magazine"],
              sortable: true,
              code: "magazine"
            },
            {
              name: this.$i18n.messages[state.lang]["link"],
              sortable: false,
              code: "link"
            }
          ];
        } else {
          return [
            {
              name: state.furniture.construction.name,
              sortable: true,
              code: "name"
            },
            {
              name: this.$i18n.messages[state.lang]["count_sh"],
              sortable: true,
              code: "count"
            },
            {
              name: this.$i18n.messages[state.lang]["unit_sh"],
              sortable: false,
              code: "units"
            },
            {
              name: this.$i18n.messages[state.lang]["deadlines"],
              sortable: true,
              code: "term"
            },
            {
              name: this.$i18n.messages[state.lang]["status"],
              sortable: false,
              code: "status"
            },
            {
              name: this.$i18n.messages[state.lang]["priceWithoutNds"],
              sortable: true,
              code: "priceWithoutNds"
            },
            {
              name: this.$i18n.messages[state.lang]["sum_price"],
              sortable: true,
              code: "totalPrice"
            },
            {
              name: this.$i18n.messages[state.lang]["magazine"],
              sortable: true,
              code: "magazine"
            },
            {
              name: this.$i18n.messages[state.lang]["link"],
              sortable: false,
              code: "link"
            }
          ];
        }
      }
    })
  },
  watch: {
    furniture() {
      this.currentSort = "";
      // this.enabledGroups = [];
      this.$store.dispatch("furniture/editEnabledGroups", {
        id: null,
        value: []
      });
    },
    price(val) {
      this.nomenclature.price = val;
      this.updatePrices();
    },
    date() {
      this.nomenclature.term = this.formatDate(this.date);
      console.log(this.formatDate(this.date), this.nomenclature.term);
    },
    leftMenuShow() {
      this.getDocNameWidth();
    }
  },
  mounted() {
    if (this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.hidden {
  display: none;
}
.table {
  font-family: $ffamily;
  border-collapse: collapse;
  border: 1px solid #c4c4c4;
  img {
    max-width: 100%;
    max-height: 100%;
  }
  tr {
    border-top: 1px solid #dadada;
    background: #fff;
    font-family: $ffamily;
    color: #868686;
    font-size: 14px;
    transition: 0.3s;
    &.odd {
      background: #f5f5f6;
    }
    td:nth-child(1) {
      border: none;
      display: flex;
      align-items: center;
      font-weight: 500;
    }
    &.parent {
      border-top: 1px solid #c4c4c4;
    }
    &:hover {
      background: rgba(214, 232, 206, 0.69);
    }
    td:nth-child(2) {
      border-left: 1px solid #dadada;
    }
  }
  td,
  th {
    border-right: 1px solid #dadada;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1px 9px;
    border-top: none;
    /*width: 100%;*/
    word-break: break-word;
  }
  tbody {
    tr {
      td:last-child {
        font-weight: 500;
      }
      td span.ellipsis {
        display: block;
        max-width: 95px;
        white-space: nowrap;
        overflow: hidden;
        margin: 0 auto;
        text-overflow: ellipsis;
      }
    }
  }
  thead {
    td {
      text-align: left;
    }
    td .ellipsis {
      max-width: 70px;
      white-space: nowrap;
      overflow: hidden !important;
      text-overflow: ellipsis;
      display: block;
      margin: 0 auto;
    }
    td:first-child {
      width: 100%;
    }
  }
  .icon {
    margin-right: 14px;
    width: 30px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .no-img {
    background: #c4c4c4;
  }
  .setting-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 13px;
    cursor: pointer;
    &:hover {
      path {
        fill: #999;
      }
    }
  }
}
.nomenclature-modal {
  background: #fff;
  border-radius: 18px;
  .modal-content {
    border-radius: 18px;
  }
  .btn-custom {
    background: linear-gradient(
      98.69deg,
      #688e74 11.52%,
      #8ac29c 90.26%
    ) !important;
    border-radius: 14px;
    transition: 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  .btn-close {
    border-radius: 14px;
  }
  .modal-body {
    padding: 0;
  }
  .body-left {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
  }
  .body-right {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1rem;
    background: linear-gradient(
      90deg,
      #e1e1e1 0%,
      rgba(236, 232, 232, 0) 20.31%
    );
  }
  input {
    border: none;
    background: none;
    border-bottom: 1px solid #000;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    font-family: $ffamily;
    &::placeholder {
      color: #c4c4c4;
    }
  }
}
.modal-mask {
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: scroll;
}

.is-danger {
  border-bottom: 1px solid #f04124 !important;
}

@media all and(min-width: 768px) {
  .nomenclature-modal {
    max-width: 850px;
  }
}
@media all and(max-width: 960px) {
  .modal-mask {
    align-items: flex-start;
  }
}
@media all and(max-width: 768px) {
  td {
    word-break: break-word;
    span.ellipsis {
      max-width: 100px;
    }
  }
}
@media all and(max-width: 480px) {
  .nomenclature-column {
    flex-direction: column;
  }
}
.disabled {
  pointer-events: none !important;
  -webkit-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
  cursor: not-allowed !important;
  opacity: 0.6 !important;
}
.images-list-wrap {
  display: flex;
  flex-flow: wrap row;
  margin: 5px;
  .delete-icon {
    width: 20px;
    height: 25px;
    cursor: pointer;
    position: absolute;
    top: auto;
    left: 8px;
    bottom: 8px;
  }
}
.nomenclature-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: 1px solid #ebebeb;
}

label.title {
  display: block;
  text-align: left;
  color: #000;
  font-weight: bold;
  margin-bottom: 0;
  font-size: 12px;
}
.bold {
  font-weight: bold !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background: #688e74;
  border-color: #688e74;
}
</style>
