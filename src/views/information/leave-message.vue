<template>
    <div class="leave-manager">
        <div class="ads-manage-btn">

        </div>
        <div class="add-ads-info">
            <a @click="handleAdd" href="javascipt:;">新增</a>
        </div>
        <div class="add-list">
          <Upload
              action="/api/api/file"
              :before-upload = "handleBeforeUpload"
              :format="['jpg','jpeg','png']"
              :on-format-error="handleFormatError"
              :on-success="handleSuccess"
              :on-error="handleError"
              :with-credentials="true"
              :data="taken"
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
  data() {
    return {
      upFile: "",
      page: {
        pageNum: 1,
        pageSize: 10
      },
      taken:{token:"Bearer%20eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzdWJqZWN0IiwiYXVkIjoiYWRtaW4iLCJtZW51Q29kZSI6WzBdLCJpc3MiOiJjZ2hzaXIiLCJleHAiOjE1Mjk1NDQzNTcxODgsInVzZXJEZXRhaWxzIjoie1wiYWNjb3VudE5vbkV4cGlyZWRcIjp0cnVlLFwiYWNjb3VudE5vbkxvY2tlZFwiOnRydWUsXCJhZG1pblwiOnRydWUsXCJhdXRob3JpdGllc1wiOlt7XCJhdXRob3JpdHlcIjpcIi8qKiYwXCIsXCJtZXRob2RcIjpcIkFMTFwiLFwidXJsXCI6XCIvKipcIn1dLFwiYml6VXNlcklkXCI6NjMwOSxcImNyZWF0ZVRpbWVcIjoxNTI5Mzc1MTkwMDAwLFwiY3JlYXRlVXNlclwiOlwi57O757uf5rWL6K-VXCIsXCJjcmVkZW50aWFsc05vbkV4cGlyZWRcIjp0cnVlLFwiZW1haWxcIjpcInFxQHFxLmNvbVwiLFwiZW5hYmxlZFwiOnRydWUsXCJpZFwiOlwiZWE0Y2E0NGJiZjUyNGFmZGJhYjJjNWZiZTU5M2RhMzFcIixcIm1hbFVzZXJcIjp7XCJpY2F0aWRcIjpcIk1FUkNIQU5UXCIsXCJpaWRcIjo2MzA5LFwiaWxvZ2luY291bnRcIjo3LFwic2VtYWlsXCI6XCJxcUBxcS5jb21cIixcInNmdWxsbmFtZVwiOlwi57O757uf566h55CG5ZGYXCIsXCJzbGFzdGxvZ2luXCI6MTUyOTQ1Nzk1Njk2OSxcInNwYXNzd29yZFwiOlwiKioqKioqKioqXCIsXCJzc2V4XCI6XCLlpbNcIixcInN1c2VybmFtZVwiOlwiYWRtaW5cIixcInVzZXJUeXBlXCI6XCJFTlRFUlBSSVNFXCJ9LFwibWVudUNvZGVcIjpbMF0sXCJuaWNrTmFtZVwiOlwi57O757uf566h55CG5ZGYXCIsXCJwYXNzd29yZFwiOlwiJDJhJDEwJHVCaTYuQlhRSklrSnp0UlUyMDJMM3VldEg3NGM4YVdxWmp0NkNrT3hGaWxvbThFaUZHYVdtXCIsXCJzZXhcIjpcIuWls1wiLFwidXBkYXRlVGltZVwiOjE1MjkzNzUxOTAwMDAsXCJ1c2VZblwiOnRydWUsXCJ1c2VyTmFtZVwiOlwiYWRtaW5cIixcInVzZXJuYW1lXCI6XCJhZG1pblwifSIsImlhdCI6MTUyOTQ1Nzk1NzE4OCwiYXV0aG9yaXRpZXMiOiJbe1wiYXV0aG9yaXR5XCI6XCIvKiomMFwiLFwibWV0aG9kXCI6XCJBTExcIixcInVybFwiOlwiLyoqXCJ9XSIsImp0aSI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIn0.tx8TKCze_9QTQYaDgnreS7BzpQSg3Kw3V3mrTPHTFJM"}
    };
  },
  methods: {
    handleBeforeUpload () {
      // this.uploadUrl = ''
    },
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
      // this.$get("/file/" + "cd199346-3fff-47d9-a67d-db607382765c.jpeg").then(
      //   res => {
      //     // _this.srcImg = res;
      //     // console.log(res);
      //   }
      // );
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