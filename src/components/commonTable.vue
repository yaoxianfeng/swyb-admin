<template>
  <div class="common-table">
    <el-table :data="tableDate" border stripe v-loading="config.loading" style="border: 1px saddlebrown red;">
      <el-table-column label="序号" width="90">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ (config.pagenum - 1) * 10 + scope.$index + 1 }}</span>
        </template>
      </el-table-column>

      <!-- 通过插槽定义一个名称 然后再在父组中的 el-table-column中 slot="states" /-->
      <slot name="states"></slot>

      <el-table-column show-overflow-tooltip stripe v-for="item in tableLable" :key="item.prop" :label="item.label">
        <template slot-scope="scope">
          <span style="margin-left: 10px;">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>

      <slot name="state"></slot>
      <slot name="action"></slot>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="config.total"
      :page-sizes="[5, 10, 15, 20]"
      :current-page.sync="config.pagenum"
      :page-size="config.pagesize"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    tableDate: Array,
    tableLable: Array,
    config: Object
  },
  methods: {
    showEditDialog () {},
    removeUserById () {},
    handleCurrentChange (page) {
      debugger
      this.$emit('changePage', page) // 告诉父组件
    },
    handleSizeChange (size) {
      debugger
      this.$emit('changePageSize', size)
    }
  }
}
</script>

<style scoped>
.common-table {
}
</style>
