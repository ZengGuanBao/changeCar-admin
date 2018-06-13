<template>
    <div class="ads-manager">
        <div class="ads-manage-btn">

        </div>
        <div class="add-ads-info">
            <Button @click="addMalAdModal = true" type="success" href="javascipt:;">新增</Button>
        </div>
        <div>
          <Modal v-model="addMalAdModal" title="新增广告" @on-ok="addOk" >
            <Form :model="addMalAd" label-position="left" :label-width="100">
                <FormItem label="标题">
                    <Input v-model="addMalAd.title"></Input>
                </FormItem>
                <FormItem label="图片">
                    <Upload :before-upload="handleUpload" action="/api/file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                        <div v-if="file !== null">Upload file: {{ addMalAd.sysImage = file.name }}</div>
                    </Upload>
                    <!-- <Input v-model="malAd.sort"></Input> -->
                </FormItem>               
                <FormItem label="排序">
                    <Input v-model="addMalAd.sort"></Input>
                </FormItem>
                <FormItem label="是否显示">
                  <Switch v-model="addMalAd.status" @on-change="changeSwitch"></Switch>
                  <!-- <Input v-model="malAd.isshow"></Input> -->
                </FormItem>
            </Form>
          </Modal>
        </div>
        <div class="add-list">
            <Table :data="tableData1" :columns="tableColumns1" stripe id="table1"></Table>
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="total" :page.pageNum="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <div>
          <Modal v-model="putMalAdModal" title="修改广告" @on-ok="putOk" >
            <Form :model="putMalAdModal" label-position="left" :label-width="100">
                <FormItem label="标题">
                    <Input v-model="putMalAd.title"></Input>
                </FormItem>
                <FormItem label="图片">
                    <Upload :before-upload="handleUpload" action="/api/file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                        <div v-if="file !== null">Upload file: {{ addMalAd.sysImage = file.name }}</div>
                    </Upload>
                    <!-- <Input v-model="malAd.sort"></Input> -->
                </FormItem>               
                <FormItem label="排序">
                    <Input v-model="putMalAd.sort"></Input>
                </FormItem>
                <FormItem label="是否显示">
                  <!-- <Switch v-model="putMalAd.status" @on-change="changeSwitch"></Switch> -->
                  <!-- <Input v-model="putMalAd.status""></Input> -->
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
        adId: 0,
        adType: "string",
        adTypeStr: "string",
        content: "string",
        icatid: "NORMAL",
        sn: 0,
        status: true,
        sysDate: "",
        sysImage: "",
        title: ""
      },
      putMalAd: {
        adId:4,
        adType:"广告",
        adTypeStr:"广告",
        content:"string",
        icatid:"NORMAL",
        sn:0,
        status:false,
        sysDate:1528812280000,
        sysImage:"cd199346-3fff-47d9-a67d-db607382765c.jpeg",
        title:"第二广告"
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
                        console.log(_this.putMalAd)
                        _this.initMalAdStore();
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
    changeSwitch () {

    },
    addSubmits () {
      let _this = this;
      this.$post('/malAd', this.malAd)
        .then(res => {
          console.log(res);
          _this.initMalAdStore()
        });
    },
    addOk () {
      this.addSubmits()
    },
    putSubmits () {
      this.$put('/malAd/' + params.row.adId, _this.putMalAd)
        .then(res => {
          _this.initMalAdStore();
        });
    },
    putOk () {
      this.putSubmits()
    },
    changePage (index) {
      // The simulated data is changed directly here, and the actual usage scenario should fetch the data from the server
      // this.tableData1 = this.mockTableData1();
      this.page.pageNum = index;
    },
    initMalAdStore () {
      let _this = this;
      this.$get('/malAd/' + this.page.pageNum + '/' + this.page.pageSize, this.params)
        .then(res => {
          window.console.log(res);
          _this.tableData1 = res.data.list;
          _this.total = res.data.total;
          console.log(_this.tableData1)
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