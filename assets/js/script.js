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
experienceSpan.textContent = experience;

var modelViewer = document.querySelector('.modelView');
modelViewer.style.opacity = '0';

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

window.addEventListener('load', () => {
	
	const loader = document.querySelector('.loading');
	const icons = document.querySelector('.icons');

	setTimeout(function () {
		modelViewer.style.opacity = '1';
		modelViewer.style.top = '0';
	}, 3500);


	setTimeout(() => {
		gsap.to(icons, {
			duration: 1,
			scale: 0,
			opacity: 0,
			ease: 'power4.out',
			onComplete: () => {
				loader.style.display = 'none'; 
			}
		});

		animateTextReveal(".subtitle, .title, .hireMe, .social-item, .widget, .navbar, .img-thumbnail, section", {
			delay: 1.3,
			stagger: 0.2,
			duration: 1.5,
			ease: "power4.out"
		});
		window.location.hash = 'home';
	}, 1500);
});



gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray('.service h6').forEach((element) => {
	gsap.from(element, {
		y: 50,
		opacity: 0,
		duration: 1,
		scrollTrigger: {
			trigger: element,
			start: 'top 80%',
			end: 'bottom 20%',
			toggleActions: 'play none none reverse', // Adjust toggle actions as needed
		},
	});
});



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

	$('.view-project').click(function() {
		var title = $(this).closest('.overlay-infos').find('.project-title').data('title');
		var description = $(this).closest('.overlay-infos').find('.project-title').data('description');
		var imageUrl = $(this).closest('.img-wrapper').find('img').data('img');
  
		// Set modal content
		$('#modalTitle').text(title);
		$('#modalDescription').text(description);
		$('#modalImage').attr('src', imageUrl);
  
		// Show modal
		$('#projectModal').modal('show');
	  });
});
