/* ==========================================================================
   DANDOTHKAR MANIK PRABHU PORTFOLIO WEBSITE JAVASCRIPT
   Description: Micro-animations, typewriter text, timeline reveal,
                interactive skills filtration, and recruiter whatsapp routing.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Typewriter Animation for Hero Section ---
    const typewriterElement = document.getElementById('typewriter-text');
    const titles = [
        "Inside Sales Manager",
        "AI Automation Expert",
        "AI Workflow Automation Expert",
        "Full-Stack Vibe Coder"
    ];
    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function handleTypewriter() {
        const currentTitle = titles[titleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // delete faster
        } else {
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80; // normal typing speed
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typeSpeed = 1800; // Pause at full title
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typeSpeed = 500; // Pause before typing next title
        }

        setTimeout(handleTypewriter, typeSpeed);
    }

    if (typewriterElement) {
        handleTypewriter();
    }


    // --- 2. Floating Navbar Scroll Effect ---
    const header = document.querySelector('.header-glass');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    // --- 3. Mobile Navigation Menu Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }


    // --- 4. Interactive Skills Matrix Filters & Width Animation ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    function animateSkillBars() {
        skillCards.forEach(card => {
            if (!card.classList.contains('hidden')) {
                const bar = card.querySelector('.skill-level-bar');
                if (bar) {
                    const targetWidth = bar.getAttribute('data-level');
                    bar.style.width = targetWidth;
                }
            }
        });
    }

    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Set active class
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filter = button.getAttribute('data-filter');

                skillCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filter === 'all' || category === filter) {
                        card.classList.remove('hidden');
                    } else {
                        card.classList.add('hidden');
                    }
                });

                // Re-trigger bar animations for filtered items
                setTimeout(animateSkillBars, 100);
            });
        });
    }


    // --- 5. Intersection Observer Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it contains skill cards, animate skill bars
                if (entry.target.classList.contains('skills-container') || entry.target.querySelector('.skill-card')) {
                    setTimeout(animateSkillBars, 300);
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // --- 6. Recruiter WhatsApp Dynamic Message Router ---
    // Safely encodes customized messages to redirect recruiter seamlessly
    const waButtons = document.querySelectorAll('.whatsapp-route');
    waButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = "919666471196";
            const currentHour = new Date().getHours();
            let greeting = "Hello";
            if (currentHour < 12) greeting = "Good morning";
            else if (currentHour < 17) greeting = "Good afternoon";
            else greeting = "Good evening";

            const message = `${greeting} Manik! I visited your portfolio website and was extremely impressed with your hybrid Inside Sales & AI Automation background. I'd love to connect for a recruiter interview opportunity!`;
            const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
            window.open(waUrl, '_blank');
        });
    });


    // --- 7. Interactive Form Simulation ---
    const contactForm = document.getElementById('portfolio-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.form-submit-btn');
            const originalBtnContent = submitBtn.innerHTML;

            // Simple visual loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Sending message...`;
            submitBtn.style.background = "linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)";

            setTimeout(() => {
                // Success transformation
                submitBtn.innerHTML = `<i class="fas fa-check-circle"></i> Message Sent Successfully!`;
                submitBtn.style.background = "var(--whatsapp-green)";
                submitBtn.style.boxShadow = "0 0 20px rgba(16, 185, 129, 0.4)";

                // Alert details nicely inside form
                const formStatus = document.createElement('div');
                formStatus.className = 'glass-panel';
                formStatus.style.padding = '15px';
                formStatus.style.marginTop = '20px';
                formStatus.style.border = '1px solid var(--whatsapp-green)';
                formStatus.style.background = 'rgba(16, 185, 129, 0.05)';
                formStatus.style.textAlign = 'center';
                formStatus.style.color = 'var(--text-primary)';
                formStatus.innerHTML = `<strong>Thank you!</strong> Your message has been routed to Manik. He will reach back to you shortly.`;
                
                contactForm.appendChild(formStatus);
                contactForm.reset();

                // Restore button state after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    submitBtn.style.background = "";
                    submitBtn.style.boxShadow = "";
                    setTimeout(() => formStatus.remove(), 4000);
                }, 3000);

            }, 1800);
        });
    }

    // Initial check to load bar percentages on load for elements already in viewport
    setTimeout(animateSkillBars, 500);
});
