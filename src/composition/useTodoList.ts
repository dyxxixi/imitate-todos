import { ref, watchEffect } from "vue"
import { fetch, save } from "../utils/todoStorage"

const todosRef = ref(fetch())
watchEffect(() => {
  save(todosRef.value)
})

export {
  todosRef
}



