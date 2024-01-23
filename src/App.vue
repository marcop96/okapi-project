<script setup lang="ts">

import products from './data/products.json'
import type { Product } from './types/Product';
const date = Date.now()
const productsWithQuantity = products.map((product) => ({
  ...product,
  quantity: 0
}))
function arrayToCSV(data: any) {
  const csvRows = []
  const headers = Object.keys(data[0]);
  console.log((headers))
  csvRows.push(headers.join(','));
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
  console.log((`${product.SKU} quantity updated to ${newQuantity}`))
  console.log((product))
}
function downloadCSV(productsWithQuantity: any) {
  const blob = new Blob([productsWithQuantity], { type: 'text/csv' })
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
  const productsToBuy = productsWithQuantity.filter((product) => product.quantity > 0)
    .map((product) => ({ SKU: product.SKU, QTY: product.quantity }));

  if (productsToBuy.length > 0) {
    const csvData = arrayToCSV(productsToBuy);
    // downloadCSV(csvData);
    console.log((`${csvData} table data`))
  } else {
    alert('No products selected or quantity is 0');
  }
}

</script>

<template>
  <div class="flex justify-center">
    <table class="table-auto outline outline-2 outline-black ">
      <thead>
        <tr class="outline outline-2 outline-black">
          <th>Product</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product) in   productsWithQuantity  " :key="product.SKU" class="">
          <td class='w-600px' :class="{ 'bg-green': product.quantity > 0, '': product.quantity <= 0 }">{{ product.title
          }}
          </td>
          <td>
            <input v-model.number="product.quantity"
              @input='event => event.target && updateQuantity(product, (parseInt((event.target as HTMLInputElement).value)))'
              type="number" class="text-center" :class="product.quantity > 0 ? 'bg-green' : 'bg-yellow'">
          </td>
        </tr>
      </tbody>
    </table>
    <button
      class="bg-blue-500 h-30 mx-auto fixed top-50% right-60 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="buyHandler">
      Buy Now
    </button>
  </div>
</template>
