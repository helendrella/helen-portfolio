document.addEventListener('DOMContentLoaded', () => {
    // 1. Avatar Interaction
    const avatar = document.getElementById('avatar');
    const speechBubble = document.getElementById('speech-bubble');
    
    avatar.addEventListener('click', () => {
        // Remove animation class if it exists to allow re-triggering
        avatar.classList.remove('spin');
        
        // Trigger reflow
        void avatar.offsetWidth;
        
        // Add spin class
        avatar.classList.add('spin');
        
        // Show speech bubble
        speechBubble.classList.remove('hidden');
        
        // Hide speech bubble after 3 seconds
        setTimeout(() => {
            speechBubble.classList.add('hidden');
        }, 3000);
    });

    // 2. Runaway Button "Haha" Moment
    const hireBtn = document.getElementById('hire-me-btn');
    const hireMessage = document.getElementById('hire-message');
    let runCount = 0;
    const maxRuns = 3;

    hireBtn.addEventListener('mouseenter', () => {
        if (runCount < maxRuns) {
            // Calculate random position within constraints
            const randomX = Math.floor(Math.random() * 200) - 100;
            const randomY = Math.floor(Math.random() * 100) - 50;
            
            hireBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
            runCount++;
        } else if (runCount === maxRuns) {
            hireBtn.style.transform = `translate(0, 0)`;
            hireBtn.innerText = "Okay, Click Me!";
            hireMessage.classList.remove('hidden');
            runCount++; // So it doesn't trigger again
        }
    });

    // 3. Confetti Surprise!
    hireBtn.addEventListener('click', () => {
        fireConfetti();
        hireBtn.innerText = "Yay! 🎉";
        setTimeout(() => {
            hireBtn.innerText = "Hire Me! 🚀";
        }, 3000);
    });

    function fireConfetti() {
        const colors = ['#ff4d6d', '#ffb3c1', '#ffe5ec', '#ffc2d1', '#fff'];
        
        for (let i = 0; i < 100; i++) {
            createConfettiPiece(colors[Math.floor(Math.random() * colors.length)]);
        }
    }

    function createConfettiPiece(color) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = color;
        confetti.style.top = '-10px';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';

        document.body.appendChild(confetti);

        // Animation
        const animation = confetti.animate([
            { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
            { transform: `translate3d(${Math.random() * 200 - 100}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1500,
            easing: 'cubic-bezier(.37,0,.63,1)'
        });

        animation.onfinish = () => confetti.remove();
    }
});
