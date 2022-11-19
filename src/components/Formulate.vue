<template>
  <DataTable data-key="id" :value="products">
    <template #header>
      <div style="display: flex!important; column-gap: 2px">
        <InputText type="text" placeholder="Header" v-model="header"/>
        <AAutocomplete :items="suggestions" v-model="selectedOper"/>
        <Button @click="formulate">Apply</Button>
      </div>
    </template>
    <Column v-for="col in decoratedColumns" :header="col.header" :field="col.field" :sortable="col.sortable"/>
  </DataTable>
</template>

<script setup>
import {ref} from "vue";
import {useFormulator} from "../Hooks/Formulator.js";
import AAutocomplete from "./AAutocomplete.vue";

const products = ref(
    Array.from({length: 100}, (_, i) => ({
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
  oprSuggestions : suggestions,
  opers: selectedOper,
  formulate
} = useFormulator(products, columns);


</script>

<style>

.p-autocomplete-token-icon {
  display: none !important;
}
.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token {
  border-radius: unset !important;
}
</style>