export function loadLoginForm(_data) {
    return {
      type: 'LOGIN_FORMS_LOAD',
      payload: {
        request: {
          url: '/login',
          method: 'POST',
          data: {
              login: "vasya",
              password: "12345"
          }
        }
      }
    };
  }
  export function some(_data) {
    return {
      type: 'SOMETHING2222',
      payload: _data
      }
    };
  
  