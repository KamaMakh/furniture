<template>
  <div id="app">
    <notifications group="warn"/>
    <transition name="fade">
      <router-view />
    </transition>
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
.date-picker {
  margin-top: 47px;
  .date-picker-input {
    width: 140px;
    height: 24px;
    background: #F5F5F6;
    border: none;
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    display: flex;
    align-items: center;
    text-align: right;
    color: #868686;
    padding-right: 17px;
  }
}
.vc-container {
  font-family: 'Roboto', sans-serif !important;
  .vc-text-sm{
    color: #333 !important;
  }
  .vc-bg-blue-600 {
    background: #688E74 !important;
  }
}

.vux-uploader_bd {
  display: flex;
  flex-flow: wrap;
  input {
    cursor: pointer;
  }
}
.vux-uploader_files {
  padding: 0;
  margin: 0;
}
.vux-uploader {
  flex: 1 1 auto;
}
.vux-uploader_input-box, .vux-uploader_input {
  cursor: pointer;
}
.nomenclature-select {
  .vs__dropdown-toggle{
    border: none;
    border-bottom: 1px solid #000;
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
  }
  .vs__actions {
    display: none;
  }
  input {
    padding-left: 0;
    padding-right: 0;
    &::placeholder{
      color: #C4C4C4;
    }
  }
  .vs__selected {
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
  }
  &.is-danger {
    .vs__dropdown-toggle {
      border-bottom-color: #f04124 !important;
    }
  }
}

.vue-notification-group {
  z-index: 9999 !important;
}
</style>
