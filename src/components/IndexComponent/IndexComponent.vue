<template>
  <div class="index-component">
    <section id="1">
      <div class="index-component__nav-bar nav-bar">
        <div class="nav-bar__lang">
          <b-dropdown>
            <template v-slot:button-content>
              <div
                class="nav-bar__flag"
                :class="{
                  ru: lang.indexOf('ru') > -1,
                  de: lang.indexOf('de') > -1
                }"
              ></div>
            </template>
            <b-dropdown-item @click="setLang('ru')">
              <div class="nav-bar__flag ru"></div>
            </b-dropdown-item>
            <b-dropdown-item @click="setLang('de')">
              <div class="nav-bar__flag de"></div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="nav-bar__menu">
          <b-nav>
            <b-nav-item>Главная</b-nav-item>
            <b-nav-item>Фурнитура</b-nav-item>
            <b-nav-item>Склад</b-nav-item>
            <b-nav-item class="white">Документы</b-nav-item>
            <b-nav-item class="white">Тарифы</b-nav-item>
            <b-nav-item class="white">Контакты</b-nav-item>
          </b-nav>
        </div>
      </div>
    </section>
    <section id="2">
      <div class="first-block">
        <div class="first-block__title">
          Главный по стройке
        </div>
        <div class="first-block__text">
          Учёт материалов, инструментов и рабочего времени на строительном
          объекте
        </div>
        <my-button text="Узнать больше" />
      </div>
    </section>
    <section id="3">
      <div class="welcome">
        <div class="welcome__title">
          Только здесь и только сейчас, внимайте!
        </div>
        <div class="welcome__text">
          Здесь мы расскажем, как важно идти в ногу со временем и как же вам
          повезло, что мы создали такое хорошее приложение
        </div>
      </div>
    </section>
    <section id="4">
      <div class="furniture">
        <div class="furniture__title">
          Фурнитура
        </div>
        <div class="furniture__text">
          Модуль фурнитура позволяет создавать новые наименования товаров и
          материалов для вашей стройки. Согласовывать их со всеми участнками
          процесса.
          <br /><br />
          Вы можете пригласить к стройке архитекторов, клиентов и других
          ответственных лиц.
        </div>
        <my-button text="Попробовать" />
      </div>
    </section>
    <section id="5">
      <div class="counter-block">
        <div class="counter-block__item">
          <div class="counter-block__title">132</div>
          <div class="counter-block__text">
            Строительных компаний с нами
          </div>
        </div>
        <div class="counter-block__item">
          <div class="counter-block__title">2 300 +</div>
          <div class="counter-block__text">
            Проектов ведется в Stroy Assist
          </div>
        </div>
        <div class="counter-block__item">
          <div class="counter-block__title">3</div>
          <div class="counter-block__text">
            Пользователи трех стран доверяют нам!
          </div>
        </div>
      </div>
    </section>
    <section id="6">
      <div class="orders">
        <div class="orders__title">
          Заказы и склад
        </div>
        <div class="orders__text">
          Модуль “Заказы и Склад” позволяет ответственным сотрудникам
          осуществлять заказ материалов на стройку непосредвенно из мобильного
          приложения.
          <br /><br />
          3 нажатия пальцем и материалы уже заказаны!<br /><br />
          Курьер из магазина или Ваш сотрудник может осуществлять достаку
          заказанных матриалов, а руководитель отслеживать эти двиджения.
        </div>
        <my-button text="Зарегистрироваться" />
      </div>
    </section>
    <section id="7">
      <div class="documents">
        <div class="documents__title">
          Документы
        </div>
        <div class="documents__text">
          Все документы, сметы, чеки и планы всегда под рукой с помощью модуля
          “Документы”. <br /><br />
          Вы всегда сможете сохранить нужный Вам документ и поделится им с
          клиентом, архитектором или стройфирмой.
        </div>
        <my-button text="Узнать больше" />
      </div>
    </section>
    <section id="8">
      <div class="download">
        <div class="download__text">
          Скачайте наше мобильное приложение, с ним удобнее администратовать
          проекты.
        </div>
        <div class="download__btn"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
import IndexComponentButton from "./components/IndexComponentButton";
import "./assets/css/index.css";
export default {
  name: "IndexComponent",
  components: {
    "my-button": IndexComponentButton
  },
  data() {
    return {
      scrollPosition: 1,
      second: null,
      third: null,
      fours: null
    };
  },
  computed: {
    ...mapState({
      lang: state => state.lang
    })
  },
  methods: {
    setLang(lang) {
      this.$store.commit("setLang", lang);
    },
    handleScroll() {
      /* eslint-disable */
      let scroll = window.scrollY;

      if(scroll < this.second) {
        this.scrollPosition = 1;
      } else if(scroll < this.third) {
        this.scrollPosition = 2;
      } else if(scroll < this.fours) {
        this.scrollPosition = 3;
      } else {
        this.scrollPosition = 4;
      }
    }
  },
  mounted() {
    this.second = document.getElementById("2").offsetTop;
    this.third = document.getElementById("3").offsetTop;
    this.fours = document.getElementById("4").offsetTop;
    window.addEventListener("scroll", this.handleScroll)
  }
};
</script>

<style scoped lang="scss"></style>
