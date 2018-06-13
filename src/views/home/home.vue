<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <img src="./home_page.jpg"/>
    </div>
</template>
<!--import Vue from 'vue'
import Cookies from 'js-cookie';-->
<script>
  /* eslint-disable */

  // import cityData from './map-data/get-city-value.js';
// import homeMap from './components/map.vue';
// import dataSourcePie from './components/dataSourcePie.vue';
// import visiteVolume from './components/visiteVolume.vue';
// import serviceRequests from './components/serviceRequests.vue';
// import userFlow from './components/userFlow.vue';
// import countUp from './components/countUp.vue';
// import inforCard from './components/inforCard.vue';
// import mapDataTable from './components/mapDataTable.vue';
// import toDoListItem from './components/toDoListItem.vue';

export default {
    name: 'home',
    // components: {
    //     homeMap,
    //     dataSourcePie,
    //     visiteVolume,
    //     serviceRequests,
    //     userFlow,
    //     countUp,
    //     inforCard,
    //     mapDataTable,
    //     toDoListItem

    computed: {
        
    },
    methods: {
       
       
    },
    mounted(){
//      if( Cookies.get('user')==null){
//      	this.$router.push('/login')
//      }
    }
};
</script>
<style>
    .home-main {
        margin-top: 100px;
        margin-left: 260px;
    }
    .main .single-page-con{
        background: white;
    }
    
</style>
