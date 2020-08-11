'use strict'

function createTable(arrayParametrs) {
    const table = document.createElement('div');
    const tableDate = document.createElement('div');
    table.classList.add('table');
    tableDate.classList.add('table-data');
    document.querySelector('.page').appendChild(table);
    const cap = `<div class="table-cap row">
        <div class="td number">№</div>
        <div class="td name"> Параметр</div>
        <div class="td nominal">Номинал</div>
        <div class="td rangePlus">Допуск +</div>
        <div class="td rangeMinus">Допуск -</div>
        <div class="td measure">Измеренное</div>
        <div class="td deviance">Отклонение</div>
        <div class="td status">Годность</div>
        </div>`
    table.insertAdjacentHTML( 'afterbegin' , cap);
    table.appendChild(tableDate);
    arrayParametrs.forEach(parametr => {
        tableDate.appendChild(createRow(parametr));
    });
    table.prepend( createPanel() );
    table.appendChild ( createFooterMenu() )
};

function createRow(parametr){
    let percent = detectedPercent(parametr.deviance, parametr.rangePlus, parametr.rangeMinus, parametr.status);
    const row = document.createElement('div');
    row.classList.add('row');
    row.setAttribute('data-number' , parametr.number);
    row.setAttribute('data-deviance' , Number(parametr.deviance));
    row.setAttribute('data-percent' , percent);
    row.style.backgroundColor = detectedColor( parametr.deviance , percent, parametr.status );
    row.insertAdjacentHTML( 'afterbegin', `
		<div class="td number" title='Номер : ${parametr.number} '>${parametr.number}</div>
		<div class="td name" title='Имя : ${parametr.name}'>${parametr.name}</div>
		<div class="td nominal" title='Номинал : ${parametr.nominal}'>${parametr.nominal}</div>
		<div class="td rangePlus" title='Допуск в плюс : ${parametr.rangePlus}'>${parametr.rangePlus}</div>
		<div class="td rangeMinus" title='допуск в минус : ${parametr.rangeMinus}'>${parametr.rangeMinus}</div>
		<div class="td measure" title='Измеренное значение : ${parametr.measure}'>${parametr.measure}</div>
		<div class="td deviance" title='Отклонение : ${parametr.deviance}'>${parametr.deviance}</div>
		<div class="td status" title='Годность : ${parametr.status}'>${parametr.status}</div>`
    );
    return row;
};


function detectedColor(dev, percent, status) { 
    dev = Number(dev);
    let hue = /ГОДЕН/ig.test(status) ?  `140` : `0`;
    if (dev) {
        hue = dev >= 0 ? 140-percent*120/100 : 140-percent*120/100;
    }
    return `hsla(${hue}, 100% , 40%, .4)`;
}

function detectedPercent(dev, plus , minus, status) { 
    if (!dev) {
        return /не/ig.test(status) ?  100 : 0;
    }
    dev = Number(dev);
    minus = Number(minus);
    plus = Number(plus);
    return Math.floor(dev >= 0 ? dev/plus*100 : dev/minus*100); 
}

