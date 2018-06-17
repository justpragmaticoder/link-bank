export function sendLinkData(table, name, url) {
  return {
    type: 'CREATE_LINK',
    payload: {
      request: {
        url: '/create-url/' + localStorage.getItem('userId'),
        method: 'POST',
        data: {
          text: name,
          url:  url,
          tableID: table
        }
      }
    }
  };
}

