<template>
  <div>
    <table class="table" v-if="construction">
      <thead>
        <tr>
          <td>
            <span @click="hideAll" class="icon" style="cursor: pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M6.33331 0.833313H17.3333C18.3416 0.833313 19.1666 1.65831 19.1666 2.66665V13.6666C19.1666 14.675 18.3416 15.5 17.3333 15.5H6.33331C5.32498 15.5 4.49998 14.675 4.49998 13.6666V2.66665C4.49998 1.65831 5.32498 0.833313 6.33331 0.833313ZM0.833313 4.49998H2.66665V17.3333H15.5V19.1666H2.66665C1.65831 19.1666 0.833313 18.3416 0.833313 17.3333V4.49998ZM17.3333 13.6666H6.33331V2.66665H17.3333V13.6666ZM12.75 12.75H10.9166V9.08331H7.24998V7.24998H10.9166V3.58331H12.75V7.24998H16.4166V9.08331H12.75V12.75Z"
                  fill="#C4C4C4"
                />
              </svg>
            </span>
            {{ construction.name }}
          </td>
          <td>
            <span class="d-flex justify-content-end">
              <span class="setting-icon mr-2">
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.877 9.99998C15.877 10.3116 15.8495 10.605 15.8129 10.8983L17.747 12.4108C17.9212 12.5483 17.967 12.7958 17.857 12.9975L16.0237 16.1691C15.9412 16.3158 15.7854 16.3983 15.6295 16.3983C15.5745 16.3983 15.5195 16.3891 15.4645 16.3708L13.182 15.4541C12.7054 15.8116 12.192 16.1233 11.6329 16.3525L11.2845 18.7816C11.257 19.0016 11.0645 19.1666 10.8354 19.1666H7.16872C6.93955 19.1666 6.74705 19.0016 6.71955 18.7816L6.37122 16.3525C5.81205 16.1233 5.29872 15.8208 4.82205 15.4541L2.53955 16.3708C2.49372 16.3891 2.43872 16.3983 2.38372 16.3983C2.21872 16.3983 2.06288 16.3158 1.98038 16.1691L0.14705 12.9975C0.0370501 12.7958 0.0828834 12.5483 0.25705 12.4108L2.19122 10.8983C2.15455 10.605 2.12705 10.3025 2.12705 9.99998C2.12705 9.69748 2.15455 9.39498 2.19122 9.10165L0.25705 7.58915C0.0828834 7.45165 0.0278834 7.20415 0.14705 7.00248L1.98038 3.83081C2.06288 3.68415 2.21872 3.60165 2.37455 3.60165C2.42955 3.60165 2.48455 3.61081 2.53955 3.62915L4.82205 4.54581C5.29872 4.18831 5.81205 3.87665 6.37122 3.64748L6.71955 1.21831C6.74705 0.998313 6.93955 0.833313 7.16872 0.833313H10.8354C11.0645 0.833313 11.257 0.998313 11.2845 1.21831L11.6329 3.64748C12.192 3.87665 12.7054 4.17915 13.182 4.54581L15.4645 3.62915C15.5104 3.61081 15.5654 3.60165 15.6204 3.60165C15.7854 3.60165 15.9412 3.68415 16.0237 3.83081L17.857 7.00248C17.967 7.20415 17.9212 7.45165 17.747 7.58915L15.8129 9.10165C15.8495 9.39498 15.877 9.68831 15.877 9.99998ZM14.0437 9.99998C14.0437 9.80748 14.0346 9.61498 13.9979 9.33081L13.8696 8.29498L14.6854 7.65331L15.6662 6.87415L15.0246 5.76498L13.8604 6.23248L12.8887 6.62665L12.0546 5.98498C11.6879 5.70998 11.3212 5.49915 10.9271 5.33415L9.95538 4.93998L9.80872 3.90415L9.63455 2.66665H8.36038L8.17705 3.90415L8.03038 4.93998L7.05872 5.33415C6.68288 5.48998 6.30705 5.70998 5.91288 6.00331L5.08788 6.62665L4.13455 6.24165L2.97038 5.77415L2.32872 6.88331L3.31872 7.65331L4.13455 8.29498L4.00622 9.33081C3.97872 9.60581 3.96038 9.81665 3.96038 9.99998C3.96038 10.1833 3.97872 10.3941 4.00622 10.6783L4.13455 11.7141L3.31872 12.3558L2.32872 13.1258L2.97038 14.235L4.13455 13.7675L5.10622 13.3733L5.94038 14.015C6.30705 14.29 6.67372 14.5008 7.06788 14.6658L8.03955 15.06L8.18622 16.0958L8.36038 17.3333H9.64372L9.82705 16.0958L9.97372 15.06L10.9454 14.6658C11.3212 14.51 11.6971 14.29 12.0912 13.9966L12.9162 13.3733L13.8696 13.7583L15.0337 14.2258L15.6754 13.1166L14.6854 12.3466L13.8696 11.705L13.9979 10.6691C14.0254 10.3941 14.0437 10.1925 14.0437 9.99998ZM9.00204 6.33331C6.97621 6.33331 5.33537 7.97415 5.33537 9.99998C5.33537 12.0258 6.97621 13.6666 9.00204 13.6666C11.0279 13.6666 12.6687 12.0258 12.6687 9.99998C12.6687 7.97415 11.0279 6.33331 9.00204 6.33331ZM7.16872 9.99998C7.16872 11.0083 7.99372 11.8333 9.00205 11.8333C10.0104 11.8333 10.8354 11.0083 10.8354 9.99998C10.8354 8.99165 10.0104 8.16665 9.00205 8.16665C7.99372 8.16665 7.16872 8.99165 7.16872 9.99998Z"
                    fill="#DADADA"
                  />
                </svg>
              </span>
              {{ $t("order") }} / {{ $t("construction") }}
            </span>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, key) in rows"
          :key="key"
          :class="{
            odd: key % 2 === 0 || key === 0,
            hidden:
              (construction.groups &&
                !item.isParent &&
                construction.groups[item.parentName + item.parentId]) ||
              hideAllRows,
            parent: item.isParent
          }"
        >
          <td v-if="item.isParent">
            <span
              class="icon"
              style="cursor: pointer"
              @click="toggleRows(item.name + item.id)"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z"
                  fill="#C4C4C4"
                />
              </svg>
            </span>
            {{ item.name }}
          </td>
          <td v-else-if="item.icon !== ''">
            <span class="icon">
              <img :src="item.icon" alt="" />
            </span>
            {{ item.name }}
          </td>
          <td v-else>
            <div class="no-img icon"></div>
            {{ item.name }}
          </td>

          <td
            :style="{
              color:
                item.statusType == 1
                  ? '#FF4081'
                  : item.statusType == 2
                  ? '#154E85'
                  : item.statusType == 3
                  ? '#9B51E0'
                  : '#00670A'
            }"
          >
            {{ item.status }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "TableConstruction",
  data() {
    return {
      hideAllRows: false,
      titles: [
        "Кол-во",
        "Ед. изм",
        "Цена",
        "Ссылка",
        "Магазин",
        "Сроки",
        "Статус",
        "Цена Итого"
      ]
    };
  },
  methods: {
    toggleRows(item) {
      this.construction.groups[item] = !this.construction.groups[item];
    },
    hideAll() {
      this.hideAllRows = !this.hideAllRows;
    }
  },
  computed: {
    ...mapState({
      rows: state => state.furniture.furniture.groups || [],
      furniture: state => state.furniture.furniture,
      construction: state => state.furniture.construction
    })
  }
};
</script>

<style scoped lang="scss">
$ffamily: "Roboto", sans-serif;
.hidden {
  display: none;
}
.table {
  border-collapse: collapse;
  border: 1px solid #c4c4c4;
  img {
    max-width: 100%;
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
      font-weight: bold;
    }
    td:last-child {
      text-align: right;
    }
    &.parent {
      border-top: 1px solid #c4c4c4;
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
      td:last-child {
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
</style>
