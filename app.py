from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
import os

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route('/audio-to-text', methods=['POST'])
def audio_to_text():
    if 'audioBlob' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    # Guardar el archivo temporalmente en el servidor
    audio_blob = request.files['audioBlob']
    audio_filename = 'temp_audio.wav'
    audio_blob.save(audio_filename)

    # Procesar el archivo de audio
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_filename) as source:
        audio_data = recognizer.record(source)
        try:
            # Intenta reconocer el audio
            text = recognizer.recognize_google(audio_data)
            return jsonify({'text': text})
        except sr.UnknownValueError:
            return jsonify({'error': 'Speech recognition could not understand audio'}), 400
        except sr.RequestError as e:
            return jsonify({'error': 'Could not request results from the speech recognition service'}), 500
        finally:
            # Asegúrate de eliminar el archivo de audio temporal
            if os.path.exists(audio_filename):
                os.remove(audio_filename)

if __name__ == "__main__":
    app.run(debug=True)
