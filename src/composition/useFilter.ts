import { ref, computed } from "vue"
import { filterTodos } from "../utils/todoStorage";
import { todosRef } from "./useTodoList";

const visibilityRef = ref("all")
/**
 * hash变化后执行
 */
function onHashChange() {
  const validHash = ["all", "active", "completed"]
  const hash = location.hash.replace(/#\/?/, "")
  if (validHash.includes(hash)) {
    //有效的
    visibilityRef.value = hash
  } else {
    location.hash = ""
    visibilityRef.value = "all"
  }
}

const filteredTodosRef = computed(() => {
  return filterTodos(todosRef.value, visibilityRef.value)
})

const remainingRef = computed(() => {
  return filterTodos(todosRef.value, "active").length
})

const completedRef = computed(() => {
  return filterTodos(todosRef.value, "completed").length
})

export {
  visibilityRef,
  onHashChange,
  filteredTodosRef,
  remainingRef,
  completedRef
}
