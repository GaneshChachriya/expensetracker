function saveToLocalStorage(event){
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const catagory = event.target.catagory.value;

    const obj ={
        amount, description, catagory
    }
    localStorage.setItem(obj.description, JSON.stringify(obj));
    showDetailsOnScreen(obj)
}

window.addEventListener("DOMContentLoader", () => {
    const localStorageObj = localStorage;
    const localStorageKeys = Object.keys(localStorageObj)
    for(var i=0; i<localStorageKeys.length; i++) {
        const key = localStorageKeys[i]
        const DetailsString = localStorageObj[key];
        const DetailsObj = JSON.parse(DetailsString);
        showDetailsOnScreen(DetailsObj)
    }
})
function showDetailsOnScreen(detail){
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('catagory').value = '';
    if(localStorage.getItem(detail.description) !== null){
        removeDetailsFromScreen(detail.description)
    }
    const parentNode = document.getElementById('ExpenseDetails');
    const childHTML = `<li id=${detail.description}> ${detail.amount} - ${detail.description} <button onclick=deleteDetails('${detail.description}')> Delete Details </button>
    <button onclick = editDetails('${detail.description}', '${detail.amount}', '${detail.catagory}')>Edit Details </button></li>`
    parentNode.innerHTML = parentNode.innerHTML + childHTML; 
}
function editDetails(amount, description, catagory){
    document.getElementById('amount').value = amount;
    document.getElementById('description').value = description;
    document.getElementById('catagory').value = catagory;
    deleteDetails(description);
}
function deleteDetails(description){
    console.log(description);
    localStorage.removeItem(description);
    removeDetailsFromScreen(description);
}
function removeDetailsFromScreen(description){
    const parentNode = document.getElementById('ExpenseDetails');
    const childNodeToBeDeleted = document.getElementById(description);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }
}