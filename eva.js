//idea: when eva speaks, light up edges of screen with box shadow glow, and on each word make it glow.

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;
 

//define speech recognition
const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();

//settings for language and other settings
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en-NZ';
recognition.interimResults = true;
recognition.maxAlternatives = 0;


//creating variables for outputs, background and hints
const htmlOutput = document.querySelector('.output');
const hints = document.querySelector('.hints');
const startButton = document.querySelector('.eva');

//capitalizing
var first_char = /\S/;
function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
  }

//Starts speech recogniton
function startRecognizing() {
    recognition.stop()
    recognition.start();
    console.log('Ready to receive a command.');

    htmlOutput.textContent = '';

    voices = window.speechSynthesis.getVoices(); //loads speech api

    final_transcript = '';
  };

  startButton.addEventListener('click', startRecognizing);
globalOutput = '';

final_transcript = '';


const mySpan = document.createElement('span');

//result processing
recognition.onresult = (event) => {

    const responseText = document.querySelector("#responseText");
    responseText.textContent = '';
    document.getElementById("responseContent").innerHTML = "";

    //variables for user input
    var interim_transcript = '';
    final_transcript = '';
    console.log("HBDJHSBAJBDASJH")
    //sorts out the voice recognition alternatives until it gets a final result
    for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript; //gets the final result and adds it to final_transcript variable //converts to lowercase
            processResults();
        } else {
            //default
            interim_transcript += event.results[i][0].transcript;
        }
    }


 }

 var evaResponse = '';
 
 function matchCommand() {

    const responseText = document.querySelector("#responseText");
    const responseContent = document.querySelector("#responseContent");

    final_transcript.toLowerCase();
    if(final_transcript.includes("hello")){
        responseText.textContent = "Hello there! My name is Eva";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        evaSpeaks();
    }
    else if (final_transcript.includes("weather")){
        responseText.textContent = "I am cold at the moment";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        evaSpeaks();
    }
    else if (final_transcript.includes("cat")){
        responseText.textContent = "Heres a cat!";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        getCats()
        evaSpeaks();
    }
    else if (final_transcript.includes("joke")){
        responseText.textContent = "I invented a new word! Plagiarism!";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        evaSpeaks();
    }
    else if (final_transcript.includes("repeat")){
        responseText.textContent = "Ok, I will repeat you.";
        
        var repeatText = final_transcript.replace('repeat after me', '')

        evaResponse = repeatText;
        responseText.classList.add("trigger");
        evaSpeaks();
    }
    else if (final_transcript.includes("video")){
        const video = document.createElement('video');
        video.src = 'catvideo.mp4';

        video.controls = true;
        video.autoplay = true;
        video.muted = false;
        video.height = 240;
        video.width = 320;
        
        responseContent.appendChild(video);

        responseText.textContent = "Here's a cat video";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        evaSpeaks();
    }

/* default copy paste command

   else if (final_transcript.includes(" ")){
        responseText.textContent = " ";
        evaResponse = responseText.textContent;
        responseText.classList.add("trigger");
        evaSpeaks();
    }

    */

 }


  //the actual speech recognition is messed up
recognition.onerror = (event) => {
    diagnostic.textContent = `Error occurred in recognition: ${event.error}`;
  }

  $(function(){
	$('.eva').click(function(){
		e1 = $('.eva');
        e1.addClass('animate');
        e1.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
        function (e) {
            e1.removeClass('animate');
        });
	});
});


function getCats() {
    var img = document.createElement("img");
    img.id = "id";
    img.className = "responseImage";
    img.src = "http://thecatapi.com/api/images/get?format=src&type=jpg,png?";
    responseContent.appendChild(img);
}


function processResults() {
    matchCommand(); //matches with built in commands (w.i.p.)
    console.log(final_transcript)

    final_transcript = capitalize(final_transcript)

    //variables for output and final transcript
    const myText = htmlOutput.textContent;
    const voiceText = final_transcript;
    output = document.getElementById("output");

       output.textContent = '';
       output.appendChild(mySpan); // append the empty span
       mySpan.textContent = '" ';
       mySpan.classList.add("quote");
       output.innerHTML += voiceText; //outputs the final_transcript
       output.appendChild(mySpan); // append the empty span again
       mySpan.textContent = ' "';
       mySpan.classList.add("quote");
}


/*
SPEECH SYNTHESIS STARTS HERE
*/

function evaSpeaks() {
    recognition.stop()
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();

    msg.text = evaResponse;

    msg.voice = speechSynthesis.getVoices().filter(function(voice) {
        return voice.name == "Google UK English Female"
    
      })[0];

    msg.volume = 0.7; // 0 to 1
    msg.rate = 1; // 0.1 to 10
    msg.pitch = 0.7; //0 to 2

    speechSynthesis.speak(msg);

    function countWords() {
        return evaResponse.trim().split(/\s+/).length;
    }   

    responseLength = countWords();

    var x = 0;
    var intervalID = setInterval(function () {

        $('.evaWrapper').addClass('talking');
        console.log('added');

        if (++x === responseLength) {
            window.clearInterval(intervalID);
            console.log("finished 1");
        }
    }, 400);

    var y = 0;
    var intervalID2 = setInterval(function () {

        $('.evaWrapper').removeClass('talking');
        console.log('removed');

        if (++y === responseLength) {
            window.clearInterval(intervalID2);
            console.log("finished 2");
                recognition.start();
        }
    }, 800);


    msg.onend = function(e) {
        console.log('Eva spoke');
    };


    evaResponse = '';
}

function onOffGlow() {
    var evaWrapper = document.querySelector(".evaWrapper")

    evaWrapper.classList.add('talking');
    evaWrapper.classList.remove('talking');
}