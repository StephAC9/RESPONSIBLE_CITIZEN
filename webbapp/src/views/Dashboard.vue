<template>
    <div class="dashbaord-container">
        <div class="items">
            <DataItem style="margin-bottom:20px" v-for="(num, index) in numbers" :key="index"></DataItem>
        </div>
    </div>
</template>
<script>
import DataItem from '../components/items/DataItem'
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
  },
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