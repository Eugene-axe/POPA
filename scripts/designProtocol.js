'use strict'

//Модуль обработки текста протокола. Вход txt , на выход получаем массив объектов параметров.

function workingWithProtocol(protocol){
	const protocolSplitObjectsParams = []; //массив объектов параметров созданный из разделения исходного текста протокола на строки-параметры.
	let arrayParametrs = prepareProtocol (protocol);
	arrayParametrs.forEach( item => protocolSplitObjectsParams.push(createObjectParametr(item)) ); // перебираем строчные параметры, заполняем массив объектов-параметров
	return check(protocolSplitObjectsParams) ? protocolSplitObjectsParams : 'sorry, protocol not prepared';
}

function prepareProtocol (protocol) {
	let arrayFromFileProtocol = protocol.split('Параметр').
		filter( (item , index) => index != 0).
		map( item => {
			return item.split('\n').
			filter( item => item != 0).
			filter(item => item.match(/№/) || item.match(/-?\d\d?.\d\d\d/)).
			join(' ');
		} ); // тест протокола поделен на слово Параметр
	return arrayFromFileProtocol;
}

function createObjectParametr(arrayItem){   // принимает строку-параметра и возвращает объект-параметр	
	let objectParametr = {};
	let stringWithNumberPlusStatus = arrayItem.match(/( (-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(-?\d*\d.\d\d\d)\s+(\w+|[а-я/*]+)\s+((НЕ.+ГОДЕН)||(ГОДЕН))*)|(Н*Е*\s+ГОДЕН)/ui);
	objectParametr.number = Number(arrayItem.match(/№(\s+)*\d+/g)[0].match(/\d+/g)[0]);
	objectParametr.name = arrayItem.match(/( ')\s*.+\s*(' )/)[0].match(/[^']/g).join('').trim();
	objectParametr.nominal = stringWithNumberPlusStatus[2]||'';
	objectParametr.rangePlus = Number(stringWithNumberPlusStatus[3])||'';
	objectParametr.rangeMinus = Number(stringWithNumberPlusStatus[4])||'';
	objectParametr.measure = Number(stringWithNumberPlusStatus[5])||'';
	objectParametr.deviance = stringWithNumberPlusStatus[6]||'';
	objectParametr.pointMeasurment = stringWithNumberPlusStatus[7]||'';
	objectParametr.status = stringWithNumberPlusStatus[8]||stringWithNumberPlusStatus[11]||'см.ниже';
	return objectParametr;
}


function check(arrayObjs){
	console.group('Проверяется следующий массив объектов параметров');
	console.log(arrayObjs);
	let flag = true;
	let error = false;
	arrayObjs.forEach( item => {
		if (typeof(item.number) !== 'number') { flag = false; error = `#${item.number} number ${item.number}`};
		if (typeof(item.name) !== 'string') { flag = false; error = `#${item.number} name ${item.name}`};
		if ( item.nominal && typeof(item.nominal) !== 'string') { flag = false; error = `#${item.number} nominal ${item.nominal}`};
		if ( item.rangePlus && typeof(item.rangePlus) !== 'number') { flag = false; error = `#${item.number} rangePlus ${item.rangePlus}`};
		if ( item.rangeMinus && typeof(item.rangeMinus) !== 'number') { flag = false; error = `#${item.number} rangeMinus ${item.rangeMinus}`};
		if ( item.measure && typeof(item.measure) !== 'number') { flag = false; error = `#${item.number} measure ${item.measure}`};
		if ( item.deviance && typeof(item.deviance) !== 'string') { flag = false; error = `#${item.number} deviance ${item.deviance}`};
		if (item.pointMeasurment && typeof(item.pointMeasurment) !== 'string') { flag = false; error = `#${item.number} status ${item.status}`};
		if (typeof(item.status) !== 'string') { flag = false; error = `#${item.number} status ${item.status}`};
	});
	console.log( flag ? 'Well done!! Protocol split of parametrs is good!' : `bad and sad (error: ${error})` );
	return flag;
}






