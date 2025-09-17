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

    // smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear')
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

// Skills data
const skillsData = {
  "Programming Languages": ["C", "JavaScript", "TypeScript", "Python", "Java", "HTML5", "CSS3", "SQL"],
  "Frameworks & Libraries": ["React", "Node.js", "Express.js", "Bootstrap", "jQuery"],
  "Tools & Platforms": ["Git", "GitHub", "VS Code", "Postman", "MongoDB", "MySQL"],
  "Design": ["Adobe Photoshop", "Adobe Illustrator", "Adobe InDesign", "Figma", "Blender"]
};

// Load skills
function loadSkills() {
  const skillsContainer = document.getElementById("skillsContainer");
  
  Object.entries(skillsData).forEach(([category, skills]) => {
    const categoryDiv = document.createElement("div");
    categoryDiv.className = "skills-category";
    
    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category;
    categoryDiv.appendChild(categoryTitle);

    const skillsList = document.createElement("div");
    skillsList.className = "skills-list";
    
    skills.forEach(skill => {
      const skillDiv = document.createElement("div");
      skillDiv.className = "skill-item";
      skillDiv.textContent = skill;
      skillsList.appendChild(skillDiv);
    });

    categoryDiv.appendChild(skillsList);
    skillsContainer.appendChild(categoryDiv);
  });
}

// Call loadSkills when document is ready
document.addEventListener("DOMContentLoaded", loadSkills);

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
    strings: ["frontend developer", "backend developer", "web designer", "media Designer", "Web developer"],
    loop: true,
    typeSpeed: 40,
    backSpeed: 25,
    backDelay: 500,
});
// <!-- typed js effect ends -->

async function fetchData(type = "skills") {
    let response
    type === "skills" ?
        response = await fetch("skills.json")
        :
        response = await fetch("./projects/projects.json")
    const data = await response.json();
    return data;
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
        projectHTML += `
        <div class="box tilt">
      <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">`;
          if (project.links.view) {
            projectHTML += `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
        }
        if (project.links.code) {
            projectHTML += `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;
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
$(document).ready(function() {
    const chatbotToggle = $('#chatbot-toggle');
    const chatbotWrapper = $('#chatbot-iframe-wrapper');
    const chatbotClose = $('#chatbot-close');

    // Toggle chatbot visibility
    chatbotToggle.click(function() {
        chatbotWrapper.toggleClass('active');

        // Change icon when chatbot is open
        const icon = chatbotToggle.find('i');
        if (chatbotWrapper.hasClass('active')) {
            icon.removeClass('fa-comment-dots').addClass('fa-comment');
        } else {
            icon.removeClass('fa-comment').addClass('fa-comment-dots');
        }
    });

    // Close chatbot
    chatbotClose.click(function() {
        chatbotWrapper.removeClass('active');
        chatbotToggle.find('i').removeClass('fa-comment').addClass('fa-comment-dots');
    });

    // Close chatbot when clicking outside
    $(document).click(function(event) {
        if (!$(event.target).closest('.chatbot-container').length) {
            chatbotWrapper.removeClass('active');
            chatbotToggle.find('i').removeClass('fa-comment').addClass('fa-comment-dots');
        }
    });

    // Prevent chatbot from closing when clicking inside it
    chatbotWrapper.click(function(event) {
        event.stopPropagation();
    });
});