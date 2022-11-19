<template>
  <AutoComplete
      v-model="item"
      :suggestions="suggestions"
      field="label"
      key="id"
      multiple
      :auto-highlight="false"
      :complete-on-focus="true"
      @keyup="onkeyup($event)"
      placeholder="formula"
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



const item = ref(props.modelValue);
const items = ref(props.items);
const query = ref("");
const suggestions = ref([]);

const onComplete = event => {
  query.value = event.query;
  const queryNormalized = query.value.trim().toLowerCase();

  if (!event.query.trim().length) {
    if (items.value) {
      suggestions.value = [...items.value];
    }
  } else {
    suggestions.value = items.value.filter(x => x.value.toLowerCase().includes(queryNormalized));
  }
};

watch(() => props.modelValue, (newValue) => {
  item.value = newValue;
})
watch(() => props.items, (value) => {
  items.value = value;
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