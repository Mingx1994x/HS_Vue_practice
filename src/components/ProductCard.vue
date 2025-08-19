<!-- ProductCard.vue -->
<script setup>
const props = defineProps({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  variant: { type: String, default: 'default' }, // 'default' | 'mini'
  showAdd: { type: Boolean, default: true },
  showFav: { type: Boolean, default: false },
  fav: { type: Boolean, default: false },
})

const emit = defineEmits(['add-to-cart', 'toggle-fav'])

const add = () => emit('add-to-cart', props.id)
const toggleFav = () => emit('toggle-fav', props.id)
</script>

<template>
  <div :class="['card', props.variant === 'mini' && 'card--mini']">
    <div class="title text-slate-900">{{ props.name }}</div>
    <div class="price">NT$ {{ props.price.toLocaleString() }}</div>

    <div class="actions">
      <button v-if="props.showAdd" @click="add" class="btn btn--primary">
        {{ props.variant === 'mini' ? '加入' : '加入購物車' }}
      </button>
      <button v-if="props.showFav" @click="toggleFav" class="btn btn--secondary">
        {{ props.fav ? '★ 已收藏' : '☆ 收藏' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #eee;
  padding: 12px;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.card--mini {
  padding: 8px;
  font-size: 14px;
}

.title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 4px;
}

.card--mini .title {
  font-size: 14px;
}

.price {
  opacity: 0.8;
  margin-top: 4px;
  font-weight: 500;
  color: #059669;
}

.actions {
  margin-top: 8px;
  display: flex;
  gap: 8px;
}

.card--mini .actions {
  margin-top: 6px;
  gap: 6px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.card--mini .btn {
  padding: 4px 8px;
  font-size: 11px;
}

.btn--primary {
  background: #3b82f6;
  color: white;
}

.btn--primary:hover {
  background: #2563eb;
}

.btn--secondary {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
}

.btn--secondary:hover {
  background: #e5e7eb;
}
</style>
