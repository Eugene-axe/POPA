'use strict'

function handleFile(file){
	//console.log(file);
	//удаляем не нужное
	dropZone.removeEventListener('drop', dropEvent );
	dropZone.removeEventListener('click', clickFileEvent);
	dropZone.remove();
	fileInput.remove();
	
	const reader = new FileReader();
	reader.readAsText(file , 'windows-1251');
	reader.addEventListener('load' , readerHandler);
	function readerHandler(){
		protocol = workingWithProtocol(reader.result);
		createTable(protocol);
		initialPanelListener();
		initialFooterListener();
	}	
}