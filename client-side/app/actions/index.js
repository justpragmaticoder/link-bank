export function update() {
  return {
    type: 'UPDATE_TABLES',
    payload: true,
  }
}
export function loadTables() {
  return {
    type: 'TABLES_LOAD',
    payload: {
      request: {
        url: '/tables/' + localStorage.getItem('userId'),
      }
    }
  }
}
export function loadLinks() {
  return {
    type: 'LINKS_LOAD',
    payload: {
      request: {
        url: '/links/' +localStorage.getItem('userId'),
      }
    }
  };
}
export function deleteLink(id) {
  console.log('deleted' + id);
  return {
    type: 'LINK_DELETE',
    payload: {
      request: {
        url: '/delete-url/' + id,
        method: 'POST',
      }
    }
  };
}
export function deleteTable(id) {
  return {
    type: 'TABLE_DELETE',
    payload: {
      request: {
        url: '/delete-table/' + id,
        method: 'DELETE',
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
      pos: pos,
    }
  };
}
export function positionTable(x, y, id) {
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
