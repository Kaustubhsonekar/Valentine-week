// 💖 Valentine's Week — personalized for Suhana
const FOR_HER = "Suhana";

const days = {
  7: {
    name: "Rose Day 🌹",
    task: "Suhana, a rose is waiting for you today ❤️",
    secret: "Today I wanted to give you a rose…then I realized how silly that was. How can I gift a flower to someone who already carries spring in their smile? Happy Rose Day, my beautiful miracle 🌹✨",
    loveNote: "Every rose reminds me of you. Today and every day, you're my favorite bloom. 🌹"
  },
  8: {
  name: "Propose Day 💍",
  task: "Suhana… someone has something truly special to tell you today 💕",
  secret: "Take a deep breath, this comes straight from my heart 💖",
  loveNote: "I don’t need a special day to tell you this… I choose you in every smile, every argument, every quiet moment, and every dream. You’re not just someone I love, you’re someone I want to build a life with. So here’s my simple proposal: walk with me through all the ups and downs, laugh with me on the good days, hold my hand on the hard ones, and let’s grow together. I don’t promise perfection, but I promise loyalty, effort, and a forever kind of love. Stay with me… today, tomorrow, and always 💍❤️"
  },
   9: {
  name: "Chocolate Day 🍫",
  task: "Suhana… today comes with something sweet, just like you 💕",
  secret: "Warning: this message may cause smiles and butterflies 💖",
  loveNote: "They say chocolates make people happy… but you do that without even trying. Every little moment with you feels sweeter, warmer, softer. Just like chocolate melts slowly, you’ve melted into my heart in ways I can’t explain. Thank you for being my comfort on hard days, my smile on ordinary days, and my favorite thought every day. If I could, I’d give you all the chocolates in the world… but instead, I give you my heart, wrapped in love and sealed with forever 🍫❤️"
},
  10: {
    name: "Teddy Day 🧸",
    task: "Suhana, something cuddly is thinking of you 🥰",
    secret: "Gift a teddy — so she can hug it when we're apart",
    loveNote: "Until I can hug you again, here's a teddy to hold. But no one hugs like you do. 🧸"
  },
  11: {
    name: "Promise Day 🤞",
    task: "Suhana, a promise from the heart — for you 💖",
    secret: "Make one real promise — and keep it forever",
    loveNote: "I promise to choose you, support you, and love you — today and every day. 🤞"
  },
  12: {
    name: "Hug Day 🤗",
    task: "Suhana, unlimited hugs — all for you 🫂",
    secret: "Give a long, real hug — no words needed",
    loveNote: "Some days all we need is a long hug. Today's the day. I'm sending you the biggest one. 🤗"
  },
  13: {
  name: "Kiss Day 💋",
  task: "Suhana… come a little closer, this one is just for you 💕",
  secret: "Close your eyes and feel this moment 💖",
  loveNote: `
    They say a kiss can say a thousand words… so here’s mine. Every time I think of you, my heart leans closer.
    I don’t just want kisses on your lips, I want kisses on your worries, your fears, and your tired days.
    I want to be the person who makes you feel safe, loved, and chosen.
    So here’s my Kiss Day promise: every kiss from me comes with loyalty, warmth, and a forever kind of care.
    Come here… this one’s filled with love 💋❤️

    <br><br>

    <img src="https://i.imgur.com/3X9QZ6L.gif"
         style="width:180px;border-radius:15px;margin-top:10px;"
         alt="Cute Kiss">
  `
},
  14: {
    name: "Valentine's Day ❤️",
    task: "Suhana, today is all about you and us 💕",
    secret: "Make this day unforgettable — she deserves it",
    loveNote: "You're not just my Valentine for a day. You're my person, my home, my always. I love you, Suhana. ❤️"
  }
};

// Surprise love notes — for the "Open your love note" button & easter egg
const SURPRISE_MESSAGES = [
  "Suhana, you make every ordinary day feel special. I'm so lucky to have you. 💖",
  "I made this whole week just for you. Because you deserve to feel loved, every single day. 💕",
  "No matter which day it is — Rose, Chocolate, or Hug — you're the best part of all of them. 🌹",
  "Behind every day of this week is one thought: making you smile. That's it. That's the plan. 😊",
  "You're the reason I believe in love. Thank you for being you, Suhana. 💘",
  "P.S. — I love you. (Yes, again. Forever.) ❤️"
];

// Easter egg: secret message after 7 taps on the card
const EASTER_EGG_MESSAGE = "I love you, Suhana. Not just this week — every week, every day. You're my favorite surprise. 💖";

const dayName = document.getElementById("day-name");
const task = document.getElementById("task");
const countdown = document.getElementById("countdown");
const secret = document.getElementById("secret");
const shareBtn = document.getElementById("share-btn");
const refreshBtn = document.getElementById("refresh-btn");
const loadingIndicator = document.getElementById("loading-indicator");
const loveNoteBtn = document.getElementById("love-note-btn");
const surpriseOverlay = document.getElementById("surprise-overlay");
const surpriseMessageEl = document.getElementById("surprise-message");
const closeSurpriseBtn = document.getElementById("close-surprise");
const cardEl = document.querySelector(".card");

// 🔒 Timezone locked to IST
function nowIST() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );
}

const year = new Date().getFullYear();
const startDate = new Date(year, 1, 7, 0, 0, 0);
const endDate = new Date(year, 1, 15, 0, 0, 0);

function formatTime(ms) {
  if (ms < 0) return "00d 00h 00m 00s";

  const s = Math.floor(ms / 1000);
  const d = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;

  // Format with leading zeros for better readability
  const formatNum = (num) => String(num).padStart(2, '0');
  return `${formatNum(d)}d ${formatNum(h)}h ${formatNum(m)}m ${formatNum(sec)}s`;
}

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function heartExplosion() {
  const heartsCount = 20;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  for (let i = 0; i < heartsCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("explosion-heart");
    heart.innerText = "❤️";

    const angle = Math.random() * 2 * Math.PI;
    const distance = 80 + Math.random() * 120;

    const x = Math.cos(angle) * distance + "px";
    const y = Math.sin(angle) * distance + "px";

    heart.style.left = centerX + "px";
    heart.style.top = centerY + "px";
    heart.style.setProperty("--x", x);
    heart.style.setProperty("--y", y);

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1500);
  }
}


function update() {
  try {
    const now = nowIST();

  // BEFORE WEEK
  if (now < startDate) {
    dayName.innerText = "Valentine’s Week 💖";
    task.innerText = "Suhana, something special is coming just for you…";
    secret.innerText = "";
    if (countdown) countdown.innerText = "Unlocks for Suhana in: " + formatTime(startDate - now);
    return;
  }

  // AFTER WEEK
  if (now >= endDate) {
    dayName.innerText = "💝 Valentine’s Week";
    task.innerText = "Suhana, the week ended — but my love for you never will’t ❤️";
    secret.innerText = "";
    countdown.innerText = "";
    return;
  }

  // DURING WEEK
  const today = now.getDate();
  const todayData = days[today];

  if (todayData) {
    dayName.innerText = todayData.name;
    task.innerText = todayData.task;
    secret.innerText = "For you, Suhana: " + todayData.secret;
  }

    const nextDay = new Date(now);
    nextDay.setHours(24, 0, 0, 0);
    if (countdown) countdown.innerText = "Next surprise for Suhana in: " + formatTime(nextDay - now);
  } catch (error) {
    console.error("Error updating countdown:", error);
    if (countdown) {
      countdown.innerText = "Unable to update countdown";
    }
  }
}

// window.addEventListener("load", () => {
//   heartExplosion();
// });

window.addEventListener("load", () => {
  setTimeout(heartExplosion, 300);
});
  
// const heartEntry = document.getElementById("heart-entry");
// const heart3D = document.querySelector(".heart-3d");
// const card = document.querySelector(".card");

// // Hide card initially
// card.style.opacity = "0";

// window.addEventListener("load", () => {
//   // Pulse before exit
//   setTimeout(() => {
//     heart3D.style.animation = "heartPulse 0.6s ease";
//   }, 2200);

//   // Fade out heart entry
//   setTimeout(() => {
//     heartEntry.style.transition = "opacity 0.8s ease";
//     heartEntry.style.opacity = "0";
//   }, 2800);

//   // Show main card
//   setTimeout(() => {
//     heartEntry.style.display = "none";
//     card.style.transition = "opacity 1s ease, transform 1s ease";
//     card.style.opacity = "1";
//     card.style.transform = "scale(1)";
//   }, 3500);
// });


const heartEntry = document.getElementById("heart-entry");
const heart3D = document.querySelector(".heart-3d");
const card = document.querySelector(".card");

// Hide card initially
card.style.opacity = "0";
card.style.transform = "scale(0.3)";

// 💥 Explosion function
function heartExplosionFromCenter() {
  const count = 24;
  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;

  for (let i = 0; i < count; i++) {
    const h = document.createElement("div");
    h.className = "explosion-heart";
    h.innerText = "❤️";

    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 140;

    h.style.left = cx + "px";
    h.style.top = cy + "px";
    h.style.setProperty("--x", Math.cos(angle) * distance + "px");
    h.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1400);
  }
}

window.addEventListener("load", () => {
  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    heartEntry.style.display = "none";
    card.style.opacity = "1";
    card.style.transform = "scale(1)";
    return;
  }

  // 💓 Pulse
  setTimeout(() => {
    heart3D.style.animation = "heartPulse 0.6s ease";
  }, 1800);

  // 💥 Explode
  setTimeout(() => {
    heartExplosionFromCenter();
    heart3D.style.opacity = "0";
  }, 2400);

  // 📦 Card pops OUT from heart
  setTimeout(() => {
    card.style.transition = "opacity 1s ease, transform 1s cubic-bezier(.22,1.61,.36,1)";
    card.style.opacity = "1";
    card.style.transform = "scale(1)";
  }, 2600);

  // 🧹 Remove heart layer
  setTimeout(() => {
    heartEntry.style.display = "none";
  }, 3200);
});

function spawnClickHeart(x, y) {
  const heart = document.createElement("div");
  heart.className = "click-heart";
  heart.innerText = "❤️";

  heart.style.left = x + "px";
  heart.style.top = y + "px";

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 800);
}

// Mouse click - only if not reduced motion
document.addEventListener("click", (e) => {
  // Don't spawn hearts on button clicks
  if (e.target.closest('.action-btn')) return;
  if (!prefersReducedMotion) {
    spawnClickHeart(e.clientX, e.clientY);
  }
});

// Touch support (mobile) - only if not reduced motion
let touchStartTime = 0;
document.addEventListener("touchstart", (e) => {
  if (e.target.closest('.action-btn')) return;
  touchStartTime = Date.now();
  if (!prefersReducedMotion) {
    const touch = e.touches[0];
    spawnClickHeart(touch.clientX, touch.clientY);
  }
}, { passive: true });

// Night mode background
const hourIST = nowIST().getHours();
if (hourIST >= 21 || hourIST <= 5) {
  document.body.style.background =
    "linear-gradient(135deg, #2b1055, #7597de)";
}

// ——— Surprise: Love note button ———
function getLoveNoteForToday() {
  const now = nowIST();
  const today = now.getDate();
  const todayData = days[today];
  if (todayData && todayData.loveNote) return todayData.loveNote;
  return SURPRISE_MESSAGES[Math.floor(Math.random() * SURPRISE_MESSAGES.length)];
}

function showSurprise(message) {
  if (!surpriseOverlay || !surpriseMessageEl) return;
  surpriseMessageEl.innerHTML = message;
  surpriseOverlay.classList.add("active");
}

function hideSurprise() {
  if (!surpriseOverlay) return;
  surpriseOverlay.classList.remove("active");
  surpriseOverlay.setAttribute("aria-hidden", "true");
}

if (loveNoteBtn) {
  loveNoteBtn.addEventListener("click", () => {
    const message = getLoveNoteForToday();
    showSurprise(message);
  });
}

if (closeSurpriseBtn) {
  closeSurpriseBtn.addEventListener("click", hideSurprise);
}

if (surpriseOverlay) {
  surpriseOverlay.addEventListener("click", (e) => {
    if (e.target === surpriseOverlay) hideSurprise();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && surpriseOverlay && surpriseOverlay.classList.contains("active")) hideSurprise();
  });
}

// ——— Easter egg: 7 taps on the card = secret message ———
let cardTapCount = 0;
let cardTapTimer = null;

if (cardEl) {
  cardEl.addEventListener("click", (e) => {
    if (e.target.closest(".action-btn") || e.target.closest("#love-note-btn")) return;
    cardTapCount++;
    clearTimeout(cardTapTimer);
    cardTapTimer = setTimeout(() => { cardTapCount = 0; }, 1500);
    if (cardTapCount === 7) {
      cardTapCount = 0;
      showSurprise(EASTER_EGG_MESSAGE);
    }
  });
}

// Share functionality
if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    const shareData = {
      title: "Valentine's Week for Suhana 💖",
      text: `A Valentine's Week made for Suhana! ${dayName ? dayName.textContent : ""}`,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        shareBtn.textContent = "✓ Copied!";
        setTimeout(() => {
          shareBtn.innerHTML = '<span aria-hidden="true">📤</span> Share';
        }, 2000);
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error.name !== 'AbortError') {
        console.error("Share failed:", error);
        // Fallback to clipboard
        try {
          await navigator.clipboard.writeText(window.location.href);
          shareBtn.textContent = "✓ Copied!";
          setTimeout(() => {
            shareBtn.innerHTML = '<span aria-hidden="true">📤</span> Share';
          }, 2000);
        } catch (clipboardError) {
          alert("Unable to share. URL: " + window.location.href);
        }
      }
    }
  });
}

// Refresh functionality
if (refreshBtn) {
  refreshBtn.addEventListener("click", () => {
    if (loadingIndicator) {
      loadingIndicator.classList.add("active");
    }
    refreshBtn.disabled = true;
    
    // Force update
    update();
    
    // Show visual feedback
    setTimeout(() => {
      if (loadingIndicator) {
        loadingIndicator.classList.remove("active");
      }
      refreshBtn.disabled = false;
    }, 500);
  });
}

// Keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Allow space/enter to trigger buttons when focused
  if ((e.key === "Enter" || e.key === " ") && document.activeElement.classList.contains("action-btn")) {
    e.preventDefault();
    document.activeElement.click();
  }
});

// Update countdown every second
let updateInterval = setInterval(update, 1000);
update();

// Pause updates when page is hidden (performance optimization)
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    clearInterval(updateInterval);
  } else {
    update(); // Update immediately when visible
    updateInterval = setInterval(update, 1000);
  }
});

// Error handling for timezone issues
try {
  nowIST();
} catch (error) {
  console.error("Timezone error:", error);
  // Fallback to local time
  const nowIST = () => new Date();
}


