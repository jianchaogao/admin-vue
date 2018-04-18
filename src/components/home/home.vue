<template>
<el-container class="container">
  <el-header class="header">
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark col-content">
          <img class="logo" src="../../assets/logo.png" alt="商城">
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-dark col-content">
          <h1 class="magin-t">电商后台管理系统</h1>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="grid-content bg-purple-dark">
          <el-button @click.prevent="logout">退出</el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
  <el-container class="container">
    <el-aside class="aside" width="200px">
      <el-menu
      default-active="2"
      class="el-menu-vertical-demo aside-menu"
      @open="handleOpen"
      @close="handleClose"
      :router="true">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/users">用户列表</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>权限管理</span>
          </template>
          <el-menu-item index="/roles">角色列表</el-menu-item>
          <el-menu-item index="/rights">权限列表</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商品管理</span>
          </template>
          <el-menu-item index="/categories">商品列表</el-menu-item>
          <el-menu-item index="3-2">商品分类</el-menu-item>
          <el-menu-item index="3-3">商品参数</el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="4-1">订单列表</el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>数据统计</span>
          </template>
          <el-menu-item index="5-1">数据报表</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-main class="main">
      <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.$confirm('确认退出吗?', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => { // 点击确认执行 resolve 函数
        // 1. 删除本地存储中的 Token 身份标识
        window.localStorage.removeItem('admin-token')
        // 2. 跳转到登陆视图
        this.$router.push({
          name: 'login'
        })
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        // 点击取消的处理
      })
    }
  }
}
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #B3C0D1;
  line-height: 60px;
}
.header .logo {
  width: 60px;
}
.magin-t {
  margin: 0;
}
.col-content {
  text-align: center;
}
.aside {
  background-color: #D3DCE6;
}
.main {
  background-color: #E9EEF3;
}
.aside-menu {
  height: 100%;
}
</style>
