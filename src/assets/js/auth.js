const userInFoKey = 'user-info'

// 保存数据到本地
export function saveUserInfo (userInFo = {}) {
  window.localStorage.setItem(userInFoKey, JSON.stringify(userInFo))
}

// 获取数据
export function getUserInfo () {
  return window.localStorage.getItem(userInFoKey)
}

// 保存token
export function getToken () {
  return JSON.parse(getUserInfo()).token
}

// 移除数据
export function removeUserInfo () {
  window.localStorage.removeItem(userInFoKey)
}
