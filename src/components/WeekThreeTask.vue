<script setup>
import { v4 as uuIdv4 } from 'uuid'
import { computed, onMounted, ref } from 'vue'
import ItemCard from './ItemCard.vue'
import ItemCart from './ItemCart.vue'
const products = ref([])
const cartLists = ref({})

const totalPrice = computed(() =>
  Object.values(cartLists.value).reduce((acc, item) => acc + item.price * item.qty, 0),
)

onMounted(() => {
  products.value = [
    {
      id: uuIdv4(),
      title: '耳罩式藍牙耳機',
      description: '舒適配戴，支援降噪技術',
      price: 2490,
      imgUrl:
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&amp;w=2065&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: uuIdv4(),
      title: '耳罩式彩虹耳機',
      description: '舒適配戴，支援降噪技術',
      price: 1380,
      imgUrl:
        'https://images.unsplash.com/photo-1723924995430-b74c76bbcdfd?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: uuIdv4(),
      title: '時尚藍牙耳機',
      description: '舒適配戴，支援降噪技術',
      price: 7990,
      imgUrl:
        'https://images.unsplash.com/photo-1640028056578-76ced19fd215?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: uuIdv4(),
      title: '機械式鍵盤',
      description: '紅軸機械鍵盤，打字手感極佳',
      price: 1890,
      imgUrl:
        'https://images.unsplash.com/photo-1723709752095-f096290f53f7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: uuIdv4(),
      title: '無線滑鼠',
      description: '舒適配戴，支援降噪技術',
      price: 890,
      imgUrl:
        'https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?q=80&w=1162&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ]
})

const addToCart = (product) => {
  const cartId = Object.keys(cartLists.value).filter(
    (item) => cartLists.value[item].id === product.id,
  )

  if (cartId.length === 0) {
    const newCartId = uuIdv4()
    cartLists.value[newCartId] = {
      ...product,
      qty: 1,
    }
  } else {
    cartLists.value[cartId[0]].qty++
  }
}

const removeCart = (id) => {
  const cartIdIndex = Object.keys(cartLists.value).findIndex((item) => item === id)
  if (cartIdIndex === -1) {
    alert('資料有誤，請洽詢客服')
    return
  }
  delete cartLists.value[id]
}
</script>
<template>
  <div class="flex gap-4">
    <div class="w-2/3">
      <h3 class="text-2xl mb-4">商品列表</h3>
      <div class="flex flex-wrap -mx-3 gap-y-3">
        <template v-for="product in products" :key="product.id">
          <div class="w-full md:w-1/2 lg:w-1/3 px-3">
            <ItemCard :product="product" @add-to-cart="addToCart" />
          </div>
        </template>
      </div>
    </div>
    <div class="w-1/3">
      <h3 class="text-2xl mb-4">購物車</h3>
      <template v-if="Object.keys(cartLists).length === 0">
        <p class="mb-3">沒有選購的商品喔</p>
      </template>
      <template v-else>
        <ItemCart :cartLists="cartLists" @remove-cart="removeCart" />
      </template>
      <h3 class="text-xl font-semibold text-end">總金額：{{ totalPrice }}</h3>
    </div>
  </div>
</template>
