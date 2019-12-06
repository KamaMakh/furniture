<template>
  <div>
    <div class="header">
      <a class="header__logo" @click="toggleLeftMenu"></a>
      <div class="header__menu header-menu">
        <ul>
          <li>
            <router-link href="#" :to="{ name: 'Furniture' }">
              <span class="header-menu__icon">
                <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M13.095 10.8616C13.77 10.8616 14.364 10.4926 14.67 9.93457L17.892 4.09356C18.225 3.49955 17.793 2.76155 17.109 2.76155H3.78901L2.94301 0.961548H0V2.76155H1.8L5.04001 9.59257L3.82501 11.7886C3.16801 12.9946 4.03201 14.4616 5.40001 14.4616H16.2V12.6616H5.40001L6.39002 10.8616H13.095ZM3.6086 17.1616C3.6086 16.1716 4.4096 15.3616 5.39961 15.3616C6.38961 15.3616 7.19961 16.1716 7.19961 17.1616C7.19961 18.1516 6.38961 18.9616 5.39961 18.9616C4.4096 18.9616 3.6086 18.1516 3.6086 17.1616ZM12.6086 17.1616C12.6086 16.1716 13.4096 15.3616 14.3996 15.3616C15.3896 15.3616 16.1996 16.1716 16.1996 17.1616C16.1996 18.1516 15.3896 18.9616 14.3996 18.9616C13.4096 18.9616 12.6086 18.1516 12.6086 17.1616ZM15.5786 4.56158H4.64361L6.77662 9.06159H13.0946L15.5786 4.56158Z" fill="#D6E8CE"/>
                </svg>
              </span>
              {{ $t("furniture") }}
            </router-link>
          </li>
          <li>
            <router-link href="#" :to="{ name: 'Projects' }">
              <span class="header-menu__icon">
                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.491L10.5882 0.961548L21.1765 10.491H18V18.9615H11.6471V12.6086H9.52941V18.9615H3.17647V10.491H0ZM15.8824 8.57443L10.5882 3.80972L5.29412 8.57443V16.8438H7.41177V10.4909H13.7647V16.8438H15.8824V8.57443Z" fill="white"/>
                </svg>
              </span>
              {{ $t("projects") }}
            </router-link>
          </li>
          <li>
            <a href="#">
                    <span class="header-menu__icon">
                        <svg width="25" height="19" viewBox="0 0 25 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.1176 5.19678V7.31442H9V9.43207H11.1176V11.5497L14.2941 8.37325L11.1176 5.19678Z" fill="#D6E8CE"/>
<path d="M6.88235 11.5497L6.88235 9.4321L9 9.4321L9 7.31445L6.88235 7.31445L6.88235 5.1968L3.70588 8.37327L6.88235 11.5497Z" fill="#D6E8CE"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M21.375 5.46155H18V0.961548H2.25C1.0125 0.961548 0 1.97405 0 3.21155V15.5865H2.25C2.25 17.454 3.7575 18.9615 5.625 18.9615C7.4925 18.9615 9 17.454 9 15.5865H15.75C15.75 17.454 17.2575 18.9615 19.125 18.9615C20.9925 18.9615 22.5 17.454 22.5 15.5865H24.75V9.96155L21.375 5.46155ZM20.8125 7.14905L23.0175 9.96155H18V7.14905H20.8125ZM4.5 15.5865C4.5 16.2053 5.00625 16.7115 5.625 16.7115C6.24375 16.7115 6.75 16.2053 6.75 15.5865C6.75 14.9678 6.24375 14.4615 5.625 14.4615C5.00625 14.4615 4.5 14.9678 4.5 15.5865ZM8.1225 13.3365C7.50375 12.6503 6.62625 12.2115 5.625 12.2115C4.62375 12.2115 3.74625 12.6503 3.1275 13.3365H2.25V3.21155H15.75V13.3365H8.1225ZM18 15.5865C18 16.2053 18.5063 16.7115 19.125 16.7115C19.7437 16.7115 20.25 16.2053 20.25 15.5865C20.25 14.9678 19.7437 14.4615 19.125 14.4615C18.5063 14.4615 18 14.9678 18 15.5865Z" fill="#D6E8CE"/>
</svg>

                    </span>
              {{ $t("statistics") }}
            </a>
          </li>
          <li>
            <a href="#">
                    <span class="header-menu__icon">
                        <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 2.96155H14.83L13 0.961548H7L5.17 2.96155H2C0.9 2.96155 0 3.86155 0 4.96155V16.9615C0 18.0615 0.9 18.9615 2 18.9615H18C19.1 18.9615 20 18.0615 20 16.9615V4.96155C20 3.86155 19.1 2.96155 18 2.96155ZM7.88 2.96155H12.12L13.95 4.96155H18V16.9615H2V4.96155H6.05L7.88 2.96155ZM7 9.96155H13V7.46155L16.5 10.9615L13 14.4615V11.9615H7V14.4615L3.5 10.9615L7 7.46155V9.96155Z" fill="#D6E8CE"/>
</svg>
                    </span>
              {{ $t("documents") }}
            </a>
          </li>
            <!--<li>-->
                <!--<a href="#">-->
                    <!--<span class="header-menu__icon">-->
                        <!--<svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">-->
<!--<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10.491L10.5882 0.961548L21.1765 10.491H18V18.9615H11.6471V12.6086H9.52941V18.9615H3.17647V10.491H0ZM15.8824 8.57443L10.5882 3.80972L5.29412 8.57443V16.8438H7.41177V10.4909H13.7647V16.8438H15.8824V8.57443Z" fill="white"/>-->
<!--</svg>-->
                    <!--</span>-->
                    <!--{{ $t("orders") }}-->
                <!--</a>-->
            <!--</li>-->
            <li>
                <a href="#">
                    <span class="header-menu__icon">
                        <svg width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.3333 2.76155H14.2222C15.2 2.76155 16 3.57155 16 4.56155V17.1615C16 18.1515 15.2 18.9615 14.2222 18.9615H1.77778C0.8 18.9615 0 18.1515 0 17.1615V4.56155C0 3.57155 0.8 2.76155 1.77778 2.76155H2.66667V0.961548H4.44444V2.76155H11.5556V0.961548H13.3333V2.76155ZM1.77779 17.1616H14.2222V8.16162H1.77779V17.1616ZM1.77779 6.36152V4.56152H14.2222V6.36152H1.77779ZM11.9911 10.4385L6.72001 15.7755L3.90224 12.9225L4.84446 11.9685L6.72001 13.8675L11.0489 9.4845L11.9911 10.4385Z" fill="#D6E8CE"/>
</svg>

                    </span>
                  {{ $t("planning") }}
                </a>
            </li>
            <li>
                <a href="#">
                    <span class="header-menu__icon">
                                                  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.84 2.18155C17.79 2.06155 17.73 1.95155 17.66 1.84155C17.52 1.63155 17.33 1.44155 17.12 1.30155C17.01 1.23155 16.9 1.17155 16.78 1.12155C16.54 1.02155 16.28 0.961548 16 0.961548H15H3H2C1.58 0.961548 1.2 1.09155 0.88 1.30155C0.67 1.44155 0.48 1.63155 0.34 1.84155C0.27 1.95155 0.21 2.06155 0.16 2.18155C0.06 2.42155 0 2.68155 0 2.96155V16.9615C0 18.0615 0.89 18.9615 2 18.9615H16C16.28 18.9615 16.54 18.9015 16.78 18.8015C16.9 18.7515 17.01 18.6915 17.12 18.6215C17.33 18.4815 17.52 18.2915 17.66 18.0815C17.87 17.7615 18 17.3715 18 16.9615V2.96155C18 2.68155 17.94 2.42155 17.84 2.18155ZM2 2.96155V16.9615H16V2.96155H2ZM9 10.8415C6.97 10.8415 3 11.9215 3 14.4215V15.9615H15V14.4315C15 11.9215 11.03 10.8415 9 10.8415ZM9 12.8415C7.69 12.8415 6 13.4015 5.31 13.9615H12.69C12.01 13.4015 10.31 12.8415 9 12.8415ZM9 9.96155C10.65 9.96155 12 8.61155 12 6.96155C12 5.31155 10.65 3.96155 9 3.96155C7.35 3.96155 6 5.31155 6 6.96155C6 8.61155 7.35 9.96155 9 9.96155ZM10 6.96155C10 6.41155 9.55 5.96155 9 5.96155C8.45 5.96155 8 6.41155 8 6.96155C8 7.51155 8.45 7.96155 9 7.96155C9.55 7.96155 10 7.51155 10 6.96155Z" fill="#D6E8CE"/>
</svg>
                    </span>
                  {{ $t("users") }}
                </a>
            </li>
        </ul>
      </div>
      <div class="header__options options">
        <div class="options__btn">
          <span class="options__icon"></span>
          Настройки
        </div>
        <div class="options__logout" @click="logout">
          <span class="options__logout-icon"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AppTop",
        props: ['leftMenuShow'],
        methods:{
          toggleLeftMenu(){
            this.$emit('clicked-to-logo', !this.leftMenuShow);
          },
          logout() {
            this.$store.dispatch('user/logout', {})
          },
        }
    }
</script>

<style scoped lang="scss">
    $ffamily: 'Roboto', sans-serif;
    .header{
        max-width: 1920px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        height: 45px;
        &__logo{
            width: 50px;
            height: 45px;
            margin-right: 11px;
            background: url("../assets/logo.svg")  0 -3px no-repeat;
            cursor: pointer;
        }
        &__menu{
            flex: 1 1 auto;
        }
        &__opyions{

        }
    }
    .header-menu{
        ul{
            display: flex;
            padding: 0;
            margin: 0;
            list-style: none;
            li{
                a{
                    font-family: $ffamily;
                    font-style: normal;
                    font-weight: normal;
                    font-size: 0;
                    line-height: 21px;
                    display: flex;
                    min-width: 0;
                    width: 45px;
                    height: 45px;
                    align-items: center;
                    text-align: center;
                    justify-content: center;
                    -webkit-box-sizing: border-box;
                    -moz-box-sizing: border-box;
                    box-sizing: border-box;
                    padding: 13px 7px;
                    margin-right: 1px;
                    text-decoration: none;
                    color: transparent;
                    background: #688E74;
                    transition: all 0.3s;
                    overflow: hidden;
                    &:hover, &.active{
                        background: #999;
                        width: auto;
                        min-width: 185px;
                        font-size: 18px;
                        color: #fff;
                        .header-menu__icon{
                            margin-right: 11px;
                        }
                    }
                }
            }
        }
        &__icon{
            width: 22px;
            height: 22px;
            margin-right: 0;
        }
    }
    .options{
        display: flex;
        &__btn{
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            background: #688E74;
            font-family: 'Roboto', sans-serif;
            font-style: normal;
            font-weight: normal;
            font-size: 18px;
            line-height: 21px;
            color: #D6E8CE;
            display: flex;
            align-items: center;
            padding: 13px 13px 13px 30px;
            cursor: pointer;
            -webkit-transition: all 0.3s;
            -moz-transition: all 0.3s;
            -ms-transition: all 0.3s;
            -o-transition: all 0.3s;
            transition: all 0.3s;
            &:hover{
                background: #999;
            }
        }
        &__icon{
            width: 20px;
            height: 20px;
            background: url("../assets/settings.svg") 0 0 no-repeat;
            margin-right: 12px;
        }
        &__logout-icon{
            width: 20px;
            height: 22px;
            background: url('../assets/logout.svg') 0 0 no-repeat;
        }
        &__logout{
            width: 42px;
            height: 45px;
            background: #688E74;
            margin-left: 1px;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            &:hover{
                background: #999;
            }
        }
    }

    @media screen and(max-width: 768px){
        .header-menu {
            ul {
                display: flex;
                padding: 0;
                margin: 0;
                list-style: none;

                li {
                    a {
                        font-size: 0 !important;
                        width: 45px !important;
                        height: 45px !important;
                        min-width: 0 !important;
                    }
                }
            }
            &__icon{
                margin: 0 !important;
            }
        }
        .header {
            overflow: scroll;
            &__logo {
                flex: 1 0 auto;
            }
        }
    }

    @media screen and(max-width: 640px) {
        .options{
            &__btn{
                font-size: 0;
                padding: 13px;
            }
            &__icon{
                margin: 0;
            }
        }
    }
</style>
