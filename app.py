from flask import Flask, request, jsonify
from flask_cors import CORS
import speech_recognition as sr
from googletrans import Translator

app = Flask(__name__)
CORS(app)  # Enable CORS to allow cross-origin requests

r = sr.Recognizer()

@app.route('/listen', methods=['POST'])
def listen():
    try:
        with sr.Microphone() as source:
            r.adjust_for_ambient_noise(source, duration=0.09)
            audio = r.listen(source, timeout=3, phrase_time_limit=3)
            MyText = r.recognize_google(audio)
            MyText = MyText.lower()
            return jsonify({'text': MyText})
    except sr.WaitTimeoutError:
        return jsonify({'error': 'Timeout'})
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not understand the audio'})
    except sr.RequestError as e:
        return jsonify({'error': f'Could not request results; {0}'.format(e)})

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.json
    input_text = data.get('text')
    dest_language = data.get('dest_language')
    translator = Translator()
    translated = translator.translate(input_text, dest=dest_language)
    return jsonify({'translated_text': translated.text})

if __name__ == '__main__':
    app.run(debug=True)
