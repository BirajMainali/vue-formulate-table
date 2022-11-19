<template>
  <DataTable data-key="id" :value="products">
    <template #header>
      <div style="display: flex!important; column-gap: 2px">
        <InputText type="text" placeholder="Header" v-model="header"/>
        <MultiSelect v-model="selectedOper" :options="oprSuggestions" option-label="label"></MultiSelect>
        <Button @click="formulate">Add</Button>
      </div>
    </template>
    <Column v-for="col in decoratedColumns" :header="col.header" :field="col.field" :sortable="col.sortable"></Column>
  </DataTable>
</template>

<script setup>
import {ref} from "vue";
import {useFormulator} from "../Hooks/Formulator.js";

const products = ref(
    Array.from({length: 10}, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      purchasePrice: Math.floor(Math.random() * 1000),
      salePrice: Math.floor(Math.random() * 1000),
      quantity: Math.floor(Math.random() * 1000),
    })));


const columns = ref([
  {id: 1, header: "Name", field: "name", sortable: true},
  {id: 2, header: "Purchase Price", field: "purchasePrice", sortable: true},
  {id: 3, header: "Sale Price", field: "salePrice", sortable: true},
  {id: 4, header: "Quantity", field: "quantity", sortable: true},
])

const {
  header: header,
  columns: decoratedColumns,
  oprSuggestions,
  opers: selectedOper,
  formulate
} = useFormulator(products, columns);


</script>
