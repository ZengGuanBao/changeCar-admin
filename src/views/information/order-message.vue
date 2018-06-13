<template>
<div class="order-message">
	<div class="order-manage-btn">
		<label for="">订单号：</label>
		<Input style="width: 150px" v-model="params.orderId"></Input>
<!-- 		<label for="">车牌：</label>
		<Input style="width: 150px" v-model="params.carId"></Input>
		<label for="">车主:</label>
		<Input style="width: 150px"  v-model="params.ownerUserId"></Input> -->
		
		 <Form :model="formItem" :label-width="150">
	        <FormItem label="全部">
	            <Select  style="width:100px; height:25px;" v-model="params.orderSt">
			        <Option style="line-height:25px;" v-for="item in options" :value="item.value" :key="item.value">{{item.label}}</Option>
			    </Select>
	        </FormItem>        
		</Form>
		<Button type="primary" small @click="initToggleCarOrder">查询</Button>
	</div>
	
	<!--表格部分-->
	<Table :data="tableData1" :columns="tableColumns1" stripe id="table1"></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="total" :page.pageNum="1" @on-change="changePage"></Page>
        </div>
    </div>
    <Modal v-model="modal1" title="订单详情" @on-ok="ok" @on-cancel="cancel">
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="订单号">
                <Input readonly v-model="formLeft.orderId"></Input>
            </FormItem>
            <FormItem label="车牌号">
                <Input readonly v-model="formLeft.carId"></Input>
            </FormItem>
            <FormItem label="车主">
                <Input readonly v-model="formLeft.ownerUserId"></Input>
            </FormItem>
            <FormItem label="时间">
                <Input readonly v-model="formLeft.beginDt"></Input>
            </FormItem>
        </Form>
    </Modal>
    

</div>
</template>
<script>
/* eslint-disable */
import moment from 'moment'
export default {
  data () {
    return {
      "data": {
        "alipayNo": "string",
        "beginDt": "2018-04-19T07:48:36.583Z",
        "canceltype": "NORMAL",
        "carId": 0,
        "endDt": "2018-04-19T07:48:36.583Z",
        "getplaceid": "string",
        "insurance": 0,
        "isPlace": true,
        "isPriceReturn": true,
        "needMoney": 0,
        "orderId": "string",
        "orderSt": "NON_PAYMENT",
        "ovnerUserResume": "string",
        "ownerUserId": 0,
        "payDate": "2018-04-19T07:48:36.583Z",
        "payGmt": "string",
        "payType": "string",
        "points": 0,
        "price": 0,
        "price1": 0,
        "returnplaceAddr": "string",
        "returnplaceCity": "string",
        "returnplaceCountry": "string",
        "returnplaceProv": "string",
        "returnplaceVillage": "string",
        "returnplaceid": "string",
        "rowCrtTs": "2018-04-19T07:48:36.583Z",
        "status": "DONE",
        "target": "RENT",
        "thirdOrderid": "string",
        "toggleMark": "string",
        "toggleUserId": 0,
        "totalMoney": 0,
        "transactionId": "string",
        "userPoints": 0
      },
      orderId: '',
      modal1: false,
      formLeft: {
        orderId: '',
        carId: '',
        ownerUserId: '',
        beginDt: ''
      },
      options: [
        {
          value: '',
          label: '全部'
        },
        //                  {
        //                      value: 'UPLOAD',
        //                      label: '未支付'
        //
        //                  },
        {
          value: 'PAYMENT_SUCCESS',
          label: '已支付成功'
        },
        {
          value: 'CANCEL',
          label: '取消'
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
      total: '',
      params: {
        //orderId:'',  //订单号
        orderSt: '', //状态
        ownerUserId: '', //车主
        orderId: '',//订单号
        carId: ''//车牌号
      },
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
          title: '订单号',
          key: 'orderId',
          width: 250,
          ellipsis: true,
          render: (h, params) => {
            return h('div', [
              h('span', {                on: {
                  click: () => {
                    this.modal1 = true
                    this.getOrder(params.row.extra)
                  }
                }              }, params.row.extra),
              h('Tooltip', {
                props: {
                  placement: 'left',
                  content: params.row.extra,
                }
              }),
            ]);
          }
        },
        {
          title: '消息内容',
          key: 'msgContent'
        },
        //               {
        //                   title: '车牌号',
        //                   key: 'carId'
        //               },
        //               {
        //                   title: '车主',
        //                   key: 'ownerUserId',
        // width:70
        //               },
        //               {
        //               	title:'车主电话',
        //               	key:'phone'
        //               },
        //               {
        //               	title:'置换人',
        //               	key:'toggleUserId',
        //                 	width:80
        //               },
        //               {
        //               	title:'置换人电话',
        //               	key:'replacePersonPhone',
        //                 	width:100
        //               },
        //               {
        //               	title:'押金',
        //               	key:'price',
        //                 	width:70
        //               },
        //               {
        //               	title:'保险',
        //               	key:'insurance'
        //               },
        //               {
        //               	title:'状态',
        //               	key:'orderSt',
        //                 	width:100
        //               },
        //               {
        //               	title:'支付账号',
        //                 	width:100,
        //               	key:'payAccounts'
        //               },

        {
          title: '时间',
          key: 'beginDt',
          width: 100,
          render: (h, params) => {
            return h('span', moment(new Date(params.row.sendTime)).format('YYYY-MM-DD'));
          }

        },
        {
          title: '消息接收人',
          key: 'ownerUserId',
        },
        {
          title: '消息类型',
          key: 'msgType',
        }
        // {
        // 	title:'操作',
        //   width:120,
        // 	render:(h,params)=>{
        // 		return h('div', [
        //                             h('Button', {
        //                                props: {
        //                                    type: 'primary',
        //                                    size: 'small',
        //                                },
        //                                style: {

        //                                },
        //                                on: {
        //                                    click: () => {
        //                                        this.$router.push({path: 'ordercash/' + params.row.orderId})
        //                                    }
        //                                },
        //                            }, '修改'),
        //                        ])
        // 	}
        // }
      ]
    }
  },
  methods: {

    formatDate (date) {
      const y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? '0' + m : m;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      return y + '-' + m + '-' + d;
    },
    changePage (index) {
      this.page.pageNum = index;
    },
    initToggleCarOrder () {
      let _this = this;
      this.$get('/malMessage/' + this.page.pageNum + '/' + this.page.pageSize + '?receiveUserId=0')
        .then(res => {
          // console.log(res.data.total)
          this.total = res.data.total
          _this.tableData1 = res.data.list;
        });
    },
    getOrder (id) {
      // console.log(id)
      let _this = this;
      this.$get('/toggleCarOrder/' + id)
        .then(res => {
          this.formLeft.orderId = res.data.orderId
          this.formLeft.carId = res.data.carId
          this.formLeft.ownerUserId = res.data.ownerUserId
          this.formLeft.beginDt = moment(new Date(res.data.beginDt)).format('YYYY-MM-DD')
        });
    },
    ok () {
      // this.$Message.info('Clicked ok');
    },
    cancel () {
      // this.$Message.info('Clicked cancel');
    }
  },
  created () {
    this.initToggleCarOrder()
  },
  watch: {
    /**
     * 监控页码变化自动重新加载数据
     */
    page: {
      handler (val, oldVal) {
        this.initToggleCarOrder();
      },
      deep: true
    }
  }
}
</script>
<style>
.order-manage-btn {
  padding: 20px;
  padding-bottom: 0;
}
.single-page {
  background: #fff;
}
.ivu-input {
  height: 25px;
}
.ivu-select {
  width: 100px;
}
.order-message .ivu-form {
  width: 300px;
  display: inline-block;
}
.ivu-select-single .ivu-select-selection {
  height: 25px;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder,
.ivu-select-single .ivu-select-selection .ivu-select-selected-value {
  height: 25px;
  line-height: 25px;
}
.ivu-form-item-content {
  line-height: 25px;
  margin-top: 8px;
}
.ivu-select {
  margin-top: 6px;
}
.ivu-form .ivu-form-item-label {
  margin-top: 10px;
}
.ivu-table-overflowX {
  overflow-x: hidden;
}
/*#table1 tr td:nth-child(2){*/
/*white-space: nowrap;*/
/*word-break: inherit;*/
/*overflow: hidden;*/
/*text-overflow: ellipsis;*/
/*}*/
/*#table1 tr td span {*/
/*word-break: keep-all;*/
/*}*/
</style>