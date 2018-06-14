export function loadTables() {
  return {
    type: 'TABLES_LOAD',
    payload: {
      request: {
        url: '/retrieve',
      }
    }
  };
}
export function loadLinks() {
  return {
    type: 'LINKS_LOAD',
    payload: {
      request: {
        url: '/links',
      }
    }
  };
}
export function resizeTable(height, width, pos, id) {

    return {
    type: 'RESIZE_TABLE',
    payload: {
      request: {
        url: '/update-table/'+id,
        method: 'PUT',
        dataType: "json",
        data: {
          action: 'resize',
          height : height,
          width : width,
        }
      },
     height: height,
      width: width,
      pos : pos
    }
  };
}
export function positionTable(x, y, pos, id) {
  return {
    type: 'POSITION_TABLE',
    payload: {
      request: {
        url: '/update-table/'+id,
        method: 'PUT',
        dataType: "json",
        data: {
          action: 'relocate',
          x : x,
          y : y,
        }
      },

    }
  };
}
