<script setup>
import { ref } from 'vue'

defineProps({
  comments: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit-comment', 'like-comment', 'reply-comment'])

const commentInput = ref('')
const replyingTo = ref(null)
const replyInput = ref('')

const submitRootComment = () => {
  if (!commentInput.value.trim()) return
  emit('submit-comment', { content: commentInput.value })
  commentInput.value = ''
}

const submitReply = (parentComment) => {
  if (!replyInput.value.trim()) return
  emit('reply-comment', { parentId: parentComment.id, content: replyInput.value })
  replyInput.value = ''
  replyingTo.value = null
}
</script>

<template>
  <div class="ot-comment-section">
    <div class="ot-comment-section__title">Community Comments ({{ comments.length }})</div>

    <!-- Main Comment Input Box -->
    <div class="ot-comment-input">
      <textarea
        v-model="commentInput"
        placeholder="Join the discussion... Keep it clean and friendly!"
        rows="3"
        class="ot-comment-input__textarea"
      ></textarea>
      <div class="ot-comment-input__actions">
        <button
          class="ot-comment-input__btn"
          :disabled="loading || !commentInput.trim()"
          @click="submitRootComment"
        >
          Post Comment
        </button>
      </div>
    </div>

    <!-- Comments List -->
    <div class="ot-comment-list">
      <div v-for="comment in comments" :key="comment.id" class="ot-comment">
        <!-- Comment Wrapper -->
        <div class="ot-comment__body">
          <img :src="comment.avatar" :alt="comment.author" class="ot-comment__avatar" />
          <div class="ot-comment__content-wrapper">
            <div class="ot-comment__header">
              <span class="ot-comment__author">{{ comment.author }}</span>
              <span v-if="comment.isPremium" class="ot-comment__badge">VIP</span>
              <span class="ot-comment__time">{{ comment.createdAt }}</span>
            </div>
            <p class="ot-comment__text">{{ comment.content }}</p>

            <!-- Bottom reactions/replies -->
            <div class="ot-comment__footer">
              <button
                class="ot-comment__action-btn"
                :class="{ 'ot-comment__action-btn--active': comment.isLiked }"
                @click="$emit('like-comment', comment.id)"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2.5"
                >
                  <path
                    d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"
                  ></path>
                </svg>
                <span>{{ comment.likes || 0 }}</span>
              </button>

              <button
                class="ot-comment__action-btn"
                @click="replyingTo = replyingTo === comment.id ? null : comment.id"
              >
                Reply
              </button>
            </div>

            <!-- In-place Reply Box -->
            <div v-if="replyingTo === comment.id" class="ot-comment-reply-box">
              <textarea
                v-model="replyInput"
                :placeholder="`Reply to @${comment.author}...`"
                rows="2"
                class="ot-comment-reply-box__textarea"
              ></textarea>
              <div class="ot-comment-reply-box__actions">
                <button class="ot-comment-reply-box__cancel" @click="replyingTo = null">
                  Cancel
                </button>
                <button
                  class="ot-comment-reply-box__submit"
                  :disabled="!replyInput.trim()"
                  @click="submitReply(comment)"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Nested Replies -->
        <div v-if="comment.replies && comment.replies.length" class="ot-comment__replies">
          <div
            v-for="reply in comment.replies"
            :key="reply.id"
            class="ot-comment ot-comment--reply"
          >
            <img :src="reply.avatar" :alt="reply.author" class="ot-comment__avatar" />
            <div class="ot-comment__content-wrapper">
              <div class="ot-comment__header">
                <span class="ot-comment__author">{{ reply.author }}</span>
                <span v-if="reply.isPremium" class="ot-comment__badge">VIP</span>
                <span class="ot-comment__time">{{ reply.createdAt }}</span>
              </div>
              <p class="ot-comment__text">
                <span class="ot-comment__mention">@{{ comment.author }}</span>
                {{ reply.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ot-comment-section {
  width: 100%;
  font-family: var(--ot-font-family);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-xl, 12px);
  padding: var(--ot-spacing-lg, 24px);
}

.ot-comment-section__title {
  font-size: var(--ot-font-lg, 1.25rem);
  font-weight: 700;
  color: var(--ot-white, #ffffff);
  margin-bottom: var(--ot-spacing-lg, 24px);
  border-bottom: 1px solid var(--ot-gray-300, #2a2c34);
  padding-bottom: var(--ot-spacing-sm, 12px);
}

.ot-comment-input {
  margin-bottom: var(--ot-spacing-xl, 32px);
}

.ot-comment-input__textarea {
  width: 100%;
  padding: var(--ot-spacing-md, 16px);
  background-color: var(--ot-bg-primary, #12141d);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-sm, 14px);
  resize: vertical;
  outline: none;
  transition: all var(--ot-transition-fast, 150ms) ease;
}

.ot-comment-input__textarea:focus {
  border-color: var(--ot-primary, #377dff);
  box-shadow: 0 0 10px rgba(55, 125, 255, 0.15);
}

.ot-comment-input__actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--ot-spacing-sm, 12px);
}

.ot-comment-input__btn {
  background-color: var(--ot-primary, #377dff);
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-sm, 14px);
  font-weight: 600;
  padding: 8px 18px;
  border: none;
  border-radius: var(--ot-radius-base, 8.7px);
  cursor: pointer;
  transition: all var(--ot-transition-fast, 150ms) ease;
}

.ot-comment-input__btn:hover:not(:disabled) {
  opacity: 0.9;
  box-shadow: 0 0 15px rgba(55, 125, 255, 0.3);
}

.ot-comment-input__btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.ot-comment-list {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-xl, 32px);
}

.ot-comment {
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-md, 16px);
}

.ot-comment__body {
  display: flex;
  gap: var(--ot-spacing-md, 16px);
  align-items: flex-start;
}

.ot-comment__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--ot-gray-300, #2a2c34);
}

.ot-comment__content-wrapper {
  flex: 1;
  min-width: 0;
}

.ot-comment__header {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-sm, 8px);
  margin-bottom: var(--ot-spacing-xs, 4px);
}

.ot-comment__author {
  font-size: var(--ot-font-sm, 14px);
  font-weight: 700;
  color: var(--ot-white, #ffffff);
}

.ot-comment__badge {
  font-size: 10px;
  font-weight: 700;
  color: #ffb703;
  background-color: rgba(255, 183, 3, 0.1);
  padding: 1px 5px;
  border-radius: 4px;
}

.ot-comment__time {
  font-size: var(--ot-font-xs, 12px);
  color: var(--ot-gray-200, #858a8f);
}

.ot-comment__text {
  font-size: var(--ot-font-sm, 14px);
  color: var(--ot-gray-100, #aab0b7);
  line-height: 1.5;
  word-wrap: break-word;
  margin-bottom: var(--ot-spacing-sm, 12px);
}

.ot-comment__footer {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-md, 16px);
}

.ot-comment__action-btn {
  display: flex;
  align-items: center;
  gap: var(--ot-spacing-xs, 4px);
  background: transparent;
  border: none;
  color: var(--ot-gray-200, #858a8f);
  cursor: pointer;
  font-size: var(--ot-font-xs, 12px);
  font-weight: 600;
  transition: color var(--ot-transition-fast, 150ms) ease;
}

.ot-comment__action-btn:hover {
  color: var(--ot-white, #ffffff);
}

.ot-comment__action-btn--active {
  color: var(--ot-primary, #377dff);
}

.ot-comment-reply-box {
  margin-top: var(--ot-spacing-md, 16px);
  background-color: var(--ot-bg-primary, #12141d);
  padding: var(--ot-spacing-md, 16px);
  border-radius: var(--ot-radius-base, 8.7px);
  border: 1px solid var(--ot-gray-300, #2a2c34);
}

.ot-comment-reply-box__textarea {
  width: 100%;
  padding: var(--ot-spacing-sm, 12px);
  background-color: var(--ot-bg-secondary, #1e2029);
  border: 1px solid var(--ot-gray-300, #2a2c34);
  border-radius: var(--ot-radius-base, 8.7px);
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-sm, 14px);
  resize: vertical;
  outline: none;
}

.ot-comment-reply-box__actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--ot-spacing-sm, 8px);
  margin-top: var(--ot-spacing-sm, 12px);
}

.ot-comment-reply-box__cancel {
  background: transparent;
  border: none;
  color: var(--ot-gray-200, #858a8f);
  font-size: var(--ot-font-xs, 12px);
  font-weight: 600;
  cursor: pointer;
}

.ot-comment-reply-box__submit {
  background-color: var(--ot-primary, #377dff);
  color: var(--ot-white, #ffffff);
  font-family: var(--ot-font-family);
  font-size: var(--ot-font-xs, 12px);
  font-weight: 600;
  padding: 6px 14px;
  border: none;
  border-radius: var(--ot-radius-base, 8.7px);
  cursor: pointer;
}

.ot-comment__replies {
  margin-left: 60px;
  padding-left: var(--ot-spacing-md, 16px);
  border-left: 2px solid var(--ot-gray-300, #2a2c34);
  display: flex;
  flex-direction: column;
  gap: var(--ot-spacing-lg, 24px);
  margin-top: var(--ot-spacing-sm, 12px);
}

.ot-comment--reply {
  flex-direction: row;
  align-items: flex-start;
  gap: var(--ot-spacing-md, 16px);
}

.ot-comment--reply .ot-comment__avatar {
  width: 36px;
  height: 36px;
}

.ot-comment__mention {
  color: var(--ot-primary, #377dff);
  font-weight: 600;
  margin-right: 4px;
}
</style>
