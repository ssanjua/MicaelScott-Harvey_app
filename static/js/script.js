document.addEventListener('DOMContentLoaded', (event) => {
    const toggleInputButton = document.getElementById('toggleInputButton');
    const toggleVisibilityButton = document.getElementById('toggleVisibilityButton');
    const inputContainer = document.getElementById('inputContainer');
    const textInput = document.getElementById('textToSpeak');
    const harveySleep = document.getElementById('harveySleep');
    const harveyMouthClosed = document.getElementById('harveyMouthClosed');
    const harveyMouthOpen = document.getElementById('harveyMouthOpen');
    
    toggleInputButton.addEventListener('click', () => {
        if (inputContainer.classList.contains('input-encogido')) {
            inputContainer.classList.remove('input-encogido');
            inputContainer.style.width = "100%";
            
            setTimeout(() => {
                toggleVisibilityButton.style.display = "inline-block"; 
                textInput.focus(); 
            }, 300); // transition
        } else {
            inputContainer.classList.add('input-encogido');
            inputContainer.style.width = "95px"; 
            toggleVisibilityButton.style.display = "none"; 
        }

        // Harvey
        harveyMouthClosed.style.display = inputContainer.classList.contains('input-encogido') ? 'none' : 'block';
        harveySleep.style.display = inputContainer.classList.contains('input-encogido') ? 'block' : 'none';
        harveyMouthOpen.style.display = 'none'; 
    });

    toggleVisibilityButton.addEventListener('click', () => {
        const isTextVisible = textInput.type === 'text';
        textInput.type = isTextVisible ? 'password' : 'text';
        toggleVisibilityButton.innerHTML = isTextVisible ? '&#128584;' : '&#128065;'; 
        textInput.focus(); 
    });

    textInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            speakText(textInput.value);
            event.preventDefault(); 
        }
    });

    document.querySelectorAll('.try-button').forEach(button => {
        button.addEventListener('click', function() {
            const textToSay = this.previousElementSibling.value; 
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