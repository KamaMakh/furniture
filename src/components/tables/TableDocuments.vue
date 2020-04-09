<template>
  <div v-if="construction && construction.id">
    <perfect-scrollbar style="padding-bottom: 20px;">
      <v-skeleton-loader
        :loading="tableLoading"
        ref="skeleton"
        type="table-tbody"
        transition="scale-transition"
        :tile="false"
        class="mx-auto"
      >
        <table class="table new-table" style="width: 100%" id="documentsTable">
          <thead>
            <tr style="background: rgb(255,255,255,0.2); border: none;">
              <th>
                <v-btn
                  v-if="access"
                  @click="showDocModal()"
                  :title="$t('add_group')"
                  icon
                  style="cursor: pointer"
                >
                  <!--                  <IconPlusSquared width="19" height="19" fill="#999" />-->
                  <v-icon :color="color">
                    mdi-plus
                  </v-icon>
                </v-btn>
              </th>
              <th
                v-for="(item, key) in titles"
                :key="key"
                :width="tdWidths[key] + '%'"
                :title="item.name"
                @click="sort(item, $event)"
                style="cursor: pointer; text-align: center;"
                :class="{ bold: item.code === currentSort }"
              >
                <span
                  :class="{
                    'ml-0': key === 0,
                    ellipsis:
                      (key !== 0 && item.code !== 'creationDate') ||
                      windowWidth < 960
                  }"
                >
                  {{ key === 0 ? $t("documentName") : item.name }}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              style="cursor: pointer"
              v-for="(item, key) in rows"
              :key="key"
              :class="{ odd: key % 2 === 0 || key === 0 }"
            >
              <td></td>
              <td style="display: table-cell; padding: 10px 5px;" id="docName">
                <span
                  class="ellipsis ml-0 pl-3"
                  :style="{ maxWidth: docNameWidth + 'px' }"
                  :title="item.name"
                >
                  {{ item.name }}
                </span>
              </td>
              <td>
                <div @click="downloadFile(item)">
                  <v-btn icon color="#e22025" :loading="loadingId === item.id">
                    <v-icon dark>mdi-file-pdf-box</v-icon>
                  </v-btn>
                </div>
              </td>
              <td>
                <v-menu offset-y>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      v-on="on"
                      style="border: none; text-transform: none;"
                      color="#999"
                      dark
                      :small="windowWidth <= 1280"
                      :disabled="construction.creatorId !== user.id"
                      :class="{
                        success: item.status === 'approved',
                        error: item.status === 'rejected'
                      }"
                      :loading="statusLoadingId === item.id"
                    >
                      <!--                      <v-icon-->
                      <!--                        v-if="construction.creatorId === user.id"-->
                      <!--                        :color="'#999'"-->
                      <!--                        left-->
                      <!--                        >mdi-pencil</v-icon-->
                      <!--                      >-->
                      {{ $t(item.status.toLowerCase()) | truncate(5) }}
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(stat, index) in statusesArr"
                      :key="index"
                      @click="changeStatus(stat.value, item)"
                    >
                      <v-list-item-title>{{ stat.title }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </td>
              <td>
                {{ item.priceWithoutNds }}
              </td>
              <td>
                {{ item.ndsValue }}
              </td>
              <td>
                {{ item.price }}
              </td>
              <td>
                {{ formatDate(item.creationDate) }}
              </td>
            </tr>
          </tbody>
        </table>
      </v-skeleton-loader>
    </perfect-scrollbar>
    <!--modals-->
    <v-dialog v-model="showAddDocModal" width="600">
      <v-card>
        <v-card-text>
          <v-form
            ref="addDocForm"
            v-model="addDocValid"
            @submit.prevent="addDoc"
            lazy-validation
          >
            <v-row>
              <v-col>
                <v-text-field
                  v-model="document.name"
                  :label="$t('fileName')"
                  :rules="[rules.required]"
                  :color="color"
                  :disabled="absolutesDisabled"
                ></v-text-field>
              </v-col>
              <v-col v-show="false">
                <v-menu
                  v-model="menu2"
                  :disabled="absolutesDisabled"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="document.term"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  :color="color"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="document.termString"
                      :label="$t('term')"
                      light
                      :color="color"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="document.termString"
                    @input="menu2 = false"
                    :locale="lang"
                    first-day-of-week="1"
                    :color="color"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="price"
                  :label="$t('price')"
                  :placeholder="$t('price')"
                  type="number"
                  step="1000"
                  :color="color"
                  :rules="[rules.required]"
                  :disabled="absolutesDisabled"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="document.priceWithoutNds"
                  :label="$t('priceWithoutNds')"
                  :placeholder="$t('priceWithoutNds')"
                  type="number"
                  step="any"
                  :color="color"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="document.nds"
                  :label="$t('nds')"
                  :placeholder="$t('nds')"
                  :disabled="absolutesDisabled"
                  type="number"
                  step="1"
                  :color="color"
                  @change="updatePrices"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="document.ndsValue"
                  :label="$t('ndsValue')"
                  :placeholder="$t('ndsValue')"
                  type="number"
                  step="any"
                  disabled
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-file-input
                  v-model="files"
                  :label="$t('chooseFile')"
                  :rules="[rules.required, rules.max]"
                  show-size
                  :color="color"
                  :persistent-hint="true"
                  :hint="$t('documentMax', { size: 5 })"
                  accept=".dwg, application/acad, application/dxf, application/x-dwf, image/tiff, image/jpeg, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .xls, .xlsx, .doc, .docx, application/pdf, application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            :color="colorExtra"
            class="ma-1"
            dark
            :loading="loading"
            @click="addDoc"
          >
            {{ $t("add") }}
          </v-btn>
          <v-btn
            dark
            @click="showAddDocModal = false"
            :color="colorExtraHover"
            class="ma-1"
          >
            {{ $t("close") }}
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
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import { documentsUrls } from "@/store/urls";
// import IconPlusSquared from "@/components/common/icons/IconPlusSquared";
import { required, fileMaxSize, isEmail } from "@/shared/validator";
export default {
  name: "TableDocuments",
  components: {
    // IconPlusSquared
  },
  props: ["leftMenuShow"],
  data() {
    return {
      serverUrl: serverUrl,
      showAddDocModal: false,
      addDocValid: true,
      documentsUrls: documentsUrls,
      hideAllRows: false,
      tdWidths: [25, 10, 13, 14, 13, 10, 15],
      document: {},
      ndsColumns: true,
      files: [],
      currentSort: "",
      currentSortDir: "asc",
      loading: false,
      loadingId: null,
      statusLoadingId: null,
      price: 0,
      absolutesDisabled: false,
      color: this.$store.state.theme.main,
      colorExtra: this.$store.state.theme.extra,
      colorExtraHover: this.$store.state.theme.extraHover,
      docNameWidth: 330,
      rules: {
        required: value => required(value) || this.$t("required"),
        email: value => isEmail(value) || this.$t("invalid_email"),
        max: value =>
          fileMaxSize(value, 5000000) || this.$t("maxSize", { size: 5 })
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      statusesArr: [
        {
          title: this.$t("review"),
          value: "REVIEW"
        },
        {
          title: this.$t("approved"),
          value: "APPROVED"
        },
        {
          title: this.$t("rejected"),
          value: "REJECTED"
        },
        {
          title: this.$t("notrelevant"),
          value: "NOTRELEVANT"
        }
      ]
    };
  },
  methods: {
    getDocNameWidth() {
      let table = document.getElementById("documentsTable");
      if (table) {
        setTimeout(() => {
          this.docNameWidth = table.offsetWidth / 3;
        }, 700);
      }
    },
    changeStatus(newStatus, document) {
      if (this.user.id !== this.construction.creatorId) {
        return;
      }
      this.statusLoadingId = document.id;
      let formData = new FormData();
      formData.append(`status`, newStatus);
      formData.append(`estimateId`, document.id);
      this.$store
        .dispatch("documents/changeDocStatus", formData)
        .then(() => {
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
          this.statusLoadingId = null;
        });
    },
    showDocModal() {
      this.showAddDocModal = true;
      if (this.$refs.addDocForm) {
        this.$refs.addDocForm.resetValidation();
      }
      this.document = {
        name: "",
        termString: new Date().toISOString().substr(0, 10),
        nds: this.construction.nds || 0,
        price: 0,
        ndsValue: 0,
        priceWithoutNds: 0
      };
    },
    downloadFile(item) {
      this.loadingId = item.id;
      this.$store
        .dispatch("documents/downloadFile", { id: item.id })
        .then(response => {
          let iOS =
            !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

          if (iOS) {
            let type = "";
            switch (item.contentType) {
              case "pdf":
                type = "application/pdf";
                break;
              case "txt":
                type = "text/plain;charset=utf-8";
                break;
              case "xls":
                type = "application/vnd.ms-excel";
                break;
              case "png":
                type = "image/png";
                break;
              case "gif":
                type = "image/gif";
                break;
              case "jpeg":
                type = "image/jpeg";
                break;
            }

            let reader = new FileReader();
            let out = new Blob([response], { type: type });
            reader.onload = () => {
              window.location.href = reader.result;
            };
            reader.readAsDataURL(out);
          } else {
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement("a");
            link.href = url;
            link.target = "_blank";
            link.setAttribute("download", `${item.name}.${item.contentType}`);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
          }
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
          this.loadingId = null;
        });
    },
    addDoc() {
      if (!this.$refs.addDocForm.validate()) {
        this.loading = false;
        return;
      }
      this.loading = true;
      let formData = new FormData();
      formData.append(`file`, this.files);
      formData.append("documentName", this.document.name);
      let term = this.parseDate(this.document.termString);
      formData.append("term", term);
      formData.append("price", this.document.price);
      formData.append("nds", this.document.nds);
      formData.append("ndsValue", this.document.ndsValue);
      formData.append("priceWithoutNds", this.document.priceWithoutNds);
      formData.append("projectId", this.construction.id);

      this.$store
        .dispatch("documents/addDocument", formData)
        .then(() => {
          this.showAddDocModal = false;
          if (this.$refs.addDocForm) {
            this.$refs.addDocForm.reset();
            this.$refs.addDocForm.resetValidation();
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
    },
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    },
    parseDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day.padStart(2, "0")}.${month.padStart(2, "0")}.${year}`;
    },
    updatePrices() {
      if (this.document.price) {
        if (!this.document.nds) {
          this.document.nds = this.construction.nds;
        }
        if (this.document.nds < 0) {
          this.document.nds = 0;
        }
        this.document["priceWithoutNds"] = (
          this.document.price / parseFloat("1." + this.document.nds)
        ).toFixed(2);
        this.document["ndsValue"] = (
          this.document.price - this.document["priceWithoutNds"]
        ).toFixed(2);
      }
    },
    sort(column, event) {
      if (
        column.sortable &&
        (event.target.tagName === "TD" ||
          event.target.classList.contains("ellipsis"))
      ) {
        this.rows.sort((a, b) => {
          if (this.currentSort === column.code) {
            return 0;
          }
          if (column.code === "creationDate") {
            let date1 = a[column.code];
            let date2 = b[column.code];
            return new Date(date1) - new Date(date2);
          } else if (column.code === "status") {
            let columnA = this.getStatus(a[column.code]),
              columnB = this.getStatus(b[column.code]);
            return columnA - columnB;
          } else {
            if (a[column.code] >= b[column.code]) {
              return -1;
            }
          }
        });
        if (this.currentSort === column.code) {
          this.rows.reverse();
        }
        // this.rows.splice(item.start + 1, children.length, ...children);
        this.currentSort = column.code;
      }
    },
    getStatus(status) {
      switch (status) {
        case "review":
          return 2;
        case "approved":
          return 1;
        case "rejected":
          return 4;
        default:
          return 3;
      }
    },
    createConstruction() {
      this.$emit("createConstruction");
    }
  },
  computed: {
    ...mapState({
      rows: state => state.documents.documents || [],
      construction: state => state.documents.construction,
      constructions: state => state.documents.constructions,
      tableLoading: state => state.documents.tableLoading,
      empty: state => state.emptyConstructions,
      user: state => state.user.user,
      lang: state => state.lang,
      access: state => state.documents.access,
      snackBar: state => state.snackBar,
      titles(state) {
        return [
          {
            name: state.documents.construction.name,
            sortable: true,
            code: "name"
          },
          {
            name: this.$t("file"),
            sortable: false,
            code: "file"
          },
          {
            name: this.$i18n.messages[state.lang]["status"],
            sortable: true,
            code: "status"
          },
          {
            name: this.$i18n.messages[state.lang]["priceWithoutNds"],
            sortable: true,
            code: "priceWithoutNds"
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
            name: this.$i18n.messages[state.lang]["creationDate"],
            sortable: true,
            code: "creationDate"
          }
        ];
      }
    })
  },
  watch: {
    price(val) {
      val = parseFloat(val);
      if (val < 0) {
        val = 0;
        this.price = 0;
      }
      this.document.price = val;
      this.updatePrices();
    },
    date() {
      this.document.creationDate = this.formatDate(this.date);
    },
    leftMenuShow() {
      this.getDocNameWidth();
    }
  }
};
</script>

<style scoped lang="scss">
@import "./assets/css/table.css";
</style>
