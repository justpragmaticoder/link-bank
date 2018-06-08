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
