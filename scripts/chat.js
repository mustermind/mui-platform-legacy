let messageCount = 0;
        
function sendMessage() {
    let inputField = document.getElementById('message-input');
    let messageText = inputField.value.trim();
    let sendButton = document.querySelector('send-button');
    if (messageText === "" || messageCount >= 10) return;

    messageCount++;

    // Show the next predefined message bubble and response
    document.getElementById('message' + messageCount).textContent = messageText;
    document.getElementById('message' + messageCount).style.display = 'block';

    setTimeout(() => {
        document.getElementById('response' + messageCount).style.display = 'block';
        // Stop previous audio and play new one if not muted
        if (!isMuted) {
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
              }
            currentAudio = new Audio(`audio/response${messageCount}.mp3`);
            currentAudio.play();
        }
    }, 500);

    inputField.value = '';

     if (messageCount === 9) {
        inputField.type = 'text'; /*works fine, but the following two do not seem to work yet */
        sendButton.textContent = 'Submit';
        sendButton.onclick = submitMessages();
    }

}

// Allow sending message with Enter key
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

document.getElementById("record-button").addEventListener("click", function() {
if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
    alert("Ihr Browser unterstützt keine Spracherkennung.");
    return;
}

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "de-DE";  // Set German language
recognition.start();

recognition.onresult = function(event) {
    let spokenText = event.results[0][0].transcript.toLowerCase();
    console.log("Erkannte Spracheingabe:", spokenText);

    // Replace "punkt" or "komma" with "." for proper number formatting
    spokenText = spokenText.replace(/\b(punkt|komma)\b/g, ".");

    // Extract full number including decimals
    let numbers = spokenText.match(/(\d+)([.,]\d+)?/g)

    if (numbers && numbers.length > 0) {
        let extractedNumber = numbers.join("");  // Join parts if necessary
        extractedNumber = extractedNumber.replace(",", "."); // Ensure standard decimal format
        document.getElementById("message-input").value = extractedNumber;
        sendMessage();
    } else {
        alert("Keine gültige Zahl erkannt. Bitte erneut versuchen.");
    }
};

recognition.onerror = function(event) {
    alert("Fehler: " + event.error);
};
});

let isMuted = true;
let currentAudio = null; // Store the currently playing audio

function toggleMute() {
    isMuted = !isMuted;
    document.getElementById('mute-button').innerHTML = isMuted ? '🔇' : '🔊';

    // Stop all playing audio when muted
    if (isMuted && currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
}
