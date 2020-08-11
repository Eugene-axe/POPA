'use strict'

function createPanel(){
    let panel = document.createElement('div');
    panel.classList.add('panel');
    panel.insertAdjacentHTML('afterbegin' , `<div class="polzunok">
    <input type="range" max='100' min='0' value='0'>
</div>
<div class="box-gradation">
    <div class="bg-td" data-grad='1'><label for="chkbx1"><input type='radio' name='inpr' value='0' id="chkbx1"  checked>I</label></div>
    <div class="bg-td" data-grad='2'><input type='radio' name='inpr' value='20' ><label>II</label></div>
    <div class="bg-td" data-grad='3'><input type='radio' name='inpr' value='40' ><label>III</label></div>
    <div class="bg-td" data-grad='4'><input type='radio'  name='inpr'value='60' ><label>IV</label></div>
    <div class="bg-td" data-grad='5'><input type='radio' name='inpr' value='80' ><label>V</label></div>
</div>`);
    return panel;
}

function initialPanelListener(){
    let polzun = document.querySelector('.polzunok input');
    polzun.addEventListener('change' , polzunEvent);
    let boxGradation = document.querySelectorAll('.bg-td input');
    for (let box of boxGradation) {
        box.addEventListener('change' , gradationEvent);
    }
}

function polzunEvent(event){
    console.log(event.target.value);
    document.querySelector('#chkbx1').checked='checked';
    const rows = document.querySelectorAll('.table-data .row');
    for (let row of rows) {
        row.style.display = 'grid';
        if ( +row.dataset.percent < +event.target.value) row.style.display = 'none';
    }
}

function gradationEvent(event){
    console.log(event);
    document.querySelector('.polzunok input').value = 0;
    hide(+event.target.value);
    

    function hide(range){
        let rows = document.querySelectorAll('.table-data .row');
        for (let row of rows) {
            row.style.display='none';
            console.log(row);
            console.log((+row.dataset.percent + '  :  ' + range ))
            if (+row.dataset.percent > range ) {
                row.style.display='grid';
            }
        }
    }
}