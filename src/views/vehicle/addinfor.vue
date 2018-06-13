<template>
<div class="add-infor">
	<div class="check-info">
            <table>
                <tr>
                    <td>品牌</td>
                    <td><Input style="width: 300px" v-model="params.mode">{{params.mode}}</input></td>
                </tr>
                <tr>
                    <td>车型</td>
                    <td><Input style="width: 300px" v-model="params.carType">{{params.carType}}</input></td>
                </tr>
                <tr>
                    <td>车牌号</td>
                    <td><Input style="width: 300px" v-model="params.carNo">{{params.carNo}}</input></td>
                </tr>
                <tr>
                    <td>车主</td>
                    <td><Input style="width: 300px" v-model="params.ownerUserId">{{params.ownerUserId}}</input></td>
                </tr>
                <tr>
                    <td>所属门店</td>
                    <td><Input style="width: 300px" v-model="params.storeId">{{params.storeId}}</input></td>
                </tr>
                <tr>
                    <td>价格</td>
                    <td><Input style="width: 300px" v-model="params.buyPrice">{{params.buyPrice}}</input></td>
                </tr>
                <!--<tr>
                    <td>车主电话</td>
                    <td><Input style="width: 300px" v-model="params.carNo"></td>
                </tr>-->
                <!--<tr>
                    <td>当前状态</td>
                    <td><Input style="width: 300px" v-model="params.carNo"></td>
                </tr>-->
                <tr>
                    <td>总积分</td>
                    <td><Input style="width: 300px" v-model="params.totalPoints">{{params.totalPoints}}</input></td>
                </tr>
                <!--<tr>
                    <td>创建时间</td>
                    <td><Input style="width: 300px" v-model="params.carNo"></td>
                </tr>-->
                <tr>
                    <td>公里数</td>
                    <td><Input style="width: 300px" v-model="params.carKm">{{params.carKm}}</input></td>
                </tr>
                <tr>
                    <td>日积分</td>
                    <td><Input style="width: 300px" v-model="params.carPoints">{{params.carPoints}}</input></td>
                </tr>
               <!-- <tr>
                    <td>所在城市</td>
                    <td><Input style="width: 300px" v-model="params.carNo"></td>
                </tr>-->
                <tr>
                    <td>车辆照片</td>
                    <td>
                    	   <div class="demo-upload-list" v-for="item in uploadList">
		        	<template v-if="item.status === 'finished'">
		            <img :src="item.url">
		            <div class="demo-upload-list-cover">
		                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
		                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
		            </div>
			        </template>
			        <template v-else>
			            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			        </template>
    				</div>
				    <Upload
				        ref="upload"
				        :headers=headersSuccess
				        :show-upload-list="false"
				        :default-file-list="defaultList"
				        :on-success="handleSuccess"
				        :format="['jpg','jpeg','png']"
				        :max-size="2048"
				        :on-format-error="handleFormatError"
				        :on-exceeded-size="handleMaxSize"
				        :before-upload="handleBeforeUpload"
				        multiple
				        type="drag"
				        action="api/file"
				        style="display: inline-block;width:58px;">
				        <div style="width: 58px;height:58px;line-height: 58px;">
				            <Icon type="camera" size="20"></Icon>
				        </div>
				    </Upload>
				    <Modal title="View Image" v-model="visible">
				        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
				    </Modal>
                    </td>
                </tr>
                <tr>
                    <td>总置换时间段：</td>
                    <td><Row>
                    	<Date-picker  placeholder="选择日期"  type="datetime" v-model="params.tradeStartDate"    format="yyyy-MM-dd"  @on-change="params.tradeStartDate=$event" >
                		</Date-picker> -
                		<Date-picker  placeholder="选择日期"  type="datetime" v-model="params.tradeEndDate"    format="yyyy-MM-dd"  @on-change="params.tradeEndDate=$event" >
                		</Date-picker> 
    			</Row></td>
                </tr>
                <!--<tr>
                    <td>创建时间</td>
                    <td></td>
                </tr>-->
                <tr>
                    <td>
                        <Button type="primary" @click="addToggleCar">保存</Button>
                    </td>
                    <td>
                        <Button @click="handleReturn">返回</Button>
                    </td>
                </tr>
            </table>
       </div>
</div>
</template>

<script>
/* eslint-disable */
import Cookies from 'js-cookie';
import moment from 'moment';
export default{
	data(){
            return {
            	carId:'',
            	params: {
				  "automobileDriving": "FOUR_WHEEL_DRIVE", 
				  "breakrulecreditfee": 0,
				  "buyPrice": 0,
				  "buyYear": "2",
				  "carBodyImage": "2",
				  "carBodyImage1": "2",
				  "carCabImage": "2",
				  "carEngine": "2",
				  "carHeaderImage": "2",
				  "carInsurance": 0,
				  "carKm": 0,
				  "carMethod": true,
				  "carNo": "",
				  "carPoints": 0,
				  "carSeatImage": "2",
				  "carSeetCount": "1",
				  "carTailImage": "2",
				  "carType": "2",
				  "carVin": "2",
				  "carYear": 0,
				  "carriage": "2",
				  "createTime": "2018-04-14T03:45:10.942Z",
				  "deposit": 0,
				  "drivingImg": "2",
				  "fileType": "2",
				  "isAutoCatch": "2",
				  "isCarInsure": "2",
				  "isDaoInsure": "2",
				  "isJiaoInsure": "2",
				  "isNoFreeInsure": "2",
				  "isPlace": true,
				  "isSeatInsure": "2",
				  "isSunInsure": "2",
				  "isThirdInsure": "2",
				  "mark": "2",
				  "mode": "2",
				  "oilType": "2",
				  "orderId": "2",
				  "outputVal": "2",
				  "overtimefee": 0,
				  "ownerUserId": 0,
				  "returnplaceCity": 0,
				  "returnplaceCountry": 0,
				  "returnplaceProv": 0,
				  "returnplaceVillage": 0,
				  "returnplaceid": 0,
				  "rowCrtTs": "2018-04-14T03:45:10.942Z",
				  "skylight": "2",
				  "status": "UPLOAD",
				  "storeId": 0,
				  "totalPoints": 0,
				  "totalTempPoints": 0,
				  "tradeEndDate": "",
				  "tradeStartDate": ""
					}, 
				open:false,
				defaultList: [
                   
                ],
				param:'',
 				imgName: '',
                visible: false,
                uploadList: []
            }
        },
	methods:{
		handleReturn(){
			this.$router.go(-1)
		},
		addToggleCar(){
                let _this = this;
               if(this.$route.params.id==0){
               	this.$post('/toggleCar/',this.params)
                    .then(res => {
                    	
                    	console.log(res.data); 
       
                    });
               }else{
               	this.$put('/toggleCar/'+this.carId,this.params)
                    .then(res => {
                    	
                    	console.log(res.data); 
       
                    });
               }
                
        },
        handleView (name) {
                this.imgName = name;
                this.visible = true;
            },
            handleRemove (file) {
                const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
            },
            handleSuccess (res, file) {
            	/*this.$get('/file/'+res.data)
                    .then(res => {
                     file.url = res.data;
                    });*/
               // file.url = 'http://193.112.160.227/api/file/'+res.data;
              file.url = 'https://oimageb5.ydstatic.com/image?id=-6565027383739873899&product=adpublish&w=640&h=480&sc=0&rm=2&gsb=0&gsbd=60';
                file.name = 'file';
            },
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 5;
                if (!check) {
                    this.$Notice.warning({
                        title: 'Up to five pictures can be uploaded.'
                    });
                }
                return check;
            },

	},
	mounted(){
		var toggleCar = {};
            var _this = this;
            if(this.$route.params.id==0){
            	
            }else{
            	this.$get('/toggleCar/' + _this.$route.params.id)
                .then(res => {
                    //console.log(res.data);
                    _this.params = res.data;
                    _this.params.tradeEndDate = moment(new Date(_this.params.tradeEndDate)).format('YYYY-MM-DD HH:mm:ss');
                      _this.params.tradeStartDate = moment(new Date(_this.params.tradeStartDate)).format('YYYY-MM-DD HH:mm:ss');
                    _this.carId = res.data.carId
                });
            }
            
	},
	computed:{
		
		headersSuccess(){
			let token = Cookies.get("token");
			let header={token,token}
			return header;
		},
	}
}
</script>

<style>
	.add-infor .check-info {
        float: left;
        width: 100%;
        height: 900px;
        background: #fff;
    }

   .add-infor .check-info table {
        width: 100%;
        border: 1px solid #e8e8e8;
        border-collapse: collapse;
        background: #fff;
    }

   .add-infor .check-info table tr td {
        height: 45px;
        border: 1px solid #e8e8e8;
    }

    .add-infor .check-info table tr td:first-child {
        width: 150px;
        text-align: right;
        padding-right:10px;
    }

    .add-infor .check-info table tr td:last-child {
        padding-left: 10px
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
     .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>