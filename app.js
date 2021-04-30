const ErrorObj = new Errors();

 

document.addEventListener('submit' , (e) => {
  e.preventDefault();
  let target = e.target
  if (target && target.classList.contains('registerForm')) {
    registerError(target)
  }

});
document.addEventListener('click', (e) =>{

  let {target} = e;

  if (target && target.classList.contains('btnBack')) {
    window.location.reload();
  }else if (target && target.classList.contains('viewBtn')) {
     window.document.location = './viweError.html';
  }
});



async function registerError(target){
  let errorMessage = target.querySelector('#errorMessage');
  let errorMessageValue = errorMessage.value;
  let fixErerr = target.querySelector('#fixErerr');
  let fixErerrValue = fixErerr.value;
  let programmingLanguage = target.querySelector('#programmingLanguagelist');
  let programmingLanguageValue = programmingLanguage.value;
  let dateRegister = new Date();
  let parseDate = Date.parse(dateRegister);
  if (errorMessageValue === "") {
     document.getElementById('showErrorMessage').style.color = 'red'
    document.getElementById('showErrorMessage').innerHTML = '*Error Message Field is required'
    errorMessage.style.border =  "1px solid red" ;
  }else {
    let register = await ErrorObj.register({
       errorMessage: errorMessageValue,
       fixErerr: fixErerrValue,
       programmingLanguage: programmingLanguageValue,
       dateRegister:parseDate
     });
     register.onsuccess = () => {
       let recordOperations =  ErrorObj.recordOperations([{
         dateRegister:parseDate,
         state: 'Register'
       }]);
       document.querySelector('.registerForm').setAttribute('hidden',true);
       document.querySelector('#imgRegasterDone').removeAttribute('hidden')
       document.querySelector('.viewBtn').removeAttribute('hidden')
       document.querySelector('.btnBack').removeAttribute('hidden')
       document.getElementById('showErrorMessage').style.color = 'green'
       document.getElementById('showErrorMessage').innerHTML = 'Successfully registered'
       errorMessage.value = '';
       fixErerr.value = '';
       programmingLanguage.value = '';
       errorMessage.style.border =  "1px solid rgba(0, 0, 0, 0.1)";
       sessionStorage.setItem('idObjView' , register.result)


     }
  }
}
