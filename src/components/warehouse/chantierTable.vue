<template>
  <div class="chantier-table">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="projectNomenclatures"
        item-key="name"
        group-by="projectGroupId"
        class="elevation-1"
        show-group-by
        :items-per-page="25"
        hide-default-footer
        hide-default-header
        :loading="tableLoading"
        :headers-length="100"
      >
        <template v-slot:header="{ props: { headers } }">
          <thead>
            <tr>
              <th
                v-for="(header, key) in headers"
                :key="key"
                :style="{ 'text-align': header.align }"
                :colspan="header.colspan || 1"
                :width="header.width ? header.width : ''"
              >
                {{ header.text }}
              </th>
            </tr>
          </thead>
        </template>
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>
              {{ $t("construction") }}
            </v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            {{ construction.name }}
          </v-toolbar>
        </template>
        <template
          v-if="projectGroups.length"
          v-slot:body="{ item, options, groupedItems, group }"
        >
          <tbody v-for="(group, key) in projectGroups" :key="key + group">
            <tr class="v-row-group__header text-left">
              <th colspan="8" :title="group.name">
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
            </tr>
            <tr v-for="(item, nkey) in groupedItems[group.id]" :key="nkey">
              <td
                class="text-left"
                style="cursor:pointer;"
                @click="showEditNomenclature(item, group)"
                colspan="6"
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
              <td class="text-center">
                <v-btn
                  small
                  icon
                  class="text-center"
                  @click="showTransfer(item, group)"
                  :disabled="item.count < 1"
                >
                  <v-icon small :color="color">
                    mdi-upload
                  </v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>

    <!--modals-->
    <v-dialog v-model="showNomekModal" width="850">
      <v-card>
        <v-card-text>
          <v-form ref="addNomenclatureForm" lazy-validation>
            <v-row class="ml-0 mr-0 nomenclature-column">
              <div class="body-left col col-lg-6 col-md-12">
                <div class="form-group row">
                  <div style="flex: 1 1 100%; padding-bottom: 5px">
                    <CustomGallery
                      :nomenclature="nomenclature"
                      :images="nomenclature.photos"
                      :isCreator="false"
                      :files="files"
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
                        nomenclature.storageNomenclatureId
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
                  <!--                  <div class="col col-lg-4 col-md-4 col-sm-12">-->
                  <!--                    <v-text-field-->
                  <!--                      v-model="nomenclature.term"-->
                  <!--                      :label="$t('term')"-->
                  <!--                      light-->
                  <!--                    ></v-text-field>-->
                  <!--                  </div>-->
                  <div class="col col-lg-8 col-md-8 col-sm-12">
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
    <v-dialog v-model="showTransferModal" width="500">
      <v-card>
        <v-card-title
          class="headline"
          v-html="
            $t('storage.transferFromProject', { name: nomenclature.name })
          "
        >
        </v-card-title>
        <v-card-text>
          <v-form
            ref="transferToStorageForm"
            v-model="transferValid"
            @submit.prevent="transferToStorage"
            lazy-validation
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="transferToStorageCount"
                  :label="$t('count')"
                  :rules="[rules.required, rules.naturalCount, rules.maxCount]"
                  type="number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="text-right justify-end">
          <v-btn color="grey darken-1" text @click="showTransferModal = false">
            {{ $t("cancel") }}
          </v-btn>

          <v-btn
            :color="color"
            text
            :loading="loading"
            @click="transferToStorage"
          >
            {{ $t("ok") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CustomGallery from "@/components/CustomGallery";
import { serverUrl } from "@/store/urls";
import { required, naturalCount, maxCount } from "@/shared/validator";
export default {
  name: "chantierTable",
  components: {
    CustomGallery
  },
  data() {
    return {
      transferValid: true,
      color: "#688e74",
      showNomekModal: false,
      showTransferModal: false,
      nomenclature: {},
      absolutesDisabled: true,
      transferToStorageCount: 0,
      photos: [],
      files: [],
      image: {},
      price: 0,
      serverUrl: serverUrl,
      loading: false,
      arrowLoadingId: null,
      page: 0,
      rules: {
        required: value =>
          required(value) || this.$t("messages.error.required"),
        naturalCount: value =>
          naturalCount(value) || this.$t("messages.error.naturalCount"),
        maxCount: value => {
          return (
            maxCount(value, this.nomenclature.count) ||
            this.$t("messages.error.quantity")
          );
        }
      }
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
      projectNomenclatures: state => state.warehouse.projectNomenclatures,
      projectGroups: state => state.warehouse.projectGroups,
      headers() {
        return [
          {
            text: this.$t("simple_name"),
            colspan: "6",
            align: "left"
          },
          {
            text: `${this.$t("count")}`,
            align: "center",
            width: "20%"
          },
          {
            text: this.$t("actions"),
            align: "center",
            width: "10%"
          }
        ];
      }
    })
  },
  methods: {
    transferToStorage() {
      this.loading = true;
      if (!this.$refs.transferToStorageForm.validate()) {
        this.loading = false;
        return;
      }
      let formData = new FormData();
      formData.append("projectNomenclatureId", this.nomenclature.id);
      formData.append("count", this.transferToStorageCount);
      this.$store
        .dispatch("warehouse/transferFromProject", {
          data: formData,
          projectId: this.construction.id,
          group: this.nomenclature.group
        })
        .then(() => {
          this.showTransferModal = false;
          this.nomenclature.count -= this.transferToStorageCount;
          // this.nomenclature["group"] = {
          //   id: response.data.storageGroupId
          // };
          // this.addNomenclature();
        })
        .catch(() => {
          this.snackBar.value = true;
          this.snackBar.text = this.$t("messages.error.errorText");
          this.snackBar.color = "error";
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showTransfer(nomenclature, group) {
      this.nomenclature = nomenclature;
      this.nomenclature["group"] = group;
      this.showTransferModal = true;
    },
    toggleGroup(open, group, groupedNomenclatures) {
      if (open) {
        this.arrowLoadingId = group.id;
        this.$store
          .dispatch("warehouse/getProjectNomenclatures", {
            data: { projectGroupId: group.id, page: this.page },
            group: group
          })
          .finally(() => {
            this.arrowLoadingId = null;
          });
      } else {
        if (groupedNomenclatures.length) {
          groupedNomenclatures.forEach(item => {
            let start = this.projectNomenclatures.indexOf(item);
            this.projectNomenclatures.splice(start, 1);
          });
        }
      }
    },
    showEditNomenclature(item, group) {
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
    }
  }
};
</script>

<style scoped lang="scss">
.chantier-table {
  .no-img {
    margin-right: 14px;
    width: 30px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #c4c4c4;
  }
  .theme--light.v-data-table tbody tr td:not(.v-data-table__mobile-row) {
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
  tbody {
    th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
    }
  }
  tfoot {
    th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
      text-align: right;
      &:not(:last-child) {
        border-right: thin solid rgba(0, 0, 0, 0.12);
      }
    }
  }
}
</style>
