export const setLocalStorage = (key : string, value : string) => {

  if(!key || typeof window === "undefined"){
    return ""
  }
  return localStorage.setItem(key, value)
}