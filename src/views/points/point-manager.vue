<template>
<div class="point-manager">
	<div class="point-manage-btn">
		<label for="">用户名：</label>
		<Input style="width: 200px" v-model="params.plMembername"></Input>
		<label for="">电话号：</label>
		<Input style="width: 200px" v-model="params.plMembername"></Input>
		<Button type="primary" @click="pointsLog">查询</Button>
	</div>
	<!--<div class="add-point-info">-->
		<!--<a @click="handleAdd" href="javascipt:;">新增用户积分</a>-->
	<!--</div>-->
	<!--表格部分-->
	<Table :data="tableData1" :columns="tableColumns1" stripe></Table>
    <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
            <Page :total="100" :page.pageNum="1" @on-change="changePage"></Page>
        </div>
    </div>
    
</div>
</template>

<script>
    /* eslint-disable */
	import moment from 'moment';
export default {
	name:'pointmanager',
	data () {
            return {
//          	"data": {
//  "carMethod": true,
//  "isUse": true,
//  "itemId": 0,
//  "mainTableName": "string",
//  "orderCode": "string",
//  "plAddtime": "2018-04-19T00:59:35.670Z",
//  "plAdminid": 0,
//  "plAdminname": "string",
//  "plDesc": "string",
//  "plGoodsId": 0,
//  "plId": 0,
//  "plMemberIdFrom": 0,
//  "plMemberid": 0,
//  "plMembername": "string",
//  "plOrderId": 0,
//  "plPoints": 0,
//  "plStage": "string",
//  "pointMethod": true
//},
//"msg": "string",
//"operateTime": "string",
//"success": true,
//          	options:[
//          		{
//                      value: '',
//                      label: '全部'
//                  },
//                  {
//                      value: 'UPLOAD',
//                      label: '未支付'
//
//                  },
//                  {
//                      value: 'PUTAWAY',
//                      label: '已支付成功'
//                  },
//                  {
//                      value: 'SUBMIT_STORES',
//                      label: '取消'
//                  }
//          	],
            		 
            	
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
                    plMembername: ''                
                },
                tableData1:[],
                //tableData1: this.mockTableData1(),
                 tableColumns1: [
                    {
//                      title: '#',
//                      key: 'name'
						title: '序号',
                        type: 'index1',
                        width:70,
                        render: (h, params) => {
                            return h('span', params.index + (this.page.pageNum - 1) * 10 + 1);
                        }
                    },
                    {
                        title: '账号',
                        key: 'plMembername',
                      	width:90,
                    },
                        
                    {
                        title: '姓名',
                        key: 'plPoints'
                        
                    },
                    {
                        title: '电话',
                        key: 'plAddtime',
//                      render: (h, params) => {
//                          //return h('div', this.formatDate(this.tableData1[params.index].update));
//                      }
//1522430779000    
						render: (h, params) => {
						                       
                            return h('span', moment(new Date(params.row.plAddtime)).format('YYYY-MM-DD'));
                        }
                    },
                    {
                    	title:'总积分',
                    	key:'plDesc'
//                  	render: (h, params) => {
//                          return h('div',  params.row.descipt );
//                      }
                    },
                   {
                     title:'换车积分(可提现)',
                     key:'plDesc',
//                  	render: (h, params) => {
//                          return h('div',  params.row.descipt );
//                      }
					 width:150
                   },
                   {
                     title:'充值积分',
                     key:'plDesc'
//                  	render: (h, params) => {
//                          return h('div',  params.row.descipt );
//                      }
                   },
                   {
                     title:'提现积分',
                     key:'plDesc'
//                  	render: (h, params) => {
//                          return h('div',  params.row.descipt );
//                      }
                   },
                   {
                     title:'活动积分',
                     key:'plDesc'
//                  	render: (h, params) => {
//                          return h('div',  params.row.descipt );
//                      }
                   },
                    
					{
						 title:'操作',
						 key:'plStage',
                         minWidth:190,
                         render:(h,params)=>{
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
                                             this.$router.push({path: 'addpoint/' + params.row.iid})
                                         }
                                     },
                                 }, '查看')
                             ])
                         }
					}
				]
            }
        },
         methods: {
         	handleAdd(){
         		this.$router.push('addpoint/1')
         	},
            formatDate (date) {
                const y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? '0' + m : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                return y + '-' + m + '-' + d;
            },
            changePage (index) {
                // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
//              this.tableData1 = this.mockTableData1();
				this.page.pageNum = index;
            },
            pointsLog(){
                let _this = this;
                
                this.$get('/pointsLog/' + this.page.pageNum + '/' + this.page.pageSize,this.params)
                    .then(res => {                    
                    	_this.tableData1 = res.data.list; 
                        _this.total = res.data.total;
                        console.log(_this.tableData1 )
                    });
            }
        },
        created(){
        	this.pointsLog()
        },
        watch: {
            /**
             * 监控页码变化自动重新加载数据
             */
            page: {
                handler(val, oldVal){
                    this.pointsLog();
                },
                deep: true
            }
        }
}
</script>

<style>
	.point-manage-btn{padding:27px 20px 27px 20px; }
	.add-point-info{ padding:20px; }
	.single-page{background:#fff; }
	.ivu-table-overflowX{overflow-x:hidden;  }
</style>