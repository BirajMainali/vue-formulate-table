import {onMounted, ref} from "vue";

export const useDecorator = (items) => {
    const columns = ref([]);
    const suggestions = ref([]);
    const normalizedHeader = (text) => text.replaceAll(".", " ").split(/(?=[A-Z])/).join(" ").replace(/\b\w/g, (l) => l.toUpperCase());

    const decorateColumns = (o, prefix = null) => {
        Object.keys(o).forEach((key) => {
            const field = prefix ? `${prefix}.${key}` : key;
            if (o[key] !== null && typeof o[key] === "object") {
                decorateColumns(o[key], field);
            } else {
                columns.value.push({
                    header: normalizedHeader(field),
                    field: field,
                    isVisible: true,
                });
            }
        });
    };

    const decorateSuggestions = () => {
        suggestions.value = [
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
        ];
    }


    onMounted(() => {
        decorateColumns(items.value[0]);
        decorateSuggestions();
    });

    return {suggestions, columns};
}