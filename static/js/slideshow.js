let slideIndex = 1;
let slideInterval;

// Initialize slideshow
document.addEventListener("DOMContentLoaded", function() {
    // SAFETY CHECK: If no slides exist (e.g. on Cart page), stop running!
    if (document.getElementsByClassName("mySlides").length === 0) {
        return; 
    }
    
    showSlides(slideIndex);
    // Auto-play every 5 seconds
    slideInterval = setInterval(function() {
        plusSlides(1);
    }, 5000); 
});

// Next/previous controls
function plusSlides(n) {
  clearInterval(slideInterval); // Reset timer on manual click
  showSlides(slideIndex += n);
  // Restart timer
  slideInterval = setInterval(function() { plusSlides(1); }, 5000); 
}

// Thumbnail image controls
function currentSlide(n) {
  clearInterval(slideInterval);
  showSlides(slideIndex = n);
  slideInterval = setInterval(function() { plusSlides(1); }, 5000); 
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  slides[slideIndex-1].style.display = "block";
  if(dots.length > 0) {
      dots[slideIndex-1].className += " active";
  }
}