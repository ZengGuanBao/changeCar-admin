<template>
<div>
	<table>
		<tr>
			<td><span style="color:red">*</span>用户名：</td>
			<td>
				<Input v-model="value"style="width: 300px "></Input>
			</td>
		</tr>
		<tr>
			<td>积分：</td>
			<td>
				<Input v-model="value" style="width: 300px"></Input>
			</td>
		</tr>
		
		
		<!--<tr>
			<td>创建时间：</td>
			<td>
				<Input v-model="value" style="width: 300px"></Input>
			</td>
		</tr>-->
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

    export default {

        data () {
            return {
            	

            }
        }
    }
</script>
<style>
	.main .single-page-con{ background:#fff}
	table{ width:100%;  border:1px solid #e8e8e8; border-collapse:collapse; }
	table td{ height:45px;  border:1px solid #e8e8e8; }
	table td:nth-of-type(1){ width:10%; text-align:right; padding-right:10px; }
	table td:nth-of-type(2){width:90%; padding-left:10px;}

</style>