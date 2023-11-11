document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggleInputButton');
    const inputContainer = document.getElementById('inputContainer');
    const textInput = document.getElementById('textInput');

    toggleButton.addEventListener('click', () => {
        inputContainer.style.display = inputContainer.style.display === 'none' ? 'block' : 'none';
        if (inputContainer.style.display === 'block') {
            document.getElementById('textInput').focus();
        }
    });

    // Añade un listener para tu botón de hablar aquí
    speakButton.addEventListener('click', speakText);
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
