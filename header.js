const headContent = `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
    
    <!-- Security Headers -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' https:;">
    
    <!-- Choose one X-Frame-Options policy: SAMEORIGIN or DENY -->
    <meta http-equiv="X-Frame-Options" content="DENY">
    
    <meta http-equiv="Strict-Transport-Security" content="max-age=31536000; includeSubDomains; preload">
    
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    
    <meta http-equiv="Referrer-Policy" content="no-referrer">
    
    <!-- Optional: Enable XSS Protection for older browsers -->
    <!-- <meta http-equiv="X-XSS-Protection" content="1; mode=block"> -->
    
    <!-- Optional: Permissions Policy (adjust as needed) -->
    <!-- <meta http-equiv="Permissions-Policy" content="geolocation=(), microphone=(), camera=()"> -->
`;
document.head.innerHTML += headContent;


document.addEventListener("DOMContentLoaded", function() {
  const menuToggle = document.getElementById("menu-toggle");
  const floatingMenu = document.getElementById("floating-menu");
  const bigOptions = document.querySelectorAll(".big-option");

  // Toggle the visibility of the floating menu when clicking the fixed button
  menuToggle.addEventListener("click", function() {
    if (floatingMenu.style.display === "none" || floatingMenu.style.display === "") {
      floatingMenu.style.display = "block";
    } else {
      floatingMenu.style.display = "none";
    }
  });

  // Toggle submenu visibility for each big option when clicked
  bigOptions.forEach(function(option) {
    option.addEventListener("click", function(e) {
      // Prevent propagation so that clicking a big option doesn't toggle the entire menu
      e.stopPropagation();
      const parentItem = option.parentElement;
      parentItem.classList.toggle("active");

      // Optionally, if you want only one expanded option at a time, you can remove the active class from others:
      /*
      document.querySelectorAll(".menu-item").forEach(function(item) {
        if (item !== parentItem) {
          item.classList.remove("active");
        }
      });
      */
    });
  });

  // Highlight submenu items when clicked
  const submenuLinks = document.querySelectorAll(".submenu-item a");
  submenuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
      // Remove active class from all submenu items if needed
      submenuLinks.forEach(function(l) {
        l.classList.remove("active");
      });
      link.classList.add("active");
    });
  });
});
