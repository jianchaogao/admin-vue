<template>
  <div class="login-wrap">
    <!--
      el-form 会生成 form 标签
      我们自己增加的 class 会和它生成的结果 class 合并到一起
    -->
    <el-form class="login-from" label-position="top" ref="form" :model="userForm" label-width="80px">
      <h2 class="heading">用户登陆</h2>
      <el-form-item label="用户名">
        <el-input
          v-model="userForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login">立即登陆</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import axios from 'axios'
import {saveUserInfo} from '@/assets/js/auth'

export default {
  data () {
    return {
      userForm: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      const res = await this.$http.post('/login', this.userForm)
      if (res.data.meta.status === 200) {
        saveUserInfo(res.data.data)
        this.$router.push({name: 'home'})
        this.$message({
          type: 'success',
          message: '登陆成功!'
        })
      }
    }
  }
}
</script>

<style>
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-from {
  background-color: #fff;
  width: 400px;
  padding: 30px;
  border-radius: 5px;
}
.login-from .login-btn {
  width: 100%;
}
</style>
