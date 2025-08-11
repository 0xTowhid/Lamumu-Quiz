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
        emoji: "", title: "Moo Newbie", 
        quote: "Every expert was once a beginner. Keep learning and growing Moo fren!"
    },
    {
        min: 5, max: 8,
        emoji: "", title: "Moo Zoomer", 
        quote: "You're getting the hang of it! Your knowledge is blooming!"
    },
    {
        min: 9, max: 12,
        emoji: "", title: "Lamumu Expert", 
        quote: "Impressive Man! You've chunk of Knowledge about Common and Lamumu!"
    },
    {
        min: 13, max: 15,
        emoji: "", title: "Moo Master", 
        quote: "Outstanding You did it! You're a true Moo aligned retard!"
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let userHandle = '';
let selectedAnswer = null;
let userProfileImage = null;

// Profile picture handling
document.getElementById('profilePic').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('Please choose an image smaller than 5MB');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            userProfileImage = e.target.result;
            document.getElementById('previewImg').src = userProfileImage;
            document.getElementById('profilePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function removeProfilePic() {
    userProfileImage = null;
    document.getElementById('profilePic').value = '';
    document.getElementById('profilePreview').style.display = 'none';
}

function startQuiz() {
    const handle = document.getElementById('twitterHandle').value.trim();
    if (!handle) {
        alert('Please enter your Twitter/X handle!');
        return;
    }
    
    userHandle = handle.startsWith('@') ? handle : '@' + handle;
    
    document.getElementById('loginScreen').style.display = 'none';
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
    if (selectedAnswer !== null) return; // Prevent multiple selections
    
    selectedAnswer = answerIndex;
    const options = document.querySelectorAll('.option');
    const correctIndex = questions[currentQuestion].correct;
    
    // Show correct/incorrect
    options.forEach((option, index) => {
        if (index === correctIndex) {
            option.classList.add('correct');
        } else if (index === answerIndex && index !== correctIndex) {
            option.classList.add('incorrect');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Update score
    if (answerIndex === correctIndex) {
        score++;
        document.getElementById('currentScore').textContent = score;
    }
    
    clearInterval(timer);
    
    // Show next button
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
                selectAnswer(-1); // Auto-select wrong answer
                // Show next button after timeout
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
    
    // Hide next button
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
    
    // Remove emoji from results screen display
    document.getElementById('tierEmoji').textContent = ""; // No emoji
    document.getElementById('tierTitle').textContent = tier.title;
    document.getElementById('motivationalQuote').textContent = tier.quote;
    document.getElementById('finalScore').textContent = score;
    
    // Update card preview (no emoji)
    document.getElementById('cardHandle').textContent = userHandle;
    document.getElementById('cardEmoji').textContent = ""; // No emoji
    document.getElementById('cardTitle').textContent = tier.title;
    document.getElementById('cardQuote').textContent = tier.quote;
    
    // Update profile picture in card preview
    const cardProfilePic = document.getElementById('cardProfilePic');
    if (userProfileImage) {
        cardProfilePic.innerHTML = `<img src="${userProfileImage}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;">`;
    } else {
        cardProfilePic.textContent = ''; 
    }
    
    generateCard();
}

function generateCard() {
    const canvas = document.getElementById('resultCanvas');
    const ctx = canvas.getContext('2d');
    const tier = tiers.find(t => score >= t.min && score <= t.max);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Background image
    const backgroundImg = new Image();
    backgroundImg.crossOrigin = "anonymous";
    
    backgroundImg.onload = function() {
        console.log('Background image loaded successfully');
        // Draw background image (stretched to fit)
        ctx.drawImage(backgroundImg, 0, 0, 600, 400);
        
    
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillRect(0, 0, 600, 400);
        
        
        drawProfileAndText();
    };
    
    backgroundImg.onerror = function() {
        console.log('Background image failed to load, using gradient fallback');
        // Fallback to gradient if image fails to load
        const gradient = ctx.createLinearGradient(0, 0, 600, 400);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 600, 400);
        
        drawProfileAndText();
    };
    
    
    backgroundImg.src = 'card.jpg';
    
    function drawProfileAndText() {
        console.log('Drawing profile and text content');
        
        // Profile picture section
        if (userProfileImage) {
            const img = new Image();
            img.onload = function() {
                console.log('Profile image loaded');
               
                ctx.save();
                ctx.beginPath();
                ctx.arc(150, 120, 30, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();
                ctx.drawImage(img, 120, 90, 60, 60);
                ctx.restore();
                
                // Add border around profile picture
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.arc(150, 120, 30, 0, Math.PI * 2);
                ctx.stroke();
                
                drawTextContent();
            };
            img.onerror = function() {
                console.log('Profile image failed to load');
                drawTextContent();
            };
            img.src = userProfileImage;
        } else {
            console.log('No profile image, using placeholder');
           
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('', 150, 135);
            
            drawTextContent();
        }
    }
    
    function drawTextContent() {
        console.log('Drawing text content');
        
        // Main content
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        
        // Handle (positioned next to profile pic)
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(userHandle, 200, 115);
        
        // Reset alignment for centered content
        ctx.textAlign = 'center';
        
   
        
        
        ctx.font = 'bold 32px Arial';
        ctx.fillText(tier.title, 300, 200);
        
        // Score
        ctx.font = 'bold 20px Arial';
        ctx.fillText(`Score: ${score}/15`, 300, 240);
        
        // Quote (wrapped)
        ctx.font = '16px Arial';
        const words = tier.quote.split(' ');
        let line = '';
        let y = 280;
        
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;
            if (testWidth > 500 && n > 0) {
                ctx.fillText(line, 300, y);
                line = words[n] + ' ';
                y += 25;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, 300, y);
        
        console.log('Text content drawing completed');
    }
}

function downloadCard() {
    const canvas = document.getElementById('resultCanvas');
    const link = document.createElement('a');
    link.download = `lamumu-quiz-${userHandle.replace('@', '')}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

function shareOnX() {
    const tier = tiers.find(t => score >= t.min && score <= t.max);
    // Removed emoji from share text
    const text = `I just earned the "${tier.title}" title in the Lamumu Quiz Challenge!\n\nScored ${score}/15 correct answers! Made with care by @0xTowhid`;
    const url = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(text);
    window.open(url, '_blank');
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;
    userProfileImage = null;
    clearInterval(timer);
    
    document.getElementById('resultsScreen').style.display = 'none';
    document.getElementById('loginScreen').style.display = 'block';
    document.getElementById('twitterHandle').value = '';
    document.getElementById('profilePic').value = '';
    document.getElementById('profilePreview').style.display = 'none';
    document.getElementById('currentScore').textContent = '0';
}