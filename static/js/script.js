document.addEventListener('DOMContentLoaded', (event) => {
    const toggleInputButton = document.getElementById('toggleInputButton');
    const toggleVisibilityButton = document.getElementById('toggleVisibilityButton');
    const inputContainer = document.getElementById('inputContainer');
    const textInput = document.getElementById('textToSpeak');
    const harveySleep = document.getElementById('harveySleep');
    const harveyMouthClosed = document.getElementById('harveyMouthClosed');
    const harveyMouthOpen = document.getElementById('harveyMouthOpen');
    
    let isInputVisible = false;

    toggleInputButton.addEventListener('click', () => {
        isInputVisible = !isInputVisible;
        inputContainer.style.display = isInputVisible ? 'block' : 'none';
        harveySleep.style.display = isInputVisible ? 'none' : 'block';
        harveyMouthClosed.style.display = isInputVisible ? 'block' : 'none';
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
        textInput.focus(); 
    });

    textInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            speakText(textInput.value);
            event.preventDefault(); // Prevenir cualquier acción predeterminada del Enter
        }
    });

    document.querySelectorAll('.try-button').forEach(button => {
        button.addEventListener('click', function() {
            var textToSay = this.previousElementSibling.value; // Obtiene el valor del input hermano anterior
            speakText(textToSay);
        });
    });
});

function speakText(text) {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance(text);
    var harveySleep = document.getElementById('harveySleep');
    var harveyMouthClosed = document.getElementById('harveyMouthClosed');
    var harveyMouthOpen = document.getElementById('harveyMouthOpen');
    var intervalId;

    harveySleep.style.display = 'none';
    harveyMouthClosed.style.display = 'block';

    utterance.onstart = function(event) {
        harveyMouthClosed.style.display = 'none';
        harveyMouthOpen.style.display = 'block';
    };

    intervalId = setInterval(function() {
        harveyMouthOpen.style.display = harveyMouthOpen.style.display === 'none' ? 'block' : 'none';
        harveyMouthClosed.style.display = harveyMouthClosed.style.display === 'none' ? 'block' : 'none';
    }, 200);

    utterance.onend = function(event) {
        clearInterval(intervalId);
        harveyMouthOpen.style.display = 'none';
        harveyMouthClosed.style.display = 'block';
    };

    synth.speak(utterance);
}
