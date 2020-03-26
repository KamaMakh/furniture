<template>
  <div class="chantier-table">
    <v-card>
      <v-data-table
        :headers="headers"
        :items="[]"
        item-key="name"
        group-by="groupId"
        class="elevation-1"
        show-group-by
        :items-per-page="25"
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
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "chantierTable",
  data() {
    return {
      headers: [
        { text: this.$t("simple_name"), value: "name", align: "left" },
        {
          text: `${this.$t("order")}/${this.$t("warehouse")}`,
          value: "fat",
          align: "left"
        }
      ]
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
  }
};
</script>

<style scoped></style>
