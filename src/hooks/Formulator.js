import {ref} from "vue";
import {useDecorator} from "./Decorator.js";

export const useFormulator = (items) => {
    const selectedOperators = ref([]);
    const header = ref(null);
    const {suggestions, columns} = useDecorator(items);

    const getNormalizedHeader = () => header.value.replace(/\s/g, "_");

    const getNormalizedEvaluator = () => selectedOperators.value.map((oper) => {
        if (oper.type === 'column') return "x." + oper.value;
        if (oper.type === 'numeric') return parseFloat(oper.value);
        return oper.value;
    }).join(" ");

    const appendColumn = () => {
        const existingColumns = columns.value.find((column) => column.field === getNormalizedHeader());
        if (existingColumns) return;
        columns.value.push({
            header: header.value,
            field: getNormalizedHeader(),
            sortable: true,
            filterable: true,
        });
    }
    const formulate = () => {
        if (!selectedOperators.value.length && !header.value) return;
        appendColumn();
        const [headerKey, toEvaluate] = [getNormalizedHeader(), getNormalizedEvaluator()];
        items.value.forEach((x) => {
            x[headerKey] = eval(toEvaluate);
        });
    }

    return {header, columns, items, suggestions, selectedOperators, formulate};
}