import {ref} from "vue";

export const useSuggestionDecorator = (columns) => {
    const suggestions = ref([
        ...columns.value.map((column) => ({
            id: Math.random(),
            label: column.header,
            value: column.field,
            type: "column",
        })),
        ...Array.from({length: 100}, (_, i) => ({
            id: i + 1,
            label: `${i + 1}`,
            value: `${i + 1}`,
            type: 'numeric',
        })),
        {id: 7, label: "(", value: "(", type: 'oper'},
        {id: 8, label: ")", value: ")", type: 'oper'},
        {id: 9, label: "+", value: "+", type: 'oper'},
        {id: 10, label: "-", value: "-", type: 'oper'},
        {id: 11, label: "*", value: "*", type: 'oper'},
        {id: 12, label: "/", value: "/", type: 'oper'},
        {id: 13, label: "=", value: "=", type: 'oper'}
    ]);
    return {suggestions};
}