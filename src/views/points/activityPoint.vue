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
  <div class="add-point-info">
      <Button @click="addActivitypointsModal = true" type="success" href="javascipt:;">新增</Button>
  </div>
  <!-- 增加活动积分 -->
  <div>
    <Modal v-model="addActivitypointsModal" title="新增活动积分" @on-ok="addOk" ok-text="增加">
      <Form :model="addActivitypoints" label-position="left" :label-width="100">
          <FormItem label="活动名称">
              <Input v-model="addActivitypoints.title"></Input>
          </FormItem>
          <FormItem label="活动描述">
              <Input v-model="addActivitypoints.content"></Input>
          </FormItem>
          <FormItem label="活动积分">
              <Input v-model="addActivitypoints.activitypoints"></Input>
          </FormItem>
          <FormItem label="活动时间设置">
            <DatePicker v-model="addActivitypoints.startdate" :value="addActivitypoints.startdate" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 200px"></DatePicker>
            <DatePicker v-model="addActivitypoints.enddate" :value="addActivitypoints.enddate" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="是否立即启动">
              <Checkbox v-model="addActivitypoints.activestatus">立即启动</Checkbox>
          </FormItem>
      </Form>
    </Modal>
  </div>
	<!--表格部分-->
	<Table :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :page.pageNum="1" @on-change="changePage"></Page>
        </div>
    </div>
    <!-- 修改活动积分  -->
    <div>
    <Modal v-model="putActivitypointsModal" title="修改活动积分" @on-ok="putOk" ok-text="修改">
      <Form :model="putActivitypoints" label-position="left" :label-width="100">
          <FormItem label="活动名称">
              <Input v-model="putActivitypoints.title"></Input>
          </FormItem>
          <FormItem label="活动描述">
              <Input v-model="putActivitypoints.content"></Input>
          </FormItem>
          <FormItem label="活动积分">
              <Input v-model="putActivitypoints.activitypoints"></Input>
          </FormItem>
          <FormItem label="活动时间设置">
            <DatePicker v-model="putActivitypoints.startdate" :value="putActivitypoints.startdate" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 200px"></DatePicker>
            <DatePicker v-model="putActivitypoints.enddate" :value="putActivitypoints.enddate" format="yyyy-MM-dd HH:mm" placeholder="开始时间" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="是否立即启动">
              <Checkbox v-model="putActivitypoints.activestatus">立即启动</Checkbox>
          </FormItem>
      </Form>
    </Modal>
  </div>
</div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
export default {
  name: "pointmanager",
  data() {
    return {
      addActivitypointsModal: false,
      putActivitypointsModal: false,
      addActivitypoints:{
        activatetime: "2018-06-16T17:07:45.882Z",
        activestatus: true,
        activitypoints: 0,
        content: "string",
        enddate: "2018-06-16T17:07:45.882Z",
        icatid: "NORMAL",
        pointsActivityid: 0,
        startdate: "2018-06-16T17:07:45.882Z",
        title: "string"
      },
      putActivitypoints:{
        activatetime: "2018-06-16T17:07:45.882Z",
        activestatus: true,
        activitypoints: 0,
        content: "string",
        enddate: "2018-06-16T17:07:45.882Z",
        icatid: "NORMAL",
        pointsActivityid: 0,
        startdate: "2018-06-16T17:07:45.882Z",
        title: "string"
      },
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
          key: "startdate",
          minWidth: 100,
          render: (h, params) => {
            return h('span', moment(params.row.startdate).format('YYYY-MM-DD HH:MM'));
          }
        },
        {
          title: "活动结束时间",
          key: "enddate",
          minWidth: 100,
          render: (h, params) => {
            return h('span', moment(params.row.enddate).format('YYYY-MM-DD HH:MM'));
          }
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
                      this.putActivitypointsModal = true;
                      let _this = this;
                      this.$get('/pointsActivity/' + params.row.pointsActivityid)
                        .then(res => {
                          res.data.startdate = moment(res.data.startdate).format('YYYY-MM-DD HH:MM')
                          res.data.enddate = moment(res.data.enddate).format('YYYY-MM-DD HH:MM')
                          _this.putActivitypoints = res.data
                          // console.log(_this.putActivitypoints.startdate)
                      });
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
                      let _this = this;
                      this.$get('/pointsActivity/' + params.row.pointsActivityid)
                        .then(res => {
                          _this.putActivitypoints = res.data
                          _this.putActivitypoints.activestatus =true
                          this.$put('/pointsActivity/' + params.row.pointsActivityid)
                            .then(res => {});
                          // console.log(_this.putActivitypoints)
                      });
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
                      let _this = this;
                      this.$del('/pointsActivity/' + params.row.pointsActivityid)
                        .then(res => {
                          _this.intiPointsActivity();
                        });
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
    addSubmits () {
      let _this = this;
      this.addActivitypoints.icatid = "NORMAL"
      this.$post('/pointsActivity', this.addActivitypoints)
        .then(res => {
          console.log(res);
          _this.intiPointsActivity()
        });
    },
    addOk () {
      this.addSubmits()
    },
    putSubmits () {
      let _this = this;
      this.putActivitypoints.icatid = "NORMAL"
      this.$put('/pointsActivity/', this.putActivitypoints)
        .then(res => {
          console.log(res);
          _this.intiPointsActivity()
        });
    },
    putOk () {
      this.putSubmits()
    },
    handleAdd() {
      //   this.$router.push("addpoint/1");
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