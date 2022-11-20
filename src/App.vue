<script setup lang="ts">
import { newTodoRef, addTodo } from "./composition/useNewTodo"
import { visibilityRef, onHashChange, filteredTodosRef, remainingRef, completedRef } from "./composition/useFilter"
import { onMounted, onUnmounted } from "vue"
import { editingTodoRef, editTodo, doneEdit, cancelEdit, allDoneRef } from "./composition/useEditTodo";
import { remove, removeCompleted } from "./composition/useRemoveTodo"
import { todosRef } from "./composition/useTodoList"
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
    <main class="main" v-show="todosRef.length > 0">
      <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDoneRef">
      <label for="toggle-all">全部标记为完成</label>
      <ul class="todo-list">
        <li class="todo" :class="{ completed: todo.completed, editing: todo === editingTodoRef }"
          v-for="todo in filteredTodosRef" :key="todo.id">
          <div class="view">
            <input class="toggle" type="checkbox" v-model="todo.completed">
            <label @click="editTodo(todo)">{{ todo.title }}</label>
            <button @click="remove(todo)" class="destroy"></button>
          </div>
          <input class="edit" type="text" v-model="todo.title" @blur="doneEdit(todo)" @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)">
        </li>
      </ul>
    </main>
    <footer class="footer" v-show="todosRef.length > 0">
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
      <button class="clear-completed" v-show="completedRef > 0" @click="removeCompleted">清除已完成</button>
    </footer>
  </div>
</template>
