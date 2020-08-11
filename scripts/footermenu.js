'use strict'

function createFooterMenu(){
    const footer = document.createElement('div');
    footer.classList.add('footer');
    footer.insertAdjacentHTML('afterbegin' , `
        <div class="cap">Поиск</div>
        <label for="num-parametr">Найти параметр : 
            <input type="number" id="num-parametr">
        </label>
        <span>
            <label for="num-parametr-range1">Найти диапазон параметров : 
                <input type="number" id="num-parametr-range1"> </label>
                 - 
                <input type="number" id="num-parametr-range2">
                <span class="button-search">&#128269</span>
        </span>`);
    return footer;
} 

function initialFooterListener() {
    const inputOneParam = document.getElementById('num-parametr');
    const inputOneRange = document.getElementById('num-parametr-range1');
    const inputTwoRange = document.getElementById('num-parametr-range2');
    const inputButton = document.querySelector('.button-search');
    inputOneParam.addEventListener('input' , handlerOneInputSearch);
    inputOneRange.addEventListener('input' , handlerTwoInputSearch )
    inputTwoRange.addEventListener('input' , handlerTwoInputSearch )
    inputButton.addEventListener('click' , handlerTwoInputSearch )

}

function handlerOneInputSearch(event){
    seeAllRows();
    clearInput();
    let number = event.target.value;
    let rows = document.querySelectorAll('.table-data .row');
    if (number === '') return false 
        for (let row of rows) {
            if (row.dataset.number !== number) {
                row.style.display = 'none';
            }
        }
    return true;
}

function handlerTwoInputSearch(event) {
    seeAllRows();
    document.getElementById('num-parametr').value = '';
    const one = document.getElementById('num-parametr-range1');
    const two = document.getElementById('num-parametr-range2');
    const rows = document.querySelectorAll('.table-data .row');
    if (one.value === '' && two.value === '' ) return false;
    if (one.value === '') one.value = 0;
    if (two.value === '') two.value = 9999;
    for (let row of rows) {
        if ( +row.dataset.number <= +one.value || +row.dataset.number >= +two.value) row.style.display = 'none';
    }
    return true;
}

function seeAllRows(){
    const rows = document.querySelectorAll('.table-data .row');
    for (let row of rows) {
        row.style.display = 'grid';
    }
}

function clearInput() {
    const one = document.getElementById('num-parametr-range1');
    const two = document.getElementById('num-parametr-range2');
    one.value = '';
    two.value = '';
}