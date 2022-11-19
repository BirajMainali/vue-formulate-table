import {ref} from "vue";

export const useFormulator = (items, columns) => {
    const opers = ref([]);
    const header = ref(null);

    const oprSuggestions = ref([
        ...columns.value.map((column) => ({
            id: Math.random(),
            label: column.header,
            value: column.field,
            type: "column",
        })),
        {id: 7, label: "(", value: "(", type: 'oper'},
        {id: 8, label: ")", value: ")", type: 'oper'},
        {id: 9, label: "+", value: "+", type: 'oper'},
        {id: 10, label: "-", value: "-", type: 'oper'},
        {id: 11, label: "*", value: "*", type: 'oper'},
        {id: 12, label: "/", value: "/", type: 'oper'},
        {id: 13, label: "=", value: "=", type: 'oper'},
    ]);

    const getNormalizedHeader = () => header.value.replace(/\s/g, "_");
    const getNormalizedOper = () => opers.value.map((oper) => oper.type === "column" ? "x." + oper.value : oper.value).join(" ");

    const clearInputsOnComplete = () => {
        header.value = null;
        opers.value = [];
    }
    const appendColumn = () => {
        if (!header.value) return;
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
        appendColumn();
        if (!opers.value.length) return;
        const [headerKey, toEvaluate] = [getNormalizedHeader(), getNormalizedOper()];
        items.value.forEach((x) => {
            x[headerKey] = eval(toEvaluate);
        });
        clearInputsOnComplete();
    }

    return {header, columns, items, oprSuggestions, opers, formulate};
}