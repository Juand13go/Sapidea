// decodeToken.js
function decodeToken(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      const payload = JSON.parse(jsonPayload);
      // Retornar el campo "sub" que contiene la información del usuario
      return payload.sub || {};
    } catch (e) {
      console.error('Error al decodificar el token:', e);
      return null;
    }
  }
  
  export default decodeToken;
  