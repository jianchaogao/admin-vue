export default {
  data () {
    return {
      fromData: [],
      roleForm: {
        roleName: '',
        roleDesc: ''
      },
      editRoleForm: {
        roleName: '',
        roleDesc: '',
        roleId: 0
      },

      rightsRole: {},
      // 添加规则
      dialogFormVisible: false,
      dialogEditFormVisible: false,
      dialogEditRoles: false,
      rid: null,
      addRolesFormRules: {
        roleName: [
          {required: true, message: '请输入角色名', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
        roleDesc: [
          {required: true, message: '请输入角色描述', trigger: 'blur'},
          {min: 3, max: 18, message: '长度在 3 到 18 个字符', trigger: 'blur'}
        ],
      },
      // 3级权限ID
      treeCheckedKeys: [],
      // 权限树数据
      treeData: [],
      // 显示渲染key
      treeProps: {
        children: 'children',
        label: 'authName'
      }
    }
  },
  // 初始化加载
  created () {
    this.loadData()
  },
  methods: {
    // 加载角色列表
    async loadData () {
      const res = await this.$http.get('/roles')
      const data = res.data
      this.fromData = data.data
    },
    // 添加角色
    async handleAddRoleUser () {
      this.$refs['addRolesForm'].validate(async (valid) => {
        if (!valid) {
          return
        }
        const res = await this.$http.post('/roles', this.roleForm)
        const {data, meta} = res.data
        if (meta.status === 201) {
          this.$message({
            type: 'success',
            message: '添加角色成功'
          })
          this.dialogFormVisible = false
          this.loadData()
        }
      })
    },
    // 删除角色
    async handleRemoveRoleUser (role) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await this.$http.delete(`/roles/${role.id}`)
        const {data,meta} = res.data
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          this.loadData()
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 修改角色
    async handleEditRoleUser () {
      const {roleId: id} = this.editRoleForm
      const res = await this.$http.put(`/roles/${id}`, this.editRoleForm)
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: '更新用户成功'
        })
        this.dialogEditFormVisible = false
        this.loadData()
      }
    },
    // 显示角色信息
    async showEditRoleUser (user) {
      this.dialogEditFormVisible = true
      const res = await this.$http.get(`/roles/${user.id}`)
      this.editRoleForm = res.data.data
    },
    // 显示权限树
    async showEditRightsRole (role) {
      this.rid = role.id
      this.dialogEditRoles = true
      const res = await this.$http.get('/rights/tree')
      this.treeData = res.data.data
      this.treeCheckedKeys = this.getLevel3IDs(role.children)
    },
    // 获取三级权限ID数组
    getLevel3IDs (rightslist) {
      const arr = []
      const f = function (rightslist) {
        rightslist.forEach(function (item) {
          if (!item.children) {
            arr.push(item.id)
          } else {
            f(item.children)
          }
        })
      }
      f(rightslist)
      return arr
    },
    // 修改权限列表
    async handleEditRihgts () {
      // 1 获取所有选中的节点
      const id = this.$refs.rightsTree.getHalfCheckedKeys().concat(this.$refs.rightsTree.getCheckedKeys())
      // 2 获取险种节点的ID及服ID拼成字符串
      const str = id.toString()
      // 3 发送请求
      const res = await this.$http.post(`/roles/${this.rid}/rights`, {
        rids: str
      })
      const {data, meta} = res.data
      if (meta.status === 200) {
        this.dialogEditRoles = false
        this.loadData()
        this.$message({
          type: 'success',
          message: '授权成功'
        })
      }
    }
  }
}
