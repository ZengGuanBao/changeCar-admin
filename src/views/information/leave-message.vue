<template>
    <div class="leave-manager">
        <div class="ads-manage-btn">

        </div>
        <div class="add-ads-info">
            <a @click="handleAdd" href="javascipt:;">新增</a>
        </div>
        <div class="add-list">
          <Upload
              action="/api/file"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-error="handleError"
          >
              <span>请选择文件&nbsp;&nbsp;</span>
              <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
          </Upload>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import moment from "moment";
export default {
  name: "adsmanager",
  data() {
    return {
      page: {
        pageNum: 1,
        pageSize: 10
      }
    };
  },
  methods: {
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc: "文件 " + file.name + " 格式不正确，请选择图片文件。"
      });
    },
    handleSuccess(evnet, file) {
      this.$Notice.success({
        title: "文件上传成功",
        desc: "文件 " + file.name + " 上传成功。"
      });
    },
    handleError(event, file) {
      this.$Notice.error({
        title: "文件上传失败",
        desc: "文件 " + file.name + " 上传失败。"
      });
    },
    handleRemove(file) {
      // 从 upload 实例删除数据
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
    },
    handleAdd() {
      //this.$router.push('/shortcut')
    },
    initMalSysMessageStore() {
      let _this = this;
      this.$get("/file/" + "cd199346-3fff-47d9-a67d-db607382765c.jpeg").then(
        res => {
          // _this.srcImg = res;
          // console.log(res);
        }
      );
    }
  },
  created() {
    this.initMalSysMessageStore();
  }
};
</script>
<style>
.ads-manage-btn {
  padding: 20px;
  padding-bottom: 0;
}
.add-ads-info {
  padding: 20px;
}
.add-list {
  width: 100%;
  padding-top: 10%;
  padding-left: 40%;
}
</style>