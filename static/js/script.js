document.addEventListener('DOMContentLoaded', (event) => {
    const toggleInputButton = document.getElementById('toggleInputButton');
    const toggleVisibilityButton = document.getElementById('toggleVisibilityButton');
    const inputContainer = document.getElementById('inputContainer');
    const textInput = document.getElementById('textToSpeak');
    let isInputVisible = false;

    toggleInputButton.addEventListener('click', () => {
        isInputVisible = !isInputVisible;
        inputContainer.style.display = isInputVisible ? 'block' : 'none';
        if (isInputVisible) {
            textInput.focus();
        }
    });

    toggleVisibilityButton.addEventListener('click', () => {
        if (textInput.type === 'text') {
            textInput.type = 'password';
            toggleVisibilityButton.innerHTML = '&#128584;'; // Ojo abierto
        } else {
            textInput.type = 'text';
            toggleVisibilityButton.innerHTML = '&#128065;'; // Ojo cerrado (o cualquier otro icono que prefieras)
        }
        textInput.focus(); // Mantener el foco en el input
    });

    textInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            speakText();
            event.preventDefault(); // Prevenir cualquier acción predeterminada del Enter
        }
    });
});


function speakText() {
    var text = document.getElementById('textToSpeak').value;
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(text);
    var harveyMouthClosed = document.getElementById('harveyMouthClosed');
    var harveyMouthOpen = document.getElementById('harveyMouthOpen');

    utterance.onstart = function(event) {
        harveyMouthClosed.style.display = 'none';
        harveyMouthOpen.style.display = 'block';
    };

    utterance.onend = function(event) {
        harveyMouthOpen.style.display = 'none';
        harveyMouthClosed.style.display = 'block';
    };

    synth.speak(utterance);
}