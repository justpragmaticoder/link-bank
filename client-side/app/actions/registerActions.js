export function loadRegisterForm(_data) {
    return {
      type: 'FORMS_LOAD',
      payload: {
        request: {
          url: '/register',
          method: 'post',
          data: _data
        }
      }
    };
  }
  export function usernameChange(_data){
    // console.log(_data);
    return{
      type:'REG_USERNAME_CHANGE',
      // user: {},
      payload:{
        ..._data
      }
    }
  }
  export function password1Change(_data){
    console.log(_data);
    return{
      type:'REG1_PASSWORD_CHANGE',
      // user: {},
      payload:{
        ..._data
      }
    }
  }
  export function password2Change(_data){
    console.log(_data);
    return{
      type:'REG2_PASSWORD_CHANGE',
      // user: {},
      payload:{
        ..._data
      }
    }
  }