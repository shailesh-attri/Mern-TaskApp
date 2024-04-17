export const getCookie = (name) => {
    const cookieName = `${name}=`;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      if (cookie.trim().startsWith(cookieName)) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return '';
  };