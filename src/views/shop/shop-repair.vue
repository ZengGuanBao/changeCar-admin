<template>
	<div class="shop-repair">
			<table>
				<tr>
					<td><span style="color:red">*</span>名称：</td>
					<td>
						<Input v-model="params.storeNm" style="width: 300px" ></Input>
					</td>
				</tr>
				<tr>
					<td>电话：</td>
					<td>
						<Input v-model="params.storePhone" style="width: 300px"></Input>
					</td>
				</tr>
				<tr>
					<td>城市：</td>
					<td>
						<Row  :gutter="10">
				            <Col span="9">
				                <Card>
				                    <al-selector v-model="params.administrativeAddress" level="2" data-type="code" @on-change="cityChange"/>
				                </Card>
				            </Col>
				        </Row>
					</td>
				</tr>
				<tr>
					<td>地址：</td>
					<td>
						<Input v-model="params.storeAddr"  style="width: 300px"></Input>
					</td>
				</tr>
				<tr>
					<td>链接：</td>
					<td>
						<Input v-model="params.link"  style="width: 300px"></Input>
					</td>
				</tr>
        <tr>
					<td>图片：</td>
					<td>
            <Upload :before-upload="handleUpload" action="/api/file">
                <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                <div v-if="file !== null">上传文件名: {{ params.storeImages = file.name }}</div>
            </Upload>
					</td>
				</tr>
				<tr>
					<td>营业时间：</td>
					<td>
						<TimePicker :value="params.beginhour1" format="HH点mm分" placeholder="Select time" style="width: 168px" :disabled='true'></TimePicker>
						<TimePicker :value="params.endhour1" format="HH点mm分" placeholder="Select time" style="width: 168px" :disabled='true'></TimePicker>
					</td>
				</tr>
				<tr>
					<td>经纬度：</td>
					<td>
						<Input v-model="params.x"  style="width: 100px"></Input>
						<Input v-model="params.y"  style="width: 100px"></Input>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<label>关键词：<input v-model="keyword"></label>
						<baidu-map :center="center" :zoom="zoom" @ready="handler" class="map" @click="clickMap">
							<bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
							<bm-local-search :keyword="keyword" :auto-viewport="true" :location="location" :selectFirstResult="true" :panel="false"></bm-local-search>
						</baidu-map>
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<Button type="primary" @click="addToggleCarStore">提交</Button>
						<Button @click="handleReturn">返回</Button>    
					</td>
				</tr>
			</table>
	</div>
</template>

<script>
/* eslint-disable */
import alSelector from '../my-components/area-linkage/components/al-selector.vue';
import alCascader from '../my-components/area-linkage/components/al-cascader.vue';
export default {
  components: {
    alSelector,
    alCascader
  },
  name: 'shop-repair',
  data () {
    return {
      file: null,
      storeId: '',
      params: {
        rowCrtTs: 1516615557000,
        storeAddr: "",
        storeCity:"142",
        storeComCd:"",
        storeCountry:"1806",
        storeId:1215,
        storeImages:null,
        storeNm: '',
        storePhone: "",
        storeProv:"8",
        storePwd:"96e79218965eb72c92a549dd5a330112",
        storeSt:"1",
        link: '',
        beginhour1: '',
        endhour1: '',
        x: '',
        y: '',
        administrativeAddress: ["110000", "110100", "110101"]
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      location: '北京',
      keyword: '北京',
    }

  },
  methods: {
    cityChange (data) {
      this.resetDate = data;
    },
    handleUpload (file) {
      this.file = file;
      return false;
    },
    clickMap (data) {
      this.params.x = data.point.lng
      this.params.y = data.point.lat
    },
    handler ({ BMap, map }) {
      console.log(BMap, map)
      this.center.lng = 116.404
      this.center.lat = 39.915
      this.zoom = 15
    },
    handleReturn () {
      this.$router.go(-1);
    },
    addToggleCarStore () {
      this.params.administrativeAddress = this.params.administrativeAddress[2];
      if (!this.$route.params.id == 0) {
        this.$post('/toggleCarStore/', this.params)
          .then(res => {
            if (res.success) {
              this.$router.go(-1);
            }
          });
      } else {
        this.$put('/toggleCarStore/' + this.storeId, this.params)
          .then(res => {
            if (res.success) {
              this.$router.go(-1);
            }
          });
      }
    }
  },
  mounted () {
    var _this = this;
    if (this.$route.params.id != 0) {
      this.$get('/toggleCarStore/' + _this.$route.params.id)
        .then(res => {
          _this.storeId = _this.$route.params.id;
          _this.params = res.data;
          _this.params.beginhour1 = getdate(res.data.beginhour);
          _this.params.endhour1 = getdate(res.data.endhour);
          _this.keyword = res.data.storeNm;
          if (res.data.administrativeAddress) {
            var city = new Array();
            city[0] = res.data.administrativeAddress.substring(0, 2) + "0000";
            city[1] = res.data.administrativeAddress.substring(0, 4) + "00";
            city[2] = res.data.administrativeAddress;
            _this.params.administrativeAddress = city;
          } else {
            _this.params.administrativeAddress = ["110000", "110100", "110101"];
          }
        });
    }
    function getdate (value) {
      var now = new Date(value);
      return now.toTimeString().substr(0, 8);
    }
  }
}
</script>

<style>
.main .single-page-con {
  background: #fff;
}
table {
  width: 100%;
  border: 1px solid #e8e8e8;
  border-collapse: collapse;
}
table td {
  height: 45px;
  border: 1px solid #e8e8e8;
}
table td:nth-of-type(1) {
  width: 10%;
  text-align: right;
  padding-right: 10px;
}
table td:nth-of-type(2) {
  width: 90%;
  padding-left: 10px;
}
.ivu-card-body {
  padding: 0;
} 
/*设置城市选择的样式*/
.map {
  width: 400px;
  height: 300px;
}
</style>