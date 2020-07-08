const informations = document.querySelectorAll('.informations');
const buttonArrow = document.querySelectorAll('.button_arrow');
const change = document.querySelectorAll('.change');
const buttonChangeCansel = document.querySelector('.button_change.cansel');
const inputPassword = document.querySelector('.input_password');
const eye = document.querySelector('.eye');
const changeSeeHover = document.querySelector('.change.see_hover');
const textareaMistake = document.querySelector('.textarea_mistake');
const buttonSettingExit = document.querySelector('.button_setting.exit');
const sectionSetting = document.querySelector('.section_setting');
const blockSetting = document.querySelector('.block_setting');
const blockSettingPadding = document.querySelector('.block_setting_padding');
const buttonSettingAll = document.querySelectorAll('.button_setting');
const settingAll = document.querySelectorAll('.container_settings');
const checkboxAll = document.querySelectorAll('.checkbox_word');
const maxWordCardAll = document.querySelectorAll('.max_word_card');
const numberWords = document.querySelector('#maxNewWords');
const numberCards = document.querySelector('#maxCards');
const checkboxTranslation = document.querySelector('#wordTranslate');
const checkboxMeaning = document.querySelector('#textMeaning');
const checkboxUse = document.querySelector('#textExample');
const checkboxTranscription = document.querySelector('#transcription');
const checkboxImage = document.querySelector('#image');
const checkboxAnswer = document.querySelector('#showAnswer');
const checkboxDifficultGroup = document.querySelector('#difficultWords');
const checkboxDeleteWord = document.querySelector('#delete');
const checkboxAgain = document.querySelector('#again');
const checkboxHard = document.querySelector('#hard');
const checkboxAlright = document.querySelector('#alright');
const checkboxEasy = document.querySelector('#easy');
const repeatWord = document.querySelector('#repeat_word');
const onlyDifficultWords = document.querySelector('#onlyDifficultWords');
const themeLight = document.querySelector('#theme_light');
const temeDark = document.querySelector('#theme_dark');

let checkRepeatedClick;

let settings = {
	userFullName: "Иван Иванович Иванов",
	userEmail: "name@mail.com",
	userPassword: "",
	deleteUser: false,
	theme: "light",
	maxNewWords: 10,
	maxCards: 10,
	wordTranslate: true,
	textMeaning: true,
	textExample: true,
	transcription: true,
	image: true,
	showAnswer: true,
	difficultWords: true,
	delete: true,
	again: true,
	hard: true,
	alright: true,
	easy: true,
	repeatWords: true
	// onlyDifficultWords: false
};

reload();

function reload() {

	if (localStorage.length !== 0) {
		for (let i = 0; i < localStorage.length; i++) {

			for (key in settings) {
				key === localStorage.key(i) && (settings[key] = localStorage.getItem(key));
			}
		}
	}
	console.log(settings);
	changeChecboxChecked();
}



function setLocalstorage() {
	for (key in settings) {
		localStorage.setItem(`${key}`, settings[key]);
	}
}


// ----------------------reload change checked----------------------------------


function changeChecboxChecked() {

	maxWordCardAll.forEach(el => {
		for (key in settings) {
			if (el.id === key) {
				el.value = settings[key];
			}
		}
	})

	checkboxAll.forEach(el => {
		for (key in settings) {
			if (el.id === key && eval(`${settings[key]}`) === true) {
				el.checked = true;
			} else if (el.id === key && eval(`${settings[key]}`) === false) {
				el.checked = false;
			}
		}
	})

	if (settings.theme === "dark") {
		temeDark.checked = "on";
	} else {
		themeLight.checked = "on";
	}

	if (settings.repeatWords === eval(`${true}`)) {
		repeatWord.checked = "on";
	} else {
		onlyDifficultWords.checked = "on";
	}
}


// ---------------------------------------------------------------------------


informations.forEach((el, ind) => {
	el.addEventListener('click', () => openChangeBlock(ind));
});

function openChangeBlock(ind) {
	buttonArrow.forEach((el) => el.classList.remove('active'));
	change.forEach((el) => el.classList.remove('active'));

	if (checkRepeatedClick !== ind) {
		changeChecboxChecked();

		buttonArrow[ind].classList.add('active');
		change[ind].classList.add('active');

		informations[ind].classList.value === 'informations change_password' && (inputPassword.value = '');
		informations[ind].classList.value === 'informations report_error' && (textareaMistake.value = '');

		checkRepeatedClick = ind;
	} else {
		checkRepeatedClick = -1;
	}
}

// ----------------------work with button block_change_setting------------------------

change.forEach((el, ind) => {
	el.addEventListener('click', () => clickButtonBlockChangeSetting(ind));
});

function clickButtonBlockChangeSetting(ind) {
	if (event.target.className === 'button_change save_password') {
		openChangeBlock(ind);
		changePassword();

	} else if (event.target.className === 'button_change cansel') {
		openChangeBlock(ind);

	} else if (event.target.className === 'button_change delete') {
		openChangeBlock(ind);
		changeDeleteUser();

	} else if (event.target.className === 'button_change send') {
		openChangeBlock(ind);

	} else if (event.target.className === 'button_change save_number_words') {
		openChangeBlock(ind);
		changeMaxNewWords();

	} else if (event.target.className === 'button_change save_number_cards') {
		openChangeBlock(ind);
		changeMaxCards();

	} else if (event.target.className === 'button_change save_info_card') {
		openChangeBlock(ind);
		changeInfoCard();

	} else if (event.target.className === 'button_change save_learning_words') {
		openChangeBlock(ind);
		changeLearningWords();

	} else if (event.target.className === 'button_change save_button_cards') {
		openChangeBlock(ind);
		changeButtonCards();

	} else if (event.target.className === 'button_change save_button_page') {
		openChangeBlock(ind);
		changeButtonPage();

	} else if (event.target.className === 'button_change save_theme') {
		openChangeBlock(ind);
		changeTheme();
	}
}



// ---------------------change info-------------------------

function changeInfoCard() {
	settings.wordTranslate = checkboxTranslation.checked;
	settings.textMeaning = checkboxMeaning.checked;
	settings.textExample = checkboxUse.checked;
	settings.transcription = checkboxTranscription.checked;
	settings.image = checkboxImage.checked;
	console.log(settings.wordTranslate, settings.textMeaning, settings.textExample, settings.transcription, settings.image);
	setLocalstorage();
	changeChecboxChecked()

}

function changeMaxCards() {
	settings.maxCards = numberCards.value;
	setLocalstorage();
	console.log(settings.maxCards);
	changeChecboxChecked()
}

function changeMaxNewWords() {
	settings.maxNewWords = numberWords.value;
	setLocalstorage()
	console.log(settings.maxNewWords);
	changeChecboxChecked()
}

function changeButtonCards() {
	settings.showAnswer = checkboxAnswer.checked;
	settings.difficultWords = checkboxDifficultGroup.checked;
	settings.delete = checkboxDeleteWord.checked;
	console.log(settings.showAnswer, settings.difficultWords, settings.delete);
	setLocalstorage();
	changeChecboxChecked()

}

function changeButtonPage() {
	settings.again = checkboxAgain.checked;
	settings.hard = checkboxHard.checked;
	settings.alright = checkboxAlright.checked;
	settings.easy = checkboxEasy.checked;
	console.log(settings.again, settings.hard, settings.alright, settings.easy);
	setLocalstorage();
	changeChecboxChecked()

}

function changeLearningWords() {
	settings.repeatWords = repeatWord.checked;
	console.log(settings.repeatWords);
	setLocalstorage();
	changeChecboxChecked();

}

function changePassword() {
	settings.userPassword = inputPassword.value;
	console.log(settings.userPassword);
	setLocalstorage();
	changeChecboxChecked()

}

function changeDeleteUser() {
	settings.deleteUser = true;
	console.log(settings.deleteUser);
	setLocalstorage();
	changeChecboxChecked()

}

function changeTheme() {
	themeLight.checked ? settings.theme = "light" : settings.theme = "dark";
	console.log(settings.theme);
	setLocalstorage();
	changeChecboxChecked();


}



// ---------------------see password-------------------------

changeSeeHover.addEventListener('mouseover', seePassword);

function seePassword() {
	event.target.className === 'eye' ? (inputPassword.type = 'text') : (inputPassword.type = 'password');
}

// ---------------------close setting-------------------------

buttonSettingExit.addEventListener('click', closeSettingWindow);

function closeSettingWindow() {
	sectionSetting.classList.remove('active');
	blockSettingPadding.classList.remove('active');

	setTimeout(() => sectionSetting.classList.add('none'), 300);
}

// ------------------click button setting----------------------

buttonSettingAll.forEach((el, ind) => {
	el.classList.value === 'button_setting exit' || el.addEventListener('click', () => zzz(el, ind));
});

function zzz(el, ind) {
	buttonSettingAll.forEach((el) => el.classList.remove('active'));
	settingAll.forEach((el) => el.classList.remove('active'));

	el.classList.add('active');
	settingAll[ind].classList.add('active');
}

// ---------test----------

// const buttonOn = document.querySelector('.on');

// buttonOn.addEventListener('click', () => {
// 	sectionSetting.classList.remove('none');
// 	setTimeout(() => {
// 		sectionSetting.classList.add('active');
// 		blockSettingPadding.classList.add('active');
// 	}, 10);
// });



