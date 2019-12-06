<template>
  <div id="app">
    <notifications group="warn"/>
    <router-view />
  </div>
</template>

<script>
/* eslint-disable */
export default{
  name: "AppContainer",
  created() {
    this.$i18n.locale = this.$store.state.lang;
  }
};
</script>

<style lang="scss">
    @media screen and(min-width: 960px) {
        html, body{
            height: 100%;
        }
    }

    body{
        margin: 0;
    }
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
    height: 100%;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.btn-custom{
  background: #688E74 !important;
  color: #fff !important;
  &:hover{
    background: #999 !important;
  }
}
</style>
