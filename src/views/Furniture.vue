<template>
    <div>
        <Table :titles="titles" :rows="rows" :groups="groups"/>
    </div>
</template>

<script>
/*eslint-disable */
import Table from '@/components/Table';
export default {
    name: "Furniture",
    components:{
        Table
    },
    data(){
        return{
            titles: ['Amalia 1', 'Кол-во', 'Ед. изм', 'Цена', 'Ссылка', 'Магазин', 'Сроки', 'Статус', 'Цена Итого'],
            rows: [
                {isParent: true, name: "General", id: 1, closed: false},
                {parentId: 1, parentName:"General", isParent: false, icon: "https://dynaimage.cdn.cnn.com/cnn/q_auto,h_600/https%3A%2F%2Fcdn.cnn.com%2Fcnnnext%2Fdam%2Fassets%2F191010165517-28-week-in-photos-1011.jpg", name:"Паркет1", count: 5, unit: "m", price: "14.41", link: "http://test.ru", shop: 'Merlin', term: '30 jours', status: 'Куплено клиентом', statusType: 1, price_sum: '21000,5 $'},
                {parentId: 1, parentName:"General", isParent: false, icon: "", name:"Паркет2", count: 5, unit: "m", price: "14.41", link: "http://test.ru", shop: 'Merlin', term: '30 jours', status: 'Куплено клиентом', statusType: 1, price_sum: '21000,5 $'},
                {parentId: 1, parentName:"General", isParent: false, icon: "", name:"Паркет3", count: 5, unit: "m", price: "14.41", link: "http://test.ru", shop: 'Merlin', term: '30 jours', status: 'Куплено клиентом', statusType: 2, price_sum: '21000,5 $'},
                {parentId: 1, parentName:"General", isParent: false, icon: "", name:"Паркет4", count: 5, unit: "m", price: "14.41", link: "http://test.ru", shop: 'Merlin', term: '30 jours', status: 'Куплено клиентом', statusType: 4, price_sum: '21000,5 $'},
                {isParent: true, name: "Salon", id: 2, closed: false},
                {parentId: 2, parentName:"Salon", isParent: false, icon: "", name:"Паркет4", count: 7, unit: "m", price: "14.41", link: "http://test.ru", shop: 'Merlin', term: '30 jours', status: 'Куплено клиентом', statusType: 3, price_sum: '21000,5 $'},
            ],
            groups:{
                "General1": false,
                "Salon2": false
            }
        }
    }
}
</script>

<style scoped lang="scss">

</style>
