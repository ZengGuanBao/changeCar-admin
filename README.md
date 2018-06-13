<<<<<<< HEAD
<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://file.iviewui.com/logo.svg">
    </a>
</p>

# iView Admin
[![](https://img.shields.io/travis/iview/iview-admin.svg?style=flat-square)](https://travis-ci.org/iview/iview-admin)
[![vue](https://img.shields.io/badge/vue-2.5.13-brightgreen.svg?style=flat-square)](https://github.com/vuejs/vue)
[![iview ui](https://img.shields.io/badge/iview-2.8.0-brightgreen.svg?style=flat-square)](https://github.com/iview/iview)
[![npm](https://img.shields.io/npm/l/express.svg)]()


## 当前版本：v1.3.1
[更新日志](https://github.com/iview/iview-admin/releases)

[使用教程](https://github.com/iview/iview-admin/wiki)

[在线访问](https://iview.github.io/iview-admin)

[English Doc](https://github.com/iview/iview-admin/blob/dev/README_EN.md)

[简化版模板](https://github.com/iview/iview-admin/tree/template)

`注：在线版本会在开发版本新小版本发布后更新到相应版本，所以如果想体验最新版本iview-admin，请clone完整项目代码到本地运行。`

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
npm run dev
```
### Production(Build)
```bush
npm run build
```

## 简介
&emsp;&emsp;iView admin是基于Vue.js，搭配使用[iView](https://www.iviewui.com) UI组件库形成的一套后台集成解决方案，由TalkingData前端可视化团队部分成员开发维护。iView admin遵守iView设计和开发约定，风格统一，设计考究，并且更多功能在不停开发中。
如果您想查看iview-admin的更新动态，您可以到[更新日志](https://github.com/iview/iview-admin/releases)查看了解最新更新；如果您是新手，想快速入手iview-admin，您可以到[使用教程](https://github.com/iview/iview-admin/wiki)查看讲解；如果您想在线体验iview-admin，您可以到[在线访问](https://iview.github.io/iview-admin)体验。如果你只是想要一个清醒爽朗的界面，那你可以下载[简化版模板](https://github.com/iview/iview-admin/tree/template)来做开发。

## 功能

- 登录/登出
- 权限管理
    - 列表过滤
    - 权限切换
- 多语言切换
- 组件
    - 富文本编辑器
    - Markdown编辑器
    - 城市级联
    - 图片预览编辑
    - 可拖拽列表
    - 文件上传
    - 数字渐变
    - split-pane
- 表单编辑
    - 文章发布
    - 工作流
- 表格
    - 可拖拽排序
    - 可编辑表格
        - 行内编辑
        - 单元格编辑
    - 可搜索表格
    - 表格导出数据
        - 导出为Csv文件
        - 导出为Xls文件
    - 表格转图片
- 错误页面
    - 403页面
    - 404页面
    - 500页面
- 高级路由
    - 动态路由
    - 带参页面
- 换肤
- 收缩侧边栏
- tag标签导航
- 面包屑导航
- 全屏/退出全屏
- 锁屏
- 消息中心
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
└── src
    ├── images  图片文件
    ├── libs  工具方法
    ├── locale  多语言文件
    ├── router  路由配置
    ├── store  状态管理
    ├── styles  样式文件
    ├── template  模板文件
    ├── vendors  公共库文件
    └── views
        ├── access  权限管理
        ├── advanced-router  高级路由
        ├── error_page  错误页面
        ├── form  表单编辑
        ├── home  首页
        │   ├── components  首页组件
        ├── international  多语言
        ├── main_components  Main组件
        │   ├── lockscreen  锁屏
        │   ├── shrinkable-menu  可收缩菜单
        │   └── theme-switch  主题切换
        ├── message  消息中心
        ├── my_components  业务组件
        │   ├── area-linkage  中国行政区级联选择器
        │   ├── count-to  数字渐变
        │   ├── draggable-list  可拖拽列表
        │   ├── file-upload  文件上传
        │   ├── image-editor  图片预览编辑
        │   ├── markdown-editor  Markdown编辑器
        │   └── text-editor  富文本编辑器
        ├── own-space  个人中心
        └── tables  综合表格
```

## Links

- [TalkingData](https://github.com/TalkingData)
- [iView](https://github.com/iview/iview)
- [Vue](https://github.com/vuejs/vue)
- [Webpack](https://github.com/webpack/webpack)

## 效果展示

- 响应式布局首页
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/home.gif)

- 标签导航
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/page-tags.gif)

- 权限管理
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/access.gif)

- 可拖拽列表
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-list.gif)

- 图片预览编辑
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/image-editor.gif)

- 文件上传
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/upload.gif)

- 数字渐变
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/count-to.gif)

- split-pane
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/split-pane.gif)

- 文章发布
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/article-publish.gif)

- 工作流
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/workflow.gif)

- 可拖拽表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/dragable-table.gif)

- 可编辑表格
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/editable-table.gif)

- 表格导出数据
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/exportable-table.gif)

- 表格转图片
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/table2image.gif)

- 错误页面
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/error-page.gif)

- 锁屏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/locking.gif)

- 可收缩侧边栏
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/sidebarmenu.gif)

- 主题切换
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/theme.gif)

- 消息中心
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/message.gif)

### 💖💖 If you find this project helpful, maybe you can buy me a coffee. 💖💖
![image](https://github.com/iview/iview-admin/raw/dev/github-gif/code.png)


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2016-present, iView
=======
# car

#### 项目介绍
{**以下是码云平台说明，您可以替换为您的项目简介**
码云是开源中国推出的基于 Git 的代码托管平台（同时支持 SVN）。专为开发者提供稳定、高效、安全的云端软件开发协作平台
无论是个人、团队、或是企业，都能够用码云实现代码托管、项目管理、协作开发。企业项目请看 [https://gitee.com/enterprises](https://gitee.com/enterprises)}

#### 软件架构
软件架构说明


#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 码云特技

1. 使用 Readme\_XXX.md 来支持不同的语言，例如 Readme\_en.md, Readme\_zh.md
2. 码云官方博客 [blog.gitee.com](https://blog.gitee.com)
3. 你可以 [https://gitee.com/explore](https://gitee.com/explore) 这个地址来了解码云上的优秀开源项目
4. [GVP](https://gitee.com/gvp) 全称是码云最有价值开源项目，是码云综合评定出的优秀开源项目
5. 码云官方提供的使用手册 [http://git.mydoc.io/](http://git.mydoc.io/)
6. 码云封面人物是一档用来展示码云会员风采的栏目 [https://gitee.com/gitee-stars/](https://gitee.com/gitee-stars/)
>>>>>>> Initial commit
