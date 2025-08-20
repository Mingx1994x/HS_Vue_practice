<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})
const { product } = props
const { title, description, price, imgUrl } = product

const emits = defineEmits(['add-to-cart'])
const addToCart = () => {
  emits('add-to-cart', product)
}
</script>
<template>
  <div class="flex flex-col h-full">
    <img :src="imgUrl" class="object-cover" style="width: 100%; height: 120px" />
    <div class="p-4 flex flex-col">
      <h5 class="text-xl font-bold">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <p class="fw-bold text-primary">$ {{ price }}</p>
      <button class="btn-md btn-primary" @click="addToCart">加入購物車</button>
    </div>
  </div>
</template>
