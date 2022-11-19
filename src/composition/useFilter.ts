import { ref, computed, Ref, ComputedRef } from "vue"
import { ITodo } from "../types";
import { filterTodos } from "../utils/todoStorage";
import { todosRef } from "./useTodoList";

const visibilityRef: Ref<string> = ref("all")
/**
 * hash变化后执行
 */
function onHashChange() {
  const validHash: string[] = ["all", "active", "completed"]
  const hash: string = location.hash.replace(/#\/?/, "")
  if (validHash.includes(hash)) {
    //有效的
    visibilityRef.value = hash
  } else {
    location.hash = ""
    visibilityRef.value = "all"
  }
}

const filteredTodosRef: ComputedRef<ITodo[]> = computed(() => {
  return filterTodos(todosRef.value, visibilityRef.value)
})

const remainingRef: ComputedRef<number> = computed(() => {
  return filterTodos(todosRef.value, "active").length
})

const completedRef: ComputedRef<number> = computed(() => {
  return filterTodos(todosRef.value, "completed").length
})

export {
  visibilityRef,
  onHashChange,
  filteredTodosRef,
  remainingRef,
  completedRef
}
