$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // smooth scrolling — only handle same-page hash links (#section)
    $('a[href^="#"]').on('click', function (e) {
        const href = $(this).attr('href');
        if (href === '#') return;
        const target = $(href);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: target.offset().top }, 500, 'linear');
        }
    });

    // <!-- emailjs to mail contact form data -->
    $("#contact-form").submit(function (event) {
        emailjs.init({publicKey: 'CAZNSBt4UvP9y7ej-'});

        emailjs.sendForm('service_0as4wrm', 'template_0i8oxpw', '#contact-form')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
                document.getElementById("contact-form").reset();
                alert("Email send Successfully");
            }, function (error) {
                console.log('FAILED...', error);
                alert("Unable to send email, try again!");
            });
        event.preventDefault();
    });
    // <!-- emailjs to mail contact form data -->

});

document.addEventListener('visibilitychange',
    function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Joel Moyal";
            $("#favicon").attr("href", "assets/images/JM_Logo_blue.png");
        }
        else {
            document.title = "Come Back To my Portfolio";
            $("#favicon").attr("href", "assets/images/JM_Logo_blue.png");
        }
    });


// <!-- typed js effect starts -->
var typed = new Typed(".typing-text", {
    strings: ["AI Founder", "Full-Stack Developer", "Software Engineer", "Media Designer"],
    loop: true,
    typeSpeed: 40,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    const response = type === "skills"
        ? await fetch("skills.json")
        : await fetch("./projects/projects.json");
    const data = await response.json();
    return type === "skills" ? data : (data.projects || []);
}

function showSkills(skills) {
    let skillsContainer = document.getElementById("skillsContainer");
    let skillHTML = "";
    skills.forEach(skill => {
        skillHTML += `
        <div class="bar">
              <div class="info">
                <img src=${skill.icon} alt="skill" />
                <span>${skill.name}</span>
              </div>
            </div>`
    });
    skillsContainer.innerHTML = skillHTML;
}

function showProjects(projects) {
    let projectsContainer = document.querySelector("#work .box-container");
    let projectHTML = "";
    projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
        const imageFileName = project.image
            ? (project.image.includes('.') ? project.image : `${project.image}.png`)
            : "portfolio.png";
        const imagePath = `/assets/images/projects/${imageFileName}`;
        const links = project.links || {};
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="${imagePath}" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">`;
          if (links.view) {
            if (links.view === '#') {
                projectHTML += `<span class="btn" style="opacity:0.5;cursor:default;pointer-events:none;"><i class="fas fa-eye"></i> Coming Soon</span>`;
            } else {
                projectHTML += `<a href="${links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
            }
        }
        if (links.video) {
            projectHTML += `<a href="${links.video}" class="btn" target="_blank"><i class="fab fa-youtube"></i> Watch</a>`;
        }
        if (links.code) {
            if (links.code === '#') {
                projectHTML += `<span class="btn" style="opacity:0.5;cursor:default;pointer-events:none;">Code <i class="fas fa-code"></i></span>`;
            } else {
                projectHTML += `<a href="${links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;
            }
        }
        projectHTML += `
          </div>
        </div>
      </div>
    </div>`
    });
    projectsContainer.innerHTML = projectHTML;

    // <!-- tilt js effect starts -->
    // VanillaTilt.init(document.querySelectorAll(".tilt"), {
    //     max: 15,
    // });
    // <!-- tilt js effect ends -->

    /* ===== SCROLL REVEAL ANIMATION ===== */
    const srtop = ScrollReveal({
        origin: 'top',
        distance: '80px',
        duration: 1000,
        reset: true
    });

    /* SCROLL PROJECTS */
    srtop.reveal('.work .box', { interval: 200 });

}

fetchData().then(data => {
    showSkills(data);
});

fetchData("projects").then(data => {
    showProjects(data);
}).catch(error => {
    console.error("Unable to load projects.", error);
});

// <!-- tilt js effect starts -->
VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
});
// <!-- tilt js effect ends -->


// pre loader start
// function loader() {
//     document.querySelector('.loader-container').classList.add('fade-out');
// }
// function fadeOut() {
//     setInterval(loader, 500);
// }
// window.onload = fadeOut;
// pre loader end

// disable developer mode
// document.onkeydown = function (e) {
//     if (e.keyCode == 123) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
//         return false;
//     }
//     if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
//         return false;
//     }
// }



/* ===== SCROLL REVEAL ANIMATION ===== */
const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: true
});

/* SCROLL HOME */
srtop.reveal('.home .content h3', { delay: 200 });
srtop.reveal('.home .content p', { delay: 200 });
srtop.reveal('.home .content .btn', { delay: 200 });

srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin', { interval: 600 });
srtop.reveal('.home .github', { interval: 800 });
srtop.reveal('.home .twitter', { interval: 1000 });
srtop.reveal('.home .instagram', { interval: 600 });

/* SCROLL ABOUT */
srtop.reveal('.about .content h3', { delay: 200 });
srtop.reveal('.about .content .tag', { delay: 200 });
srtop.reveal('.about .content p', { delay: 200 });
srtop.reveal('.about .content .box-container', { delay: 200 });
srtop.reveal('.about .content .resumebtn', { delay: 200 });


/* SCROLL SKILLS */
srtop.reveal('.skills .container', { interval: 200 });
srtop.reveal('.skills .container .bar', { delay: 400 });

/* SCROLL EDUCATION */
srtop.reveal('.education .box', { interval: 200 });

/* SCROLL PROJECTS */
srtop.reveal('.work .box', { interval: 200 });

/* SCROLL EXPERIENCE */
srtop.reveal('.experience .timeline', { delay: 400 });
srtop.reveal('.experience .timeline .container', { interval: 400 });

/* SCROLL CONTACT */
srtop.reveal('.contact .container', { delay: 400 });
srtop.reveal('.contact .container .form-group', { delay: 400 });

/* ===== CHATBOT FUNCTIONALITY ===== */
(function () {
    'use strict';

    const WORKER_URL = 'https://joel-chatbot-worker.joelmoyal123.workers.dev';

    const toggle   = document.getElementById('chatbot-toggle');
    const win      = document.getElementById('chatbot-window');
    const closeBtn = document.getElementById('chatbot-close');
    const messages = document.getElementById('chatbot-messages');
    const input    = document.getElementById('chatbot-input');
    const sendBtn  = document.getElementById('chatbot-send');
    const typing   = document.getElementById('chatbot-typing');
    const chips    = document.querySelectorAll('.chip');

    const history = [];

    // --- Toggle open/close ---
    toggle.addEventListener('click', function () {
        var isOpen = win.classList.toggle('active');
        toggle.classList.toggle('open', isOpen);
        var icon = toggle.querySelector('i');
        icon.classList.toggle('fa-comment-dots', !isOpen);
        icon.classList.toggle('fa-comment', isOpen);
        if (isOpen) { input.focus(); scrollToBottom(); }
    });

    closeBtn.addEventListener('click', closeChat);

    document.addEventListener('click', function (e) {
        if (!e.target.closest('#chatbot-container') && win.classList.contains('active')) {
            closeChat();
        }
    });

    win.addEventListener('click', function (e) { e.stopPropagation(); });

    // --- Chips ---
    chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
            if (chip.dataset.msg) sendMessage(chip.dataset.msg);
        });
    });

    // --- Keyboard ---
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(input.value); }
    });

    sendBtn.addEventListener('click', function () { sendMessage(input.value); });

    // --- Send + stream ---
    async function sendMessage(text) {
        text = text.trim();
        if (!text || sendBtn.disabled) return;

        appendBubble('user', text);
        history.push({ role: 'user', content: text });
        input.value = '';
        setLoading(true);
        showTyping(true);

        var botBubble = createBotBubble();
        var fullText = '';

        try {
            var res = await fetch(WORKER_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: history }),
            });

            if (!res.ok) throw new Error('HTTP ' + res.status);

            showTyping(false);
            messages.appendChild(botBubble.wrapper);
            botBubble.bubble.classList.add('streaming');
            scrollToBottom();

            var reader = res.body.getReader();
            var decoder = new TextDecoder();
            var buffer = '';

            while (true) {
                var chunk = await reader.read();
                if (chunk.done) break;
                buffer += decoder.decode(chunk.value, { stream: true });
                var lines = buffer.split('\n');
                buffer = lines.pop();

                for (var i = 0; i < lines.length; i++) {
                    var line = lines[i];
                    if (!line.startsWith('data:')) continue;
                    var data = line.slice(5).trim();
                    if (data === '[DONE]') break;
                    try {
                        var json = JSON.parse(data);
                        if (json.type === 'content_block_delta' && json.delta && json.delta.type === 'text_delta') {
                            fullText += json.delta.text;
                            botBubble.bubble.textContent = fullText;
                            scrollToBottom();
                        }
                    } catch (e) { /* ignore malformed lines */ }
                }
            }
        } catch (err) {
            showTyping(false);
            if (!botBubble.wrapper.parentNode) messages.appendChild(botBubble.wrapper);
            botBubble.bubble.textContent = 'Sorry, something went wrong. Please try again or use the contact form.';
            console.error('[Chatbot]', err);
        } finally {
            botBubble.bubble.classList.remove('streaming');
            if (fullText) history.push({ role: 'assistant', content: fullText });
            setLoading(false);
            scrollToBottom();
        }
    }

    function appendBubble(role, text) {
        var wrapper = document.createElement('div');
        wrapper.className = 'chat-message ' + role + '-message';
        var bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        bubble.textContent = text;
        wrapper.appendChild(bubble);
        messages.appendChild(wrapper);
        scrollToBottom();
    }

    function createBotBubble() {
        var wrapper = document.createElement('div');
        wrapper.className = 'chat-message bot-message';
        var bubble = document.createElement('div');
        bubble.className = 'message-bubble';
        wrapper.appendChild(bubble);
        return { wrapper: wrapper, bubble: bubble };
    }

    function showTyping(visible) {
        typing.classList.toggle('hidden', !visible);
        if (visible) scrollToBottom();
    }

    function setLoading(loading) {
        sendBtn.disabled = loading;
        input.disabled = loading;
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function closeChat() {
        win.classList.remove('active');
        toggle.classList.remove('open');
        var icon = toggle.querySelector('i');
        icon.classList.remove('fa-comment');
        icon.classList.add('fa-comment-dots');
    }
})();
