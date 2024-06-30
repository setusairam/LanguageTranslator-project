document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const inputLang = document.getElementById('inputLang');
    const destLang = document.getElementById('destLang');
    const startListen = document.getElementById('startListen');
    const translateBtn = document.getElementById('translateBtn');
    const clearBtn = document.getElementById('clearBtn');

    let listening = false;

    startListen.addEventListener('click', async () => {
        if (listening) return;
        listening = true;
        startListen.disabled = true;
        try {
            const response = await fetch('http://127.0.0.1:5000/listen', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ language: inputLang.value }),
            });
            const data = await response.json();
            if (data.text) {
                inputText.value += data.text + '\n';
                outputText.value += `Subtitle (English): ${data.translated_text}\n`;
            } else if (data.error) {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            listening = false;
            startListen.disabled = false;
        }
    });

    translateBtn.addEventListener('click', async () => {
        const text = inputText.value;
        const destLanguage = destLang.value;
        try {
            const response = await fetch('http://127.0.0.1:5000/translate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, dest_language: destLanguage }),
            });
            const data = await response.json();
            outputText.value = data.translated_text;
        } catch (error) {
            console.error('Error:', error);
        }
    });

    clearBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });
});
