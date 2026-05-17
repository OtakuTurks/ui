<script setup>
import { ref } from 'vue'
import OtCommentSection from '../../src/components/OtCommentSection.vue'

const comments = ref([
  {
    id: 1,
    author: 'LuffyTarou',
    avatar: 'https://i.pravatar.cc/150?img=12',
    isPremium: true,
    content:
      "Wow, this episode was absolutely breathtaking! The animation of the final fight was movie-level quality. Can't wait for next week!",
    createdAt: '10 minutes ago',
    likes: 42,
    isLiked: false,
    replies: [
      {
        id: 101,
        author: 'ZoroJuro',
        avatar: 'https://i.pravatar.cc/150?img=11',
        isPremium: false,
        content: 'Totally agreed! The sound design during the sword clashes gave me goosebumps.',
        createdAt: '5 minutes ago'
      }
    ]
  },
  {
    id: 2,
    author: 'NamiSwang',
    avatar: 'https://i.pravatar.cc/150?img=13',
    isPremium: true,
    content:
      'Does anyone know if this arc is going to have filler episodes soon? I want to binge the canon stuff consecutively.',
    createdAt: '1 hour ago',
    likes: 12,
    isLiked: false,
    replies: []
  }
])

const loading = ref(false)

const handleLike = (id) => {
  const comment = comments.value.find((c) => c.id === id)
  if (comment) {
    if (comment.isLiked) {
      comment.likes--
      comment.isLiked = false
    } else {
      comment.likes++
      comment.isLiked = true
    }
  }
}

const handleSubmit = ({ content }) => {
  loading.value = true
  setTimeout(() => {
    comments.value.unshift({
      id: Date.now(),
      author: 'Current User',
      avatar: 'https://thumbs2.imgbox.com/f8/9e/ccoQ0QLW_t.jpeg',
      isPremium: true,
      content,
      createdAt: 'Just now',
      likes: 0,
      isLiked: false,
      replies: []
    })
    loading.value = false
  }, 500)
}

const handleReply = ({ parentId, content }) => {
  const comment = comments.value.find((c) => c.id === parentId)
  if (comment) {
    comment.replies.push({
      id: Date.now(),
      author: 'Current User',
      avatar: 'https://thumbs2.imgbox.com/f8/9e/ccoQ0QLW_t.jpeg',
      isPremium: true,
      content,
      createdAt: 'Just now'
    })
  }
}
</script>

<template>
  <div class="preview">
    <section class="preview__section">
      <h3 class="preview__subtitle">Interactive Community Comments</h3>
      <div style="max-width: 800px; margin: 0 auto">
        <OtCommentSection
          :comments="comments"
          :loading="loading"
          @like-comment="handleLike"
          @submit-comment="handleSubmit"
          @reply-comment="handleReply"
        />
      </div>
    </section>
  </div>
</template>
