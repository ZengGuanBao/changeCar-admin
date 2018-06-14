<template>
    <div class="ads-manager">
        <div class="ads-manage-btn">

        </div>
        <div class="add-ads-info">
            <Button @click="addMalAdModal = true" type="success" href="javascipt:;">新增</Button>
        </div>
        <div>
          <Modal v-model="addMalAdModal" title="新增广告" @on-ok="addOk" ok-text="添加">
            <Form :model="addMalAd" label-position="left" :label-width="100">
                <FormItem label="广告类型">
                  <RadioGroup v-model="addMalAd.adType">
                      <Radio label="首页轮播广告"></Radio>
                      <Radio label="其他"></Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="广告标题">
                    <Input v-model="addMalAd.title"></Input>
                </FormItem>
                <FormItem label="广告内容">
                    <Input v-model="addMalAd.content"></Input>
                </FormItem>
                <FormItem label="广告图片">
                    <Upload action="/api/file"  :format="['jpg','jpeg','png']"  :on-format-error="handleFormatError"  :on-success="handleSuccess"  :on-error="handleError">
                        <span>请选择文件&nbsp;&nbsp;</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="是否隐藏">
                    <Checkbox v-model="addMalAd.status">隐藏</Checkbox>
                </FormItem>
            </Form>
          </Modal>
        </div>
        <div class="add-list">
            <Table :data="tableData1" :columns="tableColumns1" stripe></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page.pageNum="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div>
          <Modal v-model="putMalAdModal" title="修改广告" @on-ok="putOk" >
            <Form :model="putMalAd" label-position="left" :label-width="100">
                <FormItem label="广告类型">
                  <RadioGroup v-model="putMalAd.adType">
                      <Radio label="首页轮播广告"></Radio>
                      <Radio label="其他"></Radio>
                  </RadioGroup>
                </FormItem>
                <FormItem label="广告标题">
                    <Input v-model="putMalAd.title"></Input>
                </FormItem>
                <FormItem label="广告内容">
                    <Input v-model="putMalAd.content"></Input>
                </FormItem>
                <FormItem label="图片">
                    <Upload action="/api/file"  :format="['jpg','jpeg','png']"  :on-format-error="handleFormatError"  :on-success="handleSuccess"  :on-error="handleError">
                        <span>请选择文件&nbsp;&nbsp;</span>
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
                    </Upload>
                </FormItem>
                <FormItem label="是否隐藏">
                    <Checkbox v-model="putMalAd.status">隐藏</Checkbox>
                </FormItem>
            </Form>
          </Modal>
        </div>
    </div>
</template>
<script>
/* eslint-disable */
import moment from 'moment';
export default {
  name: 'adsmanager',
  data () {
    return {
      file: null,
      addMalAdModal: false,
      putMalAdModal: false,
      addMalAd: {
        adId:0,
        adType:"",
        adTypeStr: "",
        content:"",
        icatid:"NORMAL",
        sn:0,
        status: false,
        sysDate: new Date(),
        sysImage:"cd199346-3ff-47d9-a67d-db607382765c.jpeg",
        title:"",
        urlLink: "http://193.112.160.227/api/file/"
      },
      putMalAd: {
        adId:4,
        adType:"广告",
        adTypeStr:"广告",
        content:"string",
        icatid:"NORMAL",
        sn:0,
        status: false,
        sysDate:1528812280000,
        sysImage:"cd199346-3fff-47d9-a67d-db607382765c.jpeg",
        title:"第二广告",
        urlLink: "#"
      },
      page: {
        pageNum: 1,
        pageSize: 10
      },
      total: 11,
      tableData1: [],
      tableColumns1: [
        {
          title: '序号',
          type: 'index1',
          width: 70,
          render: (h, params) => {
            return h('span', params.index + (this.page.pageNum - 1) * 10 + 1);
          }
        },
        {
          title: '广告ID',
          key: 'adId'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '图片',
          key: 'sysImage'
        },
        {
          title: '是否显示',
          key: 'status'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '时间',
          key: 'sysDate',
          width: 100,
          render: (h, params) => {
            return h('span', moment(new Date(params.row.sysDate)).format('YYYY-MM-DD'));
          }
        },
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
                    this.putMalAdModal = true;
                    let _this = this;
                    this.$get('/malAd/' + params.row.adId)
                      .then(res => {
                        _this.putMalAd = res.data
                        // console.log(_this.putMalAd)
                      });
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
                    this.$del('/malAd/' + params.row.adId)
                      .then(res => {
                        _this.initMalAdStore();
                      });
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    };
  },
  methods: {
    handleUpload (file) {
      this.file = file;
      return false;
    },
    changePage (index) {
      this.page.pageNum = index;
    },
    addSubmits () {
      let _this = this;
      this.addMalAd.adTypeStr = this.addMalAd.adType;
      this.addMalAd.urlLink = "http://193.112.160.227/api/file/" + this.addMalAd.sysImage;
      this.addMalAd.icatid = "NORMAL"
      this.$post('/malAd', this.addMalAd)
        .then(res => {
          // console.log(res);
          _this.initMalAdStore()
        });
    },
    addOk () {
      this.addSubmits()
    },
    putSubmits () {
      let _this = this;
      this.$put('/malAd/' + _this.putMalAd.adId, _this.putMalAd)
        .then(res => {
          _this.initMalAdStore();
        });
    },
    putOk () {
      this.putSubmits()
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
    initMalAdStore () {
      let _this = this;
      this.$get('/malAd/' + this.page.pageNum + '/' + this.page.pageSize, this.params)
        .then(res => {
          // window.console.log(res);
          _this.tableData1 = res.data.list;
          _this.total = res.data.total;
          // console.log(_this.tableData1)
        });
    }
  },
  created () {
    this.initMalAdStore()
  }
}
</script>
<style>
.ads-manage-btn {
  padding: 20px;
  padding-bottom: 0;
}
.add-ads-info {
  padding: 20px;
}
</style>