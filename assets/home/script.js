 /* =========================================================
ANTIQUE BRILLIANCE
Premium Domain for Sale Website
File: script.js
========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

/* =====================================================  
   01. SELECT ELEMENTS  
===================================================== */  

const header = document.querySelector(".site-header");  

const menuToggle = document.getElementById("menuToggle");  

const mainNav = document.getElementById("mainNav");  

const navOverlay = document.getElementById("navOverlay");  

const navLinks = document.querySelectorAll(".nav-link");  

const currentYear = document.getElementById("currentYear");  

const revealElements = document.querySelectorAll(  
    ".reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-scale"  
);  

const reducedMotion = window.matchMedia(  
    "(prefers-reduced-motion: reduce)"  
);  


/* =====================================================  
   02. COPYRIGHT YEAR  
===================================================== */  

if (currentYear) {  
    currentYear.textContent = new Date().getFullYear();  
}  


/* =====================================================  
   03. STICKY NAVBAR SCROLL EFFECT  
===================================================== */  

let scrollTicking = false;  

function updateHeader() {  

    if (!header) return;  

    header.classList.toggle(  
        "scrolled",  
        window.scrollY > 20  
    );  

}  

updateHeader();  

window.addEventListener("scroll", function () {  

    if (!scrollTicking) {  

        window.requestAnimationFrame(function () {  

            updateHeader();  

            scrollTicking = false;  

        });  

        scrollTicking = true;  

    }  

}, { passive: true });  


/* =====================================================  
   04. MOBILE NAVIGATION  
   Right-side sliding panel  
===================================================== */  

function isMobileMenuAvailable() {  

    return (  
        mainNav &&  
        menuToggle &&  
        navOverlay  
    );  

}  


function openMenu() {  

    if (!isMobileMenuAvailable()) return;  

    mainNav.classList.add("is-open");  

    menuToggle.classList.add("is-active");  

    navOverlay.classList.add("is-visible");  

    menuToggle.setAttribute(  
        "aria-expanded",  
        "true"  
    );  

    menuToggle.setAttribute(  
        "aria-label",  
        "Close navigation menu"  
    );  

    document.body.classList.add("menu-open");  

}  


function closeMenu() {  

    if (!isMobileMenuAvailable()) return;  

    mainNav.classList.remove("is-open");  

    menuToggle.classList.remove("is-active");  

    navOverlay.classList.remove("is-visible");  

    menuToggle.setAttribute(  
        "aria-expanded",  
        "false"  
    );  

    menuToggle.setAttribute(  
        "aria-label",  
        "Open navigation menu"  
    );  

    document.body.classList.remove("menu-open");  

}  


function toggleMenu() {  

    if (!isMobileMenuAvailable()) return;  

    const isOpen = mainNav.classList.contains("is-open");  

    if (isOpen) {  

        closeMenu();  

    } else {  

        openMenu();  

    }  

}  


if (isMobileMenuAvailable()) {  

    menuToggle.addEventListener(  
        "click",  
        toggleMenu  
    );  

    navOverlay.addEventListener(  
        "click",  
        closeMenu  
    );  


    /* Close when a navigation link is clicked */  

    mainNav.querySelectorAll("a").forEach(function (link) {  

        link.addEventListener("click", function () {  

            closeMenu();  

        });  

    });  


    /* Close on Escape */  

    document.addEventListener("keydown", function (event) {  

        if (  
            event.key === "Escape" &&  
            mainNav.classList.contains("is-open")  
        ) {  

            closeMenu();  

            menuToggle.focus();  

        }  

    });  


    /* Close when clicking outside the panel */  

    document.addEventListener("click", function (event) {  

        if (  
            !mainNav.classList.contains("is-open")  
        ) {  
            return;  
        }  

        const clickedInsideMenu =  
            mainNav.contains(event.target);  

        const clickedToggle =  
            menuToggle.contains(event.target);  

        if (  
            !clickedInsideMenu &&  
            !clickedToggle  
        ) {  

            closeMenu();  

        }  

    });  


    /* Reset mobile menu when switching to desktop */  

    window.addEventListener("resize", function () {  

        if (window.innerWidth > 767) {  

            closeMenu();  

        }  

    });  

}  


/* =====================================================  
   05. SMOOTH SCROLLING  
   Internal # links  
===================================================== */  

const internalLinks = document.querySelectorAll(  
    'a[href^="#"]'  
);  


internalLinks.forEach(function (link) {  

    link.addEventListener("click", function (event) {  

        const href = link.getAttribute("href");  

        if (  
            !href ||  
            href === "#" ||  
            href.length < 2  
        ) {  
            return;  
        }  

        let target;  

        try {  

            target = document.querySelector(href);  

        } catch (error) {  

            return;  

        }  

        if (!target) return;  

        event.preventDefault();  

        const headerHeight = header  
            ? header.offsetHeight  
            : 0;  

        const targetPosition =  
            target.getBoundingClientRect().top +  
            window.scrollY -  
            headerHeight -  
            12;  

        window.scrollTo({  

            top: Math.max(0, targetPosition),  

            behavior: reducedMotion.matches  
                ? "auto"  
                : "smooth"  

        });  


        /* Update the browser hash */  

        if (history.replaceState) {  

            history.replaceState(  
                null,  
                "",  
                href  
            );  

        }  

    });  

});  


/* =====================================================  
   06. ACTIVE NAVIGATION LINK  
   Highlight section currently in view  
===================================================== */  

const observedSections = document.querySelectorAll(  
    "#home, #top, #about, #potential, #brand-value, #domain-for-sale, #acquisition, #contact"  
);  


function setActiveNavigation(sectionId) {  

    if (!navLinks.length) return;  

    navLinks.forEach(function (link) {  

        const href = link.getAttribute("href");  

        const active =  
            href === "#" + sectionId;  

        link.classList.toggle(  
            "active",  
            active  
        );  

        if (active) {  

            link.setAttribute(  
                "aria-current",  
                "location"  
            );  

        } else {  

            link.removeAttribute(  
                "aria-current"  
            );  

        }  

    });  

}  


if ("IntersectionObserver" in window) {  

    const navigationObserver = new IntersectionObserver(  

        function (entries) {  

            const visibleEntries = entries  
                .filter(function (entry) {  

                    return entry.isIntersecting;  

                })  
                .sort(function (a, b) {  

                    return (  
                        b.intersectionRatio -  
                        a.intersectionRatio  
                    );  

                });  


            if (visibleEntries.length) {  

                setActiveNavigation(  
                    visibleEntries[0].target.id  
                );  

            }  

        },  

        {  

            root: null,  

            rootMargin: "-20% 0px -65% 0px",  

            threshold: [0, 0.1, 0.25, 0.5]  

        }  

    );  


    observedSections.forEach(function (section) {  

        navigationObserver.observe(section);  

    });  

}  


/* =====================================================  
   07. SCROLL REVEAL ANIMATIONS  
   Requires .js-reveal on the HTML element  
===================================================== */  

if (reducedMotion.matches) {  

    revealElements.forEach(function (element) {  

        element.classList.add("is-visible");  

    });  

} else if ("IntersectionObserver" in window) {  

    const revealObserver = new IntersectionObserver(  

        function (entries, observer) {  

            entries.forEach(function (entry) {  

                if (entry.isIntersecting) {  

                    entry.target.classList.add(  
                        "is-visible"  
                    );  

                    observer.unobserve(  
                        entry.target  
                    );  

                }  

            });  

        },  

        {  

            root: null,  

            threshold: 0.12,  

            rootMargin: "0px 0px -35px 0px"  

        }  

    );  


    revealElements.forEach(function (element) {  

        revealObserver.observe(element);  

    });  

} else {  

    /* Fallback for older browsers */  

    revealElements.forEach(function (element) {  

        element.classList.add("is-visible");  

    });  

}  


/* =====================================================  
   08. BUTTON HOVER ACCESSIBILITY  
   Visual effects are handled by CSS  
===================================================== */  

const buttons = document.querySelectorAll(  
    ".ab-btn, .nav-cta, .btn-primary, .btn-outline"  
);  


buttons.forEach(function (button) {  

    button.addEventListener("keydown", function (event) {  

        if (  
            event.key === "Enter" ||  
            event.key === " "  
        ) {  

            if (  
                button.tagName.toLowerCase() === "button"  
            ) {  

                event.preventDefault();  

                button.click();  

            }  

        }  

    });  

});  


/* =====================================================  
   09. EXTERNAL LINK SECURITY  
   Apply safe attributes to target="_blank" links  
===================================================== */  

document.querySelectorAll(  
    'a[target="_blank"]'  
).forEach(function (link) {  

    link.setAttribute(  
        "rel",  
        "noopener noreferrer"  
    );  

});  


/* =====================================================  
   10. IMAGE LOADING FALLBACK  
   Hide broken images gracefully  
===================================================== */  

const images = document.querySelectorAll("img");  


images.forEach(function (img) {  

    img.addEventListener("error", function () {  

        img.classList.add("image-error");  

        img.setAttribute(  
            "data-image-error",  
            "true"  
        );  

    });  

});  


/* =====================================================  
   11. FOOTER YEAR FALLBACK  
===================================================== */  

if (currentYear) {  

    const year = new Date().getFullYear();  

    if (currentYear.textContent !== String(year)) {  

        currentYear.textContent = year;  

    }  

}  


/* =====================================================  
   12. INITIALIZE  
===================================================== */  

updateHeader();  

console.info(  
    "Antique Brilliance website initialized successfully."  
);

});

  
