<template>
  <div class="common-table">
    <el-table :data="tableDate" border stripe v-loading="config.loading">
              <el-table-column label='序号' width="90">
                  <template slot-scope="scope">
                          <span style="margin-left: 10px;">{{(config.pagenum-1)*10+scope.$index+1}}</span>
                  </template>
              </el-table-column>

              <el-table-column  show-overflow-tooltip stripe v-for="item in tableLable" :key="item.prop" :label="item.label">
                  <template slot-scope="scope">
                          <span style="margin-left: 10px;">{{scope.row[item.prop]}}</span>
                  </template>
              </el-table-column>

              <slot name="state"></slot>
              <slot name="action"></slot>

    </el-table>
    <el-pagination
       layout="total, sizes, prev, pager, next, jumper"
      :total="config.total"
      :page-sizes="[1 ,2,5, 10]"
      :current-page.sync="config.pagenum"
      :page-size="config.pagesize"
      @current-change="handleCurrentChange"
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
    }
  }
}
</script>

<style scoped>
  .common-table{
  }
</style>
