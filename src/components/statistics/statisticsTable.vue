<template>
  <div class="statistics-table">
    <v-card>
      <v-card-title>
        {{ $t("statistics") }}
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('search')"
          single-line
          hide-details
          :search="search"
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="transfers"
        class="elevation-1"
        hide-default-footer
        :items-per-page="25"
        :loading="tableLoading"
      >
        <template v-slot:item.dateCreate="{ item }">
          {{ formatDate(item.dateCreate) }}
        </template>
        <template v-slot:item.creatorName="{ item }">
          {{ item.creatorName }}
        </template>
        <template v-slot:item.nomenclatureName="{ item }">
          {{ item.nomenclatureName }}
        </template>
        <template v-slot:item.type="{ item }">
          {{
            item.type === "project to storage"
              ? $t("storage.projectToStorage", { name: construction.name })
              : $t("storage.storageToProject", { name: construction.name })
          }}
        </template>
        <template v-slot:item.count="{ item }">
          {{ item.count }}
        </template>
        <template
          v-if="transfers && false"
          v-slot:body="{ item, options, groupedItems, group }"
        >
          <tbody>
            <tr v-for="(transfer, key) in transfers" :key="key + transfer">
              <td class="text-center">
                {{ formatDate(transfer.dateCreate) }}
              </td>
              <td class="text-center">
                {{ transfer.creatorName }}
              </td>
              <td class="text-right">
                {{ transfer.nomenclatureName }}
              </td>
              <td class="text-right">
                {{ transfer.type }}
              </td>
              <td class="text-right">
                {{ transfer.count }}
              </td>
            </tr>
          </tbody>
        </template>
      </v-data-table>
    </v-card>
    <v-pagination
      v-model="page"
      :color="color"
      :length="pagesCount"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { serverUrl } from "@/store/urls";
export default {
  name: "statisticsTable",
  data() {
    return {
      color: "#688e74",
      serverUrl: serverUrl,
      page: 1,
      search: ""
    };
  },
  computed: {
    ...mapState({
      construction: state => state.statistics.construction,
      transfers: state => state.statistics.transfers,
      tableLoading: state => state.statistics.tableLoading,
      user: state => state.user.user,
      lang: state => state.lang,
      pagesCount(state) {
        return Math.ceil(state.statistics.totalTransfersCount / 25) || 1;
      },
      snackBar: state => state.snackBar,
      headers() {
        return [
          {
            text: this.$t("date"),
            align: "center",
            value: "dateCreate"
          },
          {
            text: `${this.$t("user")}`,
            align: "center",
            value: "creatorName"
          },
          {
            text: `${this.$t("nomenclature")}`,
            align: "center",
            value: "nomenclatureName"
          },
          {
            text: this.$t("actions"),
            align: "center",
            value: "type"
          },
          {
            text: this.$t("count"),
            align: "center",
            value: "count"
          }
        ];
      }
    })
  },
  methods: {
    formatDate(date) {
      let d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;

      return [day, month, year].join(".");
    }
  },
  watch: {
    page(value) {
      this.$store.commit("statistics/setLoadingStatus", true);
      this.$store
        .dispatch("statistics/getAllTransfers", {
          projectId: this.construction.id,
          page: value - 1
        })
        .then(() => {
          setTimeout(() => {
            this.$store.commit("statistics/setLoadingStatus", false);
          }, 500);
        });
    }
  }
};
</script>

<style lang="scss">
.statistics-table {
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
  .theme--light.v-data-table
    tbody
    tr
    td:not(.v-data-table__mobile-row, :last-child),
  .theme--light.v-data-table
    tbody
    tr
    th:not(.v-data-table__mobile-row, :last-child) {
    border-right: thin solid rgba(0, 0, 0, 0.12);
  }
}
</style>
