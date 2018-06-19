export function loadLoginForm(_data) {
  return {
    type: 'LOGIN_FORMS_LOAD',
    payload: {
      request: {
        url: '/login',
        method: 'POST',
        data: {
          login: _data.login,
          password: _data.password
        }
      }
    }
  };
}

export function loadTablesAfterLogin(_data) {
  return {
    type: 'LOAD_TABLES',
    payload: {
      request: {
        url: `/tables/{$_data.id}`,
        method: 'get'
      }
    }
  };
}

export function makeUserLogout() {
  return {
    type: 'LOGOUT'
  };
}
