document.addEventListener('DOMContentLoaded', (event) => {
    const toggleButton = document.getElementById('toggleInputButton');
    const inputContainer = document.getElementById('inputContainer');
    const textInput = document.getElementById('textToSpeak');

    toggleButton.addEventListener('click', () => {
        if (inputContainer.style.display === 'none' || !inputContainer.style.display) {
            inputContainer.style.display = 'block';
            setTimeout(() => {
                textToSpeak.focus();
            }, 0);
        } else {
            inputContainer.style.display = 'none';
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

let mediaRecorder;
let audioChunks = [];
let audioBlob;

document.getElementById('startRecordingButton').addEventListener('click', () => {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.addEventListener('dataavailable', event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener('stop', () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
                console.log(audioBlob.type);
                const audioUrl = URL.createObjectURL(audioBlob);
                document.getElementById('audioPlayback').src = audioUrl;
                document.getElementById('sendAudioButton').disabled = false;
            });

            mediaRecorder.start();
            document.getElementById('stopRecordingButton').disabled = false;
        })
        .catch(e => {
            console.log('No se pudo acceder al micrófono: ', e);
        });
});

document.getElementById('stopRecordingButton').addEventListener('click', () => {
    if (mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        document.getElementById('stopRecordingButton').disabled = true;
    }
});

// Evento para el botón de enviar audio
document.getElementById('sendAudioButton').addEventListener('click', () => {
    let formData = new FormData();
    formData.append('audioBlob', audioBlob, 'recording.wav');
    
    fetch('/audio-to-text', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Server responded with status ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.message); // Esto debería imprimir "Audio received successfully"
    })
    .catch(error => {
        console.error('Error sending audio:', error);
    });
});

document.getElementById('sendTestTextButton').addEventListener('click', () => {
    const testText = document.getElementById('testTextInput').value;
    fetch('/submit-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Establece el tipo de contenido como JSON
        },
        body: JSON.stringify({ text: testText })  // Convierte el texto del input en una cadena JSON
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        alert('Texto recibido por el servidor: ' + data.text);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
