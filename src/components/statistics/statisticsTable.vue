<template>
  <div class="statistics-table">
    <!--    <v-card>-->
    <v-data-table
      :headers="headers"
      :items="transfers"
      class="elevation-1"
      hide-default-footer
      :items-per-page="25"
      :loading="tableLoading"
      :search="search"
      group-by="groupIdentify"
      :show-group-by="false"
      hide-default-header
    >
      <template v-slot:header>
        <thead hidden>
          <tr>
            <th width="60%"></th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
      </template>
      <template v-slot:body="{ groupedItems }">
        <tbody
          v-for="(groups, key) in groupedItems"
          :key="key"
          v-html="createGroupRows(key, groups)"
        ></tbody>
      </template>
      <template v-if="false" v-slot:group="{ group, options, items }">
        <tr>
          <td colspan="4" class="pa-0">
            <table
              class="custom"
              v-html="createGroupRows(group, items)"
            ></table>
          </td>
        </tr>
      </template>
    </v-data-table>
    <!--    </v-card>-->
    <v-pagination
      v-model="page"
      :color="color"
      :length="pagesCount"
      :disabled="pagesCount < 2"
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
      color: this.$store.state.theme.main,
      serverUrl: serverUrl,
      page: 1,
      search: ""
    };
  },
  computed: {
    ...mapState({
      construction: state => state.statistics.construction,
      transfers(state) {
        let filtered = [];
        state.statistics.transfers.forEach((item, key) => {
          item["dateCreate"] = this.formatDate(item["dateCreate"]);
          item[
            "groupIdentify"
          ] = `${item["dateCreate"]} ${item["creatorName"]}`;
          filtered[key] = item;
        });
        return filtered;
      },
      tableLoading: state => state.statistics.tableLoading,
      datesInfo: state => state.statistics.datesInfo,
      user: state => state.user.user,
      lang: state => state.lang,
      pagesCount(state) {
        return Math.ceil(state.statistics.totalTransfersCount / 25) || 1;
      },
      snackBar: state => state.snackBar,
      headers() {
        return [
          // {
          //   text: this.$t("date"),
          //   align: "center",
          //   value: "dateCreate"
          // },
          // {
          //   text: `${this.$t("user")}`,
          //   align: "center",
          //   value: "creatorName"
          // },
          // {
          //   text: `${this.$t("nomenclature")}`,
          //   align: "center",
          //   value: "nomenclatureName",
          //   sortable: false,
          //   width: "30%"
          // },
          {
            text: this.$t("count"),
            align: "center",
            value: "count",
            sortable: false,
            width: "10%"
          },
          {
            text: this.$t("price"),
            align: "center",
            value: "price",
            sortable: false,
            width: "10%"
          },
          {
            text: this.$t("total"),
            align: "center",
            value: "total",
            sortable: false,
            width: "15%"
          }
          // {
          //   text: this.$t("actions"),
          //   align: "center",
          //   value: "type",
          //   sortable: false
          // }
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
    },
    groupBy(items, key) {
      return items.reduce(
        (result, item) => ({
          ...result,
          [item[key]]: [...(result[item[key]] || []), item]
        }),
        {}
      );
    },
    createGroupRows(group, items) {
      let head = `<tr class="v-row-group__header first">
            <th class="text-left">
              ${group}
            </th>
            <th class="text-center">
              ${this.$t("count")}
            </th>
            <th class="text-center">
              ${this.$t("price")}
            </th>
            <th class="text-center">
              ${this.$t("total")}
            </th>
          </tr>`,
        rows = "";
      // priceSum = 0,
      // priceTotalSum = 0;
      items = this.groupBy(items, "groupName");

      for (let key in items) {
        let groupRows = items[key];
        // rows += `<tr><th class="text-left" colspan="4">${key}</th></tr>`;
        for (let transfer of groupRows) {
          let countColor = "green";
          rows += `<tr><td class="text-left name-td" style="padding-left: 117px; font-size: 20px;">${transfer.nomenclatureName}</td>`;
          if (
            transfer.type === "storage to project" ||
            transfer.type === "from storage"
          ) {
            countColor = "red";
            // priceSum -= transfer.price;
            // priceTotalSum -= transfer.price * transfer.count;
          } else {
            // priceSum += transfer.price;
            // priceTotalSum += transfer.price * transfer.count;
          }
          rows += `<td> ${
            countColor === "green"
              ? '<span style="color: red">-' + transfer.count + "</span>"
              : '<span style="color: green">+' + transfer.count + "</span>"
          }</td>`;
          rows += `<td>${transfer.price}</td>`;

          rows += `<td>${transfer.price * transfer.count}</td></tr>`;
          // if (transfer.type === "project to storage") {
          //   type = this.$t("storage.projectToStorage", {
          //     name: this.construction.name
          //   });
          // } else if (transfer.type === "storage to project") {
          //   type = this.$t("storage.storageToProject", {
          //     name: this.construction.name
          //   });
          // } else if (transfer.type === "to storage") {
          //   type = this.$t("storage.toStorage");
          // } else if (transfer.type === "from storage") {
          //   type = this.$t("storage.fromStorage");
          // }

          // rows += `<td>${type}
          //           </td></tr>`;
        }
      }
      //       rows += `<tr>
      // <td style="height: 30px;"></td>
      // <td style="height: 30px;" class="text-right"> <b>${this.$t("total")}</b></td>
      // <td style="height: 30px;"> <b>${priceSum}</b> </td>
      // <td style="height: 30px;"> <b>${priceTotalSum}</b> </td>
      // <td style="height: 30px;"></td>
      // </tr>`;
      return head + rows;
    }
  },
  watch: {
    page(value) {
      if (this.datesInfo) {
        this.$store.commit("statistics/setLoadingStatus", true);
        this.$store
          .dispatch("statistics/getAllTransfersByDate", {
            projectId: this.construction.id,
            page: value - 1,
            dateFrom: this.datesInfo.dateFrom,
            dateTo: this.datesInfo.dateTo
          })
          .then(() => {
            let scrollElement = document.querySelector(".content__body.ps");
            setTimeout(() => {
              scrollElement.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
              });
            }, 500);
            setTimeout(() => {
              this.$store.commit("statistics/setLoadingStatus", false);
            }, 500);
          });
      } else {
        this.$store.commit("statistics/setLoadingStatus", true);
        this.$store
          .dispatch("statistics/getAllTransfers", {
            projectId: this.construction.id,
            page: value - 1
          })
          .then(() => {
            let scrollElement = document.querySelector(".content__body.ps");
            setTimeout(() => {
              scrollElement.scrollTo({
                top: 0,
                left: 0,
                behavior: "smooth"
              });
            }, 300);
            setTimeout(() => {
              this.$store.commit("statistics/setLoadingStatus", false);
            }, 500);
          });
      }
    },
    construction() {
      this.page = 1;
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
  .v-data-table {
    box-shadow: none !important;
    border-radius: 5px;
  }
  .theme--light.v-data-table
    tbody
    tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: linear-gradient(
      90deg,
      rgba(242, 90, 51, 0.15) 33.39%,
      rgba(242, 90, 51, 0) 100%
    );
  }
  .theme--light.v-data-table tbody tr td:not(.v-data-table__mobile-row) {
    /*border-right: thin solid rgba(0, 0, 0, 0.12);*/
  }
  tbody {
    th {
      border-top: thin solid rgba(0, 0, 0, 0.12);
    }
  }
  tfoot {
    th {
      /*border-top: thin solid rgba(0, 0, 0, 0.12);*/
      text-align: right;
      &:not(:last-child) {
        /*border-right: thin solid rgba(0, 0, 0, 0.12);*/
      }
    }
  }
  table {
    border: none;
    border-collapse: separate;
    border-radius: 5px;
    overflow: hidden;
    tr {
      td,
      th {
        &:first-child {
          border-left: 1px solid #808080 !important;
        }
        &:last-child {
          border-right: 1px solid #808080 !important;
        }
      }
      &:first-child {
        td,
        th {
          &:first-child {
            border-radius: 5px 0 0 0;
          }
          &:last-child {
            border-radius: 0 5px 0 0;
          }
        }
      }
      &:last-child {
        td,
        th {
          &:first-child {
            border-radius: 0 0 0 5px;
          }
          &:last-child {
            border-radius: 0 0 5px 0;
          }
          border-bottom: 1px solid #808080 !important;
        }
      }
      &.first {
      }
    }
    th {
      font-size: 20px;
      line-height: 23px;
      color: #000;
      font-weight: normal;
      height: 70px;
      /*border: none !important;*/
      border-top: 1px solid #808080 !important;
    }
    td {
      font-weight: 300;
      font-size: 18px;
      line-height: 21px;
      color: #000;
      height: 70px;
      /*border: none !important;*/
      border-top: 1px solid #808080 !important;
      @media all and(max-width: 1200px) {
        &.name-td {
          padding-left: 25px !important;
        }
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
    /*border-right: thin solid rgba(0, 0, 0, 0.12);*/
  }
  .theme--light.v-data-table .v-row-group__header,
  .theme--light.v-data-table .v-row-group__summary {
    background: none !important;
  }
}
</style>
