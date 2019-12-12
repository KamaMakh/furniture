<template>
  <div>
    <table class="table" v-if="warehouse">
      <tbody>
        <tr class="user-row odd">
          <td></td>
          <td>
            <span class="d-flex font-weight-bold">
            {{ date }} Логист Александр
            </span>
          </td>
          <td class="border-0"></td>
          <td class="border-right font-weight-normal">
            {{ $t("price") }}
          </td>
          <td class="font-weight-normal">
            {{ $t("total") }}
          </td>
        </tr>
        <tr class="group-row">
          <td></td>
          <td class="font-weight-bold">
            Электрика
          </td>
          <td class="border-left-0"></td>
          <td class="border-right"></td>
          <td></td>
        </tr>
        <tr class="item-row odd">
          <td>
            <div class="no-img icon"></div>
          </td>
          <td>
            Уровень
          </td>
          <td style="color: #FF4081;" class="border-left-0">
            +7
          </td>
          <td class="border-right"></td>
          <td></td>
        </tr>
        <tr class="group-row">
          <td></td>
          <td class="font-weight-bold">
            Гипсокартонка
          </td>
          <td class="border-left-0"></td>
          <td class="border-right"></td>
          <td></td>
        </tr>
        <tr class="item-row odd">
          <td>
            <div class="no-img icon"></div>
          </td>
          <td>
            Штроборез
          </td>
          <td style="color: #FF4081;" class="border-left-0">
            +1
          </td>
          <td class="border-right"></td>
          <td></td>
        </tr>
        <tr class="summ-row">
          <td></td>
          <td></td>
          <td class="border-left-0"></td>
          <td class="border-right">500$</td>
          <td>800$</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/*eslint-disable*/
import { mapState } from "vuex";
export default {
  name: "TableOperations",
  data() {
    return {
      hideAllRows: false,
      date: "04/09/2019"
    };
  },
  methods: {
    toggleRows(item) {
      this.warehouse.groups[item] = !this.warehouse.groups[item];
    },
    hideAll() {
      this.hideAllRows = !this.hideAllRows;
    }
  },
  computed: {
    ...mapState("projects", ["warehouse"])
  }
}
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.hidden {
  display: none;
}
.table {
  border-collapse: collapse;
  border: 1px solid #C4C4C4;
  img {
    max-width: 100%;
  }
  tr {
    /*border-top: 1px solid #DADADA;*/
    background: #fff;
    font-family: $ffamily;
    color: #868686;
    font-size: 14px;
    transition: 0.3s;
    &.group-row{
      border-top: 1px solid #C4C4C4;
    }
    &.odd {
      background: #F5F5F6;
    }
    td:nth-child(1) {
      border: none;
      display: flex;
      align-items: center;
      font-weight: bold;
      padding-right: 0;
    }
    td:nth-child(2) {
      text-align: left;
    }
    td:nth-child(3) {
      border-left: 1px solid #DADADA;
    }
    td:nth-child(4) {
      border-left: 1px solid #DADADA;
    }
    td:last-child {
      text-align: left;
      font-weight: normal !important;
    }
    &.parent {
      border-top: 1px solid #C4C4C4;
    }
    &:hover {
      background: rgba(214, 232, 206, 0.69);
    }
  }
  td,
  th {
    border: none;
    /*border-right: 1px solid #DADADA;*/
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1px 9px;
    vertical-align: middle;
  }
  thead {
    tr {
      td {
        border-right: none;
      }
    }
  }
  tbody {
    tr {
      td:last-child{
        font-weight: 500;
      }
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
    background: #C4C4C4;
    margin-right: 0;
  }
  .setting-icon {
    display: flex; align-items: center; justify-content: center; margin-left: 13px; cursor: pointer;
    &:hover {
      path {
        fill: #999;
      }
    }
  }
}
</style>
