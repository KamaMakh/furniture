<template>
  <div v-if="construction && construction.id">
    <table class="table" style="width: 100%">
      <thead>
        <tr style="background: rgb(255,255,255,0.2); border: none;">
          <td
            v-for="(item, key) in titles"
            :key="key"
            :width="tdWidths[key] + '%'"
            :title="item.name"
            @click="sort(item, $event)"
            style="cursor: pointer; text-align: center;"
            :class="{ bold: item.code === currentSort }"
          >
            <span
              v-if="key === 0 && access"
              @click="showDocModal()"
              :title="$t('add_group')"
              class="icon"
              style="cursor: pointer"
            >
              <IconPlusSquared width="19" height="19" fill="#999" />
            </span>
            <span :class="{ 'ml-0': key === 0, ellipsis: key === 0 }">
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
          <td style="display: table-cell; padding: 10px 5px;">
            <span class="ellipsis ml-0 text-left pl-3" :title="item.name">
              {{ item.name }}
            </span>
          </td>
          <td>
            <div
              :class="`contentType ${item.contentType}`"
              @click="downloadFile(item)"
            ></div>
          </td>
          <td>
            {{ item.term }}
          </td>
          <td :class="{ green: item.status === 'APPROVED' }">
            {{ item.status }}
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
        </tr>
      </tbody>
    </table>
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
                  :disabled="absolutesDisabled"
                ></v-text-field>
              </v-col>
              <v-col>
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
                      :rules="[rules.required]"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="document.termString"
                    @input="menu2 = false"
                    :locale="lang"
                    first-day-of-week="1"
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
                  accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, application/pdf"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn
            dark
            @click="showAddDocModal = false"
            color="#999"
            class="ma-1"
          >
            {{ $t("close") }}
          </v-btn>
          <v-btn
            :color="color"
            class="ma-1"
            dark
            :loading="loading"
            @click="addDoc"
          >
            {{ $t("add") }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
import { documentsUrls } from "@/store/urls";
import IconPlusSquared from "@/components/common/icons/IconPlusSquared";
import IconSettings from "@/components/common/icons/IconSettings";
import IconBasket from "@/components/common/icons/IconBasket";
import { required, fileMaxSize, isEmail } from "@/shared/validator";
export default {
  name: "TableDocuments",
  components: {
    IconPlusSquared,
    IconSettings,
    IconBasket
  },
  data() {
    return {
      serverUrl: serverUrl,
      showAddDocModal: false,
      addDocValid: true,
      documentsUrls: documentsUrls,
      hideAllRows: false,
      tdWidths: [25, 10, 15, 10, 15, 10, 15],
      document: {},
      ndsColumns: true,
      files: [],
      currentSort: "",
      currentSortDir: "asc",
      loading: false,
      price: 0,
      absolutesDisabled: false,
      color: "#688e74",
      rules: {
        required: value => required(value) || this.$t("required"),
        email: value => isEmail(value) || this.$t("invalid_email"),
        max: value =>
          fileMaxSize(value, 5000000) || this.$t("maxSize", { size: 5 })
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false
    };
  },
  methods: {
    showDocModal() {
      this.showAddDocModal = true;
      if (this.$refs.addDocForm) {
        this.$refs.addDocForm.reset();
        this.$refs.addDocForm.resetValidation();
      }
      this.document = {
        name: "",
        term: "",
        nds: this.construction.nds || 0,
        price: 0,
        ndsValue: 0,
        priceWithoutNds: 0,
      };
    },
    downloadFile(item) {
      let url = `${this.serverUrl}${item.url}`;
      window.open(url, "_blank");
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
        let groupKeys = [];
        this.rows.forEach((item, key) => {
          if (item.children && item.children > 1) {
            groupKeys.push({ start: key, length: item.children });
          }
        });
        groupKeys.forEach(item => {
          let children = this.rows.slice(
            item.start + 1,
            item.length + item.start + 1
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
    }
  },
  computed: {
    ...mapState({
      rows: state => state.documents.documents || [],
      construction: state => state.furniture.construction,
      constructions: state => state.furniture.constructions,
      user: state => state.user.user,
      lang: state => state.lang,
      access: state => state.documents.access,
      titles(state) {
        return [
          {
            name: state.furniture.construction.name,
            sortable: true,
            code: "name"
          },
          {
            name: this.$t("file"),
            sortable: false,
            code: "file"
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
          }
        ];
      }
    })
  },
  watch: {
    price(val) {
      this.document.price = val;
      this.updatePrices();
    },
    date() {
      this.document.term = this.formatDate(this.date);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./assets/css/table.css";
</style>