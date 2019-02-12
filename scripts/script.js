formValidation();

function formValidation() {
	let submit = document.querySelector('#submit');
	let inputText = document.querySelectorAll('.text');
	let birth = document.querySelector('#birth');
	let gender = document.querySelectorAll('.gender');
	let email = document.querySelector('#email');
	let password = document.querySelector('#password');
	let messages = {
		empty: "This field is required",
		email:  "Email address is not valid"
	}
	
	submit.addEventListener('click', function(){
		let self = this;
		validateEmpty(messages,self);
		validateEmail(messages,email);
		ifValid();
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
	if(event.target.tagName === 'TEXTAREA'){
		return;
	}
	if(event.keyCode == 222){
		event.preventDefault();
	};
}

function validateEmpty(objMessages,button) {
	for(elem of document.forms.form){
		if (elem.classList.contains('required')) {
			elem.classList.toggle('required');
			elem.parentNode.lastElementChild.innerHTML = null;
		}
		if(elem === button||elem.tagName === 'TEXTAREA'){
			continue;
		}
		if (elem.tagName === "SELECT"&&elem.selectedIndex == 0) {
			elem.classList.toggle('required');
			elem.parentNode.lastElementChild.innerHTML = objMessages.empty;
			continue;

		}
		if(elem.className === 'gender'){
			continue;
		}
		if(elem.value == ''&&elem.tagName != "SELECT"){
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