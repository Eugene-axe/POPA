'use strict'

function initial(){
	prepare();
	setInitialListener();
}

function prepare(){//отключаем события drop по умолчанию у документа
	D.addEventListener('dragover' , event => event.preventDefault());
	D.addEventListener('drop' , event => event.preventDefault());
}

/* vvvvvv Initial Listener   vvvvv  */
function setInitialListener(){
	dropZone.addEventListener('drop' , dropEvent);
	dropZone.addEventListener('click' , clickFileEvent);
}
function dropEvent (event) {
	event.preventDefault();
	file = event.dataTransfer.files[0];
	handleFile(file);
};
function clickFileEvent() {
	fileInput.click();
	fileInput.addEventListener('change' , ()=>{
		file = fileInput.files[0];
		handleFile(file);
	});
}
/* ^^^^^^ Initial Listener   ^^^^^  */

initial();