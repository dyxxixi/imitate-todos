import { Ref, ref } from "vue"
import { generateId } from '../utils/todoStorage';
import { todosRef } from "../composition/useTodoList"
import { ITodo } from "../types";

const newTodoRef:Ref<string> = ref("")
function addTodo() {
  // 新增一个任务
  const value:string = newTodoRef.value && newTodoRef.value.trim()
  if (!value) {
    return
  }
  // 生成一个任务对象，将其加入到任务列表中
  const todo:ITodo = {
    id: generateId(),
    title: value,
    completed: false //任务是否完成
  }
  todosRef.value.push(todo)
  newTodoRef.value = ""
}

export {
  newTodoRef,
  addTodo
}

