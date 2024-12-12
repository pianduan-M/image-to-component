<template>
  <div>
    <el-table>
      <el-table-column label="订单编号" prop="订单编号"></el-table-column>
      <el-table-column label="订单类型" prop="订单类型"></el-table-column>
      <el-table-column label="订单时间" prop="订单时间"></el-table-column>
      <el-table-column label="订单金额" prop="订单金额"></el-table-column>
      <el-table-column label="支付方式" prop="支付方式"></el-table-column>
      <el-table-column label="订单状态" prop="订单状态"></el-table-column>
      <el-table-column label="到账状态" prop="到账状态"></el-table-column>
      <el-table-column label="合同与附件" prop="合同与附件"></el-table-column>
      <el-table-column label="发票与凭证" prop="发票与凭证"></el-table-column>
      <el-table-column label="操作" prop="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "test",
};
</script>
<script setup></script>

<style scoped lang="scss"></style>
