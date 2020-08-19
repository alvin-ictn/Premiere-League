import {openDB} from 'idb';

const dbPromised = openDB('football-info', 1, {
  upgrade(db) {
    const store = db.createObjectStore('favorite', {
      keyPath: 'id'
    });
    store.createIndex('name', 'name', { unique: false });
  }
});

function saveFavorite(team) {
  dbPromised
    .then( db => {
      // Define Transaction
      const tx = db.transaction("favorite", "readwrite");
      // Define StoreName
      const store = tx.objectStore("favorite");
      // Add Data 'favorite' to objectStore 'favorite'
      store.put(team);
      return tx.complete;
    })
    .then( () => {
      M.toast({
        html: `
          <span> Berhasil Menyimpan </span>
        `,
        completeCallback: () => {
          window.location.replace('#favorite');
          location.reload();
        },
        displayLength:1000
      });
    })
    .catch( error => {
      console.log(`Gagal Menyimpan ${error}`);
    })
}

// Get All Data from Database
function getAllSaved() {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( db => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");
        //console.log(store)
        return store.getAll();
      })
      .then( team => {
        resolve(team);
      });
  });
}

function getByIdSaved(id) {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( db => {
        var tx = db.transaction("favorite", "readonly");
        var store = tx.objectStore("favorite");
        return store.get(parseInt(id));
      })
      .then( team => {
        resolve(team);
      });
  });
}

function deleteFavorite(id) {
  return new Promise( (resolve, reject) => {
    dbPromised
      .then( db => {
        var tx = db.transaction("favorite", "readwrite");
        var store = tx.objectStore("favorite");

        return store.delete(parseInt(id));
      })
      .then( team => {
        M.toast({
          html: `Berhasil Menghapus`,
          completeCallback: () => {
            window.history.go(-1)
          },
          displayLength:1000
        });
        resolve(team);
      })
      .catch( error => {
        console.log(`Gagal Menghapus ${error}`);
      });
  });
}

export {saveFavorite, getAllSaved, getByIdSaved, deleteFavorite}
