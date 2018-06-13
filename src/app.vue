<template>
    <div id="main" class="app-main">
        <router-view></router-view>
    </div>
</template>

<script>
    /* eslint-disable */

    import Vue from 'vue';
    import BaiduMap from 'vue-baidu-map';
    Vue.use(BaiduMap, {
        // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
        ak: 'sacRdI9GfTMmdIxqk6WofX1DPapP6CTz'
    })

    import iviewArea from 'iview-area';
    Vue.use(iviewArea);

    export default {
        data () {
            return {
                theme: this.$store.state.app.themeColor
            };
        },
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    };
</script>

<style>
html,body{
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    overflow: hidden;
}
.app-main{
    width: 100%;
    height: 100%;
}
</style>
