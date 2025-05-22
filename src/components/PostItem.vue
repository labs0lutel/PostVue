<template>
  <div class="post-item">
    <div class="post-content">
      <p class="post-text">{{ post.title }}</p>
      <div class="post-actions">
        <button @click="toggleComments" class="btn comments-btn">
          Комментарии
          <span class="comments-count">{{ post.comments.length }}</span>
        </button>
        <button @click="openEditModal" class="btn edit-btn">Изменить</button>
        <button @click="deletePost" class="btn delete-btn">Удалить</button>
      </div>
    </div>

    <div v-if="isShowComments" class="comments-section">
      <div class="add-comment">
        <input 
          type="text" 
          v-model="newComment" 
          placeholder="Новый комментарий ..." 
          class="comment-input"
        />
        <button @click="addComment" class="btn add-comment-btn">Добавить</button>
      </div>
      
      <div class="comments-list">
        <div v-for="comment in post.comments" :key="comment.id" class="comment-item">
          <p>{{ comment.text }}</p>
          <button @click="deleteComment(comment.id)" class="btn delete-comment-btn">Удалить</button>
        </div>
      </div>
      
      <button @click="toggleComments" class="btn hide-comments-btn">Скрыть</button>
    </div>

    <!-- Модальное окно для редактирования -->
    <div v-if="showEditModal" class="modal">
      <div class="modal-content">
        <textarea v-model="editedTitle" class="edit-textarea"></textarea>
        <div class="modal-actions">
          <button @click="saveEdit" class="btn save-btn">Сохранить</button>
          <button @click="showEditModal = false" class="btn cancel-btn">Закрыть</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePostsStore } from '../stores/posts'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const store = usePostsStore()
const isShowComments = ref(false)
const showEditModal = ref(false)
const editedTitle = ref('')
const newComment = ref('')

const toggleComments = () => {
  isShowComments.value = !isShowComments.value
}

const openEditModal = () => {
  editedTitle.value = props.post.title
  showEditModal.value = true
}

const deletePost = () => {
  store.deletePost(props.post.id)
}

const deleteComment = (commentId) => {
  store.deleteComment(props.post.id, commentId)
}

const addComment = () => {
  if (newComment.value.trim()) {
    store.addComment(props.post.id, newComment.value)
    newComment.value = ''
  }
}

const saveEdit = () => {
  if (editedTitle.value.trim()) {
    store.updatePost(props.post.id, editedTitle.value)
    showEditModal.value = false
  }
}
</script>

<style scoped>
.post-item {
  background-color: white;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.post-content {
  margin-bottom: 15px;
}

.post-text {
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 15px;
  color: #333;
}

.post-actions {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.comments-btn {
  background-color: #2196F3;
  color: white;
  display: flex;
  align-items: center;
  gap: 8px;
}

.comments-count {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.edit-btn {
  background-color: #4CAF50;
  color: white;
}

.delete-btn {
  background-color: #f44336;
  color: white;
}

.comments-section {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.add-comment {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.comment-input {
  flex: 1;
  padding: 8px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
}

.comment-input:focus {
  border-color: #2196F3;
}

.add-comment-btn {
  background-color: #2196F3;
  color: white;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.comment-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-radius: 8px;
  font-size: 14px;
}

.delete-comment-btn {
  background-color: #ff5252;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
}

.hide-comments-btn {
  background-color: #9e9e9e;
  color: white;
  width: 100%;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 15px;
  width: 80%;
  max-width: 500px;
}

.edit-textarea {
  width: 100%;
  min-height: 100px;
  padding: 15px;
  margin-bottom: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  resize: vertical;
  font-size: 14px;
  outline: none;
}

.edit-textarea:focus {
  border-color: #2196F3;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn {
  background-color: #4CAF50;
  color: white;
}

.cancel-btn {
  background-color: #9e9e9e;
  color: white;
}
</style> 