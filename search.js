const ErrorObj = new Errors();

window.onload = searchError;

document.addEventListener('submit' , (e) => {
    e.preventDefault();
    let target = e.target
    if (target && target.classList.contains('searchForm')) {
        searchError ();
    }
  });

  document.addEventListener('click', (e) =>{

    let {target} = e;
    if (target && target.classList.contains('imgView')) {

            sessionStorage.setItem('idObjView' , target.id)
             window.document.location = './viweError.html';
    }else if (target && target.classList.contains('btnreset')) {
      document.querySelector('.searchForm').reset();

    }
  });

  document.addEventListener('change' , (e)=>{
    let {target} = e;
    if (target && target.classList.contains('checkboxCoutomSearsh')) {
      if (!target.checked) {
        window.location.reload();

      }else {
         document.querySelector('.searchForm').removeAttribute('hidden');
      }
      }


  });

async function searchError (){
  let searchErrorMessage = document.querySelector('#searchErrorMessage');
  let searchErrorMessageValue = searchErrorMessage.value;
  let searchProgrammingLanguagelist = document.querySelector('#searchProgrammingLanguagelist');
  let searchProgrammingLanguagelistValue = searchProgrammingLanguagelist.value;
  let searchDate = document.querySelector('#searchDate');
  let searchDateValue = searchDate.value;
  let request = await ErrorObj.search();
  let errorArray = [];
  request.onsuccess = () => {
    let cursor = request.result;
    if (cursor) {
      errorArray.push(cursor.value);
      cursor.continue();
    }else {
      if (searchErrorMessageValue !== '') {
        let foundErrorMessage = errorArray.filter(item =>
          item.errorMessage.toLocaleLowerCase().replace(/\s/g,'') ===
          searchErrorMessageValue.toLocaleLowerCase().replace(/\s/g,''));
        errorArray = foundErrorMessage;
      }
      if (searchProgrammingLanguagelistValue !== '' && searchProgrammingLanguagelistValue !== 'None') {
        let fundProgrammingLanguage = errorArray.filter(item => item.programmingLanguage === searchProgrammingLanguagelistValue);
        errorArray = fundProgrammingLanguage;
      }
      if(searchDateValue !== ''){
        let foundsearchDate = errorArray.filter(item => new
          Date(item.dateRegister).getFullYear() == searchDateValue.split('-')[0]).filter(item => new
             Date(item.dateRegister).getMonth() +1 === parseInt(searchDateValue.split('-')[1])).filter(item => new
                Date(item.dateRegister).getDate() === parseInt(searchDateValue.split('-')[2]));;
        errorArray = foundsearchDate;
      }

       displayError(errorArray);
    }
  }
}

function displayError(errors){
      let tbodyId = document.getElementById('tbodySearsh');
      tbodyId.innerHTML = '';
  for (var i = 0; i < errors.length; i++) {
    let tr = document.createElement('tr');
    let error = errors[i];
    let dateTime = new Date(error.dateRegister);

        tr.innerHTML = `
                        <td>${error.errorMessage}</td>
                        <td>${error.fixErerr}</td>
                        <td>${error.programmingLanguage}</td>
                        <td>${dateTime.getFullYear()}/${dateTime.getMonth()+1}/${dateTime.getDate()}</td>
                        <td>${error.id}</td>
                        <td><img id='${error.id}' class="imgView" src="images/btnSearsh.png"></td>
                        `
        tbodyId.append(tr);
  }
}
