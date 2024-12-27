<!-- src/components/AddUserDialog.vue -->
<template>
  <div class="dialog"  id= "dialog" v-if="isVisible">
    <div class="dialog-content" id="dialog-content">
      <h2>添加用户</h2>
      <label for="userId">ID:</label>
      <input type="number" v-model="newUser.id" id="userId" required />

      <label for="userName">Name:</label>
      <input type="text" v-model="newUser.name" id="userName" required />

      <label for="userAge">Age:</label>
      <input type="number" v-model="newUser.age" id="userAge" required />

      <div class="dialog-buttons">
        <button @click="confirmAddUser">确认</button>
        <button @click="closeDialog">取消</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted} from 'vue';
import axiosInstance from '@/axiosInstance'; // 导入 Axios 实例

const props = defineProps({
  isVisible: Boolean,
  // onClose: Function,
  // onUserAdded: Function,
});

const emit = defineEmits(['onClose', 'onUserAdded']);

const newUser = ref({ id: '', name: '', age: '' });

const closeDialog = () => {
  console.log('Closing dialog'); // 调试信息
  newUser.value = { id: '', name: '', age: '' }; // 清空输入框
  console.log('Closing dialog 11111'); // 调试信息
  emit('onClose'); // 发射 close 事件
};

const confirmAddUser = async () => {
  try {
    await axiosInstance.post('/api/addUser', newUser.value);
    // props.onUserAdded(); // 通知父组件用户已添加
    emit('onUserAdded'); // 发射 close 事件
  } catch (error) {
    console.error('Error adding user:', error);
  }
  closeDialog(); // 关闭对话框
};

// // 在组件挂载后执行代码
// let isDragging = false; // 用于跟踪是否正在拖动
//
// onMounted(() => {
//   const dialogContent = document.getElementById('dialog-content');
//
//   dialogContent.onmousedown = function(event) {
//     isDragging = true; // 开始拖动
//
//     // 计算鼠标相对于弹窗的位置
//     let shiftX = event.clientX - dialogContent.getBoundingClientRect().left;
//     let shiftY = event.clientY - dialogContent.getBoundingClientRect().top;
//
//     // 移动弹窗的函数
//     function moveAt(pageX, pageY) {
//       dialogContent.style.left = pageX - shiftX + 'px';
//       dialogContent.style.top = pageY - shiftY + 'px';
//     }
//
//     // 处理鼠标移动事件
//     function onMouseMove(event) {
//       if (isDragging) {
//         moveAt(event.pageX, event.pageY);
//       }
//     }
//
//     // 监听鼠标移动事件
//     document.addEventListener('mousemove', onMouseMove);
//
//     // 释放鼠标时停止移动
//     document.onmouseup = function() {
//       isDragging = false; // 停止拖动
//       document.removeEventListener('mousemove', onMouseMove);
//       document.onmouseup = null; // 清除事件监听
//     };
//
//     // 禁止默认拖动行为
//     return false;
//   };
//
//   // 禁止默认拖动行为
//   dialogContent.ondragstart = function() {
//     return false;
//   };
// });
</script>


<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); /* 半透明背景 */
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-content {
  background: white; /* 弹窗背景 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  padding: 20px; /* 内边距 */
  width: 300px; /* 固定宽度 */
  cursor: move; /* 鼠标移动时显示为移动手势 */
  position: relative; /* 使移动时相对定位 */
}

.dialog-content label,
.dialog-content input {
  display: block; /* 每个 label 和 input 在各自一行 */
  margin-bottom: 10px; /* 为每个元素添加底部间距 */
}

.dialog-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

</style>

