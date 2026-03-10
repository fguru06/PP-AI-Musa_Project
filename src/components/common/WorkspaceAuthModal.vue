<script setup>
import Modal from '@/components/common/Modal.vue'

defineProps({
  mode: { type: String, default: 'signin' },
  titleText: { type: String, default: 'Welcome back' },
  messageText: { type: String, default: '' },
  email: { type: String, default: '' },
  password: { type: String, default: '' },
  errorText: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  providers: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits([
  'close',
  'submit',
  'provider',
  'update:mode',
  'update:email',
  'update:password',
])
</script>

<template>
  <Modal :title="mode === 'signin' ? 'Sign In' : 'Sign Up'" size="md" @close="emit('close')">
    <div class="auth-modal-body">
      <p class="auth-eyebrow">Access your workspace</p>
      <h2 class="auth-title">{{ titleText }}</h2>
      <p class="auth-message">{{ messageText }}</p>

      <div class="auth-mode-toggle">
        <button class="auth-mode-btn" :class="mode === 'signin' && 'active'" type="button" @click="emit('update:mode', 'signin')">
          Sign In
        </button>
        <button class="auth-mode-btn" :class="mode === 'signup' && 'active'" type="button" @click="emit('update:mode', 'signup')">
          Sign Up
        </button>
      </div>

      <form class="auth-email-form" @submit.prevent="emit('submit')">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" :value="email" class="input" placeholder="you@example.com" required @input="emit('update:email', $event.target.value)" />
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input type="password" :value="password" class="input" placeholder="••••••••" required minlength="6" @input="emit('update:password', $event.target.value)" />
        </div>
        <div v-if="errorText" class="auth-error-msg">{{ errorText }}</div>
        <button type="submit" class="btn btn-primary auth-submit-btn" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : (mode === 'signin' ? 'Sign In with Email' : 'Sign Up with Email') }}
        </button>
      </form>

      <div class="auth-divider">
        <span>or continue with</span>
      </div>

      <div class="auth-provider-list">
        <button
          v-for="provider in providers"
          :key="provider.id"
          class="auth-provider-btn"
          type="button"
          @click="emit('provider', provider)"
        >
          <span class="provider-name">{{ provider.label }}</span>
          <span class="provider-description">{{ provider.description }}</span>
        </button>
      </div>
    </div>
  </Modal>
</template>

<style scoped>
.auth-modal-body {
  color: var(--color-text);
}

.auth-eyebrow {
  color: var(--color-text-muted);
  font-size: var(--text-sm);
  margin: 0;
}

.auth-title {
  margin-top: var(--space-2);
  font-size: 38px;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.auth-message {
  margin-top: var(--space-2);
  color: var(--color-text-muted);
}

.auth-mode-toggle {
  margin-top: var(--space-4);
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-2);
}

.auth-mode-btn {
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 10px 12px;
  font-weight: 600;
  cursor: pointer;
}

.auth-mode-btn.active {
  background: color-mix(in srgb, var(--color-primary) 18%, var(--color-surface-raised));
  border-color: color-mix(in srgb, var(--color-primary) 45%, var(--color-border));
  color: var(--color-primary-hover);
}

.auth-submit-btn {
  width: 100%;
  justify-content: center;
  height: 42px;
}

.auth-provider-list {
  margin-top: var(--space-4);
  display: grid;
  gap: var(--space-2);
}

.auth-provider-btn {
  width: 100%;
  border: 1px solid var(--color-border);
  background: var(--color-surface-raised);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
  cursor: pointer;
}

.auth-provider-btn:hover {
  border-color: color-mix(in srgb, var(--color-primary) 35%, var(--color-border));
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-surface-raised));
}

.provider-name {
  font-size: var(--text-md);
  font-weight: 600;
}

.provider-description {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  text-align: right;
}

@media (max-width: 980px) {
  .auth-title {
    font-size: 30px;
  }

  .auth-provider-btn {
    align-items: flex-start;
    flex-direction: column;
  }

  .provider-description {
    text-align: left;
  }
}
</style>