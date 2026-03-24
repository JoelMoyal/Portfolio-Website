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
    document.title = "Projects | Portfolio Joël Moyal";
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
      return data.projects || data;
    });
}

function showProjects(projects) {
  let projectsContainer = document.querySelector(".work .box-container");
  let projectsHTML = "";

  projects.forEach((project) => {
    let buttons = "";
    if (project.links.view) {
      if (project.links.view === '#') {
        buttons += `<span class="btn btn-disabled"><i class="fas fa-eye"></i> Coming Soon</span>`;
      } else {
        buttons += `<a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>`;
      }
    }
    if (project.links.play) {
      buttons += `<a href="${project.links.play}" class="btn" target="_blank"><i class="fas fa-gamepad"></i> Play</a>`;
    }
    if (project.links.video) {
      buttons += `<a href="${project.links.video}" class="btn btn-watch" target="_blank"><i class="fab fa-youtube"></i> Watch</a>`;
    }
    if (project.links.code) {
      if (project.links.code === '#') {
        buttons += `<span class="btn btn-disabled"><i class="fas fa-code"></i> Private</span>`;
      } else {
        buttons += `<a href="${project.links.code}" class="btn btn-code" target="_blank"><i class="fas fa-code"></i> Code</a>`;
      }
    }

    projectsHTML += `
    <div class="grid-item ${project.category}">
      <div class="project-card">
        <div class="card-img-wrap">
          <img draggable="false" loading="lazy" src="/assets/images/projects/${project.image}" alt="${project.name}" />
          <span class="cat-badge">${project.category}</span>
        </div>
        <div class="card-info">
          <h3 class="card-title">${project.name}</h3>
          <p class="card-desc">${project.desc}</p>
          <div class="card-btns">${buttons}</div>
        </div>
      </div>
    </div>`;
  });

  projectsContainer.innerHTML = projectsHTML;

  // isotope filter
  var $grid = $(".box-container").isotope({
    itemSelector: ".grid-item",
    layoutMode: "fitRows",
  });

  $(".button-group").on("click", "button", function () {
    $(".button-group").find(".is-checked").removeClass("is-checked");
    $(this).addClass("is-checked");
    $grid.isotope({ filter: $(this).attr("data-filter") });
  });
}

getProjects().then((data) => {
  showProjects(data);
}).catch((err) => {
  console.error("Failed to load projects:", err);
  const container = document.querySelector(".work .box-container");
  if (container) container.innerHTML = '<p style="color:#fff;text-align:center;font-size:1.6rem;padding:3rem;">Unable to load projects. Please try again.</p>';
});
// fetch projects end


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
