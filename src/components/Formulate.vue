<template>
  <DataTable data-key="id" :value="products">
    <template #header>
      <div style="display: flex!important; column-gap: 2px">
        <InputText type="text" placeholder="Header" v-model="header"/>
        <AAutocomplete :items="suggestions" v-model="selectedOperators"/>
        <Button @click="formulate">Apply</Button>
      </div>
    </template>
    <Column v-for="col in columns" :header="col.header" :field="col.field" :sortable="col.sortable"/>
  </DataTable>
</template>

<script setup>
import {ref} from "vue";
import {useFormulator} from "../hooks/Formulator.js";
import AAutocomplete from "./AAutocomplete.vue";

const products = ref(
    Array.from({length: 100}, (_, i) => ({
      id: i + 1,
      name: `Product ${i + 1}`,
      purchasePrice: Math.floor(Math.random() * 1000),
      salePrice: Math.floor(Math.random() * 1000),
      quantity: Math.floor(Math.random() * 1000),
    })));

const {
  header,
  columns,
  suggestions,
  selectedOperators,
  formulate
} = useFormulator(products);


</script>

<style>

.p-autocomplete-token-icon {
  display: none !important;
}

.p-autocomplete .p-autocomplete-multiple-container .p-autocomplete-token {
  border-radius: unset !important;
}
</style>