const LOCAL_KEY = "todomvc"

/**
 * 获取目前所有的任务
 */
function fetch() {
  const result = localStorage.getItem(LOCAL_KEY)
  if (result) {
    return JSON.parse(result)
  }
  return []
}

/**
 * 保存所有任务
 */
function save(todo: Object) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(todo))
}

/**
 * 生成一个任务的唯一编号，时间戳+4位随机数
 */
function generateId() {
  return Date.now() + Math.random().toString(16).substring(2, 4)
}

export {
  fetch,
  save,
  generateId
}
