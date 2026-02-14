// Countdown target
const targetDate = new Date('2026-02-21T16:00:00+01:00');
const startDate = new Date('2026-02-14T00:00:00+01:00'); 

const loveReasons = [
    "Your smile is the first thing I think about when I wake up, and it's what gets me through the day. Even from miles away, you brighten my world.",
    "The way you listen to me - really listen - makes me feel like the most important person in the world. You hear not just my words, but my heart.",
    "I love how you make me laugh, even on my worst days. Your sense of humor is my favorite medicine, and I'm addicted to it.",
    "Your kindness and the way you care for others shows me the beautiful person you are inside. It makes me love you even more deeply.",
    "I love how we can talk about everything and nothing for hours. Our conversations are my favorite place to be, no matter the topic.",
    "The way you support my dreams and believe in me, even when I doubt myself. You're my biggest cheerleader and my safe place.",
    "I love you for being exactly who you are - authentic, genuine, and perfectly imperfect. You don't have to be anyone else for me, just you. ❤️",
    "The 8th reason? I'll tell you in person... 😊💕"
];

// Playful No Button
let moveCount = 0;
const maxAttempts = 50;
const playfulMessages = [
"Are you sureeee? 🤔","That didn't look convincing 😏","Try again… honestly 😌",
"Your heart whispered 'yes' 💭","Oops, wrong answer 😄","Hmm… suspicious 👀",
"Be honest with yourself 😊","That hesitation though… ⏳","Your smile says otherwise 😆",
"Still pretending? 😉","I'll give you another chance 🎯","That was cute ❤️","Denial is a river 😜",
"You almost clicked yes 😏","Your finger slipped 😌","Don't fight the feeling 💕","Hmm… I don't believe you 😄",
"Your eyes just said yes 👀","Stop playing hard to get 😆","That 'no' sounded shy 😏","Are we being dramatic? 🎭",
"Blink twice if you miss me 😉","You're adorable when you lie 😌","Confidence 0% 😄","Soft no 👀",
"Heart skipped a beat 💓","Still trying? ⏰","Almost there… 🎯","You can't fool me 😜","Say it with your chest 😆",
"Click felt emotional 😂","Nice try 😌","The truth is calling 📞","You paused before clicking 👀","Suspiciously quick 😏",
"You sure? 😄","Your vibe says yes ✨","Even your shadow disagrees 🌚","Why are you blushing? 😊",
"Your playlist says otherwise 🎶","This is getting obvious 😆","Stop resisting 😏","One click away 💕",
"'No' sounded nervous 😌","Heart rolled eyes 😂","Keep trying 😉","Not convincing 😜","We both know 😄",
"Just admit it already! ❤️","Fine… Yes! ❤️"
];

function growYesButton(){
    const yesBtn=document.querySelector('.yes-btn');
    const noBtn=document.getElementById('noBtn');
    const scale = 1 + (moveCount/50)*1.5;
    yesBtn.style.transform = `translate(-50%,-50%) scale(${scale})`;
    if(moveCount>=maxAttempts){
        noBtn.style.display='none';
        yesBtn.textContent="Actually.... YES! ❤️";
        yesBtn.style.transform=`translate(-50%,-50%) scale(2.5)`;
    }
}

function moveButton(){
    const btn=document.getElementById('noBtn');
    if(moveCount>=maxAttempts){btn.style.display='none';return;}
    btn.textContent = playfulMessages[moveCount];
    moveCount++;
    growYesButton();
    const maxX=window.innerWidth>600?250:150;
    const maxY=window.innerWidth>600?150:100;
    const x=Math.random()*maxX*2-maxX;
    const y=Math.random()*maxY*2-maxY;
    btn.style.transform=`translate(${x}px,${y}px)`;
}

function cantClickNo(){moveButton();}

function goToPage(num){
    document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
    document.getElementById('page'+num).classList.add('active');
    if(num===3){startCountdown();}
    else if(num===4){renderDaysGrid();}
}

// Countdown
function startCountdown(){
    function update(){
        const now=new Date();
        const diff=targetDate-now;
        if(diff>0){
            const days=Math.floor(diff/(1000*60*60*24));
            const hours=Math.floor((diff%(1000*60*60*24))/(1000*60*60));
            const minutes=Math.floor((diff%(1000*60*60))/(1000*60));
            document.getElementById('days').textContent=days;
            document.getElementById('hours').textContent=hours;
            document.getElementById('minutes').textContent=minutes;
        }else{document.getElementById('countdown').innerHTML='<div style="font-size:1.8em;">We\'re together! ❤️</div>';}
    }
    update(); setInterval(update,1000);
}

// Days grid
function renderDaysGrid(){
    const grid=document.getElementById('daysGrid');
    grid.innerHTML='';
    const now=new Date();
    const currentDate=new Date(now.getFullYear(), now.getMonth(), now.getDate());
    for(let i=1;i<=8;i++){
        const dayDate=new Date(startDate);
        dayDate.setDate(startDate.getDate()+(i-1));
        const isUnlocked=currentDate>=dayDate;
        const isPast=currentDate>dayDate;
        const card=document.createElement('div');
        card.className=`day-card ${isUnlocked?'unlocked':'locked'}`;
        if(isUnlocked){
            card.onclick=()=>showDay(i);
            card.innerHTML=`<div class="day-number">Day ${i}</div><div class="day-label">${isPast?'Opened':'Open Now!'}</div><div class="lock-icon">${isPast?'✓':'💝'}</div>`;
        }else{
            card.innerHTML=`<div class="day-number">Day ${i}</div><div class="day-label">Locked</div><div class="lock-icon">🔒</div>`;
        }
        grid.appendChild(card);
    }
}

function showDay(num){
    document.getElementById('currentDay').textContent=num;
    document.getElementById('reasonText').textContent=loveReasons[num-1];
    goToPage(5);
}

// Initialize
startCountdown();
