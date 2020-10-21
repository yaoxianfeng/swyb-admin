<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div>

    </div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input placeholder="请输入内容" v-model="config.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4"><el-button type="primary" @click="addDialogVisible = true">添加用户</el-button></el-col>
      </el-row>

      <commonTable
      ref="table"
      :tableDate="tableDate"
      :tableLable="tableLable"
      @changePage="changePage"
      @changePageSize="changePageSize"
      :config="config">
        <el-table-column label="通过子组件中的slot定义的名称来的" slot="states">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>

        <el-table-column label="状态" slot="state">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state" @change="userStateChanged(scope.row)"></el-switch>
          </template>
        </el-table-column>

        <el-table-column label="操作" slot="action">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" circle @click="showEditDialog(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" circle @click="removeUserById(scope.row.id)"></el-button>
            <el-tooltip class="item" effect="dark" content="角色分配" :enterable="false" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini" circle @click="showSetRole(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </commonTable>

      <!-- 添加用户的对话框 -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <!-- 内容主体 -->
        <el-form :model="addUserForm" ref="addUserFormRef" :rules="addUserFormRules" label-width="100px">
          <el-form-item label="用户名" prop="username"><el-input v-model="addUserForm.username"></el-input></el-form-item>
          <el-form-item label="密码" prop="password"><el-input v-model="addUserForm.password"></el-input></el-form-item>
          <el-form-item label="邮箱" prop="email"><el-input v-model="addUserForm.email"></el-input></el-form-item>
          <el-form-item label="手机" prop="mobile"><el-input v-model="addUserForm.mobile"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 修改用户的对话框 -->
      <el-dialog title="修改用户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <!-- 内容主体 -->
        <el-form :model="editUserForm" ref="editUserFormRef" :rules="editUserFormRules" label-width="70px">
          <el-form-item label="用户名"><el-input v-model="editUserForm.username" disabled></el-input></el-form-item>
          <el-form-item label="邮箱" prop="email"><el-input v-model="editUserForm.email"></el-input></el-form-item>
          <el-form-item label="手机" prop="mobile"><el-input v-model="editUserForm.mobile"></el-input></el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUser">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 分配角色的对话框 -->
      <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible" width="50%">
        <div>
          <p>当前用户:{{ userInfo.username }}</p>
          <p>当前角色:{{ userInfo.role_name }}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRoleDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import commonTable from '../../components/commonTable';
import searchForm from '../../components/commonForm';
import { userList ,editFun,userState} from '../../api/user';
export default {
  name:"User",
  components: {
    commonTable,
    searchForm
  },
  data() {
    let sexs = [{ label: '男', value: 'M' }, { label: '女', value: 'F' }];
    let sexProps = { label: 'label', value: 'value' };
    let intersts = [{ label: '羽毛球', value: 'badminton' }, { label: '篮球', value: 'basketball' }];
    let interstProps = { label: 'label', value: 'value' };
    // 自定义邮箱规则
    var checkEmail = (rule, value, callback) => {
      const regEmail = /^\w+@\w+(\.\w+)+$/;
      if (regEmail.test(value)) {
        // 合法邮箱
        return callback();
      }
      callback(new Error('请输入合法邮箱'));
    };
    // 自定义手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^1[34578]\d{9}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      // 返回一个错误提示
      callback(new Error('请输入合法的手机号码'));
    };
    return {
      searchData: {
        name: null,
        age: null,
        sex: null,
        interst: null
      },
      searchForm: [
        { type: 'Input', label: '姓名', prop: 'name', width: '180px', placeholder: '请输入姓名...' },
        { type: 'Input', label: '年龄', prop: 'age', width: '180px', placeholder: '请输入年龄...' },
        { type: 'Select', label: '性别', prop: 'sex', width: '180px', options: sexs, props: sexProps, change: row => '', placeholder: '请选择性别...' },
        { type: 'Checkbox', label: '爱好', width: '180px', prop: 'interst', checkboxs: intersts, props: interstProps }
      ],
      searchHandle: [{ label: '查询', type: 'primary', handle: () => '' }, { label: '重置', type: 'primary', handle: () => '' }],

      formLabel: [{ model: 'query', label: '名字' }, { model: 'query', label: '名称 ' }, { model: 'query', label: '名称 ', type: 'select' }],
      tableDate: [],
      setRoleDialogVisible: false,
      // 需要被分配角色的用户信息
      userInfo: {},
      // 获取用户列表查询参数对象
      config: {
        pagenum: 1,
        total: 0,
        loading: false,
        pagesize: 6, // 每页显示多少数据
        query: ''
      },
      tableLable: [
        {
          prop: 'username',
          label: '姓名'
        },
        {
          prop: 'email',
          label: '邮箱'
        },

        {
          prop: 'mobile',
          label: '电话'
        },
        {
          prop: 'role_name',
          label: '角色'
        }
      ],
      // 添加用户对话框
      addDialogVisible: false,
      // 用户添加
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },

      addUserFormRules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }, { min: 2, max: 10, message: '用户名的长度在2～10个字', trigger: 'blur' }],
        password: [{ required: true, message: '请输入用户密码', trigger: 'blur' }, { min: 6, max: 18, message: '用户密码的长度在6～18个字', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
      },
      // 修改用户
      editDialogVisible: false,
      editUserForm: {
        username: '',
        email: '',
        mobile: '',
        id: ''
      },
      // 编辑用户表单验证
      editUserFormRules: {
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }, { validator: checkEmail, trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号码', trigger: 'blur' }, { validator: checkMobile, trigger: 'blur' }]
      }
    };
  },
  created() {
    this.getUserList();
  },

//1Vue使用watch监听一个对象中的所有
 /* watch: {
       config: {
           handler: function(newV,oldV) {
             console.log(newV,oldV)
           },
           deep: true
       }
  }, */

//2Vue使用watch监听一个对象中的属性
  watch:{
    'config.query':{
      handler: function(newV,oldV) {
        console.log(newV,oldV)
      },
      deep: true
    }
  },


//3Vue使用watch监听一个对象中的属性
 /* watch: {
       getName: {
           handler: function(newV,oldV) {
              console.log(newV,oldV)
           },
       }
  }, */

  //3Vue使用watch监听一个对象中的属性
  computed: {
      getName: function() {
      	return this.config.query
      }
  },

  methods: {
    // 监听 页码值 改变事件
    changePage(newSize) {
      debugger
      this.config.pagenum = newSize;
      this.getUserList();
    },

    // 监听 pagesize改变的事件
    changePageSize(newSize) {
      debugger
       this.getUserList();
       console.log(newSize)
      this.config.pagesize = newSize;

    },

    async getUserList() {
      let that = this;
      that.config.loading = true;
      const { data: res } = await userList(that.config);
      if (res.meta.status !== 200) {
        return that.$message.error('获取用户列表失败！');
      }
      that.tableDate = res.data.users;
      that.config.total = res.data.total;
      that.config.pagenum = res.data.pagenum;
      debugger
      setTimeout(() => {
        that.config.loading = false;
      }, 500);
    },

    // 更改用户状态
    async userStateChanged(userinfo) {
      // 用async ，await简化promise
      console.log(userinfo);
      const { data: res } = await userState(userinfo);
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state;
        return this.$message.error('更新用户状态失败');
      }
      this.$message.success('更新用户状态成功');
    },
    // 监听 添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },

    // 添加用户
    addUser() {
      // 1，提交请求前，表单预验证
      this.$refs.addUserFormRef.validate(async valid => {
        // console.log(valid)
        // 表单预校验失败，则下面的不通过
        if (!valid) return;
        const { data: res } = await this.$http.post('users', this.addUserForm);
        // 2,如果后端数据返回的状态不是200，就是终止后面的程序
        if (res.meta.status !== 201) {
          this.$message.error('添加用户失败！');
        }
        this.$message.success('添加用户成功！');
        // 隐藏添加用户对话框
        this.addDialogVisible = false;
        // 3,如果条件都成立，哪么就要重新刷新用户信息列表
        this.getUserList();
      });
    },
    // 编辑用户信息
    /*  async showEditDialog (id) {  //第一种方法
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('查询用户信息失败！')
      }
      this.editUserForm = res.data
      this.editDialogVisible = true
    }, */

    // 编辑用户信息
    showEditDialog(item) {
      // 1, 编辑用户信息先通过数据的双向绑定，分别绑定表单
      // 第二种方法 编辑可以调接口，也可以不用接口，
      this.editUserForm.username = item.username;
      this.editUserForm.email = item.email;
      this.editUserForm.mobile = item.mobile;
      this.editUserForm.id = item.id;
      this.editDialogVisible = true;
    },
    editUser() {
      // 1，提交请求前，表单预验证
      let that = this;
      that.$refs.editUserFormRef.validate(async valid => {
        console.log(1);
        // 表单预校验失败，则下面的不通过
        if (!valid) return;
        // 2,如果预验证成功，就要发起网络请求
        debugger
         const { data: res } = await editFun({
          email: that.editUserForm.email,
          mobile: that.editUserForm.mobile,
          id:that.editUserForm.id
        });
        // 3,如果后端数据返回的状态不是200，就是终止后面的程序
        if (res.meta.status !== 200) {
          that.$message.error('更新用户信息失败！');
        }
        // 隐藏添加用户对话框
        this.editDialogVisible = false;
        this.$message.success('更新用户信息成功！');
        // 4,如果条件都成立，哪么就要重新刷新用户信息列表
        this.getUserList();
      });
    },

    // 监听修改用户对话框的关闭事件
    editDialogClosed() {
      // 修改用户信息需要把表单重置，去除以前的验证
      this.$refs.editUserFormRef.resetFields();
    },

    // 删除用户信息
    async removeUserById(id) {
      const confirmResult = await this.$confirm('你确定要删除此条数据吗', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => {
        return err;
      });
      console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除');
      }
      const { data: res } = await this.$http.delete('users/' + id);
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败');
      }
      this.$message.success('删除成功');
      this.getUserList();
    },

    // 展示分配角色的对庆框
    showSetRole(role) {
      debugger;
      this.userInfo = role;
      this.setRoleDialogVisible = true;
    }
  }
};
</script>

<style lang="less" scoped>
table,
tbody,
thead {
  width: 100% !important;
}
colgroup {
  position: absolute;
  width: 100% !important;
  display: flex;
}
col {
  flex: 1;
  text-align: center;
}
</style>
