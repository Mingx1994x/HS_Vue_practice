<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'

// 響應式資料 - 一開始是空的
const products = ref([])
const recommendations = ref([])

// 購物車和收藏狀態
const cart = ref([])
const favorites = ref([])

// 計算屬性
const cartCount = computed(() => cart.value.length)
const hasData = computed(() => products.value.length > 0 || recommendations.value.length > 0)

// 加入購物車
const handleAddToCart = (productId) => {
  cart.value.push(productId)
  console.log(`🛒 商品 ${productId} 已加入購物車`, cart.value)

  alert(`商品已加入購物車！目前購物車有 ${cartCount.value} 個商品`)
}
// 收藏切換
const handleToggleFav = (productId) => {
  const index = favorites.value.indexOf(productId)
  let isNowFavorite

  if (index > -1) {
    // 如果已經收藏，就移除
    favorites.value.splice(index, 1)
    isNowFavorite = false
    console.log(`💔 商品 ${productId} 已取消收藏`)
  } else {
    // 如果沒收藏，就加入
    favorites.value.push(productId)
    isNowFavorite = true
    console.log(`❤️ 商品 ${productId} 已加入收藏`)
  }

  const message = isNowFavorite ? '已加入收藏' : '已取消收藏'
  console.log(`商品 ${productId} ${message}`)
}

const isFavorite = (productId) => {
  return favorites.value.includes(productId)
}

// 組件掛載時載入數據
onMounted(() => {
  console.log('📱 組件已掛載，載入數據...')

  // 模擬從外部載入商品數據
  products.value = [
    { id: 1, name: 'iPhone 15 Pro', price: 36900 },
    { id: 2, name: 'MacBook Air M2', price: 37900 },
    { id: 3, name: 'iPad Pro 11"', price: 28900 },
  ]

  // 模擬從外部載入推薦數據
  recommendations.value = [
    { id: 4, name: 'AirPods Pro', price: 7490 },
    { id: 5, name: 'Apple Watch', price: 12900 },
    { id: 6, name: 'Magic Mouse', price: 2590 },
  ]

  console.log('✅ 數據載入完成！', {
    products: products.value,
    recommendations: recommendations.value,
  })
})
</script>

<template>
  <div class="demo-container">
    <h3 class="text-2xl">ProductCard 雙情境範例</h3>
    <!-- 顯示商品內容 -->
    <div v-if="hasData">
      <!-- 情境 A：商品列表（正常版） -->
      <section class="section">
        <h4 class="text-xl text-slate-900">情境 A：商品列表（正常版）</h4>
        <p class="description">顯示完整功能：加入購物車 + 收藏按鈕</p>

        <div v-if="products.length > 0" class="product-grid">
          <ProductCard
            v-for="p in products"
            :key="p.id"
            :id="p.id"
            :name="p.name"
            :price="p.price"
            show-add
            show-fav
            :fav="isFavorite(p.id)"
            @add-to-cart="handleAddToCart"
            @toggle-fav="handleToggleFav"
          />
        </div>
        <div v-else class="empty-state">
          <p>暫無商品資料</p>
        </div>

        <div class="code-example">
          <h5>使用範例：</h5>
          <pre><code>&lt;ProductCard
  :id="p.id" :name="p.name" :price="p.price"
  show-add show-fav :fav="isFavorite(p.id)"
  @add-to-cart="handleAddToCart"
  @toggle-fav="handleToggleFav"
/&gt;</code></pre>
        </div>
      </section>

      <!-- 情境 B：結帳推薦（迷你版） -->
      <section class="section">
        <h4 class="text-xl text-slate-900">情境 B：結帳推薦（迷你版）</h4>
        <p class="description">緊湊版本：只顯示加入購物車，適合推薦區域</p>

        <div v-if="recommendations.length > 0" class="recommendation-grid">
          <ProductCard
            v-for="r in recommendations"
            :key="r.id"
            :id="r.id"
            :name="r.name"
            :price="r.price"
            variant="mini"
            show-add
            @add-to-cart="handleAddToCart"
          />
        </div>
        <div v-else class="empty-state">
          <p>暫無推薦商品</p>
        </div>

        <div class="code-example">
          <h5>使用範例：</h5>
          <pre><code>&lt;ProductCard
  :id="r.id" :name="r.name" :price="r.price"
  variant="mini" show-add
  @add-to-cart="handleAddToCart"
/&gt;</code></pre>
        </div>
      </section>
    </div>

    <!-- 📝 空數據狀態 -->
    <div v-else class="empty-container">
      <h2>😶 暫無數據</h2>
      <p>沒有可顯示的商品</p>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #1f2937;
  margin-bottom: 30px;
}

.section {
  margin-bottom: 40px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

h2 {
  color: #374151;
  margin-bottom: 10px;
}

.description {
  color: #6b7280;
  margin-bottom: 20px;
  font-style: italic;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
}

.recommendation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.code-example {
  background: #1f2937;
  color: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-top: 20px;
}

.code-example h4 {
  margin: 0 0 12px 0;
  color: #60a5fa;
}

.code-example pre {
  margin: 0;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.5;
}

.status {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.status-item {
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e5e7eb;
}

.comparison-table th {
  background: #f3f4f6;
  font-weight: 600;
  color: #374151;
}

.comparison-table code {
  background: #f3f4f6;
  padding: 2px 6px;
  border-radius: 4px;
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 13px;
}

/* 載入狀態樣式 */
.loading-section {
  text-align: center;
  padding: 40px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top: 4px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 16px;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 錯誤狀態樣式 */
.error-section {
  text-align: center;
  padding: 40px;
  background: #fef2f2;
  border-radius: 12px;
  border: 1px solid #fecaca;
  color: #dc2626;
}

.retry-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  margin-top: 12px;
}

.retry-btn:hover {
  background: #2563eb;
}

/* 空狀態樣式 */
.empty-state {
  text-align: center;
  padding: 20px;
  color: #6b7280;
  font-style: italic;
}

.empty-container {
  text-align: center;
  padding: 60px 20px;
  color: #6b7280;
}

/* 生命週期說明樣式 */
.lifecycle-explanation {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content strong {
  display: block;
  margin-bottom: 4px;
  color: #374151;
}

.step-content p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
}
</style>
