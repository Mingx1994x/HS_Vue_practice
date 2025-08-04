<script setup>
import { ref } from 'vue'

const products = ref([
  {
    id: 'p01',
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    qty: 20,
  },
  {
    id: 'p02',
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    qty: 18,
  },
  {
    id: 'p03',
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    qty: 34,
  },
  {
    id: 'p04',
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 55,
    qty: 34,
  },
  {
    id: 'p05',
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    qty: 25,
  },
  {
    id: 'p06',
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    qty: 20,
  },
  {
    id: 'p07',
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    qty: 18,
  },
  {
    id: 'p08',
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    qty: 20,
  },
])

const addQty = (id) => {
  // console.log(id)
  const targetId = products.value.findIndex((product) => product.id === id)
  if (targetId !== -1) {
    products.value[targetId].qty++
  } else {
    alert('id有誤')
  }
  // products.value[index].qty++
}

const reduceQty = (id) => {
  const targetId = products.value.findIndex((product) => product.id === id)
  if (targetId !== -1) {
    products.value[targetId].qty--
  } else {
    alert('id有誤')
  }
}

const findProductIndex = (id) => {
  const targetIndex = products.value.findIndex((product) => product.id === id)
  if (targetIndex === -1) {
    alert('id有誤')
    return
  }
  return targetIndex
}

const editMode = ref({
  p01: false,
  p02: false,
  p03: false,
  p04: false,
  p05: false,
  p06: false,
  p07: false,
})

const tempName = ref({})
const switchEditMode = (id, productName = '') => {
  // console.log(id, editMode.value[id])
  editMode.value[id] = !editMode.value[id]
  tempName.value[id] = productName
}
const editProduct = (id) => {
  const productIndex = findProductIndex(id)
  if (!products.value[productIndex].name) {
    alert('品項名稱不得為空值')
    return
  }
  switchEditMode(id)
}

const cancelEditProduct = (id) => {
  const productIndex = findProductIndex(id)
  products.value[productIndex].name = tempName.value[id]
  switchEditMode(id)
}
</script>
<template>
  <div class="wrap">
    <h2 class="text-3xl font-bold underline py-4">Week1 練習</h2>
    <p>P.S. 點擊兩下品項名稱編輯</p>
    <table class="py-3">
      <thead>
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td v-on:dblclick="switchEditMode(item.id, item.name)" class="p-2">
            <div v-if="editMode[item.id]" class="flex items-center">
              <input
                name="productName"
                type="text"
                v-model="item.name"
                class="form-input rounded text-stone-500"
              />
              <div class="ms-3">
                <button
                  v-on:click="cancelEditProduct(item.id)"
                  class="btn-md btn-danger rounded-l-md"
                >
                  取消
                </button>
                <button v-on:click="editProduct(item.id)" class="btn-md btn-info rounded-e-md">
                  確定
                </button>
              </div>
            </div>
            <div v-else>{{ item.name }}</div>
            <!-- {{ item.name }} <input type="text" v-model="item.name" /> -->
          </td>
          <td class="p-3">
            <small>{{ item.description }}</small>
          </td>
          <td class="p-3">{{ item.price }}</td>
          <td class="p-3">
            <button v-on:click="reduceQty(item.id)" class="btn-sm btn-primary rounded-l-full">
              -
            </button>
            {{ item.qty }}
            <button v-on:click="addQty(item.id)" class="btn-sm btn-primary rounded-e-full">
              +
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
