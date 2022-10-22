<script setup lang="ts">
    // This starter template is using Vue 3 <script setup> SFCs
    // Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
    import TheHeader from "./components/TheHeader.vue";
    import TheFooter from "./components/TheFooter.vue";
    import MainTodo from "./components/MainTodo.vue";
</script>

<template>
    <div class="wrap">
        <TheHeader />
        <main class="main"><MainTodo /></main>
        <TheFooter />
    </div>
</template>

<style scoped>
    .wrap {
        display: flex;
        flex-direction: column;
        align-items: 100vh;
        min-height: 100vh;
        width: 370px;
        margin: 0 auto;
        font-family: sans-serif;
    }

    .main {
        flex: 1;
        width: 100%;
    }
</style>
