<template>
  <div style="height: 100%">
    <div class="container-wrap">
      <div class="container-wrap__navigation">
        <AppTop
          :leftMenuShow="leftMenuShow"
          @clicked-to-logo="leftMenuToggle"
        />
      </div>
      <div class="container-wrap__content content">
        <div class="content__left-menu" :class="{ opened: leftMenuShow }">
          <AppLeft :navsType="navsType"/>
        </div>
        <div class="content__body">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
import { mapGetters } from 'vuex';
import AppTop from '@/components/AppTop';
import AppLeft from '@/components/AppLeft';
export default {
  name: "AppContainer",
  components: {
      AppTop,
      AppLeft
  },
  beforeRouteEnter(to, from, next) {
    next(vm => (vm.navsType = to.name))
  },
  beforeRouteUpdate (to, from, next) {
    this.navsType = to.name;
    next();
  },
  data(){
      return{
        leftMenuShow: true,
        navsType: null
      }
  },
  methods:{
      leftMenuToggle(data){
        this.leftMenuShow = data;
      }
  },
  metaInfo: {
      title: 'Vue App',
      meta: [
          { vmid: 'description', property: 'description', content: 'Vue App' },
          { vmid: 'og:title', property: 'og:title', content: 'Vue App' },
          { vmid: 'og:description', property: 'og:description', content: 'Vue App' },
      ],
  },
  computed: {
    lang: {
      get() {
        return this.$store.state.lang;
      },
      set(lang) {
        this.$i18n.locale = lang;
        // import(`quasar/lang/${lang}`).then((l) => {
        //   this.$q.lang.set(l.default);
        // });
        this.$store.commit('setLang', lang);
      },
    },
    ...mapGetters(['loggedIn']),
  },
}
</script>

<style scoped lang="scss">
    .container-wrap{
        height: 100%;
        display: flex;
        flex-flow: nowrap column;
        &__navigation{
            background: #364B3C;
            height: 45px;
        }
        &__content{
            height: 100%;
            max-width: 1920px;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;
        }
    }
    .content{
        &__left-menu{
          transition: 0.8s;
          margin-left: -100%;
          height: 100%;
            &.opened{
                margin-left: 0;
            }
        }
        &__body{
          display: flex;
          max-width: 100%;
          flex: 1 1 auto;
          padding: 50px;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          overflow: hidden;
        }
    }

    @media screen and(max-width: 1200px) {
        .content {
            &__body {
                overflow-x: scroll;
            }
        }
    }
@media screen and(max-width: 959px) {
  .content{
    flex-flow:wrap;
    align-content: center;
    justify-content: center;
    &__body{
      padding: 20px 25px;
    }
    &__left-menu{
      position: absolute;
      top: 45px;
      left: -100%;
      bottom: 0;
      z-index: 10;
      &.opened{
          left: 0;
      }
    }
  }
}
</style>
