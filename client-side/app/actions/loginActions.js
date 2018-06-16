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
    console.log('---');
    console.log(_data);
    console.log('---');
    return {
      type: 'LOAD_TABLES',
      payload: {
        request: {
          url:'/tables/'+_data.id,
          method: 'get'
        }
      }
    };
  }
  export function usernameChange(_data){
    // console.log(_data);
    return{
      type:'USERNAME_CHANGE',
      // user: {},
      payload:{
        ..._data
      }
    }
  }
  export function passwordChange(_data){
    console.log(_data);
    return{
      type:'PASSWORD_CHANGE',
      // user: {},
      payload:{
        ..._data
      }
    }
  }