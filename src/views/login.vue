<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录同乐车辆管理系统
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.username" placeholder="请输入用户名 " value="admin"></input>
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码" value="123456"></input>
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Cookies from 'js-cookie';
import Vue from 'vue';
import axios from 'axios';

export default {
    data () {
        return {
            form: {
                username: 'admin',
                password: '123456'
            },
            rules: {
                username: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                let _this = this;
                if (valid) {
                    this.$post("/login", this.form)
                        .then((res) => {
                            window.console.log(res);
                            if (res.success) {
                                Cookies.set('user', this.form.username);
                                Cookies.set('userId', res.data.userId);
                                _this.$store.commit('setAvator', 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg');
                                Cookies.set('access', res.data.menuCode[0]);
                                //Cookies.set('access', 0);
                                _this.$router.push({
                                    name: 'home_index'
                                });
                            }
                        });
                }
            });
        }
    }
};
</script>

<style>

</style>
