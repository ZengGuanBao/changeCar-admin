<template>
<div class="point-manager">
	<div class="point-manage-btn">
		<label for="">活动名称：</label>
		<Input style="width: 200px" v-model="params.plMembername"></Input>
		<label for="">电话号：</label>
		<Input style="width: 200px" v-model="params.plMembername"></Input>
        <label for="">类型：</label>
        <Select clearable style="width:200px">
            <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
        </Select>
		<!-- <Button type="primary" @click="pointsLog">查询</Button> -->
	</div>
	<!--表格部分-->
	<Table :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :page.pageNum="1" @on-change="changePage"></Page>
        </div>
    </div>
    <!-- 修改用户积分操作  -->
</div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
export default {
  name: "pointmanager",
  data() {
    return {
      putMalAdModal: false,
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: 1,
      params: {
        plMembername: ""
      },
      tableData1: [],
      tableColumns1: [
        {
          title: "序号",
          type: "index1",
          render: (h, params) => {
            return h("span", params.index + (this.page.pageNum - 1) * 10 + 1);
          }
        },
        {
          title: "活动积分ID",
          key: "pointsActivityid",
          minWidth: 100
        },
        {
          title: "活动名称",
          key: "title"
        },
        {
          title: "活动描述",
          key: "content"
        },
        {
          title: "活动积分",
          key: "activitypoints"
        },
        {
          title: "活动开始时间",
          key: "startdate"
        },
        {
          title: "活动结束时间",
          key: "enddate"
        },
        {
          title: "操作",
          key: "plStage",
          minWidth: 190,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ path: "addpoint/" + params.row.iid });
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ path: "addpoint/" + params.row.iid });
                    }
                  }
                },
                "启动"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                    //   this.$router.push({ path: "addpoint/" + params.row.iid });
                    }
                  }
                },
                "停用"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    handleAdd() {
    //   this.$router.push("addpoint/1");
    },
    formatDate(date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    changePage(index) {
      this.page.pageNum = index;
      this.intiPointsActivity();
    },
    intiPointsActivity() {
      let _this = this;
      this.$get(
        "/pointsActivity/" + this.page.pageNum + "/" + this.page.pageSize,
        this.params
      ).then(res => {
        _this.tableData1 = res.data.list;
        _this.total = res.data.total;
        console.log(_this.tableData1);
      });
    }
  },
  created() {
    this.intiPointsActivity();
  },
  watch: {
    /**
     * 监控页码变化自动重新加载数据
     */
    page: {
      handler(val, oldVal) {
        this.intiPointsActivity();
      },
      deep: true
    }
  }
};
</script>

<style>
.point-manage-btn {
  padding: 27px 20px 27px 20px;
}
.add-point-info {
  padding: 20px;
}
.single-page {
  background: #fff;
}
.ivu-table-overflowX {
  overflow-x: hidden;
}
</style>