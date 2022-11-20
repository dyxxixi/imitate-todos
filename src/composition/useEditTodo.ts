import { ref, computed } from "vue"
import { ITodo } from "../types"
import { remove } from "./useRemoveTodo"
import { todosRef } from "./useTodoList"

const editingTodoRef = ref<ITodo | null>(null)  //当前修改的是哪一个todo
let beforeEditCache = ''  //缓存之前的title值
function editTodo(todo: ITodo) {
  beforeEditCache = todo.title
  editingTodoRef.value = todo
}
function doneEdit(todo: ITodo) {
  editingTodoRef.value = null
  const title = todo.title.trim()
  if (title) {
    todo.title = title
  } else {
    // 删除
    remove(todo)
  }
}
function cancelEdit(todo: ITodo) {
  editingTodoRef.value = null
  todo.title = beforeEditCache
}
const allDoneRef = computed({
  get() {
    return todosRef.value.filter(todo => !todo.completed).length === 0
  },
  set(checked) {
    todosRef.value.forEach(todo => {
      todo.completed = checked
    })
  }
})

export {
  editingTodoRef,
  editTodo,
  doneEdit,
  cancelEdit,
  allDoneRef
}
