<template>
<div class="user-manager">
	<div class="user-manage-btn">
		<label for="">帐号：</label>
		<Input style="width: 150px" v-model="params.iid">	</input>
		<label for="">手机：</label>
		<Input style="width: 150px" v-model="params.smobile"></input>
		<Button type="primary" @click="initUser">查询</Button>
	</div>
	<div class="add-user-info">
		<Button type="success" @click="handleAdd" href="javascipt:;">新增</Button>
	</div>
	<!--表格部分-->
	<Table :data="tableData1" :columns="tableColumns1" stripe></Table>
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

    import moment from 'moment';
export default{
	name:'usermanager',
	data () {
            return {
            	 params: {
            	 	iid:'',
					icatid:"MERCHANT",
					
					ilogincount:2,			
					
					semail:"qq@qq.com",
					sfullname:"系统管理员",
					
					
					spassword:"******",
					
					ssex:"GIRL",
					smobile:'',
					susername:"admin"
   				},
            	options:[
            		{
                        value: '',
                        label: '全部'
                    },
                    {
                        value: 'UPLOAD',
                        label: '未支付'

                    },
                    {
                        value: 'PUTAWAY',
                        label: '已支付成功'
                    },
                    {
                        value: 'SUBMIT_STORES',
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
                tableData1:[],
                //tableData1: this.mockTableData1(),
                 tableColumns1: [
                    {
						title: '序号',
                        type: 'index1',
                      	width:70,
                        render: (h, params) => {
                            return h('span', params.index + (this.page.pageNum - 1) * 10 + 1);
                        }
                    },
                    {
                        title: '帐号',
                        key: 'iid',
						width:100
                    },
                        
                    {
                        title: '用户名',
                        key: 'susername'
                        
                    },
                    {
                        title: '手机',
                        key: 'smobile'                        
                    },
                    {
                    	title:'身份证',
                    	key:'sidnum',
                      	width:170,
                    },
                    {
                    	title:'积分',
                    	key:'points'
                    },
                    {
                    	title:'消费总额',
                    	key:'sallmoney'
                    	
                    },
                    {
                    	title:'创建时间',
                    	key:'scrtime',
//                  	render: (h, params) => {
//                         // return h('div', this.formatDate(this.tableData1[params.index].update));
//                      }
						render: (h, params) => {
						                       
                            return h('span', moment(new Date(params.row.scrtime)).format('YYYY-MM-DD'));
                        }
                    },
                    
					{
						title:'操作',
                        width:190,
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
                                            this.$router.push({path: 'user-check/' + params.row.iid})
                                        }
                                    },
                                }, '审核'),
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
                                            this.$router.push({path: 'user-repair/' + params.row.iid})
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
                                          this.$del('/user/' + params.row.iid)
                                              .then(res =>{
                                                  _this.initUser();
                                              });
                                        }
                                    }
                                }, '删除')
                            ])
						}
					}
				]
            }
        },
         methods: {
         	handleAdd(){
         		this.$router.push('user-add')
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

				this.page.pageNum = index;
            },
            initUser(){
                let _this = this;
                
                this.$get('/user/' + this.page.pageNum + '/' + this.page.pageSize,this.params)
                    .then(res => {
                    	
                    	_this.tableData1 = res.data; 
                    	//_this.params=res.data;
                    	
                    	_this.total = res.data.total;
                        window.console.log(res)
                    });
            }
        },
        created(){
        	this.initUser()
        },
        watch: {
            /**
             * 监控页码变化自动重新加载数据
             */
            page: {
                handler(val, oldVal){
                    this.initUser();
                },
                deep: true
            }
        }
}
</script>

<style>
	.user-manage-btn{padding:27px 20px 27px 20px;border-bottom:1px solid #e8e8e8;  }
	.add-user-info{padding:20px; }
	.single-page{background:#fff; }
	.ivu-table-overflowX{overflow-x:hidden;  }
</style>