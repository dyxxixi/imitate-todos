import { ITodo } from "../types"
import { todosRef } from "./useTodoList"

function remove(todo: ITodo) {
  const index = todosRef.value.indexOf(todo);
  if (index >= 0) {
    todosRef.value.splice(index, 1);
  }
}

function removeCompleted() {
  todosRef.value = todosRef.value.filter(it => !it.completed)
}

export {
  remove,
  removeCompleted
}
