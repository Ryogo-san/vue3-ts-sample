import { ref, Ref } from "vue";
import { Todo } from "/src/types/todo";

export const useTodoList = (id: number) => {
    const ls: Todo = localStorage.todoList;
    const todoListRef: Ref<Todo[]> = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : [];

    const editId: Ref<number> = ref(-1);

    const add = (task: string) => {
        const id: number = new Date().getTime();
        todoListRef.value.push({ id: id, task: task });
        localStorage.todoList = JSON.stringify(todoListRef.value);

        return { todoListRef };
    };

    const findById: Todo = (id: number) => {
        return todoListRef.value.find((todo) => todo.id === id);
    };

    const findIndexById = (id: number) => {
        return todoListRef.value.findIndex((todo) => todo.id === id);
    };

    const show = (id: number) => {
        const todo: Todo = findById(id);
        editId.value = id;
        return todo.task;
    };

    const edit = (task: string) => {
        const todo: Todo = findById(editId.value);
        const idx: number = findIndexById(editId.value);
        todo.task = task;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
        editId.value = -1;
    };

    const del = (id: number) => {
        const todo: Todo = findById(id);
        const delMsg: string = "「" + todo.task + "」を削除しますか？";
        if (!confirm(delMsg)) return;

        const idx: number = findIndexById(id);
        todoListRef.value.splice(idx, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    const check = (id: number) => {
        const todo: Todo = findById(id);
        const idx: number = findIndexById(id);
        todo.checked = !todo.checked;
        todoListRef.value.splice(idx, 1, todo);
        localStorage.todoList = JSON.stringify(todoListRef.value);
    };

    return { todoListRef, add, show, edit, del, check };
};
