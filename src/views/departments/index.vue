<template>
  <div class="departments-container">
    <div class="app-container">
      <el-card v-loading="loading" class="tree-card">
        <!-- 用了一个行列布局 -->
        <tree-tools :node-data="company" />

        <!-- 放置一个el-tree组件 -->
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <!-- 用了一个行列布局 -->
          <template #default="{ data }">
            <tree-tools
              :node-data="data"
              @del-depts="del"
              @add-dept="open"
              @edit-depts="handleEditDepts"
            />
          </template>
        </el-tree>
      </el-card>
      <add-dept
        :show-dialog="showDialog"
        :depts-list="deptsList"
        @close-dialog="handleClose"
      />
    </div>
  </div>
</template>
<script>
import TreeTools from './components/tree-tools.vue'
import { reqGetDepartments } from './utils/reqGetDepartments.js'
import AddDept from './components/add-dept.vue'
// eslint-disable-next-line no-unused-vars
import { Loading } from 'element-ui'
export default {
  name: 'Departments',
  components: {
    TreeTools,
    AddDept
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 控制新增弹出框显示或者隐藏
      showAddDept: false,
      // 临时存储父部门数据
      modeData: {},
      departList: [],
      loading: false// 用来控制进度弹层的显示与隐藏
    }
  },
  created() {
    this.getDepartments()
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const { data } = await reqGetDepartments()
      this.company = {
        name: data.companyName,
        manager: '负责人'
      }
      this.departs = data.depts
    },
    del() {
      this.getDepartments()
    },
    handleClose() {
      this.showDialog = false
    },
    open(nodeData) {
      this.showDialog = true
      this.nodeData = nodeData
    },
    handleEditDepts(nodedata) {
      this.showDialog = true
      this.nodeData = nodedata
      // 在父组件调用子组件
      // this.$nextTick(() => {
      //  this.$refs.addDept.getDepartDetail()
      // })
      this.$refs.addDept.getDepartDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.tree-card {
  padding: 30px 30px;
  font-size:14px;
}
.el-tree {
  ::v-deep {
    // 小三角的样式, 去掉默认的小三角的旋转效果
    .el-tree-node__expand-icon.expanded {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    // 有子节点 且未展开 +
    .el-icon-caret-right:before {
      background: url("~@/assets/common/add-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 有子节点 且已展开 -
    .el-tree-node__expand-icon.expanded.el-icon-caret-right:before{
      background: url("~@/assets/common/minus-circle.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
    // 没有子节点
    .el-tree-node__expand-icon.is-leaf::before  {
      background: url("~@/assets/common/user-filling.png") no-repeat 0 0;
      content: '';
      display: block;
      width: 16px;
      height: 16px;
      font-size: 16px;
      background-size: 16px;
    }
  }
}
</style>
