<template>
    <div class="order-check">
        <div class="check-info">
            <table>
                <tr>
                    <td>车主</td>
                    <td>刘阳</td>
                </tr>
                <tr>
                    <td>车主电话</td>
                    <td>18605928711</td>
                </tr>
                <tr>
                    <td>车牌</td>
                    <td>{{checkData.carNo}}</td>
                </tr>
                <tr>
                    <td>品牌型号</td>
                    <td>{{checkData.carType}}</td>
                </tr>
                <tr>
                    <td>座位数:</td>
                    <td>5</td>
                </tr>
                <tr>
                    <td>排量</td>
                    <td>{{checkData.outputVal}}</td>
                </tr>
                <tr>
                    <td>档型</td>
                    <td>自动挡</td>
                </tr>
                <tr>
                    <td>驱动</td>
                    <td>{{checkData.drive}}驱</td>
                </tr>
                <tr>
                    <td>价格</td>
                    <td>{{checkData.buyPrice}}万</td>
                </tr>
                <tr>
                    <td>车龄</td>
                    <td>{{checkData.carYear}}年</td>
                </tr>
                <tr>
                    <td>公里数</td>
                    <td>{{checkData.carKm}} 万里</td>
                </tr>
                <tr>
                    <td>日积分</td>
                    <td>{{checkData.carPoints}}</td>
                </tr>
                <tr>
                    <td>所在城市</td>
                    <td>福建省厦门市湖里区</td>
                </tr>
                <tr>
                    <td>车辆照片</td>
                    <td >
                    	<a :href="checkData.carHeaderImage" >车头</a>
                    	<a :href="checkData.carBodyImage">车身</a>
                    	<a :href="checkData.carTailImage">车尾</a>
                    	<a :href="checkData.drivingImg">驾驶室照片</a>
                    	<a href="">后排座照片</a>  	
                    	
                    </td>
                </tr>
                <tr>
                    <td>总置换时间段</td>
                    <td>2018-04-04 08:00:00.0 - 2018-04-09 08:00:00.0</td>
                </tr>
                <tr>
                    <td>创建时间</td>
                    <td>{{timeDate }}</td>
                </tr>
                <tr>
                    <td>
                        <Button @click="open(true)">审核</Button>
                    </td>
                    <td>
                        <Button @click="handleReturn">返回</Button>
                    </td>
                </tr>
            </table>
        </div>
        <div class="option-info">

            <RadioGroup v-model="disabledGroup">
                <Radio label="UPLOAD" value="UPLOAD" id="one">已上 传</Radio>
                <br/>
                <Radio label="PUTAWAY" value="PUTAWAY" id="two">已上传未交到门店</Radio>
                <br/>
                <Radio label="SUBMIT_STORES" value="">已交到门店</Radio>
                <br/>
                <Radio label="USING" value="">置换使用中</Radio>
                <br/>
                <Radio label="OUT_OF_DANGER" value="">置换延期未归还车辆</Radio>
                <br/>
                <Radio label="DELAY_TO_RETURN" value=" ">置换结束出险车辆（维修中）</Radio>
                <br/>
                <Radio label="WATI_REPLEVY" value="WATI_REPLEVY">置换结束(或修好)交回门店待车主取回</Radio>
                <br/>
                <Radio label="ALREADY_REPLEVY" vaule="ALREADY_REPLEVY">车主已取回</Radio>
                <br/>
                <Radio label="SOLD_OUT" value="SOLD_OUT"> 下架</Radio>
                <br/>
            </RadioGroup>
			
            <!--    <p>{{disabledGroup}}</p>-->
           
        </div>
    </div>
</template>
<script>
/* eslint-disable */
    import Vue from 'vue'
    //Vue.use(require('vue-moment'));
    import moment from 'moment'
    export default{
        name: 'ordercheck',
        data(){
            return {
                disabledSingle: true,
                disabledGroup: 'UPLOAD',
                checkData: {},
                timeDate: '',
                putData: {},
                carId: ''
            }
        },
        methods: {
            handleReturn(){
                this.$router.go(-1);
            },
            open (nodesc) {
                this.putData.status = this.disabledGroup;
                this.$put('/toggleCar/' + this.carId, this.putData)
                    .then(res => {
                        console.log(res);
                    });
            }
            
        },
        mounted(){
            var toggleCar = {};
            var _this = this;
            this.$get('/toggleCar/' + _this.$route.params.id)
                .then(res => {
                    //console.log(res.data);
                    _this.checkData = res.data;
                    
                    console.log(_this.checkData)
                    _this.timeDate = moment(new Date(_this.checkData.createTime)).format('YYYY-MM-DD HH:mm:ss')
                    //			  console.log(moment(new Date(_this.checkData.createTime)).format('YYYY-MM-DD HH:mm:ss')); 时间转货
                    _this.carId = _this.checkData.carId
                });
        },
    }
</script>
<style>


    .check-info {
        float: left;
        width: 60%;
        height: 900px;
        background: #fff;
    }

    .check-info table {
        width: 100%;
        border: 1px solid #e8e8e8;
        border-collapse: collapse;
        background: #fff;
    }

    .check-info table tr td {
        height: 45px;
        border: 1px solid #e8e8e8;
        
    }

    .check-info table tr td:first-child {
        width: 150px;
        text-align: right;
        padding-right:20px; 
    }

    .check-info table tr td:last-child {
        padding-left: 20px
    }

    .option-info {
        float: left;
        width: 40%;
        height: 900px;
        padding-left: 20px;
        background: #fff;
    }

    .option-info .ivu-btn {
        padding: 6px 25px;
    }

    .ivu-radio-wrapper {
        height: 45px;
        line-height: 45px;
    }
    
    
</style>