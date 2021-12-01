(function(){
    // Functions
    function buildQuiz(){
      // variable to store the HTML output
      const output = [];
  
      // for each question...
      myQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // variable to store the list of possible answers
          const answers = [];
  
          // and for each available answer...
          for(letter in currentQuestion.answers){
  
            // ...add an HTML radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="slide">
              <div class="question"> ${currentQuestion.question} </div>
              <div class="answers"> ${answers.join("")} </div>
            </div>`
          );
        }
      );
  
      // finally combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // gather answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of user's answers
      let numCorrect = 0;
  
      // for each question...
      myQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'lightgreen';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
    }
  
    function showSlide(n) {
      slides[currentSlide].classList.remove('active-slide');
      slides[n].classList.add('active-slide');
      currentSlide = n;
      if(currentSlide === 0){
        previousButton.style.display = 'none';
      }
      else{
        previousButton.style.display = 'inline-block';
      }
      if(currentSlide === slides.length-1){
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
      }
      else{
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
      }
    }
  
    function showNextSlide() {
      showSlide(currentSlide + 1);
    }
  
    function showPreviousSlide() {
      showSlide(currentSlide - 1);
    }
  
    // Variables
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const myQuestions = [
      {
        question: "Which of the following statements defines JavaScript correctly?",
        answers: {
          a: "It’s a scripting language used to make the website interactive",
          b: "It’s an assembly language used to make the website interactive",
          c: "It’s compiled language used to make the website interactive",
          d: "None of the above"
        },
        correctAnswer: "a"
      },
      {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
          a: "Node.js",
          b: "TypeScript",
          c: "npm",
          d: "Yarn"
        },
        correctAnswer: "c"
      },
      {
        question: "Which tool can you use to ensure code quality?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "RequireJS",
          d: "ESLint"
        },
        correctAnswer: "d"
      },
      {
      question: "Among the given statements, which statement defines closures in JavaScript",
      answers: {
        a: "It’s a function that is enclosed with references to its inner function scope",
        b: "It’s a function that is enclosed with references to its lexical environment",
        c: "It’s a function that is enclosed with the object to its inner function scope",
        d: "None of the above"
      },
      correctAnswer: "b"
    },
    {
      question: "Arrays in JavaScript are defined by which of the following statements",
      answers: {
        a: "It is an ordered list of values",
        b: "It is an ordered list of objects",
        c: "It is an ordered list of string",
        d: "It is an ordered list of functions"
      },
      correctAnswer: "a"
    },
    {
      question: "Where is Client-side JavaScript code is embedded within HTML documents?",
      answers: {
        a: "A URL that uses the special javascript:code",
        b: "A URL that uses the special javascript:protocol",
        c: "A URL that uses the special javascript:encoding",
        d: "A URL that uses the special javascript:stack"
      },
      correctAnswer: "b"
    },
    {
      question: "The web development environment (JavaScript) offers which of the following standard construct for data validation of the input entered by the user?",
      answers: {
        a: "Client-side Event",
        b: "Permit server-side",
        c: "Server page access",
        d: "Controlled loop constructs"
      },
      correctAnswer: "d"
    },
    {
      question: "The Crockford's subset does not include which of the following function in JavaScript?",
      answers: {
        a: "coeval()",
        b: "equal()",
        c: "equivalent()",
        d: "eval()"
      },
      correctAnswer: "d"
    },
    {
      question: "Which of the following is a property of JSON() method?",
      answers: {
        a: "Cit cannot be invoked in any form",
        b: "it can be invoked manually as object.JSON()",
        c: "it will be automatically invoked by the compiler",
        d: "it is invoked automatically by the JSON.stringify() method"
      },
      correctAnswer: "d"
    },
    {
      question: "Why event handlers is needed in JS?",
      answers: {
        a: "Allows JavaScript code to alter the behaviour of windows",
        b: "Adds innerHTML page to the code",
        c: "Change the server location",
        d: "Performs handling of exceptions and occurrences"
      },
      correctAnswer: "a"
    }
    
    ];
  
    // Kick things off
    buildQuiz();
  
    // Pagination
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
  
    // Show the first slide
    showSlide(currentSlide);
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
    previousButton.addEventListener("click", showPreviousSlide);
    nextButton.addEventListener("click", showNextSlide);
  })();