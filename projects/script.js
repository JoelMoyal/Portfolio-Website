$(document).ready(function () {
  $("#menu").click(function () {
    $(this).toggleClass("fa-times");
    $(".navbar").toggleClass("nav-toggle");
  });

  $(window).on("scroll load", function () {
    $("#menu").removeClass("fa-times");
    $(".navbar").removeClass("nav-toggle");

    if (window.scrollY > 60) {
      document.querySelector("#scroll-top").classList.add("active");
    } else {
      document.querySelector("#scroll-top").classList.remove("active");
    }
  });
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "visible") {
    document.title = "Projects | Portfolio joel Moyal";
    $("#favicon").attr("href", "assets/images/JM_Logo_blue.png");
  } else {
    document.title = "Come Back To My Portfolio";
    $("#favicon").attr("href", "assets/images/JM_Logo_blue.png");
  }
});

// fetch projects start
function getProjects() {
  return fetch("projects.json")
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";
  projects.forEach((project) => {
    projectsHTML += `
        <div class="grid-item ${project.category}">
        <div class="box tilt" style="width: 380px; margin: 1rem">
      <img draggable="false" src="/assets/images/projects/${project.image}" alt="project" />
      <div class="content">
        <div class="tag">
        <h3>${project.name}</h3>
        </div>
        <div class="desc">
          <p>${project.desc}</p>
          <div class="btns">`;
    if (project.links.view) {
        projectsHTML += `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
    }
    if (project.links.play) {
      projectsHTML += `<a href="${project.links.play}" class="btn" target="_blank"><i class="fas fa-eye"></i> play</a>`;
  }
    if (project.links.code) {
      projectsHTML += `<a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>`;
    }

    projectsHTML += `
        </div>
        </div>
      </div>
    </div>
    </div>`;
  });

  projectsContainer.innerHTML = projectsHTML;

  // vanilla tilt.js
  // VanillaTilt.init(document.querySelectorAll(".tilt"), {
  //     max: 20,
  // });
  // // vanilla tilt.js

  // /* ===== SCROLL REVEAL ANIMATION ===== */
  // const srtop = ScrollReveal({
  //     origin: 'bottom',
  //     distance: '80px',
  //     duration: 1000,
  //     reset: true
  // });

  // /* SCROLL PROJECTS */
  // srtop.reveal('.work .box', { interval: 200 });

  // isotope filter products
  var $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
    masonry: {
      columnWidth: 200,
    },
  });

  // filter items on button click
  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    var filterValue = $(this).attr("data-filter");
    $grid.isotope({ filter: filterValue });
  });
}

getProjects().then((data) => {
  showProjects(data);
});
// fetch projects end

// Start of Tawk.to Live Chat
var Tawk_API = Tawk_API || {},
  Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"),
    s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = "embed.tawk.to/65f8e6081ec1082f04d8c77e/1hpa454aj";
  s1.charset = "UTF-8";
  s1.setAttribute("crossorigin", "*");
  s0.parentNode.insertBefore(s1, s0);
})();
// End of Tawk.to Live Chat

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
