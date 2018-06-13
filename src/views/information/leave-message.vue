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
import moment from "moment";
export default {
  name: "adsmanager",
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleAdd() {
      //this.$router.push('/shortcut')
    },
    initMalSysMessageStore() {
      let _this = this;
      this.$get(
        "/userCenter/web/" + this.page.pageNum + "/" + this.page.pageSize
      ).then(res => {
        console.log(res);
        _this.tableData1 = res.data.list;
        _this.total = res.data.total;
        console.log(_this.tableData1);
      });
    }
  },
  created() {
    this.initMalSysMessageStore();
  }
};
</script>
<style>
.ads-manage-btn {
  padding: 20px;
  padding-bottom: 0;
}
.add-ads-info {
  padding: 20px;
}
.add-list {
  width: 100%;
  padding-top: 10%;
  padding-left: 40%;
}
</style>