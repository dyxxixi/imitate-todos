import { Ref, ref, watchEffect } from "vue"
import { ITodo } from "../types"
import { fetch, save } from "../utils/todoStorage"

const todosRef: Ref<ITodo[]> = ref(fetch())
watchEffect(() => {
  save(todosRef.value)
})

export {
  todosRef
}



