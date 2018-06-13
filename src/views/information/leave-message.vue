<template>
    <div class="leave-manager">
        <div class="ads-manage-btn">

        </div>
        <div class="add-ads-info">
            <a @click="handleAdd" href="javascipt:;">新增</a>
        </div>
        <div class="add-list">
            <h1>建设中....</h1>
        </div>
    </div>
</template>
<script>
  /* eslint-disable */
  import moment from 'moment';
  export default {
    name: 'adsmanager',
    data () {
      return {};
    },
    methods: {
        handleAdd()
        {
          //this.$router.push('/shortcut')
        }
      }
  }
</script>
<style>
    .ads-manage-btn{padding:20px; padding-bottom:0;  }
    .add-ads-info{padding:20px; }
    .add-list {
        width: 100%;
        padding-top: 10%;
        padding-left: 40%;
    }
</style>