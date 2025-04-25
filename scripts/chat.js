let messageCount = 0;
        
function sendMessage() {
    let inputField = document.getElementById('message-input');
    let messageText = inputField.value.trim();
    let sendButton = document.querySelector('send-button');
    if (messageText === "" || messageCount >= 12) return;

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

    if (messageCount === 10) {
        inputField.style.display = 'none';
        const dropdown = document.getElementById('material-select');
        dropdown.classList.remove('hidden');
    
        sendButton.onclick = function () {
            const selected = dropdown.value;
            if (!selected || selected === '-- Bitte Material wählen --') return;
    
            messageCount++; // Jetzt 11
            document.getElementById('message' + messageCount).textContent = selected;
            document.getElementById('message' + messageCount).style.display = 'block';
    
            dropdown.classList.add('hidden');
    
            setTimeout(() => {
                document.getElementById('response' + messageCount).style.display = 'block';
                if (!isMuted) {
                    if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                    }
                    currentAudio = new Audio(`audio/response${messageCount}.mp3`);
                    currentAudio.play();
                }
            }, 500);
    
            // Input wieder anzeigen, nun als Textfeld
            inputField.type = 'text';
            inputField.style.display = 'block';
    
            // Rücksetzen der ursprünglichen Send-Logik
            sendButton.textContent = '➲';
            sendButton.onclick = sendMessage;
        };
    }    

}

// Allow sending message with Enter key
document.getElementById('message-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});