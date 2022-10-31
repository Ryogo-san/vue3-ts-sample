import { ref } from "vue";

export const useTodoList = (id) => {
    const ls = localStorage.todoList;
    const todoListRef = ref([]);
    todoListRef.value = ls ? JSON.parse(ls) : [];

    const todo = todoListRef.value.find((todo) => todo.id === id);
    const idx = todoListRef.value.findIndex((todo) => todo.id === id);

    return { todo, idx };
};
