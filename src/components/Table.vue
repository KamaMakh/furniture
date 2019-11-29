<template>
    <div>
        <table class="table">
            <thead>
            <tr>
                <td v-for="(item,key) in titles" :key="key">
                    {{ item }}
                </td>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, key) in rows" :key="key" :class="{odd: key%2 === 0 || key === 0, hidden: groups && !item.isParent && groups[item.parentName+item.parentId]}">
                <td v-if="item.isParent">
                        <span class="icon" style="cursor: pointer" @click="toggleRows(item.name+item.id)">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0H2C0.89 0 0 0.9 0 2V16C0 17.1 0.89 18 2 18H16C17.1 18 18 17.1 18 16V2C18 0.9 17.1 0 16 0ZM16 16H2V2.00001H16V16ZM10 14H8V10H4V8.00001H8V4.00001H10V8.00001H14V10H10V14Z" fill="#C4C4C4"/>
                        </svg>
                        </span>

                    {{item.name}}
                </td>
                <td v-else-if="item.icon !== ''">
                        <span class="icon">
                            <img :src="item.icon" alt="">
                        </span>
                    {{item.name}}
                </td>
                <td v-else>
                    <div class="no-img icon"></div>
                    {{item.name}}
                </td>

                <td>{{item.count}}</td>
                <td>{{item.unit}}</td>
                <td>{{item.price}}</td>
                <td>{{item.link}}</td>
                <td>{{item.shop}}</td>
                <td>{{item.term}}</td>
                <td :style="{color: item.statusType == 1 ? '#FF4081' : item.statusType == 2 ? '#154E85' : item.statusType == 3 ? '#9B51E0' : '#00670A'}">
                    {{item.status}}
                </td>
                <td>{{item.price_sum}}</td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/*eslint-disable */
    export default {
        name: "Table",
        props: ['titles', 'rows', 'groups'],
        methods:{
            toggleRows(item){
                console.log(item);
                this.groups[item] = !this.groups[item];
                // item.closed = !item.closed
            }
        }
    }
</script>

<style scoped lang="scss">
    $ffamily: 'Roboto', sans-serif;
    .hidden{
        display: none;
    }
    .table{
        border-collapse: collapse;
        border: 1px solid #C4C4C4;
        img{
            max-width: 100%;
        }
        tr{
            border-bottom: 1px solid #DADADA;
            background: #fff;
            font-family: $ffamily;
            color: #868686;
            font-size: 14px;
            &.odd{
                background: #F5F5F6;
            }
            td:nth-child(1){
                border: none;
                display: flex;
                align-items: center;
            }
        }
        td,th{
            border-right: 1px solid #DADADA;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            padding: 9px;
        }
        tbody{
            tr{
                td:last-child{
                    font-weight: 500;
                }
            }
        }
        .icon{
            margin-right: 14px;
            width: 41px;
            height: 29px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .no-img{
            background: #C4C4C4;
        }
    }
</style>
