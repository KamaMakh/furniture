<template>
  <div class="storage-table">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="warehouseNomenclatures"
        item-key="name"
        group-by="groupId"
        class="elevation-1"
        show-group-by
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        hide-default-header
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th
                v-for="(header, key) in headers"
                :key="key"
                :style="{ 'text-align': header.align }"
              >
                {{ header.text }}
              </th>
              <th class="text-right">
                {{ $t("actions") }}
              </th>
            </tr>
          </thead>
        </template>
        <template
          v-if="warehouse"
          v-slot:body="{ item, options, groupedItems, group }"
        >
          <tbody v-for="(group, key) in warehouse.groups" :key="key + group">
            <tr class="v-row-group__header text-left">
              <th colspan="4" :title="group.name">
                {{ group.name | truncate }}
                <v-btn
                  v-if="groupedItems[group.id]"
                  @click="toggleGroup(false, group, groupedItems[group.id])"
                  class="ml-2"
                  icon
                  small
                >
                  <v-icon small :color="color">
                    mdi-arrow-up
                  </v-icon>
                </v-btn>
                <v-btn
                  v-else
                  class="ml-2"
                  icon
                  small
                  @click="toggleGroup(true, group, groupedItems[group.id])"
                  :loading="arrowLoadingId === group.id"
                >
                  <v-icon small :color="color">
                    mdi-arrow-down
                  </v-icon>
                </v-btn>
              </th>
              <td class="text-right">
                <v-btn icon small @click="showNomenclature(group)">
                  <v-icon small :color="color">
                    mdi-plus
                  </v-icon>
                </v-btn>
                <v-btn
                  small
                  icon
                  class="text-center"
                  @click="showAddGroupModal(group)"
                >
                  <v-icon small :color="color">
                    mdi-pencil
                  </v-icon>
                </v-btn>
              </td>
            </tr>
            <tr v-for="(item, nkey) in groupedItems[group.id]" :key="nkey">
              <td
                class="text-left"
                style="cursor:pointer;"
                @click="showEditNomenclature(item, group)"
              >
                <span class="d-flex align-center">
                  <span v-if="item.photos && item.photos[0]" class="icon mr-2">
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
                  <span v-else class="no-img"></span>
                  <span>
                    {{ item.name }}
                  </span>
                </span>
              </td>
              <td
                class="text-center"
                style="cursor:pointer;"
                @click="showEditNomenclature(item, group)"
              >
                {{ item.count }}
              </td>
              <td
                class="text-right"
                style="cursor:pointer;"
                @click="showEditNomenclature(item, group)"
              >
                {{ item.price }}
              </td>
              <td
                class="text-right"
                style="cursor:pointer;"
                @click="showEditNomenclature(item, group)"
              >
                {{ item.totalPrice }}
              </td>
              <td class="text-right">
                <v-btn small icon class="text-center">
                  <v-icon small :color="color">
                    mdi-upload
                  </v-icon>
                </v-btn>
                <v-btn icon small>
                  <v-icon small :color="color">
                    mdi-delete
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              {{ $t("warehouse") }}
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-btn
              dark
              small
              :color="color"
              class="mb-2"
              @click="showAddGroupModal"
            >
              <v-icon left small>
                mdi-plus
              </v-icon>
              {{ $t("add_group") }}
            </v-btn>
            <v-dialog v-model="showGroupModal" max-width="500px">
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
                          :rules="[rules.required]"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="grey darken-1"
                    text
                    @click="showGroupModal = false"
                  >
                    {{ $t("close") }}
                  </v-btn>

                  <v-btn
                    :color="color"
                    text
                    :loading="loading"
                    @click="addGroup"
                  >
                    {{ $t("save") }}
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-card>
    <!--<v-pagination v-model="page" :length="pageCount"></v-pagination>-->

    <!--modals-->
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
                      :isCreator="true"
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
                      :rules="[rules.required]"
                      :disabled="absolutesDisabled"
                    ></v-text-field>
                  </div>
                  <div class="col col-4">
                    <div
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
                      :rules="[rules.nds]"
                      @input="updatePrices()"
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
                <div class="form-group row justify-space-between ml-0 mr-0">
                  <v-btn
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
</template>

<script>
import { required, ndsCount } from "@/shared/validator";
import { mapState } from "vuex";
import CustomGallery from "@/components/CustomGallery";
import { serverUrl } from "@/store/urls";
export default {
  name: "storageTable",
  components: {
    CustomGallery
  },
  data() {
    return {
      group: {},
      addGroupValid: true,
      color: "#688e74",
      showGroupModal: false,
      showNomekModal: false,
      showRemovePhotoModal: false,
      nomenclature: {},
      updatingId: null,
      price: 0,
      photos: [],
      files: [],
      image: {},
      serverUrl: serverUrl,
      absolutesDisabled: false,
      addNomenclatureValid: true,
      search: "",
      loading: false,
      arrowLoadingId: null,
      rules: {
        required: value =>
          required(value) || this.$t("messages.error.required"),
        nds: value => ndsCount(value) || this.$t("messages.error.nds")
      },
      page: 1,
      pageCount: 5,
      itemsPerPage: 25,
      headers: [
        { text: this.$t("simple_name"), value: "name", align: "left" },
        {
          text: `${this.$t("order")}/${this.$t("warehouse")}`,
          value: "fat",
          align: "left"
        },
        { text: this.$t("price"), value: "carbs", align: "right" },
        { text: this.$t("total"), value: "total", align: "right" }
      ],
      editedIndex: -1,
      date: new Date().toISOString().substr(0, 10),
      menu2: false
    };
  },
  computed: {
    ...mapState({
      construction: state => state.warehouse.construction,
      warehouse: state => state.warehouse.warehouse[0],
      tableLoading: state => state.warehouse.tableLoading,
      constructions: state => state.warehouse.constructions,
      user: state => state.user.user,
      units: state => state.furniture.units,
      totalSum: state => state.warehouse.totalSum,
      lang: state => state.lang,
      snackBar: state => state.snackBar,
      warehouseNomenclatures: state => state.warehouse.warehouseNomenclatures
    })
  },
  methods: {
    showAddGroupModal(group) {
      this.showGroupModal = true;
      if (group) {
        this.group = {
          id: group.id,
          creatorId: group.creatorId,
          orderId: group.orderId,
          name: group.name
        };
      } else {
        this.group = {};
      }
    },
    addGroup() {
      if (!this.$refs.addGroupForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      if (this.group.id) {
        let formData = new FormData();
        formData.append("storageGroupId", this.group.id);
        formData.append("name", this.group.name);

        this.$store
          .dispatch("warehouse/updateGroup", {
            data: formData,
            group: this.group
          })
          .then(() => {
            this.showGroupModal = false;
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
        let formData = new FormData();
        formData.append("storageId", this.warehouse["id"]);
        formData.append("name", this.group.name);
        this.$store
          .dispatch("warehouse/addGroup", formData)
          .then(() => {
            this.showGroupModal = false;
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.createGroup");
            this.snackBar.color = "success";
          })
          .catch(() => {
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.error.errorText");
            this.snackBar.color = "error";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split(".");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    addNomenclature() {
      if (!this.$refs.addNomenclatureForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      if (this.nomenclature.id) {
        formData.append("storageNomenclatureId", this.nomenclature.id);
        let unit = this.nomenclature.units.id
          ? this.nomenclature.units.id
          : this.nomenclature.units;
        formData.append("unitId", unit);
      } else {
        formData.append("storageGroupId", this.nomenclature.groupId);
        if (this.nomenclature.units) {
          formData.append("unitId", this.nomenclature.units);
        } else if (this.units && this.units.length) {
          formData.append("unitId", this.units[0]["id"]);
        }
        for (let i = 0; i < this.files.length; i++) {
          formData.append(`photo`, this.files[i]);
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
          .dispatch("warehouse/updateNomenclature", {
            data: formData,
            group: this.nomenclature.group,
            nomenclature: this.nomenclature
          })
          .then(() => {
            this.showNomekModal = false;
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
          .dispatch("warehouse/addNomenclature", {
            data: formData,
            group: this.nomenclature.group
          })
          .then(() => {
            // this.$store.dispatch("furniture/getAllSum", {
            //   furnitureId: this.furniture["id"]
            // });
            this.showNomekModal = false;
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.success.save");
            this.snackBar.color = "success";
          })
          .catch(() => {
            this.snackBar.value = true;
            this.snackBar.text = this.$t("messages.error.errorText");
            this.snackBar.color = "error";
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    addPhoto() {
      let formData = new FormData();
      formData.append("nomenclatureId", this.nomenclature.id);

      for (let i = 0; i < this.files.length; i++) {
        formData.append(`file`, this.files[i]);
      }
      this.$store
        .dispatch("warehouse/addNomenclaturePhoto", {
          data: formData,
          nomenclature: this.nomenclature
        })
        .then(() => {
          this.nomenclature = {};
          this.files = [];
        })
        .catch(() => {
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.error.errorText");
          this.snackBar.color = "error";
        });
    },
    showNomenclature(item) {
      this.showNomekModal = true;
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
    showEditNomenclature(item, group) {
      this.$store.dispatch("furniture/setUnits");
      this.showNomekModal = true;
      this.nomenclature = item;
      this.nomenclature["group"] = group;
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
    },
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}.${month}.${year}`;
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
          let ndsPercentValue = this.nomenclature.nds / 100 + 1;
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
    deletePhotoModal(image) {
      this.image = image;
      this.showRemovePhotoModal = true;
    },
    deletePhoto() {
      this.loading = true;
      this.$store
        .dispatch("warehouse/deleteNomenclaturePhoto", {
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
    toggleGroup(open, group, groupedNomenclatures) {
      if (open) {
        this.arrowLoadingId = group.id;
        this.$store
          .dispatch("warehouse/getNomenclatures", {
            data: { storageGroupId: group.id },
            group: group
          })
          .finally(() => {
            this.arrowLoadingId = null;
          });
      } else {
        if (groupedNomenclatures.length) {
          groupedNomenclatures.forEach(item => {
            let start = this.warehouseNomenclatures.indexOf(item);
            this.warehouseNomenclatures.splice(start, 1);
          });
        }
      }
    }
  },
  watch: {
    price(val) {
      this.nomenclature.price = val;
      this.updatePrices();
    },
    date() {
      this.nomenclature.term = this.formatDate(this.date);
    }
  }
};
</script>

<style scoped lang="scss">
.storage-table {
  .no-img {
    margin-right: 14px;
    width: 30px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c4c4c4;
  }
}
</style>
