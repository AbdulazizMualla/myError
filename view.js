const ErrorObj = new Errors();

let idError = sessionStorage.getItem('idObjView');

window.onload = () => {viewError(); costomSearsh();}

let elementErrorMessage = document.getElementById('errorMessage');
let elementFixError = document.getElementById('fixErerr');
let elementprogrammingLanguagelist = document.getElementById('programmingLanguagelist');
let elementBtnUpdate = document.getElementById('btnUpdate');
let elementBtnDelete = document.getElementById('btnDelete');
let elementBtnSaveChange = document.getElementById('btnSaveChange');
let dateRegister;
let btnInForm = 0;



btnUpdate.onclick = ()=>{
      btnInForm = 1;
    }

btnSaveChange.onclick = ()=>{
      btnInForm = 2;
    }


btnDelete.onclick = ()=>{
      btnInForm = 3;
    }


document.addEventListener('submit' , (e) => {

        e.preventDefault();
        let {target} = e;

        if (target && target.classList.contains('viewForm') && btnInForm === 1 ) {

            elementErrorMessage.removeAttribute('readonly');
            elementFixError.removeAttribute('readonly');
            elementprogrammingLanguagelist.removeAttribute('disabled');
            elementBtnSaveChange.removeAttribute('hidden');
            elementBtnUpdate.setAttribute('hidden',true);
            elementBtnDelete.setAttribute('hidden',true);

        }else if (target && target.classList.contains('viewForm') && btnInForm === 2) {
              let upError = {
                              errorMessage: elementErrorMessage.value,
                              fixErerr: elementFixError.value,
                              programmingLanguage:elementprogrammingLanguagelist.value,
                              id: parseInt(idError),
                              dateRegister: dateRegister
                            }
              updateError(upError , 'errors');


        }else if (target && target.classList.contains('viewForm') && btnInForm === 3) {
              deleteError(idError);



        }

    });

async function updateRecord(idError){
        let request = await ErrorObj.costomSearsh(parseInt(idError));
        let dateUpdate = new Date();
        request.onsuccess = ()=>{
          let recordOperations = request.result;

          recordOperations.push({
            dateRegister: Date.parse(dateUpdate),
            state: "Update"
          });
          updateError(recordOperations , 'recordOperations')
        }
      }

async function updateError(error ,storeName){
          if (error.errorMessage === "") {
            elementErrorMessage.style.border =  "1px solid red"
          }else {
            let updateRequest = await ErrorObj.update(error ,storeName);

            updateRequest.onsuccess = ()=> {
              if (storeName === 'errors') {
                updateRecord(idError);

              }else {
                costomSearsh()
              }

              elementErrorMessage.setAttribute('readonly' ,true);
              elementFixError.setAttribute('readonly' ,true);
              elementprogrammingLanguagelist.setAttribute('disabled' ,true);
              elementBtnSaveChange.setAttribute('hidden' ,true);
              elementBtnUpdate.removeAttribute('hidden');
              elementBtnDelete.removeAttribute('hidden');
              elementErrorMessage.style.border =  "1px solid rgba(0, 0, 0, 0.1)";
            }
          }

      }
async function deleteErrorRecord (errorId) {
      let deleteRecord = await ErrorObj.delete(parseInt(idError) ,'recordOperations');

      deleteRecord.onsuccess = ()=> {
        window.document.location = './search.html';
      }
      deleteRecord.onerror = () => {deleteErrorRecord (errorId);}
}

async function deleteError(errorId){
        if (confirm('Are you sure?')) {
            let deleteRequest = await ErrorObj.delete(parseInt(idError) ,'errors');

            deleteRequest.onsuccess = ()=> {
              deleteErrorRecord (errorId);

            }
            deleteRequest.onerror = ()=> {
              alert('Error while delete');
            }
        }else {
          return false;
        }
      }

async function viewError(){

        let request = await ErrorObj.search();
        let errorArray = [];
        request.onsuccess = () => {
          let cursor = request.result;
          if (cursor) {
            errorArray.push(cursor.value);
            cursor.continue();
          }else {

            let foundError = errorArray.filter(item => item.id == idError );
            errorArray = foundError;
            displayViweError(errorArray);
          }
        }
      }
async function costomSearsh(){
  let request = await ErrorObj.costomSearsh(parseInt(idError));
      request.onsuccess = ()=> {
        let requestResult = request.result;
        let tbody = document.getElementById('tbodyView');
        tbody.innerHTML = '';
        for (var i = 0; i < requestResult.length; i++) {
          let tr = document.createElement('tr');
          let record = requestResult[i];
          let date = new Date(record.dateRegister);
        
          tr.innerHTML = `
                            <td>${record.state}</td>
                            <td>${date.getFullYear()+'-' +
                            (date.getMonth() + 1)+'-' +date.getDate()+' '
                            +date.getHours()+':'+ date.getMinutes()+':'+date.getSeconds()}</td>
                          `
                            tbody.append(tr)
        }

      }

}

function displayViweError (errorArray){
        let errorMessage = elementErrorMessage;
        errorMessage.value = errorArray[0].errorMessage;
        let fixErerr = elementFixError;
        fixErerr.value = errorArray[0].fixErerr;
        let programmingLanguagelist = elementprogrammingLanguagelist;
        programmingLanguagelist.value = errorArray[0].programmingLanguage;
        dateRegister = errorArray[0].dateRegister

      }
