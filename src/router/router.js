import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: () =>
        import ('@/views/login.vue')
};



export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: () =>
        import ('@/views/error-page/404.vue')
};


export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: () =>
        import ('@//views/error-page/403.vue')
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: () =>
        import ('@/views/error-page/500.vue')
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: () =>
        import ('@/views/form/article-publish/preview.vue')
};



export const locking = {
    path: '/locking',
    name: 'locking',
    component: () =>
        import ('@/views/main-components/lockscreen/components/locking-page.vue')
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [{
        path: 'home',
        title: { i18n: 'home' },
        name: 'home_index',
        component: () =>
            import ('@/views/home/home.vue')
    }]

};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [{
        path: '/access',
        //  icon: 'key',
        title: '门店管理',
        name: 'shop-manager',
        icon: 'home',
        //access: 0,
        component: Main,
        children: [{
                path: 'index',
                title: '门店管理',
                name: 'access_index',
                isShow: "1",
                component: () =>
                    import ('@/views/shop/shop-manager.vue'),
            },
            {
                path: 'shop-repair/:id',
                title: '信息修改',
                isShow: "0",
                name: 'shoprepair',
                component: () =>
                    import ('@/views/shop/shop-repair.vue'),
            }


        ]
    },


    {
        path: '/access-test',
        //icon: 'lock-combination',
        title: '车辆管理',
        name: 'vehicle-manager',
        icon: 'android-car',
        //access: 0,
        component: Main,
        children: [{
                path: 'index',
                title: '车辆管理',
                name: 'accesstest_index',
                access: 0,
                isShow: "1",
                component: () =>
                    import ('@/views/vehicle/vehicle-manager.vue')
            },
            {

                path: 'checkpage/:id',
                name: 'checkpage',
                isShow: "0",
                title: '审核',
                component: () =>
                    import ('@/views/vehicle/order-check.vue')

            },
            {

                path: 'addinfor/:id',
                name: 'addinfor',
                isShow: "0",
                title: '添加车主信息',
                component: () =>
                    import ('@/views/vehicle/addinfor.vue')

            }

        ]
    },

    {
        path: '/component',
        //icon: 'social-buffer',
        name: 'component',
        title: '订单管理',
        component: Main,
        icon: 'clipboard',
        //access: 0,

        children: [{
                path: 'order-manager',
                name: 'text-editor',
                isShow: "1",
                title: '订单管理',
                component: () =>
                    import ('@/views/order/order-manager.vue')
            },
            {
                path: 'ordercash/:id',
                name: 'ordercash',
                isShow: "0",
                title: '押金状态',
                component: () =>
                    import ('@/views/order/ordercash.vue')
            }

        ]
    },
    {
        path: '/point',
        name: 'point',
        title: '积分管理',
        icon: 'android-apps',
        //access: 0,
        component: Main,
        children: [{
                path: 'pointmanager',
                name: 'pointmanager',
                isShow: "1",
                title: '积分管理',
                component: () =>
                    import ('@/views/points/point-manager.vue')
            },
            // {
            //     path: 'pointlog',
            //     name: 'pointlog',
            //     isShow: "1",
            //     title: '积分日志管理',
            //     component: () =>
            //         import ('@/views/points/point-log.vue')
            // },
            {
                path: 'activityPoint',
                name: 'activityPoint',
                isShow: "1",
                title: '活动积分管理',
                component: () =>
                    import ('@/views/points/activityPoint.vue')
            },
            {
                path: 'depositPoint',
                name: 'depositPoint',
                isShow: "1",
                title: '提现积分管理',
                component: () =>
                    import ('@/views/points/depositPoint.vue')
            },
            {
                path: 'addpoint/:id',
                name: 'addpoint',
                isShow: "0",
                title: '增加积分',
                component: () =>
                    import ('@/views/points/addpoint.vue')
            }
        ]
    },
    {
        path: '/user',
        name: 'user',
        title: '用户管理',
        //access: 0,
        component: Main,
        icon: 'person-stalker',
        children: [{
                path: 'usermanager',
                name: 'usermanager',
                isShow: "1",
                title: '用户管理',
                component: () =>
                    import ('@/views/user/user-manager.vue')
            },
            {
                path: 'user-repair/:id',
                name: 'userrepair',
                isShow: "0",
                title: '用户修改',
                component: () =>
                    import ('@/views/user/user-repair.vue')
            },
            {
                path: 'user-check/:id',
                name: 'usercheck',
                isShow: "0",
                title: '用户审核',
                component: () =>
                    import ('@/views/user/user-check.vue')
            },
            {
                path: 'user-add',
                name: 'useradd',
                isShow: "0",
                title: '添加用户',
                component: () =>
                    import ('@/views/user/user-add.vue')
            }
        ]
    },
    {
        path: '/message',
        name: 'message',
        title: '消息管理',
        //access: 0,
        component: Main,
        icon: 'person-stalker',
        children: [{
                path: 'messagemanager',
                name: 'messagemanager',
                isShow: "1",
                title: '订单消息',
                component: () =>
                    import ('@/views/information/order-message.vue')
            },
            {
                path: 'systemmanager',
                name: 'systemmanager',
                isShow: "1",
                title: '系统消息',
                component: () =>
                    import ('@/views/information/system-message.vue')
            },
            {
                path: 'leavemanager',
                name: 'leavemanager',
                isShow: "1",
                title: '留言消息',
                component: () =>
                    import ('@/views/information/leave-message.vue')
            },
        ]
    },
    {
        path: '/ads',
        name: 'ads',
        title: '广告管理',
        //access: 0,
        icon: 'android-create',
        component: Main,
        children: [{
            path: 'adsmanager',
            name: 'adsmanager',
            isShow: "1",
            title: '广告管理',
            component: () =>
                import ('@/views/ads/ads-manager.vue')
        }, {
            path: 'adsmanager',
            name: 'adsmanager',
            isShow: "0",
            title: '添加广告',
            component: () =>
                import ('@/views/ads/ads-add.vue')
        }]
    },
    {
        path: '/sys',
        name: 'sys',
        title: '系统设置',
        //access: 0,
        icon: 'android-create',
        component: Main,
        children: [{
            path: 'system',
            name: 'system',
            isShow: "1",
            title: '系统设置',
            component: () =>
                import ('@/views/system/system-setting')
        }, {
            path: 'system2',
            name: 'system2',
            isShow: "0",
            title: '添加广告',
            component: () =>
                import ('@/views/system/system-setting')
        }]
    },
    {
        path: '/par',
        name: 'par',
        title: '参数配置',
        //access: 0,
        icon: 'android-create',
        component: Main,
        children: [{
            path: 'car',
            name: 'car',
            isShow: "1",
            title: '车辆参数配置',
            component: () =>
                import ('@/views/parameter/car')
        }, {
            path: 'shelves',
            name: 'shelves',
            isShow: "1",
            title: '上架参数配置',
            component: () =>
                import ('@/views/parameter/shelves')
        }, {
            path: 'active',
            name: 'active',
            isShow: "1",
            title: '活动参数配置',
            component: () =>
                import ('@/views/parameter/active')
        }]
    },
    // {
    //   path: '/user-car',
    //   title: '车辆管理',
    //   name: 'vehicle-manager',
    //   icon:'android-car',
    //   access: 0,
    //   component: Main,
    //   children:[
    //     {
    //       path: 'index', title: '管理车辆',
    //       name: 'user_car', access: 0,
    //       isShow:"1",
    //       component: () => import('@/views/user-car/user-car-manager.vue')
    //     }
    //   ]
    // }

];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];