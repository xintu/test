<template>
  <div>
    <h1>User List</h1>
    <button @click="showAddUserDialog" style="float: right; margin-bottom: 10px;">新增</button>
    <table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 添加页面大小选择下拉框 -->
    <div class="pageSizePos">
      <label for="pageSize">每页显示:</label>
      <select id="pageSize" v-model="pageSize" @change="handlePageSizeChange">
        <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <div class="pagination">
      <button @click="prevPage" :disabled="page === 0">Previous</button>
      <button @click="nextPage" :disabled="page >= totalPages - 1">Next</button>
      <span>Page {{ page + 1 }} of {{ totalPages }}</span>
    </div>

    <!-- 添加用户对话框 -->
    <AddUserDialog
        v-if="isDialogVisible"
        :isVisible="isDialogVisible"
        @onClose="closeDialog"
        @onUserAdded="fetchUsers"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '@/axiosInstance'; // 导入 Axios 实例
import AddUserDialog from '@/components/AddUserDialog.vue'; // 导入 AddUserDialog 组件

const users = ref([]);
const page = ref(0);
const total = ref(0);
const pageSize = ref(1);
const totalPages = ref(0);
const isDialogVisible = ref(false);
const pageSizes = [1, 5, 10, 50, 100]; // 可选页面大小


const fetchUsers = async () => {
  const response = await axiosInstance.get(`/api/users?page=${page.value}&size=${pageSize.value}`);
  users.value = response.data.users;
  total.value = response.data.total;
  totalPages.value = Math.ceil(total.value / pageSize.value);
};

const handlePageSizeChange = () => {
  // 计算新的总页数
  // totalPages.value = Math.ceil(total.value / pageSize.value);

  // // 如果当前页数超过总页数，则将页数重置为最后一页
  // if (page.value >= totalPages.value) {
  //   page.value = totalPages.value - 1; // 设置为最后一页
  // }
  page.value = 0;

  fetchUsers(); // 重新获取用户数据
};

const nextPage = () => {
  if (page.value < totalPages.value - 1) {
    page.value++;
    fetchUsers();
  }
};

const prevPage = () => {
  if (page.value > 0) {
    page.value--;
    fetchUsers();
  }
};

const showAddUserDialog = () => {
  isDialogVisible.value = true;
};

const closeDialog = () => {
  console.log("close close");
  isDialogVisible.value = false;
};

onMounted(fetchUsers);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  position: relative; /* 为绝对定位提供参考 */
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.pagination {
  position: absolute; /* 绝对定位 */
  bottom: 20px; /* 距离底部 20px */
  right: 20px; /* 距离右侧 20px */
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}

.pagination button {
  margin-left: 10px; /* 按钮之间的间距 */
}

.pageSizePos {
  position: absolute; /* 绝对定位 */
  bottom: 20px; /* 距离底部 20px */
  left: 20px; /* 距离左侧 20px */
  display: flex; /* 使用 flexbox 布局 */
  align-items: center; /* 垂直居中对齐 */
}
</style>