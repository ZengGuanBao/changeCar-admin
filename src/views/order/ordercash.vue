<template>
	<div class="order-cash">
		<table>
                <tr>
                    <td>订单号</td>
                    <td v-model="params.orderId">{{params.orderId}}</td>
                </tr>
                <tr>
                    <td>积分</td>
                    <td v-model="params.points">{{params.points}}</td>
                </tr>
                <tr>
                    <td>押金</td>
                    <td v-model="params.price">{{params.price}}</td>
                </tr>
                <tr>
                    <td>押金是否退还</td>
                    <td>
                    	<Form  :label-width="80">
					        <FormItem >
					            <Select  style="width:100px"  v-model="params.paramsReturn">
							        <Option v-for="item in options" :value="item.value" :key="item.value">{{item.label}}
							        </Option>
							    </Select>
					        </FormItem>        
						</Form>
                    </td>
                </tr>
                <!--<tr>
                    <td>创建时间</td>
                    <td>{{updataTime}}</td>
                </tr>-->
                <tr>
                    <td>
                        
                    </td>
                    <td>
                    	<Button type="primary" @click="open(true)" >提交</Button>
                        <Button @click="handleReturn">返回</Button>
                    </td>
                </tr>
           </table>
	</div>
</template>

<script>
/* eslint-disable */
	export default{
		
		name:'ordercash',
		data(){
			return {
				params:{
					orderId:'',
					is_price_return:''  //押金是否退还(0未退还1已退还)
					//isPriceReturn:''
					
				},
				paramsReturn:{
					is_price_return:''  //押金是否退还(0未退还1已退还)
					//isPriceReturn:''
					
				},
				disabledSingle: true,
                disabledGroup: '1',
               //is_price_return   押金是否退还(0未退还1已退还)
                timeDate: '',
                putData: {},
                orderId: '',
                Time:'',
                //value:'',
				options:[
		
		            {
		                value: '1',
		                label: '已退还'
		            },
		            {
		                value: '0',
		                label: '未退还'
		            }
				],
			}
		},
		
		methods:{
			handleReturn(){
				this.$router.go(-1)
			},
			open (nodesc) {
				var _this = this;
//              this.putData.is_price_return = ;
                this.$put('/toggleCarOrder/' + _this.$route.params.id, this.paramsReturn)
                    .then(res => {
                        console.log(res);
                    });
            }
		},
		created(){
			//var toggleCar = {};
            var _this = this;
            
            this.$get('/toggleCarOrder/' + _this.$route.params.id)
                .then(res => {
                    //console.log(res.data);
                    _this.params= res.data;                    
                    console.log(res)

                });
		},
		computed:{
			updataTime(){
				this.Time=new Date();
				
				return this.Time.getFullYear()+'-'+(this.Time.getMonth()+1)+'-'+this.Time.getDate();
				
			}
		}
	}
</script>

<style>
	
.main .single-page-con{background:#fff; }
    table {
        width: 100%;
        border: 1px solid #e8e8e8;
        border-collapse: collapse;
        background: #fff;
    }

    table tr td {
        height: 45px;
        border: 1px solid #e8e8e8;
    }

     table tr td:first-child {
        width: 150px;
        text-align: right;
        padding-right:10px;
    }
	table tr td:last-child { padding-left:10px; }
   .ivu-form-item{margin-bottom:15px;}
   .ivu-select-selection{ margin-top:5px; }
   .ivu-form-item-content{margin-left:0!important; }
</style>