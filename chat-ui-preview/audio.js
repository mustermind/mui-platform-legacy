/* ALL AUDIO IN- AND OUTPUT FUNCTIONS DEACTIVATED UNTIL PROPERLY TESTED */
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