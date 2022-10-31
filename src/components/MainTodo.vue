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
    const todoListRef = ref([]);
    const ls = localStorage.todoList;
    todoListRef.value = ls ? JSON.parse(ls) : [];

    const isEditRef = ref(false);
    let editId = -1;

    const addTodo = () => {
        // IDを簡易的にミリ秒で登録する
        const id = new Date().getTime();

        // 配列に入力TODOを格納
        todoListRef.value.push({ id: id, task: todoRef.value });

        // そのまま保存するとただの文字列になるため、JSONコードにシリアライズ
        // リストの値を更新するイメージ
        localStorage.todoList = JSON.stringify(todoListRef.value);

        // 登録後は入力欄を空にする
        todoRef.value = "";
    };

    const showTodo = (id) => {
        const todo = todoListRef.value.find((todo) => todo.id === id);
        todoRef.value = todo.task;
        isEditRef.value = true;
        editId = id;
    };

    const editTodo = () => {
        const todo = todoListRef.value.find((todo) => todo.id === editId);

        const idx = todoListRef.value.findIndex((todo) => todo.id === editId);

        todo.task = todoRef.value;

        // splice関数でインデックスをもとに対象オブジェクトを置き換え
        todoListRef.value.splice(idx, 1, todo);

        localStorage.todoList = JSON.stringify(todoListRef.value);
        isEditRef.value = false; // 編集モードを解除
        editId = -1;
        todoRef.value = "";
    };

    const deleteTodo = (id) => {
        const { todo, idx } = useTodoList(id);

        const delMsg = "「" + todo.task + "」を削除しますか？";
        if (!confirm(delMsg)) return;

        todoListRef.value.splice(idx, 1);
        localStorage.todoList = JSON.stringify(todoListRef.value);
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
