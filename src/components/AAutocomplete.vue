<template>
  <AutoComplete ref="autoCompleteRef"
                v-model="item"
                :suggestions="filteredItemList"
                field="label"
                key="id"
                :dropdown-mode="'current'"
                multiple
                :append-to="'body'"
                :auto-highlight="false"
                :complete-on-focus="true"
                @keyup="onkeyup($event)"
                placeholder="formula"
                class="flex align-items-stretch w-full"
                @complete="onComplete($event)"
  >
  </AutoComplete>


</template>

<script setup>
import {ref, watch} from "vue";

const props = defineProps({
  modelValue: {
    required: true
  },
  items: {
    type: Array,
    required: true
  },
});
const emit = defineEmits([
  "update:modelValue", "change"
]);


const autoCompleteRef = ref(null);

const item = ref(props.modelValue);
const itemList = ref(props.items);
const query = ref("");
const filteredItemList = ref([]);

const onComplete = event => {
  query.value = event.query;
  const queryNormalized = query.value.trim().toLowerCase();

  if (!event.query.trim().length) {
    if (itemList.value) {
      filteredItemList.value = [...itemList.value];
    }
  } else {
    filteredItemList.value = itemList.value.filter(x => x.value.toLowerCase().includes(queryNormalized));
  }
};

watch(() => props.modelValue, (newValue) => {
  item.value = newValue;
})
watch(() => props.items, (value) => {
  itemList.value = value;
})

watch(() => item.value, () => {
  emit("update:modelValue", item.value ?? null);
  emit("change", item.value ?? null);
}, {deep: true});

watch(() => query.value, () => {
  emit("input", query.value)
})

const onkeyup = (event) => {
  emit('keyup', event)
}
</script>