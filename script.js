document.addEventListener('DOMContentLoaded', () => {
  const yesBtn = document.querySelector('.yes-btn');
  const noBtn = document.getElementById('noBtn');

  let moveCount = 0;
  const maxAttempts = 50;
  const playfulMessages = [
    "Are you sureeee? 🤔","That didn't look convincing 😏","Try again… honestly 😌",
    "Your heart whispered 'yes' 💭","Oops, wrong answer 😄"
    // ...add the rest
  ];

  // YES button click — only triggers when user taps
  yesBtn.addEventListener('click', () => {
    yesBtn.textContent = "Actually.... YES! ❤️";
    yesBtn.style.transform = "translate(-50%, -50%) scale(2)";
    alert("You clicked YES! ❤️");
  });

  // NO button playful behavior
  noBtn.addEventListener('mouseenter', () => {
    if(moveCount < maxAttempts){
      noBtn.textContent = playfulMessages[moveCount];
      moveCount++;
      const maxX = window.innerWidth>600?250:150;
      const maxY = window.innerWidth>600?150:100;
      const x = Math.random()*maxX*2 - maxX;
      const y = Math.random()*maxY*2 - maxY;
      noBtn.style.transform = `translate(${x}px,${y}px)`;

      // Grow Yes button slightly as the No button moves
      const scale = 1 + (moveCount/50)*1.5;
      yesBtn.style.transform = `translate(-50%, -50%) scale(${scale})`;
    } else {
      // After max attempts, hide NO button but do NOT auto-change Yes button text
      noBtn.style.display = 'none';
    }
  });
});
