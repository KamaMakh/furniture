<template>
  <div class="index-component">
    <sl>
      <b-nav>
        <b-nav-item v-scroll-to="'#main'">{{ $t("main") }}</b-nav-item>
        <b-nav-item v-scroll-to="'#furniture'">{{
          $t("furniture")
        }}</b-nav-item>
        <b-nav-item v-scroll-to="'#orders'">{{ $t("warehouse") }}</b-nav-item>
        <b-nav-item v-scroll-to="'#documents'" class="white first">{{
          $t("documents")
        }}</b-nav-item>
        <b-nav-item v-scroll-to="'#tariffs'" class="white second">{{
          $t("tariffs")
        }}</b-nav-item>
        <b-nav-item v-scroll-to="'#contacts'" class="white third">{{
          $t("contacts")
        }}</b-nav-item>
      </b-nav>
    </sl>
    <section id="1">
      <div class="index-component__nav-bar nav-bar">
        <div class="nav-bar__lang">
          <b-dropdown>
            <template v-slot:button-content>
              <div
                class="nav-bar__flag"
                :class="{
                  ru: lang.indexOf('ru') > -1,
                  de: lang.indexOf('de') > -1,
                  en: lang.indexOf('en') > -1,
                  fr: lang.indexOf('fr') > -1
                }"
              ></div>
            </template>
            <b-dropdown-item @click="setLang('ru')">
              <div class="nav-bar__flag ru"></div>
            </b-dropdown-item>
            <b-dropdown-item @click="setLang('de')">
              <div class="nav-bar__flag de"></div>
            </b-dropdown-item>
            <b-dropdown-item @click="setLang('en')">
              <div class="nav-bar__flag en"></div>
            </b-dropdown-item>
            <b-dropdown-item @click="setLang('fr')">
              <div class="nav-bar__flag fr"></div>
            </b-dropdown-item>
          </b-dropdown>
        </div>
        <div class="nav-bar__menu">
          <b-nav>
            <b-nav-item v-scroll-to="'#main'">{{ $t("main") }}</b-nav-item>
            <b-nav-item v-scroll-to="'#furniture'">{{
              $t("furniture")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#orders'">{{
              $t("warehouse")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#documents'" class="white first">{{
              $t("documents")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#tariffs'" class="white second">{{
              $t("tariffs")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#contacts'" class="white third">{{
              $t("contacts")
            }}</b-nav-item>
          </b-nav>
        </div>
      </div>
    </section>
    <section id="main">
      <div class="first-block">
        <div class="first-block__title">
          {{ $t("lp.first.title") }}
        </div>
        <div class="first-block__text">
          {{ $t("lp.first.text") }}
        </div>
        <my-button :text="$t('more_learn')" />
      </div>
    </section>
    <section id="welcome">
      <div class="welcome">
        <div class="welcome__title">
          {{ $t("lp.welcome.title") }}
        </div>
        <div class="welcome__text">
          {{ $t("lp.welcome.text") }}
        </div>
        <div class="plane-container">
          <svg
            width="188"
            height="167"
            viewBox="0 0 188 167"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M187.244 2.81799L187.013 2.9584C186.321 4.81389 184.475 7.55199 183.462 9.55792C174.335 27.5311 163.203 43.1071 154.096 62.0632L151.739 66.9978C160.625 44.3508 173.744 26.2172 184.225 4.59324C175.609 9.65821 168.147 14.0211 158.639 18.3439C140.606 26.5281 119.774 38.1725 102.062 45.3738C96.736 47.5402 98.09 45.9054 91.0893 42.385C88.1306 40.9106 67.8105 32.8067 69.0542 29.6172C69.6158 28.193 109.323 20.3498 114.328 19.2064C137.928 13.7704 160.354 7.53193 183.613 1.45395L185.729 0.200247C186.451 -0.210969 187.374 0.0297425 187.795 0.751878C188.216 1.47401 187.966 2.40677 187.244 2.81799ZM178.648 4.40267C142.923 14.4123 109.083 22.8773 72.6147 30.6102C77.7599 33.6492 93.5466 40.7301 98.9124 43.8293C100.016 43.5484 102.072 42.6056 102.914 42.2345C121.098 34.0905 139.192 24.131 157.536 15.686C165.339 12.0954 171.788 8.44462 178.648 4.40267Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M184.907 8.3343C164.446 26.3877 136.965 33.258 116.856 52.555L121.479 46.8682C135.42 33.0775 165.59 21.9245 182.781 6.18795C183.372 5.5962 184.325 5.5962 184.917 6.18795C185.509 6.7797 185.499 7.74255 184.907 8.3343Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M150.425 70.2674C137.316 66.416 124.709 63.1664 114.739 53.2471C112.142 57.1486 107.959 77.3283 104.088 67.429C101.29 60.2679 99.8152 52.6654 98.6016 45.103C99.3237 47.5703 103.977 64.1794 106.084 68.0108L109.183 61.6319C110.126 59.4856 112.382 48.4228 115.993 51.3716C128.901 61.9127 135.37 63.006 151.237 67.3588C152.05 67.5795 152.511 68.412 152.29 69.2143C152.07 70.0267 151.227 70.4981 150.425 70.2674Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M122.332 59.616C117.116 63.648 113.064 67.8404 107.729 71.8522C111.71 65.9147 115.552 61.6821 120.898 56.9481C121.63 56.557 122.552 56.8278 122.944 57.57C123.335 58.3021 123.064 59.2148 122.332 59.616Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M105.652 75.0816C105.141 83.2758 105.201 85.0812 101.229 92.4329C102.503 85.2417 102.834 82.3431 102.623 75.0816C102.623 74.2391 103.306 73.5671 104.138 73.5671C104.98 73.5671 105.652 74.2391 105.652 75.0816Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M95.9739 105.813C91.0192 116.544 94.0983 111.76 86.9672 120.315C91.5006 110.547 89.4546 115.642 93.0552 105.03C93.2658 104.218 94.0983 103.746 94.9007 103.957C95.7131 104.178 96.1845 105.01 95.9739 105.813Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M76.0749 131.248C67.5697 137.978 72.2134 135.039 62.0835 139.943C70.3279 132.883 66.4665 136.423 73.7079 129.372C74.2194 128.72 75.1722 128.61 75.8241 129.132C76.4861 129.643 76.5964 130.596 76.0749 131.248Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M44.2207 147.345C44.4815 150.916 32.7167 151.066 30.9214 151.207C35.6153 148.438 38.574 148.348 41.4425 146.774C41.6732 146.413 42.0443 146.152 42.5056 146.082C43.3281 145.951 44.1004 146.523 44.2207 147.345ZM41.6331 146.663L41.6832 146.643V146.633L41.6331 146.663Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.1719 160.263C5.08504 164.396 9.79897 162.34 0 166.422C8.53524 159.782 4.13222 162.771 13.1489 157.415C13.9412 157.134 14.8038 157.545 15.0846 158.328C15.3654 159.12 14.9542 159.983 14.1719 160.263Z"
              fill="#FEA93D"
            />
          </svg>
        </div>
      </div>
    </section>
    <section id="furniture">
      <div class="furniture">
        <div class="furniture__title">
          {{ $t("furniture") }}
        </div>
        <div class="furniture__text" v-html="$t('lp.furniture.text')">
          <!--{{ $t("lp.furniture.text") }}-->
        </div>
        <my-button :text="$t('try')" />
      </div>
    </section>
    <section id="counter" class="counter">
      <div class="counter-block desc">
        <div class="counter-block__item">
          <div class="counter-block__title">
            {{ counters.companies }}
          </div>
          <div class="counter-block__text">
            {{ $t("lp.counter.companies") }}
          </div>
        </div>
        <div class="counter-block__item">
          <div class="counter-block__title">{{ counters.projects }} +</div>
          <div class="counter-block__text">
            {{ $t("lp.counter.projects") }}
          </div>
        </div>
        <div class="counter-block__item">
          <div class="counter-block__title">
            {{ counters.users }}
          </div>
          <div class="counter-block__text">
            {{ $t("lp.counter.users") }}
          </div>
        </div>
      </div>
      <carousel
        :perPageCustom="[
          [320, 1],
          [480, 1],
          [768, 1],
          [960, 2]
        ]"
        class="counter-block mobile"
      >
        <slide>
          <div class="counter-block__item">
            <div class="counter-block__title">
              {{ counters.companies }}
            </div>
            <div class="counter-block__text">
              {{ $t("lp.counter.companies") }}
            </div>
          </div>
        </slide>
        <slide>
          <div class="counter-block__item">
            <div class="counter-block__title">{{ counters.projects }} +</div>
            <div class="counter-block__text">
              {{ $t("lp.counter.projects") }}
            </div>
          </div>
        </slide>
        <slide>
          <div class="counter-block__item">
            <div class="counter-block__title">
              {{ counters.users }}
            </div>
            <div class="counter-block__text">
              {{ $t("lp.counter.users") }}
            </div>
          </div>
        </slide>
      </carousel>
    </section>
    <section id="orders">
      <div class="orders">
        <div class="orders__title">
          {{ $t("lp.orders.title") }}
        </div>
        <div class="orders__text" v-html="$t('lp.orders.text')">
          <!--{{ $t("lp.orders.text") }}-->
        </div>
        <my-button :text="$t('sign_up')" />
      </div>
    </section>
    <section id="welcome2">
      <div class="welcome">
        <div class="welcome__title">
          {{ $t("lp.welcome2.title") }}
        </div>
        <div class="welcome__text">
          {{ $t("lp.welcome2.text") }}
        </div>
        <div class="plane-container">
          <svg
            width="188"
            height="167"
            viewBox="0 0 188 167"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M187.244 2.81799L187.013 2.9584C186.321 4.81389 184.475 7.55199 183.462 9.55792C174.335 27.5311 163.203 43.1071 154.096 62.0632L151.739 66.9978C160.625 44.3508 173.744 26.2172 184.225 4.59324C175.609 9.65821 168.147 14.0211 158.639 18.3439C140.606 26.5281 119.774 38.1725 102.062 45.3738C96.736 47.5402 98.09 45.9054 91.0893 42.385C88.1306 40.9106 67.8105 32.8067 69.0542 29.6172C69.6158 28.193 109.323 20.3498 114.328 19.2064C137.928 13.7704 160.354 7.53193 183.613 1.45395L185.729 0.200247C186.451 -0.210969 187.374 0.0297425 187.795 0.751878C188.216 1.47401 187.966 2.40677 187.244 2.81799ZM178.648 4.40267C142.923 14.4123 109.083 22.8773 72.6147 30.6102C77.7599 33.6492 93.5466 40.7301 98.9124 43.8293C100.016 43.5484 102.072 42.6056 102.914 42.2345C121.098 34.0905 139.192 24.131 157.536 15.686C165.339 12.0954 171.788 8.44462 178.648 4.40267Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M184.907 8.3343C164.446 26.3877 136.965 33.258 116.856 52.555L121.479 46.8682C135.42 33.0775 165.59 21.9245 182.781 6.18795C183.372 5.5962 184.325 5.5962 184.917 6.18795C185.509 6.7797 185.499 7.74255 184.907 8.3343Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M150.425 70.2674C137.316 66.416 124.709 63.1664 114.739 53.2471C112.142 57.1486 107.959 77.3283 104.088 67.429C101.29 60.2679 99.8152 52.6654 98.6016 45.103C99.3237 47.5703 103.977 64.1794 106.084 68.0108L109.183 61.6319C110.126 59.4856 112.382 48.4228 115.993 51.3716C128.901 61.9127 135.37 63.006 151.237 67.3588C152.05 67.5795 152.511 68.412 152.29 69.2143C152.07 70.0267 151.227 70.4981 150.425 70.2674Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M122.332 59.616C117.116 63.648 113.064 67.8404 107.729 71.8522C111.71 65.9147 115.552 61.6821 120.898 56.9481C121.63 56.557 122.552 56.8278 122.944 57.57C123.335 58.3021 123.064 59.2148 122.332 59.616Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M105.652 75.0816C105.141 83.2758 105.201 85.0812 101.229 92.4329C102.503 85.2417 102.834 82.3431 102.623 75.0816C102.623 74.2391 103.306 73.5671 104.138 73.5671C104.98 73.5671 105.652 74.2391 105.652 75.0816Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M95.9739 105.813C91.0192 116.544 94.0983 111.76 86.9672 120.315C91.5006 110.547 89.4546 115.642 93.0552 105.03C93.2658 104.218 94.0983 103.746 94.9007 103.957C95.7131 104.178 96.1845 105.01 95.9739 105.813Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M76.0749 131.248C67.5697 137.978 72.2134 135.039 62.0835 139.943C70.3279 132.883 66.4665 136.423 73.7079 129.372C74.2194 128.72 75.1722 128.61 75.8241 129.132C76.4861 129.643 76.5964 130.596 76.0749 131.248Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M44.2207 147.345C44.4815 150.916 32.7167 151.066 30.9214 151.207C35.6153 148.438 38.574 148.348 41.4425 146.774C41.6732 146.413 42.0443 146.152 42.5056 146.082C43.3281 145.951 44.1004 146.523 44.2207 147.345ZM41.6331 146.663L41.6832 146.643V146.633L41.6331 146.663Z"
              fill="#FEA93D"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M14.1719 160.263C5.08504 164.396 9.79897 162.34 0 166.422C8.53524 159.782 4.13222 162.771 13.1489 157.415C13.9412 157.134 14.8038 157.545 15.0846 158.328C15.3654 159.12 14.9542 159.983 14.1719 160.263Z"
              fill="#FEA93D"
            />
          </svg>
        </div>
      </div>
    </section>
    <section id="documents">
      <div class="documents">
        <div class="documents__title">
          {{ $t("lp.documents.title") }}
        </div>
        <div class="documents__text" v-html="$t('lp.documents.text')">
          <!--{{ $t("lp.documents.text") }}-->
        </div>
        <my-button :text="$t('more_learn')" />
      </div>
    </section>
    <section id="8">
      <div class="download">
        <div class="download__text">
          {{ $t("lp.download.text") }}
        </div>
        <div class="download__btn"></div>
      </div>
    </section>
    <section id="tariffs">
      <div class="tariff-plan">
        <div class="tariff-plan__title">
          {{ $t("lp.tariffs.title") }}
        </div>
        <div class="tariff-plan__list desc">
          <div class="tariff">
            <div class="tariff__info">
              <div class="tariff__pic">
                <svg
                  width="80"
                  height="71"
                  viewBox="0 0 80 71"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M41.6706 15.2832H32.2673C20.6839 15.2832 11.2937 24.6734 11.2937 36.2568V45.6601C11.2937 57.2435 20.6839 66.6337 32.2673 66.6337H41.6706C53.254 66.6337 62.6442 57.2435 62.6442 45.6601V36.2568C62.6442 24.6734 53.254 15.2832 41.6706 15.2832Z"
                    fill="#444FD9"
                  />
                  <path
                    d="M21.8626 35.4999C21.6507 34.5005 21.4896 33.4854 21.3824 32.461C21.2745 31.434 21.22 30.4083 21.22 29.3901C21.22 21.2745 24.5097 13.9264 29.8277 8.60836C35.1463 3.29036 42.4945 0 50.61 0C58.7256 0 66.0737 3.29036 71.3917 8.60836C76.7097 13.9264 80.0001 21.2745 80.0001 29.3901C80.0001 35.9444 77.8282 42.1045 74.0808 47.0776C71.1986 50.9028 67.3816 54.027 62.9044 56.0866C61.6222 56.6766 60.2849 57.1794 58.9005 57.5857C58.8416 57.6033 59.745 56.2847 59.745 56.2847C60.7676 55.9424 61.7608 55.5443 62.7207 55.0941C66.9515 53.1123 70.5578 50.121 73.2946 46.4839C76.9147 41.6794 79.0132 35.7263 79.0132 29.3901C79.0132 21.5472 75.8332 14.4461 70.6939 9.30618C65.5546 4.16624 58.4528 0.986858 50.61 0.986858C42.7672 0.986858 35.6661 4.16624 30.5262 9.30618C25.3862 14.4461 22.2068 21.5472 22.2068 29.3901C22.2068 30.3913 22.2582 31.3832 22.3611 32.3607C22.4639 33.3412 22.6194 34.3218 22.8269 35.2955L21.8626 35.4999Z"
                    fill="#FF9F24"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M27.2596 27.7461L22.0325 35.0065L16.8154 27.7461H27.2596Z"
                    fill="#FE5D19"
                    stroke="#FE5D19"
                    stroke-width="0.986858"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5759 40.6094H25.5875"
                    stroke="white"
                    stroke-width="0.986858"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M39.5131 45.1055H11.2942V45.6591C11.2942 57.1954 20.732 66.6333 32.2677 66.6333H38.1042C38.9895 65.4144 39.5131 63.9172 39.5131 62.304V45.1055Z"
                    fill="#FF9F24"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.5273 49.2812H22.8389C22.378 49.2812 22.0012 49.6581 22.0012 50.1189V52.329C22.0012 52.7898 22.378 53.1672 22.8389 53.1672H25.5273C25.9882 53.1672 26.3656 52.7898 26.3656 52.329V50.1189C26.3656 49.6581 25.9882 49.2812 25.5273 49.2812Z"
                    fill="#444FD9"
                    stroke="#444FD9"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.5173 49.2744H30.8295C30.368 49.2744 29.9912 49.6519 29.9912 50.1127V52.3221C29.9912 52.7836 30.368 53.161 30.8295 53.161H33.5173C33.9788 53.161 34.3556 52.7836 34.3556 52.3221V50.1127C34.3556 49.6519 33.9788 49.2744 33.5173 49.2744Z"
                    fill="#444FD9"
                    stroke="#444FD9"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M33.4729 59.4795H30.785C30.3236 59.4795 29.9468 59.8563 29.9468 60.3178V62.5272C29.9468 62.988 30.3236 63.3655 30.785 63.3655H33.4729C33.9337 63.3655 34.3111 62.988 34.3111 62.5272V60.3178C34.3111 59.8563 33.9337 59.4795 33.4729 59.4795Z"
                    fill="#444FD9"
                    stroke="#444FD9"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.519 59.4609H14.8306C14.3697 59.4609 13.9929 59.8384 13.9929 60.2992V62.5087C13.9929 62.9701 14.3697 63.3476 14.8306 63.3476H17.519C17.9798 63.3476 18.3567 62.9701 18.3567 62.5087V60.2992C18.3567 59.8384 17.9798 59.4609 17.519 59.4609Z"
                    fill="#FF9F24"
                    stroke="#FF9F24"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M25.6057 59.5254H22.9179C22.4564 59.5254 22.0796 59.9022 22.0796 60.3637V62.5731C22.0796 63.0339 22.4564 63.4114 22.9179 63.4114H25.6057C26.0671 63.4114 26.444 63.0339 26.444 62.5731V60.3637C26.444 59.9022 26.0671 59.5254 25.6057 59.5254Z"
                    fill="#444FD9"
                    stroke="#444FD9"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.0183 59.4609H7.33045C6.869 59.4609 6.49219 59.8384 6.49219 60.2992V62.5087C6.49219 62.9701 6.869 63.3476 7.33045 63.3476H10.0183C10.4797 63.3476 10.8566 62.9701 10.8566 62.5087V60.2992C10.8566 59.8384 10.4797 59.4609 10.0183 59.4609Z"
                    fill="#FF9F24"
                    stroke="#FF9F24"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M10.0183 49.1973H7.33045C6.869 49.1973 6.49219 49.5741 6.49219 50.0349V52.245C6.49219 52.7058 6.869 53.0833 7.33045 53.0833H10.0183C10.4797 53.0833 10.8566 52.7058 10.8566 52.245V50.0349C10.8566 49.5741 10.4797 49.1973 10.0183 49.1973Z"
                    fill="#FF9F24"
                    stroke="#FF9F24"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.519 49.1973H14.8306C14.3697 49.1973 13.9929 49.5741 13.9929 50.0349V52.245C13.9929 52.7058 14.3697 53.0833 14.8306 53.0833H17.519C17.9798 53.0833 18.3567 52.7058 18.3567 52.245V50.0349C18.3567 49.5741 17.9798 49.1973 17.519 49.1973Z"
                    fill="white"
                    stroke="white"
                    stroke-width="0.789361"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1 45.1069H39.5132H1ZM8.39642 35.4082H32.1161C36.1846 35.4082 39.5132 38.7368 39.5132 42.8046V62.3054C39.5132 66.3738 36.1846 69.7018 32.1161 69.7018H8.39642C4.32861 69.7018 1 66.3738 1 62.3054V42.8046C1 38.7368 4.32861 35.4082 8.39642 35.4082Z"
                    stroke="#FF9F24"
                    stroke-width="0.986858"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M16.1741 59.0713L17.4863 59.0826C17.9804 59.0863 18.4995 59.3277 18.6908 59.9252C18.7578 60.134 18.7516 60.2807 18.7516 60.4814V61.5704V61.6663C18.7516 61.7184 16.1227 59.0713 16.1741 59.0713Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div class="tariff__name-wr">
                <div class="tariff__name">
                  {{ $t("tariffsPage.optimal.subTitle") }}
                </div>
                <div class="tariff__price">
                  {{ $t("tariffsPage.optimal.price") }}
                </div>
              </div>
            </div>
            <div class="tariff-plan__text">
              <span>{{ $t("tariffsPage.optimal.ability1") }}</span>
              <span>{{ $t("tariffsPage.optimal.ability2") }}</span>
              <span>{{ $t("tariffsPage.optimal.ability3") }}</span>
              <span>{{ $t("tariffsPage.optimal.ability4") }}</span>
              <span>{{ $t("tariffsPage.optimal.ability5") }}</span>
            </div>
            <div class="tariff-plan__btn">
              {{ $t("buy") }}
            </div>
          </div>
          <div class="tariff">
            <div class="tariff__info">
              <div class="tariff__pic">
                <svg
                  width="73"
                  height="82"
                  viewBox="0 0 73 82"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.5616 23.4492H36.1091C24.5029 23.4492 15.0943 32.8579 15.0943 44.4641V53.9165C15.0943 65.5227 24.5029 74.9314 36.1091 74.9314H45.5616C57.1678 74.9314 66.5764 65.5227 66.5764 53.9165V44.4641C66.5764 32.8579 57.1678 23.4492 45.5616 23.4492Z"
                    fill="#FE5D19"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35.6871 12.6465C48.621 12.6465 59.0862 23.1328 59.0862 36.0455C59.0862 48.9794 48.621 59.4446 35.6871 59.4446C22.7744 59.4446 12.2881 48.9794 12.2881 36.0455C12.2881 23.1328 22.7744 12.6465 35.6871 12.6465V12.6465Z"
                    stroke="#FF9F24"
                    stroke-width="0.991665"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    d="M51.1108 17.7318L59.867 10.959"
                    stroke="#FF9F24"
                    stroke-width="1.98333"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    d="M5.57855 52.8408L14.1026 46.2578"
                    stroke="#FF9F24"
                    stroke-width="1.98333"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    d="M34.5266 12.0771L34.0624 1"
                    stroke="#FF9F24"
                    stroke-width="1.98333"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12.0349 32.67L1 31.6572"
                    stroke="#FF9F24"
                    stroke-width="1.98333"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    d="M19.1874 18.7657L11.4229 10.8535"
                    stroke="#FF9F24"
                    stroke-width="1.98333"
                    stroke-miterlimit="22.9256"
                    stroke-linecap="round"
                  />
                  <path
                    d="M51.1527 80.523C62.5492 80.523 71.7878 71.2844 71.7878 59.888C71.7878 48.4916 62.5492 39.2529 51.1527 39.2529C39.7563 39.2529 30.5177 48.4916 30.5177 59.888C30.5177 71.2844 39.7563 80.523 51.1527 80.523Z"
                    stroke="#FF9F24"
                    stroke-width="0.991665"
                    stroke-miterlimit="22.9256"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M35.6868 59.4449C47.0382 59.4449 56.4907 51.3639 58.6428 40.6455C56.3219 39.7593 53.79 39.2529 51.1526 39.2529C40.0966 39.2529 31.0661 47.9669 30.5597 58.8752C32.2054 59.255 33.9145 59.4449 35.6868 59.4449Z"
                    fill="#444FD9"
                  />
                </svg>
              </div>
              <div class="tariff__name-wr">
                <div class="tariff__name">
                  {{ $t("tariffsPage.premium.subTitle") }}
                </div>
                <div class="tariff__price">
                  {{ $t("tariffsPage.premium.price") }}
                </div>
              </div>
            </div>
            <div class="tariff-plan__text">
              <span>{{ $t("tariffsPage.premium.ability1") }}</span>
              <span>{{ $t("tariffsPage.premium.ability2") }}</span>
              <span>{{ $t("tariffsPage.premium.ability3") }}</span>
              <span>{{ $t("tariffsPage.premium.ability4") }}</span>
              <span>{{ $t("tariffsPage.premium.ability5") }}</span>
            </div>
            <div class="tariff-plan__btn">
              {{ $t("buy") }}
            </div>
          </div>
        </div>
        <carousel
          :perPageCustom="[
            [320, 1],
            [480, 1],
            [768, 1],
            [960, 2]
          ]"
          class="tariff-plan__list mobile"
        >
          <slide>
            <div class="tariff">
              <div class="tariff__info">
                <div class="tariff__pic">
                  <svg
                    width="80"
                    height="71"
                    viewBox="0 0 80 71"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M41.6706 15.2832H32.2673C20.6839 15.2832 11.2937 24.6734 11.2937 36.2568V45.6601C11.2937 57.2435 20.6839 66.6337 32.2673 66.6337H41.6706C53.254 66.6337 62.6442 57.2435 62.6442 45.6601V36.2568C62.6442 24.6734 53.254 15.2832 41.6706 15.2832Z"
                      fill="#444FD9"
                    />
                    <path
                      d="M21.8626 35.4999C21.6507 34.5005 21.4896 33.4854 21.3824 32.461C21.2745 31.434 21.22 30.4083 21.22 29.3901C21.22 21.2745 24.5097 13.9264 29.8277 8.60836C35.1463 3.29036 42.4945 0 50.61 0C58.7256 0 66.0737 3.29036 71.3917 8.60836C76.7097 13.9264 80.0001 21.2745 80.0001 29.3901C80.0001 35.9444 77.8282 42.1045 74.0808 47.0776C71.1986 50.9028 67.3816 54.027 62.9044 56.0866C61.6222 56.6766 60.2849 57.1794 58.9005 57.5857C58.8416 57.6033 59.745 56.2847 59.745 56.2847C60.7676 55.9424 61.7608 55.5443 62.7207 55.0941C66.9515 53.1123 70.5578 50.121 73.2946 46.4839C76.9147 41.6794 79.0132 35.7263 79.0132 29.3901C79.0132 21.5472 75.8332 14.4461 70.6939 9.30618C65.5546 4.16624 58.4528 0.986858 50.61 0.986858C42.7672 0.986858 35.6661 4.16624 30.5262 9.30618C25.3862 14.4461 22.2068 21.5472 22.2068 29.3901C22.2068 30.3913 22.2582 31.3832 22.3611 32.3607C22.4639 33.3412 22.6194 34.3218 22.8269 35.2955L21.8626 35.4999Z"
                      fill="#FF9F24"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M27.2596 27.7461L22.0325 35.0065L16.8154 27.7461H27.2596Z"
                      fill="#FE5D19"
                      stroke="#FE5D19"
                      stroke-width="0.986858"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M13.5759 40.6094H25.5875"
                      stroke="white"
                      stroke-width="0.986858"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M39.5131 45.1055H11.2942V45.6591C11.2942 57.1954 20.732 66.6333 32.2677 66.6333H38.1042C38.9895 65.4144 39.5131 63.9172 39.5131 62.304V45.1055Z"
                      fill="#FF9F24"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.5273 49.2812H22.8389C22.378 49.2812 22.0012 49.6581 22.0012 50.1189V52.329C22.0012 52.7898 22.378 53.1672 22.8389 53.1672H25.5273C25.9882 53.1672 26.3656 52.7898 26.3656 52.329V50.1189C26.3656 49.6581 25.9882 49.2812 25.5273 49.2812Z"
                      fill="#444FD9"
                      stroke="#444FD9"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.5173 49.2744H30.8295C30.368 49.2744 29.9912 49.6519 29.9912 50.1127V52.3221C29.9912 52.7836 30.368 53.161 30.8295 53.161H33.5173C33.9788 53.161 34.3556 52.7836 34.3556 52.3221V50.1127C34.3556 49.6519 33.9788 49.2744 33.5173 49.2744Z"
                      fill="#444FD9"
                      stroke="#444FD9"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M33.4729 59.4795H30.785C30.3236 59.4795 29.9468 59.8563 29.9468 60.3178V62.5272C29.9468 62.988 30.3236 63.3655 30.785 63.3655H33.4729C33.9337 63.3655 34.3111 62.988 34.3111 62.5272V60.3178C34.3111 59.8563 33.9337 59.4795 33.4729 59.4795Z"
                      fill="#444FD9"
                      stroke="#444FD9"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.519 59.4609H14.8306C14.3697 59.4609 13.9929 59.8384 13.9929 60.2992V62.5087C13.9929 62.9701 14.3697 63.3476 14.8306 63.3476H17.519C17.9798 63.3476 18.3567 62.9701 18.3567 62.5087V60.2992C18.3567 59.8384 17.9798 59.4609 17.519 59.4609Z"
                      fill="#FF9F24"
                      stroke="#FF9F24"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M25.6057 59.5254H22.9179C22.4564 59.5254 22.0796 59.9022 22.0796 60.3637V62.5731C22.0796 63.0339 22.4564 63.4114 22.9179 63.4114H25.6057C26.0671 63.4114 26.444 63.0339 26.444 62.5731V60.3637C26.444 59.9022 26.0671 59.5254 25.6057 59.5254Z"
                      fill="#444FD9"
                      stroke="#444FD9"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0183 59.4609H7.33045C6.869 59.4609 6.49219 59.8384 6.49219 60.2992V62.5087C6.49219 62.9701 6.869 63.3476 7.33045 63.3476H10.0183C10.4797 63.3476 10.8566 62.9701 10.8566 62.5087V60.2992C10.8566 59.8384 10.4797 59.4609 10.0183 59.4609Z"
                      fill="#FF9F24"
                      stroke="#FF9F24"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M10.0183 49.1973H7.33045C6.869 49.1973 6.49219 49.5741 6.49219 50.0349V52.245C6.49219 52.7058 6.869 53.0833 7.33045 53.0833H10.0183C10.4797 53.0833 10.8566 52.7058 10.8566 52.245V50.0349C10.8566 49.5741 10.4797 49.1973 10.0183 49.1973Z"
                      fill="#FF9F24"
                      stroke="#FF9F24"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.519 49.1973H14.8306C14.3697 49.1973 13.9929 49.5741 13.9929 50.0349V52.245C13.9929 52.7058 14.3697 53.0833 14.8306 53.0833H17.519C17.9798 53.0833 18.3567 52.7058 18.3567 52.245V50.0349C18.3567 49.5741 17.9798 49.1973 17.519 49.1973Z"
                      fill="white"
                      stroke="white"
                      stroke-width="0.789361"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M1 45.1069H39.5132H1ZM8.39642 35.4082H32.1161C36.1846 35.4082 39.5132 38.7368 39.5132 42.8046V62.3054C39.5132 66.3738 36.1846 69.7018 32.1161 69.7018H8.39642C4.32861 69.7018 1 66.3738 1 62.3054V42.8046C1 38.7368 4.32861 35.4082 8.39642 35.4082Z"
                      stroke="#FF9F24"
                      stroke-width="0.986858"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M16.1741 59.0713L17.4863 59.0826C17.9804 59.0863 18.4995 59.3277 18.6908 59.9252C18.7578 60.134 18.7516 60.2807 18.7516 60.4814V61.5704V61.6663C18.7516 61.7184 16.1227 59.0713 16.1741 59.0713Z"
                      fill="white"
                    />
                  </svg>
                </div>
                <div class="tariff__name-wr">
                  <div class="tariff__name">
                    {{ $t("tariffsPage.optimal.subTitle") }}
                  </div>
                  <div class="tariff__price">
                    {{ $t("tariffsPage.optimal.price") }}
                  </div>
                </div>
              </div>
              <div class="tariff-plan__text">
                <span>{{ $t("tariffsPage.optimal.ability1") }}</span>
                <span>{{ $t("tariffsPage.optimal.ability2") }}</span>
                <span>{{ $t("tariffsPage.optimal.ability3") }}</span>
                <span>{{ $t("tariffsPage.optimal.ability4") }}</span>
                <span>{{ $t("tariffsPage.optimal.ability5") }}</span>
              </div>
              <div class="tariff-plan__btn">
                {{ $t("buy") }}
              </div>
            </div>
          </slide>
          <slide>
            <div class="tariff">
              <div class="tariff__info">
                <div class="tariff__pic">
                  <svg
                    width="73"
                    height="82"
                    viewBox="0 0 73 82"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M45.5616 23.4492H36.1091C24.5029 23.4492 15.0943 32.8579 15.0943 44.4641V53.9165C15.0943 65.5227 24.5029 74.9314 36.1091 74.9314H45.5616C57.1678 74.9314 66.5764 65.5227 66.5764 53.9165V44.4641C66.5764 32.8579 57.1678 23.4492 45.5616 23.4492Z"
                      fill="#FE5D19"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M35.6871 12.6465C48.621 12.6465 59.0862 23.1328 59.0862 36.0455C59.0862 48.9794 48.621 59.4446 35.6871 59.4446C22.7744 59.4446 12.2881 48.9794 12.2881 36.0455C12.2881 23.1328 22.7744 12.6465 35.6871 12.6465V12.6465Z"
                      stroke="#FF9F24"
                      stroke-width="0.991665"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      d="M51.1108 17.7318L59.867 10.959"
                      stroke="#FF9F24"
                      stroke-width="1.98333"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      d="M5.57855 52.8408L14.1026 46.2578"
                      stroke="#FF9F24"
                      stroke-width="1.98333"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      d="M34.5266 12.0771L34.0624 1"
                      stroke="#FF9F24"
                      stroke-width="1.98333"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      d="M12.0349 32.67L1 31.6572"
                      stroke="#FF9F24"
                      stroke-width="1.98333"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      d="M19.1874 18.7657L11.4229 10.8535"
                      stroke="#FF9F24"
                      stroke-width="1.98333"
                      stroke-miterlimit="22.9256"
                      stroke-linecap="round"
                    />
                    <path
                      d="M51.1527 80.523C62.5492 80.523 71.7878 71.2844 71.7878 59.888C71.7878 48.4916 62.5492 39.2529 51.1527 39.2529C39.7563 39.2529 30.5177 48.4916 30.5177 59.888C30.5177 71.2844 39.7563 80.523 51.1527 80.523Z"
                      stroke="#FF9F24"
                      stroke-width="0.991665"
                      stroke-miterlimit="22.9256"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M35.6868 59.4449C47.0382 59.4449 56.4907 51.3639 58.6428 40.6455C56.3219 39.7593 53.79 39.2529 51.1526 39.2529C40.0966 39.2529 31.0661 47.9669 30.5597 58.8752C32.2054 59.255 33.9145 59.4449 35.6868 59.4449Z"
                      fill="#444FD9"
                    />
                  </svg>
                </div>
                <div class="tariff__name-wr">
                  <div class="tariff__name">
                    {{ $t("tariffsPage.premium.subTitle") }}
                  </div>
                  <div class="tariff__price">
                    {{ $t("tariffsPage.premium.price") }}
                  </div>
                </div>
              </div>
              <div class="tariff-plan__text">
                <span>{{ $t("tariffsPage.premium.ability1") }}</span>
                <span>{{ $t("tariffsPage.premium.ability2") }}</span>
                <span>{{ $t("tariffsPage.premium.ability3") }}</span>
                <span>{{ $t("tariffsPage.premium.ability4") }}</span>
                <span>{{ $t("tariffsPage.premium.ability5") }}</span>
              </div>
              <div class="tariff-plan__btn">
                {{ $t("buy") }}
              </div>
            </div>
          </slide>
        </carousel>
      </div>
    </section>
    <section id="10">
      <div class="contacts" id="contacts">
        <b-row>
          <b-col cols="12" sm="6" md="4" class="contacts__copy">
            © 2020 ООО «ЕРА»
          </b-col>
          <b-col cols="12" sm="6" md="4" class="contacts__info">
            <div class="contacts__email">
              <a href="mailto:eradevelopmentnsk@gmail.com" target="_blank"
                >eradevelopmentnsk@gmail.com</a
              >
            </div>
            <div class="contacts__phone">
              <a href="tel:+7(383) 277 27 39">
                +7(383) 277 27 39
              </a>
            </div>
          </b-col>
          <b-col
            cols="12"
            md="4"
            class="contacts__policy"
            v-html="$t('policyText')"
            @click="downloadWithVueResource"
          >
            <!--{{ $t("policyText") }}-->
          </b-col>
        </b-row>
      </div>
      <div class="bot-menu">
        <div class="bot-menu__logo"></div>
        <div class="bot-menu__menu">
          <b-nav>
            <b-nav-item v-scroll-to="'#main'">{{ $t("main") }}</b-nav-item>
            <b-nav-item v-scroll-to="'#furniture'">{{
              $t("furniture")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#orders'">{{
              $t("warehouse")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#documents'" class="white first">{{
              $t("documents")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#tariffs'" class="white second">{{
              $t("tariffs")
            }}</b-nav-item>
            <b-nav-item v-scroll-to="'#contacts'" class="white third">{{
              $t("contacts")
            }}</b-nav-item>
          </b-nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import IndexComponentButton from "./components/IndexComponentButton";
import "./assets/css/index.css";
import { Slide as sl } from "vue-burger-menu";
import VueCarousel from "vue-carousel";
Vue.use(VueCarousel);
export default {
  name: "IndexComponent",
  components: {
    "my-button": IndexComponentButton,
    sl
  },
  data() {
    return {
      scrollPosition: "",
      main: null,
      furniture: null,
      orders: null,
      documents: null,
      tariffs: null,
      contacts: null,
      counter: null,
      url: "https://stroy-assist.ru/confirm.pdf",
      counters: {
        companies: 0,
        projects: 0,
        users: 0,
        firstOpen: true
      },
      opts: {
        start: 0,
        dir: "v",
        duration: 100,
        overflow: scroll,
        beforeChange: (currentSlideEl, currenIndex, nextIndex) => {
          this.$emit("on-scroll-block", {
            el: currentSlideEl,
            curr: currenIndex,
            next: nextIndex
          });
        },
        movingFlag: true
      },
      currLang:
        this.$cookies.get("lang") ||
        navigator.language ||
        navigator.userLanguage ||
        "en"
    };
  },
  computed: {
    ...mapState({
      lang: state => state.lang
    })
  },
  methods: {
    downloadWithVueResource() {
      window.open(this.url, "_blank");
    },
    setLang(lang) {
      this.currLang = lang;
      this.$store.commit("setLang", lang);
    },
    handleScroll() {
      let scroll = window.scrollY;

      if (scroll >= this.contacts - 150) {
        this.scrollPosition = "contacts";
      } else if (scroll >= this.tariffs - 150) {
        this.scrollPosition = "tariffs";
      } else if (scroll >= this.documents - 150) {
        this.scrollPosition = "documents";
      } else if (scroll >= this.orders - 150) {
        this.scrollPosition = "orders";
      } else if (scroll >= this.counter - 300) {
        this.scrollPosition = "counter";
      } else if (scroll >= this.furniture - 150) {
        this.scrollPosition = "furniture";
      } else if (scroll >= this.main - 150) {
        this.scrollPosition = "main";
      } else {
        this.scrollPosition = "";
      }
    },
    animateValue(start, end, duration, prop) {
      let range = end - start;
      let current = start;
      let increment = prop === "projects" ? 25 : end > start ? 1 : -1;
      let stepTime = Math.abs(Math.floor(duration / range));
      let timer = setInterval(() => {
        current += increment;
        this.counters[prop] = current;
        if (current >= end) {
          clearInterval(timer);
        }
      }, stepTime);
    }
  },
  mounted() {
    /*eslint-disable*/
    if (location.href.indexOf("?") > -1) {
      let params = location.href.split("?")[1],
        query = [];
      params = params.split("&");
      if (params.length) {
        params.forEach(item => {
          if (item.indexOf("=") > -1) {
            query[item.split("=")[0]] = item.split("=")[1];
          }
        });
      }
      if (query["lang"] && ["ru", "en", "de", "fr"].indexOf(query["lang"]) > -1) {
        this.setLang(query["lang"]);
      }
      if (
        query["page"] &&
        [
          "furniture",
          "main",
          "orders",
          "documents",
          "contacts",
          "tariffs"
        ].indexOf(query["page"] > -1)
      ) {
        setTimeout(() => {
          let scrl = this.$scrollTo("#" + query["page"], 1000, {
            onDone: function(element) {
              scrl();
            }
          });
        }, 1500);
      }
    }

    this.main = document.getElementById("main").offsetTop;
    this.furniture = document.getElementById("furniture").offsetTop;
    this.orders = document.getElementById("orders").offsetTop;
    this.documents = document.getElementById("documents").offsetTop;
    this.tariffs = document.getElementById("tariffs").offsetTop;
    this.contacts = document.getElementById("contacts").offsetTop;
    this.counter = document.getElementById("counter").offsetTop;
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    scrollPosition(page) {
      if(page === "counter" && this.counters.firstOpen) {
        this.animateValue(0, 132, 800, "companies");
        this.animateValue(0, 2300, 100, "projects");
        this.animateValue(0, 3, 800, "users");
        this.counters.firstOpen = false;
      }
    },
    currLang(val) {
      if(!val) {
        val = "en";
      }
      this.$i18n.locale = val;
      this.$cookies.set("lang", val);
      this.$store.commit('setLang', val);
    }
  }
};
</script>
