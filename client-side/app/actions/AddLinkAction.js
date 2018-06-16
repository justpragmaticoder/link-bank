export function sendLinkData(_data) {
  return {
    type: 'CREATE_LINK',
    payload: {
      request: {
        url: '/create-url',
        method: 'POST',
        data: {
          text: _data.text,
          url: _data.url,
          tableID: _data.tableID
        }
      }
    }
  };
}

export function getTablesData(_data) {
  return {
    type: 'GET_TABLES_LIST',
    payload: {
      request: {
        url: `/tables/{$_data.id}`,
        method: 'get'
      }
    }
  };
}
