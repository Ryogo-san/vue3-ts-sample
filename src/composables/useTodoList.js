import { ref } from "vue";

export const useTodoList = (id) => {
    const ls = localStorage.todoList;
    const todoListRef = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : [];

    const editId = ref(-1);

    const add = (task) => {
        const id = new Date().getTime();
        todoListRef.value.push({ id: id, task: task });
        localStorage.todoList = JSON.stringify(todoListRef.value);

        return { todoListRef };
    };

    const findById = (id) => {
        return todoListRef.value.find((todo) => todo.id === id);
    };

    const findIndexById = (id) => {
        return todoListRef.value.findIndex((todo) => todo.id === id);
    };

    const show = (id) => {
        const todo = findById(id);
        editId.value = id;
        return todo.task;
    };

    const edit = (task) => {
        const todo = findById(editId.value);
        const idx = findIndexById(editId.value);
        todo.task = task;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    const del = (id) => {
        const todo = findById(id);
        const delMsg = "「" + todo.task + "」を削除しますか？";
        if (!confirm(delMsg)) return;

        const idx = findIndexById(id);
        todoListRef.value.splice(idx, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id) => {
        const todo = findById(id);
        const idx = findIndexById(id);
        todo.checked = !todo.checked;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    return { todoListRef, add, show, edit, del, check };
};
