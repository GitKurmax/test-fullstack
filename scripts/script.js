formValidation();

function formValidation() {
	let submitButton = document.querySelector('#submit');
	let inputText = document.querySelectorAll('.text');
	let messages = {
		empty: "This field is required",
		email:  "Email address is not valid"
		}

	submitButton.addEventListener('click', function(){
		let self = this;
		validate(messages,self);
		setTimeout(ifValid,100);
	});

	for(elem of inputText){
		elem.addEventListener('keydown', function(){
			let self = this;
			banСharacter(this);
		});
	}
}

function validateEmail(objMessages,elem){
	if(elem.value){
		var res = (/^[a-zA-Z-.1-9_]+@[a-z]+\.[a-z]{2,3}$/.test(elem.value));
	}else{
		return;
	}

	if(!res){
		elem.classList.toggle('required');
		elem.parentNode.lastElementChild.innerHTML = objMessages.email;
	}
}

function banСharacter(elem) {
	if(elem.dataset.validation === 'textarea'){
		return;
	}
	if(event.keyCode == 222){
		event.preventDefault();
	};
}

function validate(objMessages,button) {
	for(elem of document.forms.form){
		if (elem.classList.contains('required')) {
			elem.classList.toggle('required');
			elem.parentNode.lastElementChild.innerHTML = null;
		}
		if(elem === button||elem.dataset.validation === 'textarea'||elem.dataset.validation === 'gender'){
			continue;
		}
		if (elem.dataset.validation === "select"&&elem.selectedIndex == 0) {
			elem.classList.toggle('required');
			elem.parentNode.lastElementChild.innerHTML = objMessages.empty;
			continue;

		}
		if(elem.dataset.validation === 'email'){
			validateEmail(objMessages,elem);
		}
		if(elem.value == ''&&elem.dataset.validation != "select"){
			elem.parentNode.lastElementChild.innerHTML = objMessages.empty;
			elem.classList.toggle('required');
		}
	}
}

function ifValid(){
	let requiredArray = document.querySelectorAll(".required");
	if(!requiredArray.length){
		alert("Wow! Validation passed");
	}
}