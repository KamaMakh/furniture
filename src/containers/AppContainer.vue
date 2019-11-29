<template>
    <div style="height: 100%">
        <div class="container-wrap">
            <div class="container-wrap__navigation">
                <AppTop :leftMenuShow="leftMenuShow" @clicked-to-logo="leftMenuToggle"/>
            </div>
            <div class="container-wrap__content content">
                <div class="content__left-menu" :style="{marginLeft: leftMenuShow ? '0' : '-100%'}">
                    <AppLeft/>
                </div>
                <div class="content__body">
                    <router-view />
                </div>
            </div>
        </div>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic" rel="stylesheet">
    </div>
</template>

<script>
/*eslint-disable */
    import AppTop from '@/components/AppTop';
    import AppLeft from '@/components/AppLeft';
    export default {
        name: "AppContainer",
        components: {
            AppTop,
            AppLeft
        },
        data(){
            return{
                leftMenuShow: true
            }
        },
        methods:{
            leftMenuToggle(data){
                this.leftMenuShow = data
                console.log(this.leftMenuShow);
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
        }
        &__body{
            display: flex;
            max-width: 100%;
            flex: 1 1 auto;
            padding: 50px 60px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
        }
    }
</style>
