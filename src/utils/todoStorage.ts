const LOCAL_KEY: string = "todomvc"
import { ITodo } from "../types"

/**
 * 获取目前所有的任务
 */
function fetch(): ITodo[] {
  const result = localStorage.getItem(LOCAL_KEY)
  if (result) {
    return JSON.parse(result)
  }
  return []
}

/**
 * 保存所有任务
 */
function save(todos: ITodo[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
}

/**
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
function generateId() {
  return Date.now() + Math.random().toString(16).substring(2, 4)
}

function filterTodos(todos: Array<ITodo>, visibility = "all") {
  if (visibility === "all") {
    return todos
  } else if (visibility === "active") {
    return todos.filter(it => !it.completed)
  } else if (visibility === "completed") {
    return todos.filter(it => it.completed)
  }
  throw new Error("invalid visibility value")
}

export {
  fetch,
  save,
  generateId,
  filterTodos
}
