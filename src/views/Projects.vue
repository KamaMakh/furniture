<template>
  <div class="flex-grow-1">
    <!--<div class="tables-wrap row">-->
    <!--<div class="tables-wrap__left col col-lg-6 col-md-12 col-sm-12">-->
    <!--<TableConstruction />-->
    <!--</div>-->
    <!--<div class="tables-wrap__right col col-lg-6 col-md-12 col-sm-12">-->
    <!--<TableWarehouse />-->
    <!--</div>-->
    <!--</div>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
// import TableConstruction from "@/components/tables/TableConstruction";
// import TableWarehouse from "@/components/tables/TableWarehouse";
export default {
  name: "Projects",
  components: {
    // TableConstruction,
    // TableWarehouse
  },
  data() {
    return {
      list: [
        {
          id: 0,
          projectName: "Amalia 1",
          rows: [
            { isParent: true, name: "General", id: 1, closed: false },
            {
              parentId: 1,
              parentName: "General",
              isParent: false,
              icon:
                "https://dynaimage.cdn.cnn.com/cnn/q_auto,h_600/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191010165517-28-week-in-photos-1011.jpg",
              name: "Паркет1",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "9 / 9",
              statusType: 1,
              price_sum: "21000,5 $"
            },
            {
              parentId: 1,
              parentName: "General",
              isParent: false,
              icon: "",
              name: "Паркет2",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "1 / 0",
              statusType: 1,
              price_sum: "21 000,5 $"
            },
            {
              parentId: 1,
              parentName: "General",
              isParent: false,
              icon: "",
              name: "Паркет3",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "40 / 10",
              statusType: 2,
              price_sum: "21 000,5 $"
            },
            {
              parentId: 1,
              parentName: "General",
              isParent: false,
              icon: "",
              name: "Паркет4",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "0 / 0",
              statusType: 4,
              price_sum: "21 000,5 $"
            },
            { isParent: true, name: "Salon", id: 2, closed: false },
            {
              parentId: 2,
              parentName: "Salon",
              isParent: false,
              icon: "",
              name: "Паркет4",
              count: 7,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "5 / 4",
              statusType: 3,
              price_sum: "21 000,5 $"
            }
          ],
          groups: {
            General1: false,
            Salon2: false
          }
        },
        {
          id: 1,
          projectName: "Severien 2",
          rows: [
            { isParent: true, name: "Электрика", id: 1, closed: false },
            {
              parentId: 1,
              parentName: "Электрика",
              isParent: false,
              icon:
                "https://dynaimage.cdn.cnn.com/cnn/q_auto,h_600/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191010165517-28-week-in-photos-1011.jpg",
              name: "Паркет1",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "9 / 9",
              statusType: 1,
              price_sum: "21000,5 $"
            },
            {
              parentId: 1,
              parentName: "Электрика",
              isParent: false,
              icon: "",
              name: "Паркет2",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "1 / 0",
              statusType: 1,
              price_sum: "21 000,5 $"
            },
            {
              parentId: 1,
              parentName: "Электрика",
              isParent: false,
              icon: "",
              name: "Паркет3",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "40 / 10",
              statusType: 2,
              price_sum: "21 000,5 $"
            },
            {
              parentId: 1,
              parentName: "Электрика",
              isParent: false,
              icon: "",
              name: "Паркет4",
              count: 5,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "0 / 0",
              statusType: 4,
              price_sum: "21 000,5 $"
            },
            { isParent: true, name: "Мебель", id: 2, closed: false },
            {
              parentId: 2,
              parentName: "Мебель",
              isParent: false,
              icon: "",
              name: "Паркет4",
              count: 7,
              unit: "m",
              price: "14.41",
              link: "http://test.ru",
              shop: "Merlin",
              term: "30 jours",
              status: "5 / 4",
              statusType: 3,
              price_sum: "21 000,5 $"
            }
          ],
          groups: {
            Электрика1: false,
            Мебель2: false
          }
        }
      ],
      list2: [
        {
          name: "Amalia 1",
          address: "address 1",
          id: 0
        },
        {
          name: "Severien 2",
          address: "address 2",
          id: 1
        }
      ]
    };
  },
  computed: {
    ...mapState({
      modules: state => state.user.modules
    })
  },
  mounted() {
    // eslint-disable-next-line
    ym(57324937, "hit", "#/projects", {
      title: "Проекты",
      referer: document.referrer
    });
    if (this.modules.indexOf(this.$route.name) < 0) {
      this.$router.push("/settings");
      return;
    }
    this.$store.dispatch("projects/requestModule", "Проекты");
    return new Promise(() => {
      this.$store.dispatch("furniture/getConstructions").then(() => {
        if (
          !this.$store.state.furniture.furniture.groups &&
          this.$store.state.furniture.constructions[0]
        ) {
          this.$store.dispatch("furniture/getFurniture", {
            projectId: this.$store.state.furniture.constructions[0]["id"]
          });
          this.$store.dispatch("furniture/setConstruction", {
            id: this.$store.state.furniture.constructions[0]["id"],
            name: this.$store.state.furniture.constructions[0]["name"]
          });
        }
      });
    });
  }
};
</script>

<style scoped lang="scss">
.tables-wrap {
}
</style>
