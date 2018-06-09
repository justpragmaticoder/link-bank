export default function loadTables() {
  return {
    type: 'TABLES_LOAD',
    payload: {
      request: {
        url: '/retrieve',
      }
    }
  };
}
export default function loadLinks() {
  return {
    type: 'LINKS_LOAD',
    payload: {
      request: {
        url: '/links',
      }
    }
  };
}
