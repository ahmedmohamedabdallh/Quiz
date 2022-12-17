export class Quiz {
    constructor(response) {
        this.response = response
        this.numQuia = response.length
        this.currentQuestion = 0
        this.score = 0
        this.showQusetion()
        this.nextBtn = document.getElementById("next")
        this.nextBtn.addEventListener("click", this.nextQuestion.bind(this))
    }
    showQusetion() {
        document.getElementById("question").innerHTML = this.response[this.currentQuestion].question
        document.getElementById("currentQuestion").innerHTML = this.currentQuestion + 1
        document.getElementById("totalNumberOfQuestions").innerHTML = this.numQuia
        let answers = [this.response[this.currentQuestion].correct_answer, ...this.response[this.currentQuestion].incorrect_answers]
        function shuffle(array) {
            let currentIndex = array.length, randomIndex;


            while (currentIndex != 0) {


                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;


                [array[currentIndex], array[randomIndex]] = [
                    array[randomIndex], array[currentIndex]];
            }

            return array;
        }



        shuffle(answers);
        
        let cartona = "";
        for (let i = 0; i < answers.length; i++) {
            cartona += ` <div class="form-check">
            <label class="form-check-label">
            <input type="radio" class="form-check-input" name="answer" value="${answers[i]}">
            ${answers[i]}
            </label>
        </div>`

        }
        document.getElementById("rowAnswer").innerHTML = cartona
    }
    nextQuestion() {
        let userAnswer = document.getElementsByName("answer")
        if ([...userAnswer].filter(el => el.checked).length == 1) 
        {
            $("#alert").fadeOut(300);
            this.checkAnser();

            this.currentQuestion++;

            if (this.currentQuestion < this.numQuia) {
                this.showQusetion();
            } else {
                $("#quiz").fadeOut(300, () => {
                    $("#finish").fadeIn(300)
                    document.getElementById("score").innerHTML=this.score;
                    document.getElementById("tryBtn").addEventListener("click",()=>{
                        $("#finish").fadeOut(400, () => {
                            $("#setting").fadeIn(400)
                        })
                    })
                })
            }
        } 
        else{
            $("#alert").fadeIn(300);
        }




    }
    checkAnser() {
        let userAnswer = document.getElementsByName("answer")
        let answer= Array.from( userAnswer).filter(elment => elment.checked)[0].value;
        if (answer == this.response[this.currentQuestion].correct_answer) {
            this.score++;
            $("#Correct").fadeIn(300, () => {
                $("#Correct").fadeOut(300)
            })
        } else {
            $("#inCorrect").fadeIn(300, () => {
                $("#inCorrect").fadeOut(300)
            })
        }
    }

}