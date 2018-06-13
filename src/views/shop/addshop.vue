<template>
<div>
	<table :data="tableData">
		<tr>
			<td><span style="color:red">*</span>名称：</td>
			<td>
				<Input v-model="value"style="width: 300px "></Input>
			</td>
		</tr>
		<tr>
			<td>电话：</td>
			<td>
				<Input v-model="value" style="width: 300px"></Input>
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
				<Input v-model="value"  style="width: 300px"></Input>
			</td>
		</tr>
		<tr>
			<td>创建时间：</td>
			<td>
				<Input v-model="value" style="width: 300px"></Input>
			</td>
		</tr>

		<tr>
			<td>链接：</td>
			<td>
				<Input v-model="link"  style="width: 300px"></Input>
			</td>
		</tr>
		<tr>
			<td>营业时间：</td>
			<td>
				<Input v-model="beginhour"  style="width: 300px"></Input><Input v-model="endhour"  style="width: 300px"></Input>
			</td>
		</tr>
		<tr>
			<td></td>
			<td>
				<Button type="primary">提交</Button>
				<Button>返回</Button>    
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
  data () {
    return {
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
        textarea: '',
        beginhour: '',
        endhour: '',
        link: ''
      }
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
} /*设置城市选择的样式*/
</style>