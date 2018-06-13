<template>
<div>
	<template v-if="beforeClick">
		<div class="point-manage-btn">
			<label for="">门店ID：</label>
			<Input v-model="params.storeId" style="width: 200px"   ></Input>
			<label for="">门店名称：</label>
			<Input v-model="params.storeNm" style="width: 200px"   ></Input>
			<label for="">门店电话：</label>
			<Input v-model="params.storePhone" style="width: 200px"   ></Input>
			<br/>
			<br/>
			<label for="">地区：</label>
				<Col span="9">
					<Card>
						<al-selector  data-type="name" level="2"/>
					</Card>
				</Col>
			<Button type="primary" @click="initToggleCarStore" >查询</Button>
		</div>
		<div class="add-point-info">
			<Button type="success" @click="handleAdd" href="javascipt:;">新增</Button>
		</div>
		<!--表格部分-->
		<Table :data="tableData1" :columns="tableColumns1" stripe></Table>
	    <div style="margin: 10px;overflow: hidden">
	        <div style="float: right;">
	            <Page :total="100" :page.pageNum="1" @on-change="changePage"></Page>
	        </div>
	    </div>
	</template>	 
	 
    <template v-else>
    	<div>
			<table>
				<tr>
					<td><span style="color:red">*</span>名称：</td>
					<td>
						<Input style="width: 300px " v-model="params.storeNm"></Input>
						<!--  -->
					</td>
				</tr>
				<tr>
					<td>电话：</td>
					<td>
						<Input style="width: 300px" v-model="params.storePhone"></Input>
						<!-- v-model="params.storePhone"-->
					</td>
				</tr>
				<tr>
					<td>城市：</td>
					<td>
						<Row  :gutter="10">
				            <Col span="9">
				                <Card>
				                    <al-selector v-model="res1" data-type="name" level="3"/>
				                </Card>
				            </Col>
				        </Row>
					</td>
				</tr>
				<tr>
					<td>地址：</td>
					<td>
						<Input  style="width: 300px" v-model="params.storeAddr"></Input>
						<!--v-model="params.storeAddr" -->
					</td>
				</tr>
				<!--<tr>
					<td>创建时间：</td>
					<td>
						<Input  style="width: 300px"></Input>
					</td>
				</tr>-->
				<tr>
					<td></td>
					<td>
						<Button type="primary" @click="addToggleCarStore">提交</Button>
						<Button @click="afterClick">返回</Button>    
					</td>
				</tr>
			</table>	    
		    
		 
		</div>
    </template>
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
  data () {
    return {
      params: {
        rowCrtTs: 1516615557000,
        storeAddr: "",
        storeCity: "",
        storeComCd:"",
        storeCountry:"",
        storeId:"",
        storeImages:null,
        storeNm: "",
        storePhone:"",
        storeProv:"",
        storePwd:"",
        storeSt:""
      },
      res1: [],
      resDefault: ['河北省', '张家口市', '怀来县', '沙城镇'],
      showRes: [],
      value: '',
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

      beforeClick: true,
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
      //tableData1: this.mockTableData1(),
      tableData1: [],
      tableColumns1: [
        {
          //                      title: '#',
          //                      key: 'name'
          title: '序号',
          type: 'index1',
          width: 70,
          render: (h, params) => {
            return h('span', params.index + (this.page.pageNum - 1) * 10 + 1);
          }
        },
        {
          title: '登陆ID',
          key: 'storeId',
          width: 100
        },

        {
          title: '名称',
          key: 'storeNm'

        },
        {
          title: '地址',
          key: 'storeAddr'
        },
        {
          title: '电话',
          key: 'storePhone'
        },
        //                  {
        //                      title: '创建时间',
        //                      //key: ''
        //                      
        //                  },

        {
          title: '操作',
          width: 150,
          render: (h, params) => {
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
                    //this.beforeClick=false; 
                    this.$router.push({ path: 'shop-repair/' + params.row.storeId })

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
                    this.$del('/toggleCarStore/' + params.row.storeId)
                      .then(res => {
                        _this.initToggleCarStore();
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
    handleAdd () {
      this.$router.push('shop-repair/0')
      this.beforeClick = false;
    },
    afterClick () {
      this.beforeClick = true;

      this.initToggleCarStore();
    },
    addToggleCarStore () {

      let _this = this;

      this.$post('/toggleCarStore/', this.params)
        .then(res => {
          _this.beforeClick = true;
          _this.params.storeId = '';
          _this.params.storeNm = '';
          _this.params.storePhone = '';
          _this.initToggleCarStore()
        })


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
    initToggleCarStore () {
      let _this = this;

      this.$get('/toggleCarStore/' + this.page.pageNum + '/' + this.page.pageSize, this.params)
        .then(res => {
          window.console.log(res);
          _this.tableData1 = res.data.list;
          _this.total = res.data.total;
          console.log(_this.tableData1)
        });
    }
  },
  created () {
    this.beforeClick = true;;
    this.initToggleCarStore()
  },
  watch: {
    /**
     * 监控页码变化自动重新加载数据
     */
    page: {
      handler (val, oldVal) {
        this.initToggleCarStore();
      },
      deep: true
    }
  }
}
</script>

<style>
.point-manage-btn {
  padding: 10px;
  border-bottom: 1px solid #e8e8e8;
}
.add-point-info {
  padding: 20px;
}
.single-page {
  background: #fff;
}

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
} /*设置城市选择的样式*/
.ivu-table-overflowX {
  overflow-x: hidden;
}
</style>