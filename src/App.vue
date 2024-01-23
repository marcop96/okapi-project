<script setup lang="ts">
import { ref } from 'vue'
import products from './data/products.json'

const quantities = ref(products.map(() => 0))

function arrayToCSV(data: any) {
  const csvRows = []

  // Format the data to include only 'id' and 'quantity'
  for (const item of data) {
    const id = item.id
    const quantity = item.quantity
    const row = `"${id}","${quantity}"`
    csvRows.push(row)
  }

  return csvRows.join('\n')
}

function downloadCSV(data: any) {
  const blob = new Blob([data], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', 'purchase.csv')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function buyHandler() {
  const productsToBuy = products.filter((_, index) => quantities.value[index] > 0)
    .map((product, index) => ({ id: product.id, quantity: quantities.value[index] }))

  if (productsToBuy.length > 0) {
    const csvData = arrayToCSV(productsToBuy)
    downloadCSV(csvData)
  }
  else {
    console.log('No products selected')
  }
}
</script>

<template>
  <div class="flex">
    <table class="table-auto outline outline-2 outline-black">
      <thead>
        <tr class="outline outline-2 outline-black">
          <th>Product</th>
          <th>Weight</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="product.id" class="">
          <td>{{ product.title }}</td>
          <td>
            {{ product.id }}
          </td>
          <input v-model.number="quantities[index]" type="number" placeholder="quantity" class="bg-yellow">
        </tr>
      </tbody>
      <ul />
    </table>
    <button
      class="bg-blue-500 h-30 mx-auto fixed top-50 left-180 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="buyHandler">
      buy now
    </button> <button
      class="bg-blue-500 h-30 mx-auto fixed top-50 left-240 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="() => console.log('reset')">
      reset
    </button>
  </div>
</template>
