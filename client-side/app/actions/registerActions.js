export default function loadRegisterForms(_data) {
    return {
      type: 'FORMS_LOAD',
      payload: {
        request: {
          url: '/regiter',
          method: 'post',
          data: _data
        }
      }
    };
  }
  