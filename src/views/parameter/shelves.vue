<template>
<div class="order-message">
    <div class="order-manage-btn">
        <Form ref="formLeft" :model="formLeft" label-position="left" :rules="ruleValidate" :label-width="100">
            <FormItem label="交接方式" prop="input1">
                <Input v-model="formLeft.input1"></Input>
            </FormItem>
            <FormItem label="异地换车" prop="input2">
                <Input v-model="formLeft.input2"></Input>
            </FormItem>
            <FormItem label="违章押金" prop="input3">
                <Input v-model="formLeft.input3"></Input>
            </FormItem>
            <FormItem label="接送服务" prop="input4">
                <Input v-model="formLeft.input4"></Input>
            </FormItem>
            <FormItem label="租期要求" prop="input5">
                <Input v-model="formLeft.input5"></Input>
            </FormItem>
            <FormItem label="提前预定" prop="input6">
                <Input v-model="formLeft.input6"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formLeft')">修改</Button>
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
                    input1: '6',
                    input2: '6',
                    input3: '1',
                    input4: '3',
                    input5: '机油',
                    input6: '有',
                },
                     
                page: {
                    pageNum: 1,
                    pageSize: 10
                },
                ruleValidate: {
                    input1: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input2: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input3: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input4: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input5: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    input6: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ]
                }
                
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
                        this.$Message.success('修改成功!');
                    } else {
                        this.$Message.error('修改失败!');
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