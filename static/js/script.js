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
            inputContainer.style.width = "100%"; // Expande
            // Esperamos a que se complete la animación antes de mostrar el botón de visibilidad
            setTimeout(() => {
                toggleVisibilityButton.style.display = "inline-block"; // O // Muestra el botón
                textInput.focus(); // Enfoca el input
            }, 300); // Ajusta este tiempo al de la duración de tu transición
        } else {
            inputContainer.classList.add('input-encogido');
            inputContainer.style.width = "50px"; // Encoge
            toggleVisibilityButton.style.display = "none"; // Oculta el botón usando Bootstrap class
        }

        // Actualiza la visibilidad de Harvey
        harveyMouthClosed.style.display = inputContainer.classList.contains('input-encogido') ? 'none' : 'block';
        harveySleep.style.display = inputContainer.classList.contains('input-encogido') ? 'block' : 'none';
        harveyMouthOpen.style.display = 'none'; // La boca abierta siempre oculta
    });

    toggleVisibilityButton.addEventListener('click', () => {
        const isTextVisible = textInput.type === 'text';
        textInput.type = isTextVisible ? 'password' : 'text';
        toggleVisibilityButton.innerHTML = isTextVisible ? '&#128584;' : '&#128065;'; // Cambiar el ícono del ojo
        textInput.focus(); // Mantener el enfoque en el input
    });

    textInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            speakText(textInput.value);
            event.preventDefault(); // Evitar el comportamiento predeterminado del Enter
        }
    });

    document.querySelectorAll('.try-button').forEach(button => {
        button.addEventListener('click', function() {
            const textToSay = this.previousElementSibling.value; // Obtener el valor del input hermano anterior
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
