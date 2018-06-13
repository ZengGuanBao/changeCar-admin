<template>
    <div class="vehicle-manager">
        <!--<p class="welcome">欢迎使用</p>-->
        <div class="input-infor">
            <label for="">车辆品牌</label>
            <Input v-model="params.mode"   style="width: 200px" ref="inputValue">
            <label for="">车主姓名</label>
            <Input v-model="params.ownerUserName"   style="width: 200px" ref="inputValue">
            <br/><br/>

            <label for="">车牌号码</label>
             <Input v-model="params.carNo"   style="width: 200px" ref="inputValue">
            <Form>
                <FormItem label="状态">
                    <Select  style="width:200px" v-model="params.status">
				        <Option v-for="item in options" :value="item.value" :key="item.value">{{item.label}}</Option>
				    </Select>
                </FormItem>
            </Form>
            <Button type="primary"  @click="initToggleCar">查询</Button>
           <!-- <Button class="addinfo" type="primary" @click="handleAdd">添加信息</Button>-->
            
        </div>
        <!-- 带分布的表格 -->
        <Table :data="tableData1" :columns="tableColumns1" stripe>
        </Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
              <!-- :page.pageNum="1" -->
                <Page :total="100"  @on-change="changePage"></Page>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */

import moment from 'moment'
import Cookies from 'js-cookie'
export default {
  data () {
    return {
      timeDate: '',
      value: '',
      options: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'UPLOAD',
          label: '已上传未上架'

        },
        {
          value: 'PUTAWAY',
          label: '已上架未交到门店'
        },
        {
          value: 'SUBMIT_STORES',
          label: '已交到门店'
        },
        {
          value: 'USING',
          label: '置换使用中'
        },
        {
          value: 'OUT_OF_DANGER',
          label: '置换延期未归还车辆'
        },
        {
          value: 'DELAY_TO_RETURN',
          label: '置换结束出险车辆（维修中'
        },
        {
          value: 'WATI_REPLEVY',
          label: '置换结束（或修好）交回门店待车主取回'
        },
        {
          value: 'ALREADY_REPLEVY',
          label: '车主已取'
        },
        {
          value: 'SOLD_OUT',
          label: '下架'
        }
      ],
      formItem: {
        input: '',
        select: '',
        radio: 'male',
        checkbox: [],
        switch: true,
        date: '',
        time: '',
        slider: [20, 50],
        textarea: ''
      },
      page: {
        pageNum: 1,
        pageSize: 10
      },
      params: {
        carNo: '',
        status: '',
        storeId: '',
        ownerUserName: '',
        mode: ""
      },
      total: 0,
      current: 1,
      tableData1: [],

      tableColumns1: [
        {
          title: '序号',
          type: 'index1',
          width: 70,
          render: (h, params) => {
            return h('span', params.index + (this.page.pageNum - 1) * 10 + 1);
          }
        },
        {
          title: '品牌',
          key: 'mode',
          width: 100
        },
        {
          title: '车型',
          key: 'carType'
        },
        {
          title: '车牌号',
          key: 'carNo'
        },
        {
          title: '车主',
          key: 'chezhu'
        },
        {
          title: '所属门店',
          key: 'storeId'
        },
        {
          title: '价格',
          key: 'buyPrice'
        },
        {
          title: '当前状态',
          key: 'status'
        },
        {
          title: '总积分',
          key: 'totalPoints'
        },
        {
          title: '创建时间',
          key: 'createTime',
          width: 100,
          render: (h, params) => {
            //1523894400000
            return h('span', moment(new Date(params.row.createTime)).format('YYYY-MM-DD'));
          }

        },
        {
          title: '操作',
          type: 'index2',
          width: 200,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: 'checkpage/' + params.row.carId })
                  }
                },
              }, '查看'),
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.$router.push({ path: 'addinfor/' + params.row.carId })
                  }
                },
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small',
                },
                on: {
                  click: () => {
                    let _this = this;
                    this.$del('/toggleCar/' + params.row.carId)
                      .then(res => {
                        _this.initToggleCar();
                      });
                  }
                }
              }, '删除')

            ]);
          }
        },
      ]
    }
  },
  methods: {

    open (nodesc) {
      this.$Notice.open({
        title: '删除成功',
        desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
      });
    },

    formatDate (date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    handleAdd () {
      this.$router.push({ path: 'addinfor/0' })
    },
    initToggleCar () {
      let _this = this;
      this.params.
        this.$get('/toggleCar/' + this.page.pageNum + '/' + this.page.pageSize, this.params)
        .then(res => {
          _this.tableData1 = res.data.list;
          _this.total = res.data.total;
          //  console.log(_this.tableData1)

        });
    },
    changePage (index) {
      this.page.pageNum = index;
    }
  },
  created () {
    // 查询列表
    this.initToggleCar();
  },
  watch: {
    /**
     * 监控页码变化自动重新加载数据
     */
    page: {
      handler (val, oldVal) {
        this.initToggleCar();
      },
      deep: true
    }
  }
}
</script>
<style>
.vehicle-manager .welcome {
  padding-left: 20px;
}
.main .single-page-con .single-page {
  background: #fff;
}
.single-page {
  background: #fff;
}
.ivu-form {
  display: inline-block;
  width: 250px;
}

.ivu-select {
  width: 200px;
}
.addinfo {
  margin-left: 150px;
}
.input-infor {
  padding-left: 20px;
  padding-top: 20px;
}
</style>
