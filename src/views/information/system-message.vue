<template>
    <div class="system-message">
        <div class="ads-manage-btn">
          
        </div>
        <div class="add-ads-info">
            <Button @click="addMalSysMessageModal = true" type="success" href="javascipt:;">新增</Button>
        </div>
        <div>
          <Modal v-model="addMalSysMessageModal" title="发送系统消息" @on-ok="addOk" ok-text="发送">
            <Form :model="addMalSysMessage" label-position="left" :label-width="100">
                <FormItem label="标题">
                    <Input v-model="addMalSysMessage.title"></Input>
                </FormItem>
                <FormItem label="图片">
                    <Upload :before-upload="handleUpload" action="/api/file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                        <div v-if="file !== null">Upload file: {{ addMalSysMessage.sysImage = file.name }}</div>
                    </Upload>
                </FormItem>  
                <FormItem label="内容">
                    <Input v-model="addMalSysMessage.content"></Input>
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
          <Modal v-model="putMalSysMessageModal" title="修改系统消息" @on-ok="putOk" >
            <Form :model="putMalSysMessage" label-position="left" :label-width="100">
                <FormItem label="标题">
                    <Input v-model="putMalSysMessage.title"></Input>
                </FormItem>
                <FormItem label="图片">
                    <Upload :before-upload="handleUpload" action="/api/file">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
                        <div v-if="file !== null">Upload file: {{ putMalSysMessage.sysImage = file.name }}</div>
                    </Upload>
                </FormItem>  
                <FormItem label="内容">
                    <Input v-model="putMalSysMessage.content"></Input>
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
      addMalSysMessageModal: false,
      putMalSysMessageModal: false,
      addMalSysMessage: {
        activatetime: new Data(),
        content: "string",
        icatid: "NORMAL",
        isSend: 1,
        msgid: 0,
        readstatus: true,
        receiveId: 6294,
        receiveName: "系统管理员",
        sendId: 6294,
        sendName: "系统管理员",
        status: false,
        sysDate: new Data(),
        sysImage: "string",
        title: "系统消息"
      },
      putMalSysMessage: {
        activatetime: "2018-06-13T02:36:13.999Z",
        content: "string",
        icatid: "NORMAL",
        isSend: 0,
        msgid: 0,
        readstatus: true,
        receiveId: 0,
        receiveName: "string",
        sendId: 0,
        sendName: "string",
        status: true,
        sysDate: "2018-06-13T02:36:13.999Z",
        sysImage: "string",
        title: "string"
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
          title: '消息ID',
          key: 'msgid'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '创建时间',
          key: 'sysDate'
        },
        {
          title: '是否已读',
          key: 'readstatus'
        },
        {
          title: '用户类型',
          key: 'readstatus'
        },
        {
          title: '消息图片',
          key: 'sysImage'
        },
        {
          title: '内容',
          key: 'content'
        },
        {
          title: '创建时间',
          key: 'sysDate',
          width: 100,
          render: (h, params) => {
            return h('span', moment(params.row.sysDate).format('YYYY-MM-DD'));
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
                    this.putMalSysMessageModal = true;
                    let _this = this;
                    this.$get('/malSysMessage/' + params.row.msgid)
                      .then(res => {
                        _this.putMalSysMessage = res.data
                        console.log(_this.putMalSysMessage)
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
                    this.$del('/malSysMessage/' + params.row.msgid)
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
    handleAdd () {
      //this.$router.push('/shortcut')
    },
    changePage (index) {
      this.page.pageNum = index;
    },
    initMalSysMessageStore () {
      let _this = this;
      this.$get('/malSysMessage/' + this.page.pageNum + '/' + this.page.pageSize)
        .then(res => {
          console.log(res);
          _this.tableData1 = res.data.list;
          _this.total = res.data.total;
          console.log(_this.tableData1)
        });
    },
    addSubmits () {
      let _this = this;
      this.$post('/malSysMessage', this.addMalSysMessage)
        .then(res => {
          console.log(res);
          _this.initMalAdStore();
        });
    },
    addOk () {
      this.addSubmits();
    },
    putSubmits () {
      this.$put('/malSysMessage/' + params.row.adId, _this.putMalSysMessage)
        .then(res => {
          _this.initMalAdStore();
        });
    },
    putOk () {
      this.putSubmits()
    },
  },
  created () {
    this.initMalSysMessageStore();
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