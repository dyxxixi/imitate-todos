<script setup lang="ts">
import { newTodoRef, addTodo } from "./composition/useNewTodo"
import { visibilityRef, onHashChange, filteredTodosRef, remainingRef, completedRef } from "./composition/useFilter"
import { onMounted, onUnmounted } from "vue"
onMounted(() => {
  window.addEventListener("hashchange", onHashChange)
})

onUnmounted(() => {
  window.removeEventListener("hashchange", onHashChange)
})
</script>

<template>
  <div class="todoapp">
    <header class="header">
      <h1>任务清单</h1>
      <input class="new-todo" placeholder="需要做什么？" v-model="newTodoRef" @keyup.enter="addTodo">
    </header>
    <main class="main">
      <input id="toggle-all" class="toggle-all" type="checkbox">
      <label for="toggle-all">全部标记为完成</label>
      <ul class="todo-list">
        <li class="todo" :class="{ completed: todo.completed }" v-for="todo in filteredTodosRef" :key="todo.id">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label>{{ todo.title }}</label>
            <button class="destroy"></button>
          </div>
          <input class="edit" type="text">
        </li>
      </ul>
    </main>
    <footer class="footer">
      <span class="todo-count">
        <span>
          剩下
        </span>
        <strong>
          {{ remainingRef }}
        </strong>
        <span>
          个任务
        </span>
      </span>
      <ul class="filters">
        <li><a href="#/all" :class="{ selected: visibilityRef === 'all' }">全部</a></li>
        <li><a href="#/active" :class="{ selected: visibilityRef === 'active' }">未完成</a></li>
        <li><a href="#/completed" :class="{ selected: visibilityRef === 'completed' }">已完成</a></li>
      </ul>
      <button class="clear-completed" v-show="completedRef > 0">清除已完成</button>
    </footer>
  </div>
</template>
