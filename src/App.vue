<script setup lang="ts">

import products from './data/products.json'

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
    console.log((productsToBuy));
    const csvData = arrayToCSV(productsToBuy);
    //downloadCSV(csvData);
    console.log((`${csvData} table data`))
  } else {
    console.log('No products selected or quantity is 0');
  }
}

</script>

<template>
  <div class="flex">
    <table class="table-auto outline outline-2 outline-black">
      <thead>
        <tr class="outline outline-2 outline-black">
          <th>Product</th>
          <th>SKU</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product) in productsWithQuantity" :key="product.SKU" class="">
          <td>{{ product.title }}</td>
          <td>{{ product.SKU }}</td>
          <td>
          </td>
          <input v-model.number="product.quantity" type="number" placeholder="quantity" class="bg-yellow">

        </tr>
      </tbody>
    </table>
    <button
      class="bg-blue-500 h-30 mx-auto fixed top-50 left-180 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="buyHandler">
      Buy Now
    </button>
  </div>
</template>
