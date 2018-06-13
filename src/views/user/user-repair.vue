<template>
	<div class="user-repair">
			<table>
				<tr>
					<td><span style="color:red">*</span>帐号：</td>
					<td >
						{{params.iid}}
					</td>
				</tr>
				<tr>
					<td>姓名：</td>
					<td>{{params.susername}}</td>
				</tr>
				
				<tr>
					<td>电话：</td>
					<td>
						<Input  style="width: 300px" v-model="params.smobile"></input>
					</td>
				</tr>
				<tr>
					<td>紧急联系人：</td>
					<td></td>
				</tr>
				<tr>
					<td>身份证：</td>
					<td>
						<Input v-model="params.sidnum"  style="width: 300px"></input>
					</td>
				</tr>
				<tr>
					<td>积分：</td>
					<td>
						<Input v-model="params.points"  style="width: 300px"></input>
					</td>
				</tr>
				<tr>
					<td>余额：</td>
					<td></td>
				</tr>
				<tr>
					<td>地址：</td>
					<td></td>
				</tr>
				<tr>
					<td>创建时间：</td>
					<td>
						
					</td>
				</tr>
				<tr>
					<td></td>
					<td>
						<Button type="primary" @click="addUser">提交</Button>
						<Button @click="handleReturn">返回</Button>    
					</td>
				</tr>
			</table>	    
		 
		</div>
</template>

<script>
/* eslint-disable */

export default {
  name: 'userrepair',
  data () {
    return {
      iid: '',
      params: {

        iid: '',
        icatid: "MERCHANT",
        smobile: '',
        ilogincount: 2,
        sidnum: '',
        semail: "qq@qq.com",
        sfullname: "系统管理员",
        points: '',

        spassword: "******",

        ssex: "GIRL",

        susername: ""
      }
    }
  },
  methods: {
    handleReturn () {
      this.$router.go(-1)
    },
    addUser () {
      let _this = this;
      if (this.$route.params.id == 0) {
        this.$post('/user/', this.params)
          .then(res => {

            console.log(res.data);

          });
      } else {
        this.$put('/user/' + this.iid, this.params)
          .then(res => {

            console.log(res.data);

          });
      }
    }
  },
  mounted () {
    //var toggleCar = {};
    var _this = this;
    this.$get('/user/' + _this.$route.params.id)
      .then(res => {
        //console.log(res.data);
        _this.params = res.data;
        _this.iid = res.data.iid
      });
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
</style>