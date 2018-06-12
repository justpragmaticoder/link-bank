export default function loadForms(_data) {
    return {
      type: 'FORMS_LOAD',
      payload: {
        request: {
          url: '/login',
          method: 'post',
          data: {
            login: _data.login,
            password: _data.password
          }
        }
      }
    };
  }
