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
    const SKU = item.SKU
    const QTY = item.QTY
    const row = `"${SKU}","${QTY}"`
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
    .map((product: Product) => ({ SKU: product.SKU, QTY: product.quantity }))

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
  <div class="flex justify-center">
    <table class="table-auto border border-2 border-gray ">
      <thead>
        <tr class=" ">
          <th>Product</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product) in FormattedProducts " :key="product.SKU" class="border border-2 border-gray">
          <td class="w-600px" :class="product.quantity && product.quantity > 0 ? 'bg-green' : 'bg-yellow'">
            {{ product.title
            }}
          </td>

          <td>
            <input v-model.number="product.quantity" type="number" class="text-center w-20"
              :class="product.quantity && product.quantity > 0 ? 'bg-green' : 'bg-yellow'"
              @input="$event => $event.target && updateQuantity(product, (Number(($event.target as HTMLInputElement).value)))">
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="bg-blue-500 w-30 h-15 mx-auto fixed top-100px right-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="buyHandler">
      Buy Now
    </button>
    <button
      class="bg-blue-500 w-30 h-15 mx-auto fixed top-200px right-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="resetHandler">
      Reset
    </button>
  </div>
</template>
