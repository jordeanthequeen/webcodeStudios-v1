// Optimized JavaScript for the website
document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements to improve performance
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links a");
    const buttons = document.querySelectorAll('button[data-target]');
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    const sections = document.querySelectorAll('section');
    
    // Hamburger menu functionality
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
    
    // Universal scroll function with smooth behavior
    function scrollToSection(targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // Close mobile menu if open
            navLinks.classList.remove("active");
            
            // Use scrollIntoView with a delay to ensure snap-scrolling works
            setTimeout(() => {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 10);
        }
    }
    
    // Close the menu when a link is clicked and navigate
    navItems.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Handle buttons with data-target attribute
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            scrollToSection(targetId);
        });
    });
    
    // Handle scroll indicators
    scrollIndicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const targetId = indicator.getAttribute('data-target');
            scrollToSection(targetId);
        });
    });
    
    // Active navigation highlighting based on scroll position
    function setActiveNavItem() {
        let current = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust the offset for better accuracy
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        // Only update if we have a current section
        if (current) {
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href').substring(1) === current) {
                    item.classList.add('active');
                }
            });
        }
    }
    
    // Throttled scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                setActiveNavItem();
                scrollTimeout = null;
            }, 100);
        }
    });
    
    // Initialize active navigation item
    setActiveNavItem();
});