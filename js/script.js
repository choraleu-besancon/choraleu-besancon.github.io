// Modal Image Gallery
function onClick(element) {
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    var captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

// Change style of navbar and logo on scroll
function handleNavbarAndLogoOnScroll() {
    var navbar = document.getElementById("myNavbar");
    var logo = document.getElementById("navbar-logo");

    // Détection du scroll
    var scrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;

    // Navbar
    if (navbar) {
        if (scrolled) {
            navbar.classList.add("w3-card", "w3-animate-top", "w3-white");
            navbar.style.overflow = "visible";
            navbar.style.zIndex = "1000";
        } else {
            navbar.classList.remove("w3-card", "w3-animate-top", "w3-white");
            navbar.style.overflow = "";
            navbar.style.zIndex = "";
        }
    }

    // Logo
    if (logo) {
        // Détection du dossier courant pour le chemin du logo
        var path = window.location.pathname;
        var prefix = (path.match(/^\/page\//) || path.match(/^\/info\//)) ? "../" : "";
        var logoNormal = prefix + "assets/images/main/logo_CUB_BN_sans_fond.png";
        var logoSticky = prefix + "assets/images/main/logo_CUB_couleur_sans_fond.png";
        logo.src = scrolled ? logoSticky : logoNormal;
    }
}

// Used to toggle the menu on small screens when clicking on the menu button
function toggleFunction() {
    var x = document.getElementById("navDemo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

// Calcul dynamique de l'âge de l'association
document.addEventListener("DOMContentLoaded", function () {
    var date = new Date();
    var current_year = date.getFullYear();
    var creation_asso = 1960;
    var age = current_year - creation_asso;
    var ageElement = document.getElementsByClassName("age");
    Array.from(ageElement).forEach(element => {
        if (element) {
            element.innerHTML = age;
            console.log("Âge de l'association : " + age + " ans");
        }

    });

});

// Redimensionnement dynamique du calendrier Google
function resizeCalendar() {
    var iframes = document.querySelectorAll('iframe[src*="calendar.google.com"]');
    var windowWidth = window.innerWidth;
    iframes.forEach(function (iframe) {
        // Largeur = 90% de la fenêtre, comprise entre 300px et 800px
        var newWidth = Math.min(Math.max(windowWidth * 0.9, 300), 800);
        iframe.style.width = newWidth + 'px';
    });
}
window.addEventListener('resize', resizeCalendar);
window.addEventListener('load', resizeCalendar);

// Inclusion dynamique de la navbar et du footer + correction des liens relatifs
function includeHTML(id, file, callback) {
    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error("Erreur de chargement");
            return response.text();
        })
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => {
            document.getElementById(id).innerHTML = "<!-- Erreur de chargement -->";
        });
}

// Inclusion de la navbar et du footer, puis correction des liens
document.addEventListener("DOMContentLoaded", function () {
    // Détection du dossier courant pour le chemin des includes
    var path = window.location.pathname;

    includeHTML("navbar", "navbar.html", function () {
        handleNavbarAndLogoOnScroll(); // Met à jour le logo dès le chargement
    });
    includeHTML("footer", "footer.html");

    // Ajoute le scroll listener après le chargement du DOM
    window.addEventListener("scroll", handleNavbarAndLogoOnScroll);
    // Appel initial pour le cas où la page est déjà scrollée au chargement
    handleNavbarAndLogoOnScroll();
});
