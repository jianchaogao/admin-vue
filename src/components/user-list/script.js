export default {
  data () {
    return {
      searchText: '',
      tableData: [],
      totalSize: 0,
      currentPage: 1,
      pageSize: 5,
      userForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      editUserForm: {
        username: '',
        email: '',
        mobile: ''
      },
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      addUserFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'}
        ],
        email: [
          {required: true, message: '请输入邮箱', trigger: 'blur'}
        ],
        mobile: [
          {required: true, message: '请输入电话', trigger: 'blur'}
        ]
      }
    }
  },
  created () {
    this.loadUserByPage(1, 1)
  },
  methods: {
    async handleSizeChange (pageSize) {
      // console.log(`每页 ${pageSize} 条`)
      this.pageSize = pageSize
      this.loadUserByPage(1, pageSize)
      this.currentPage = 1
    },
    async handleCurrentChange (currentPage) {
      // console.log(`当前页: ${currentPage}`)
      this.loadUserByPage(currentPage)
    },
    async loadUserByPage (page) {
      const res = await this.$http.get('/users', {
        params: {
          pagenum: page,
          pagesize: this.pageSize,
          query: this.searchText
        }
      })
      const {users, total} = res.data.data
      this.tableData = users
      this.totalSize = total
    },
    async searchList () {
      this.loadUserByPage(1)
    },
    async handleStateChange (val, user) {
      // console.log(val, user)
      const {id: userId} = user
      const res = await this.$http.put(`/users/${userId}/state/${val}`)
      // console.log(res)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: `用户状态${val ? '启用' : '禁用'} 成功`
        })
      }
    },
    async handleAddUser () {
      this.$refs['addUserForm'].validate(async (valid) => {
        if (!valid) {
          return
        }
        const res = await this.$http.post('/users', this.userForm)
        if (res.data.meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加用户成功'
          })
          this.dialogFormVisible = false
          this.loadUserByPage(this.currentPage)
          for (let key in this.userForm) {
            this.userForm[key] = ''
          }
        }
      })
    },
    async handleDeleteUser (user) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/users/${user.id}`)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.loadUserByPage(this.currentPage)
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async handleEditUser () {
      const {id: userId} = this.editUserForm
      const res = await this.$http.put(`/users/${userId}`, this.editUserForm)
      if (res.data.meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
        this.dialogEditFormVisible = false
        this.loadUserByPage(this.currentPage)
      }
    },
    async handleShowEditForm (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/users/${user.id}`)
      this.editUserForm = res.data.data
    }
  }
}