<template>
  <div class="add-post">
    <div class="add-post-form">
      <input 
        type="text" 
        v-model="newPost" 
        placeholder="Новый пост ..." 
        class="post-input"
      />
      <button @click="savePost" class="add-btn">Добавить</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePostsStore } from '../stores/posts'

const store = usePostsStore()
const newPost = ref('')

const savePost = () => {
  if (newPost.value.trim()) {
    store.addPost({ title: newPost.value })
    newPost.value = ''
  }
}
</script>

<style scoped>
.add-post {
  margin-bottom: 20px;
}

.add-post-form {
  display: flex;
  gap: 10px;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.post-input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.post-input:focus {
  border-color: #2196F3;
}

.add-btn {
  padding: 10px 20px;
  background-color: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #1976D2;
}
</style> 