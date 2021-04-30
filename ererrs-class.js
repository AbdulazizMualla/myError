class Errors{

  dbVersion = 1;
  dbName = 'myErrors';

  connect() {
      return new Promise((reslove , reject) => {
        const request = indexedDB.open(this.dbName , this.dbVersion);

        request.onupgradeneeded = () => {

            let db = request.result;

            if (!db.objectStoreNames.contains('errors')) {
                db.createObjectStore('errors' , {keyPath: 'id' , autoIncrement: true});
                db.createObjectStore('recordOperations' , {keyPath: 'id' , autoIncrement: true});
            }
        }
        request.onsuccess = () => reslove(request.result);
        request.onerror = () => reject(request.error.message);
        request.onbloced = () => console.log("Storage is blocked");
      })
  }

  async accessStore(accessType ,storeName){
    let connect = await this.connect();
    let tx = connect.transaction(storeName , accessType);
    return tx.objectStore(storeName);
  }
  async register(error){
    let store = await this.accessStore('readwrite' , 'errors');
    return store.add(error);
  }
  async costomSearsh(errorId){
    let store = await this.accessStore('readwrite' , 'recordOperations');
    return store.get(errorId)

  }

  async search(){
      let errors = await this.accessStore('readonly' , 'errors');
      return errors.openCursor(null , 'next')
  }
  async delete(errorId ,storeName){
    let store = await this.accessStore('readwrite' ,storeName);
    return store.delete(errorId);
  }
  async update(error , storeName){
    let store = await this.accessStore('readwrite' ,storeName);
    return store.put(error);
  }
  async recordOperations(error){
    let store = await this.accessStore('readwrite' , 'recordOperations');
    return store.add(error);
  }
  statistics(){

  }


}
