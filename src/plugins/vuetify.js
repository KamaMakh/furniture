import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify);

import ru from "vuetify/es5/locale/ru";
import fr from "vuetify/es5/locale/fr";
import de from "vuetify/es5/locale/de";
import en from "vuetify/es5/locale/en";

export default new Vuetify({
  lang: {
    locales: { ru, fr, de, en }
  }
});
