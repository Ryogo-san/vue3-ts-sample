<template>
    <div class="box_input">
        <input
            type="text"
            class="todo_input"
            v-model="todoRef"
            placeholder="＋ TODOを入力"
        />
        <div>{{ todoRef }}</div>
        <button class="btn" @click="editTodo" v-show="isEditRef">変更</button>
        <button class="btn" @click="addTodo" v-show="!isEditRef">追加</button>
    </div>
    <div class="box_list">
        <div class="todo_list" v-for="todo in todoListRef" :key="todo.id">
            <div class="todo">
                <input type="checkbox" class="check" />
                <label>{{ todo.task }}</label>
            </div>
            <div class="btns">
                <button class="btn green" @click="showTodo(todo.id)">編</button>
                <button class="btn pink" @click="deleteTodo(todo.id)">
                    削
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useTodoList } from "/src/composables/useTodoList.js";

    const todoRef = ref("");
    const isEditRef = ref(false);
    const { todoListRef, add, show, edit, del, check } = useTodoList();

    const addTodo = () => {
        add(todoRef.value);
        todoRef.value = "";
    };

    const showTodo = (id) => {
        todoRef.value = show(id);
        isEditRef.value = true;
    };

    const editTodo = () => {
        edit(todoRef.value);
        isEditRef.value = false;
        todoRef.value = "";
    };

    const deleteTodo = (id) => {
        del(id);
    };

    const changeCheck = (id) => {
        check(id);
    };
</script>

<style scoped>
    .box_input {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .todo_list {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .todo_input {
        width: 300px;
        margin-right: 8px;
        padding: 8px;
        font-size: 18px;
        border: 1px solid #aaa;
        border-radius: 6px;
    }

    .btn {
        padding: 8px;
        background-color: #03a9f4;
        border-radius: 6px;
        color: #fff;
        text-align: center;
        font-size: 14px;
    }

    .box_list {
        margin-top: 20px;
        display: flex;
        flex-direction: column;
        gap: 4px;
    }

    .todo {
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 12px;
        width: 300px;
    }

    .check {
        border: 1px solid red;
        transform: scale(1.6);
        margin: 0 16px 2px 6px;
    }

    .btns {
        display: flex;
        gap: 4px;
    }

    .green {
        background-color: #00c853;
    }

    .pink {
        background-color: #ff4081;
    }
</style>
