<script setup lang="ts">
import { ref } from 'vue'
import products from './data/products.json'
import type { Product, ProductToExport } from './types/Product'

const date = Date.now()
const FormattedProducts = ref<Product[]>(products.map(product => ({
  ...product,
  quantity: 0,
})))
function arrayToCSV(data: any) {
  const csvRows = []
  const headers = Object.keys(data[0])
  csvRows.push(headers.join(','))
  for (const item of data) {
    const sku = item.sku
    const qty = item.qty
    const row = `"${sku}","${qty}"`
    csvRows.push(row)
  }

  return csvRows.join('\n')
}
function updateQuantity(product: Product, newQuantity: number) {
  product.quantity = newQuantity
}
function downloadCSV(FormattedProducts: any) {
  const blob = new Blob([FormattedProducts], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.setAttribute('hidden', '')
  a.setAttribute('href', url)
  a.setAttribute('download', `OKAPI-${date}.csv`)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

function buyHandler() {
  const productsToBuy: ProductToExport[] = FormattedProducts.value.filter((product: Product) => product.quantity && product.quantity > 0)
    .map((product: Product) => ({ sku: product.SKU, qty: product.quantity }))

  if (productsToBuy.length > 0) {
    const csvData = arrayToCSV(productsToBuy)
    downloadCSV(csvData)
    // console.log((`${csvData} table data`))
  }
  else {
    alert('No products selected or quantity is 0')
  }
}
function resetHandler() {
  FormattedProducts.value = products.map(product => ({
    ...product,
    quantity: 0,
  }))
}
</script>

<template>
  <div class="flex justify-center ">
    <table class="table-auto border border-2 border-gray ">
      <thead>
        <tr class="bg-[#C5e5ff]">
          <th>Product</th>
          <th>SKU</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product) in FormattedProducts " :key="product.SKU" class="border border-2 border-gray">
          <td class="w-600px" :class="product.quantity && product.quantity > 0 ? 'bg-green' : 'bg-[#C5E5FF]'">
            {{ product.title
            }}
          </td>
          <td :class="product.quantity && product.quantity > 0 ? 'bg-green' : 'bg-[#C5E5FF]'">{{ product.SKU }}</td>
          <td>
            <input v-model.number="product.quantity" type="number" class="text-center w-20"
              :class="product.quantity && product.quantity > 0 ? 'bg-green' : 'bg-[#C5E5FF]'"
              @input="$event => $event.target && updateQuantity(product, (Number(($event.target as HTMLInputElement).value)))">
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex justify-center">
    <button class=" bg-[#FFA62B] hover:bg-[#ff8308] text-white w-30 h-15 my-4 mx-4 font-bold rounded" @click="buyHandler">
      Buy Now
    </button>
    <button class=" bg-[#FFA62B] hover:bg-[#ff8308] text-white w-30 h-15 my-4 mx-4 font-bold rounded"
      @click="resetHandler">
      Reset
    </button>
  </div>
</template>
