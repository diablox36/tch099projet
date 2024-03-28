function setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + "=" + cookieValue
  }
  
  function getCookie(cookieName) {
    const cookies = document.cookie.split(';')
    for(let i = 0; i < cookies.length; i++) {
      cookies[i] = cookies[i].trim() 
  
      if(cookies[i].startsWith(cookieName + "=")) {
        return cookies[i].substring(cookieName.length + 1)
      }
    }
  }
  
  function checkCookie(cookieName) {
    const cookieValue = getCookie(cookieName)
    if(cookieValue === undefined) {
      return false
    } else {
      return true
    }
  }
  function deleteCookie(cookieName) {
    if (checkCookie(cookieName)) {
      document.cookie = cookieName + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    }
  }