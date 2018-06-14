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
                    <Input v-model="addMalSysMessage.title" disabled></Input>
                </FormItem>
                <FormItem label="内容">
                    <Input v-model="addMalSysMessage.content"></Input>
                </FormItem>
                <FormItem label="发送给">
                  <RadioGroup v-model="isAll">
                      <label><Radio label="isAll"></Radio>（所有人）</label> 
                      <label><Radio label="userIds"></Radio>（指定人员ID）</label> 
                  </RadioGroup>
                </FormItem>
                <FormItem v-if="isAll === 'userIds'" label="接收系统消息的人员ID">
                    <Input v-model="userIds"></Input>
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
  name: 'systemmessage',
  data () {
    return {
      file: null,
      addMalSysMessageModal: false,
      putMalSysMessageModal: false,
      addMalSysMessage: {
        activatetime: new Date(),
        content: "",
        icatid: "NORMAL",
        isSend: 1,
        msgid: 0,
        readstatus: true,
        receiveId: 6294,
        receiveName: "系统管理员",
        sendId: 6294,
        sendName: "系统管理员",
        status: false,
        sysDate: new Date(),
        sysImage: "string",
        title: "系统消息"
      },
      isAll: "isAll",
      userIds: "",
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
          title: '是否已读',
          key: 'readstatus'
        },
        {
          title: '阅读用户',
          key: 'receiveName'
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
                        _this.initMalSysMessageStore();
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
    handleUpload (file) {
      this.file = file;
      return false;
    },
    changePage (index) {
      this.page.pageNum = index;
      this.initMalSysMessageStore()
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
      this.$post('/malSysMessage', this.addMalSysMessage, this.isAll)
        .then(res => {
          console.log(res);
          _this.initMalSysMessageStore();
        });
    },
    addOk () {
      this.addSubmits();
    },
    putSubmits () {
      let _this = this;
      this.$put('/malSysMessage/' + _this.putMalSysMessage.msgid, _this.putMalSysMessage)
        .then(res => {
          _this.initMalSysMessageStore();
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