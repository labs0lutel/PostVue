import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [
      {
        id: 1,
        title: "Сегодня было замечательное предложение пойти поужинать этим вечером. Главное, чтобы погода была преимущественно теплой.",
        comments: [
          { id: 1, text: "Самый яркий комментарий в этом посте" },
          { id: 2, text: "Один из бессмысленный комментарий в этом посте"}
        ]
      },
      {
        id: 2,
        title: "Краткосрочное вымышленное преломление может выполнять особую роль в пространстве главной роли игрока",
        comments: [
          { id: 1, text: "Очень научно и непонятно" },
        ]
      }
    ]
  }),

  actions: {
    addPost(post) {
      this.posts.push({
        id: Date.now(),
        title: post.title,
        comments: []
      })
    },

    deletePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId)
    },

    updatePost(postId, newTitle) {
      const post = this.posts.find(post => post.id === postId)
      if (post) {
        post.title = newTitle
      }
    },

    addComment(postId, commentText) {
      const post = this.posts.find(post => post.id === postId)
      if (post) {
        post.comments.push({
          id: Date.now(),
          text: commentText
        })
      }
    },

    deleteComment(postId, commentId) {
      const post = this.posts.find(post => post.id === postId)
      if (post) {
        post.comments = post.comments.filter(comment => comment.id !== commentId)
      }
    }
  }
}) 