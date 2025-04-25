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

    if (messageCount === 9) {
        inputField.type = 'text'; 
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