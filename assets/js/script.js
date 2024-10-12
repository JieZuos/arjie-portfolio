gsap.registerPlugin(ScrollTrigger);
// Calculate Experience Function
$(".exitBtn").hide();
$('.pr-show').hide();
var chartData = [
  {
    id: "su__chart-bar-5",
    label: "Laravel",
    height: "95%",
    color: "#FF2D20", // Laravel logo color
  },
  {
    id: "su__chart-bar-3",
    label: "Vanilla JavaScript",
    height: "80%",
    color: "#F0DB4F", // Updated JavaScript logo color
  },
  {
    id: "su__chart-bar-9", // Updated ID to avoid duplicate
    label: "Node.js",
    height: "80%",
    color: "#68A063", // Node.js logo color
  },
  {
    id: "su__chart-bar-8", 
    label: "React",
    height: "60%",
    color: "#61DAFB", // Updated React logo color
  },
  {
    id: "su__chart-bar-6",
    label: "MySQL",
    height: "90%",
    color: "#4479A1", // MySQL logo color
  },
  {
    id: "su__chart-bar-4",
    label: "PHP",
    height: "90%",
    color: "#787CB5", // PHP logo color
  },
  {
    id: "su__chart-bar-7",
    label: "Blender",
    height: "70%",
    color: "#F5792A", // Blender logo color
  },
  {
    id: "su__chart-bar-1",
    label: "HTML",
    height: "95%",
    color: "#E34F26", // HTML logo color
  },
  {
    id: "su__chart-bar-2",
    label: "CSS",
    height: "95%",
    color: "#1572B6", // CSS logo color
  }
];




var $chart = $('.su__comp-chart'),
  $x_axis = $chart.find('.su__chart-x-axis'),
  $y_axis = $chart.find('.su__chart-y-axis'),
  $axis_labels = $('.su__chart-axis-label');


chartData.forEach(function (data, index) {
  // Calculate the left position dynamically
  var barWidth = 105; // Width of each bar
  var gap = 15; // Gap between bars
  var leftPosition = 30 + (barWidth + gap) * index;

  // Append bar HTML with dynamic left position
  var barHtml = `
        <div id="${data.id}" class="su__chart-bar" style="background-color: ${data.color}; left: ${leftPosition}px;">
          <div class="su__chart-bar-label">${data.label}</div>
        </div>`;
  $chart.append(barHtml);
});


var timelines = gsap.timeline({
  paused: true
});

timelines
  .add([
    gsap.from($x_axis, {
      duration: 0.3,
      right: '100%'
    }),

    gsap.from($y_axis, {
      duration: 0.3,
      top: '100%'
    })
  ])
  .from($axis_labels, {
    duration: 0.3,
    opacity: 0,
    stagger: 0.1
  });

chartData.forEach(function (data) {
  timelines.add(gsap.fromTo(`#${data.id}`, {
    height: '1%'
  }, {
    duration: 0.3,
    height: data.height
  }));
});

// $('.play').on('click', function() {
//   timelines.play();
// });

// $('.reverse').on('click', function() {
//   timelines.reverse();
// });


function calculateExperience(startDate) {
  const currentDate = new Date();
  const start = new Date(startDate);
  const timeDiff = currentDate - start;
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30.436875)); // Average month length in milliseconds
  const years = Math.floor(months / 12);

  if (years >= 1) {
    if (months % 12 === 0) {
      return `${years} year${years > 1 ? 's' : ''}`;
    } else {
      const remainingMonths = months % 12;
      return `${years} year${years > 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
    }
  } else {
    return `${months} month${months > 1 ? 's' : ''}`;
  }
}

const startDate = '2023-06-18';
const experience = calculateExperience(startDate);
document.querySelector("#experienceSpan").textContent = experience; // Ensure element is found correctly

// GSAP Animation for Text Reveal
function animateTextReveal(selector, options) {
  gsap.from(selector, {
    opacity: 0,
    y: 20,
    delay: options.delay || 0,
    stagger: options.stagger || 0.2,
    duration: options.duration || 1.8,
    ease: options.ease || "power4.out"
  });
}

// Wait for page load event
window.addEventListener('load', () => {
  const loader = document.querySelector('.loading');
  const icons = document.querySelector('.icons');
  const modelViewer = document.querySelector('.modelView');
  loadProjects();
  // Use GSAP animation for modelViewer fade in
  gsap.to(modelViewer, {
    opacity: 1,
    top: 0,
    delay: 3.5,
    duration: 1,
    ease: "power4.out"
  });

  setTimeout(() => {
    // GSAP animation for loader icons
    gsap.to(icons, {
      duration: 1,
      scale: 0,
      opacity: 0,
      ease: 'power4.out',
      onComplete: () => {
        loader.style.display = 'none';
      }
    });

    // Trigger text reveal after loader disappears
    animateTextReveal(".subtitle, .title, .hireMe, .social-item, .widget, .navbar", {
      delay: 1.3,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.out"
    });

    window.location.hash = 'home';
  }, 1500);
});

// Assuming 'timelines' is a GSAP timeline initialized elsewhere
gsap.utils.toArray('.section').forEach((element) => {
  gsap.from(element, {
    y: 50,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      once: true,
      onEnter: () => {
        // Check if the element has the class 'revealUp'
        if (element.classList.contains('revealUp')) {
          console.log("Playing timeline for revealUp section"); // Debug
          timelines.play(); // Trigger the timelines.play() only for this specific section
        }
      },
    }
  });
});




// Smooth scroll for navigation links using jQuery
$(document).ready(function () {
  $(".nav-link").on('click', function (event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 700, function () {
        window.location.hash = hash;
      });
    }
  });

  // // Project Modal Setup
  // $('.view-project').click(function () {
  //   var title = $(this).closest('.overlay-infos').find('.project-title').data('title');
  //   var description = $(this).closest('.overlay-infos').find('.project-title').data('description');
  //   var imageUrl = $(this).closest('.img-wrapper').find('img').data('img');

  //   // Set modal content
  //   $('#modalTitle').text(title);
  //   $('#modalDescription').text(description);
  //   $('#modalImage').attr('src', imageUrl);

  //   // Show modal
  //   $('#projectModal').modal('show');
  // });
});

function loadProjects() {
  $.getJSON('assets/js/projects.json') // Replace with the actual path to your JSON file
    .done(function (data) {
      const companies = {};
      let totalCount = 2;

      // Group projects by company
      data.forEach(project => {
        if (!companies[project.company]) {
          companies[project.company] = [];
        }
        companies[project.company].push(project);
        totalCount++;
      });

      $('#project-count').text(totalCount);
      $('.roadmap-container').empty();

      // Loop through companies and create roadmaps
      $.each(companies, function (company, projects) {
        const roadmap = $('<div class="roadmap"></div>');
        const roadmapLine = $('<div class="roadmap-line"></div>');
        roadmap.append(roadmapLine);

        projects.forEach(project => {
          const roadmapItem = $(`<div class="btn roadmap-item" data-id="${project.id}">${project.title} <br><p>(${project.date_range})</p></div>`);

          // Add click event to show modal with project details
          roadmapItem.on('click', function () {
            showProject(project); // Pass the project data to the function
          });

          roadmap.append(roadmapItem);
        });

        const companySection = $(
          `<div class="company-roadmap mt-5">
            <h3>${company}</h3>
          </div>`
        );

        companySection.append(roadmap);
        $('.roadmap-container').append(companySection);
      });
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error('Error fetching JSON data:', textStatus, errorThrown);
    });
}

function showProject(project) {
  let tl = gsap.timeline({
    ease: "power4.inOut"
  });
  $('#technology-buttons').empty();
  $('#title').text(project.title);
  $('#date-range').text(project.date_range);
  $('#project-description').text(project.project_description);
  $('#problem').text(project.problem);
  $('#solution').text(project.solution);
  
  // Add project technologies
  project.technologies.forEach(function(tech) {
    $('#technology-buttons').append(`
        <button style="border-radius: 50px; margin: 5px; padding: 10px 20px;">
            ${tech}
        </button>
    `);
  });

  // Populate the carousel with project images
  const carouselInner = $('#projectSlideshow .carousel-inner');
  carouselInner.empty();

  for (let i = 1; i <= project.image_count; i++) {
    const imageSrc = `${project.image_path}image${i}.png`;
    const carouselItem = $(`
      <div class="carousel-item ${i === 1 ? 'active' : ''}">
        <img src="${imageSrc}" class="d-block w-100 project-image" alt="Project Image" style="border-radius:20px; cursor: zoom-in;">
      </div>
    `);

    // Add click event for zooming the image
    carouselItem.find('img').on('click', function() {
      console.log('test');

      $('#modalImage').attr('src', imageSrc); // Set the clicked image as modal image
      $('#imageModal').modal('show'); // Open the modal
    });

    carouselInner.append(carouselItem);
  }

  // GSAP Animations for text reveal
  animateTextReveal(".pr-show > *, .pr-show > * > *, .pr-show > * > * > *", {
    delay: 0.8,
    stagger: 0.2,
    duration: 1.5,
    ease: "power4.out"
  });

  // Show the project container with animations
  $('.pr-show').show();
  tl.set("button#from-left", {
    pointerEvents: 'none'
  });

  tl.to(".from-left .tile", {
    duration: 0.4,
    width: "100%",
    left: "0%",
    delay: 0.2,
    stagger: 0.05,
  });

  $(".exitBtn").css("opacity", 1).show();
}




$(".exitBtn").on("click", function () {
  hideProject();
});


function hideProject() {
  let tl = gsap.timeline({
    ease: "power4.inOut"
  });

  tl.set("button#to-left", {
    pointerEvents: 'none'
  });

  tl.to(".from-left .tile", {
    duration: 0.4,
    width: "0%",
    left: "100%",
    delay: 0.5,
    stagger: 0.05,
  });
  $('.pr-show').fadeOut(400, function () {
    $(this).hide();
  });

  // Reverse the animation
  tl.set(".from-left .tile", {
    left: "0",
    width: "0"
  });
  tl.set("button#to-left", {
    pointerEvents: 'all'
  });
  tl.to(".exitBtn", {
    duration: 0.1,
    opacity: 0,
    ease: "power4.out",
    onComplete: () => {
      $(".exitBtn").hide();
    }
  }, "-=1");
}