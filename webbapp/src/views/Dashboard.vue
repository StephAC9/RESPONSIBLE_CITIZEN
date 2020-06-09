<template>
    <div class="dashbaord-container">
        <div class="items" v-for="(item, index) in data" :key="index">
            <DataItem  :item="item"></DataItem>
            <!-- <DataItem  style="margin-bottom:20px" v-for="(num, index) in numbers" :key="index"></DataItem> -->
        </div>
    </div>
</template>
<script>
import DataItem from '../components/items/DataItem'
import {mapGetters} from 'vuex'
export default {
    name:'Dashboard',
    components:{
        DataItem
    },
    data(){
        return{
            numbers:[1,2,3,4,5,6]
        }
    },
    computed:{
        ...mapGetters(['data','dataItem'])
    },
    beforeCreate(){
       // this.$store.dispatch('fetchData',{dataItem:this.dataItem})
    },

    watch:{
        data(v){
            if(v !== null || v !== undefined){
                console.log(this.data)
            }
        }
    }
}
</script>
<style  scoped>
.items{
    padding: 15px;
    margin: 0 auto;
    max-width: 600px;
    min-width: 300px;
}
</style>