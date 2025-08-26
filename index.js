 const questions = [
            {
                question: "What's the mascot name of Common?",
                options: ["Latutu", "Lububu", "Lamumu", "Tigerlu"],
                correct: 2
            },
            {
                question: "Which of the following is a feature of Common's Crypto-Native Forum?",
                options: [" Requires traditional email logins", "Supports wallet logins for discussions and governance", "Only allows ERC20 token holders to participate", " Does not support token-gated discussions"],
                correct: 1
            },
            {
                question: "What is the purpose of Onchain Contests on Common?",
                options: ["To launch new ERC20 tokens", "To integrate third-party governance platforms", "To host community competitions with transparent rewards", "To restrict user access via token gating"],
                correct: 2
            },
            {
                question: "What does Common Aura represent?",
                options: ["A cryptocurrency token used for governance", "Points that can be redeemed for rewards", "Your network reputation within the Common ecosystem", " A special membership tier"],
                correct: 2
            },
            {
                question: "Which of the following actions can help you generate Aura?",
                options: ["Voting and swapping via the Common Client", "Joining discussions and creating proposals", "Referring other users", "All of the above"],
                correct: 3
            },
            {
                question: "Which one is the official X handle of Lamumu?",
                options: ["@lamumudotxyz", "@lamumuxyz", "@lamumudotcommon", "@lamumudotcom"],
                correct: 0
            },
            {
                question: "What is Lamumudotxyz actually?",
                options: ["Coin", "NFT Collection", "Layer-1 network", "Dex"],
                correct: 1
            },
            {
                question: "How to say GM to Lamumu fan?",
                options: ["gMuu", "gLamumu", "gMoo", "GM"],
                correct: 2
            },
            {
                question: "Who is the founder of Commondotxyz?",
                options: ["Dillon", "Millon", "Lillion", "Killon"],
                correct: 0
            },
            {
                question: "Which role is essential to get gtd Whitelist in Lamumu?",
                options: ["calfy", "lamoo list", "grass", "milker"],
                correct: 1
            },
            {
                question: "When does Aura Season 2 officially kick off?",
                options: [" August 1st", "August 5th", " August 8th", "August 15th"],
                correct: 2
            },
            {
                question: "Which quest in Season 2 offers the most Aura for a single completion?",
                options: ["Quest 99 | Launch a Common Native Token", "Quest 100 | Launchpad Token Hits Graduation", "Quest 101 | Join Common's Community", "Quest 102 | Trade for a Common Launchpad Token"],
                correct: 1
            },
            {
                question: "How many times per day can Quest 99 be repeated?",
                options: ["1 time", "2 times", "3 times", " 4 times"],
                correct: 3
            },
            {
                question: "There are how many roles in Lamumu Discord",
                options: ["3", "69", "9", "5"],
                correct: 2
            },
            {
                question: "What's the total funding of Common",
                options: ["$20M", "$12M", "$69M", "$1T"],
                correct: 0
            }
        ];

        const tiers = [
            {
                min: 0, max: 4,
                title: "Moo Newbie", 
                quote: "Every expert was once a beginner. Keep learning and growing Moo fren!"
            },
            {
                min: 5, max: 8,
                title: "Moo Zoomer", 
                quote: "You're getting the hang of it! Your knowledge is blooming!"
            },
            {
                min: 9, max: 12,
                title: "Lamumu Expert", 
                quote: "Impressive Man! You've chunk of Knowledge about Common and Lamumu!"
            },
            {
                min: 13, max: 15,
                title: "Moo Master", 
                quote: "Outstanding You did it! You're a true Moo aligned retard!"
            }
        ];

        let currentQuestion = 0;
        let score = 0;
        let timeLeft = 15;
        let timer;
        let selectedAnswer = null;

        function startQuiz() {
            document.getElementById('startScreen').style.display = 'none';
            document.getElementById('quizScreen').style.display = 'block';
            
            showQuestion();
            startTimer();
        }

        function showQuestion() {
            const question = questions[currentQuestion];
            const container = document.getElementById('questionContainer');
            
            container.innerHTML = `
                <div class="question-container active">
                    <div class="question">${question.question}</div>
                    <div class="options">
                        ${question.options.map((option, index) => 
                            `<div class="option" onclick="selectAnswer(${index})" data-index="${index}">
                                ${option}
                            </div>`
                        ).join('')}
                    </div>
                </div>
            `;
            
            document.getElementById('currentQ').textContent = currentQuestion + 1;
            selectedAnswer = null;
        }

        function selectAnswer(answerIndex) {
            if (selectedAnswer !== null) return;
            
            selectedAnswer = answerIndex;
            const options = document.querySelectorAll('.option');
            const correctIndex = questions[currentQuestion].correct;
            
            options.forEach((option, index) => {
                if (index === correctIndex) {
                    option.classList.add('correct');
                } else if (index === answerIndex && index !== correctIndex) {
                    option.classList.add('incorrect');
                }
                option.style.pointerEvents = 'none';
            });
            
            if (answerIndex === correctIndex) {
                score++;
                document.getElementById('currentScore').textContent = score;
            }
            
            clearInterval(timer);
            
            const nextBtn = document.getElementById('nextBtn');
            nextBtn.style.display = 'inline-block';
            nextBtn.disabled = false;
        }

        function startTimer() {
            timeLeft = 15;
            const timerElement = document.getElementById('timer');
            
            timer = setInterval(() => {
                timeLeft--;
                timerElement.textContent = timeLeft + 's';
                
                if (timeLeft <= 5) {
                    timerElement.classList.add('warning');
                } else {
                    timerElement.classList.remove('warning');
                }
                
                if (timeLeft <= 0) {
                    if (selectedAnswer === null) {
                        selectAnswer(-1);
                        setTimeout(() => {
                            const nextBtn = document.getElementById('nextBtn');
                            nextBtn.style.display = 'inline-block';
                            nextBtn.disabled = false;
                        }, 1000);
                    }
                }
            }, 1000);
        }

        function nextQuestion() {
            currentQuestion++;
            
            document.getElementById('nextBtn').style.display = 'none';
            document.getElementById('nextBtn').disabled = true;
            
            if (currentQuestion < questions.length) {
                showQuestion();
                startTimer();
            } else {
                showResults();
            }
        }

        function showResults() {
            document.getElementById('quizScreen').style.display = 'none';
            document.getElementById('resultsScreen').style.display = 'block';
            
            const tier = tiers.find(t => score >= t.min && score <= t.max);
            
            document.getElementById('tierTitle').textContent = tier.title;
            document.getElementById('motivationalQuote').textContent = tier.quote;
            document.getElementById('finalScore').textContent = score;
        }

        function shareOnX() {
            const tier = tiers.find(t => score >= t.min && score <= t.max);
            const text = `I just earned the "${tier.title}" title in the Lamumu Quiz Challenge!\n\nScored ${score}/15 correct answers! Made with care by @0xTowhid`;
            const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
            window.open(url, '_blank');
        }

        function restartQuiz() {
            currentQuestion = 0;
            score = 0;
            selectedAnswer = null;
            clearInterval(timer);
            
            document.getElementById('resultsScreen').style.display = 'none';
            document.getElementById('startScreen').style.display = 'block';
            document.getElementById('currentScore').textContent = '0';
        }