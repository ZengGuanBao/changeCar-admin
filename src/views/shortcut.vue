<template>
	<div class="shortcut">
		<p>快捷操作</p>
		<div class="shortcut-con">
			<a  @click="handleAdd" href="javascript:;">新增门店</a>
			<a href="javascript:;">查询车辆</a>
			
		</div>
	</div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'shortcut',
  methods: {
    handleAdd () {
      this.$router.push('/shortcut/addshop')
    }
  }
}
</script>

<style>
.main .single-page-con {
  background: #fff;
}
.shortcut {
  padding: 10px;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #e8e8e8;
}
.shortcut p {
  padding: 10px 0;
}
.shortcut-con a {
  padding: 10px 0;
  margin-right: 10px;
}
</style>