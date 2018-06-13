<template>
<div class="order-message">
	<div class="order-manage-btn">
        <Form :model="formLeft" label-position="left" :label-width="100">
            <FormItem label="订单号">
                <Input readonly v-model="formLeft.input1"></input>
            </FormItem>
            <FormItem label="车牌号">
                <Input readonly v-model="formLeft.input2"></input>
            </FormItem>
            <FormItem label="车主">
                <Input readonly v-model="formLeft.input3"></input>
            </FormItem>
            <FormItem label="时间">
                <Input readonly v-model="formLeft.input4"></input>
            </FormItem>
            <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">修改</Button>
        </FormItem>
        </Form>
	</div>
	

</div>
</template>
<script>
/* eslint-disable */
	import moment from 'moment'
export default {
	
	data () {
            return {
                formLeft: {
                    input1: '2018060812462047052114185188',
                    input2: '1045',
                    input3: '6180',
                    input4: '2018-06-08'
                },
            		 
                page: {
                    pageNum: 1,
                    pageSize: 10
                },
                
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
            initToggleCarOrder(){
                let _this = this;
                
                this.$get('/toggleCarOrder/' + this.page.pageNum + '/' + this.page.pageSize,this.params)
                    .then(res => {
                      console.log(res.data.list);
                    	_this.tableData1 = res.data.list;
                    });
            },
            ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
        },
        created(){
        	this.initToggleCarOrder()
        },
         watch: {
            /**
             * 监控页码变化自动重新加载数据
             */
            page: {
                handler(val, oldVal){
                    this.initToggleCarOrder();
                },
                deep: true
            }
        }
}
</script>
<style>
	.order-manage-btn{padding:20px; padding-bottom:0;  }
	.single-page{background:#fff; }
	.ivu-input{ height:25px;}
	.ivu-select{width:100px; }
	.order-message .ivu-form{ width:300px; display:inline-block; }
	.ivu-select-single .ivu-select-selection{ height:25px; }
	.ivu-select-single .ivu-select-selection .ivu-select-placeholder, .ivu-select-single .ivu-select-selection .ivu-select-selected-value{ height:25px; line-height:25px; }
	.ivu-form-item-content{line-height:25px; margin-top:8px; }
	.ivu-select {margin-top:6px; }
	.ivu-form .ivu-form-item-label{margin-top:10px; }
	.ivu-table-overflowX{ overflow-x:hidden; }
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