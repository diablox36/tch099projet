export function setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + "=" + cookieValue
  }
export function getCookie(cookieName) {
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].trim() 
  
      if(cookies[i].startsWith(cookieName + "=")) {
        return cookies[i].substring(cookieName.length + 1)
      }
    }
  }
export function deleteCookie(cookieName) {
    if (checkCookie(cookieName)) {
      document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }