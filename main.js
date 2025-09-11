gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    const body = document.body;

    // Typewriter effect for h1 and h2 only
    const typewriterEls = document.querySelectorAll("h1, h2");
    const texts = Array.from(typewriterEls).map(el => el.textContent);
    typewriterEls.forEach(el => el.textContent = "");

    // GSAP: Set all p tags to be hidden and above their position
    const pEls = document.querySelectorAll("p");
    gsap.set(pEls, { y: -30, opacity: 0 });

    function typeWriterAll(index = 0) {
        if (index >= typewriterEls.length) return;
        const el = typewriterEls[index];
        const text = texts[index];
        let i = 0;
        el.classList.add("typewriter-cursor");

        // If this is an h2, animate the next p tag before typing
        if (el.tagName.toLowerCase() === "h2") {
            // Find the next sibling p tag (skip non-element nodes)
            let next = el.nextElementSibling;
            while (next && next.tagName.toLowerCase() !== "p") {
                next = next.nextElementSibling;
            }
            if (next) {
                gsap.to(next, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" });
            }
        }

        function type() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                el.classList.remove("typewriter-cursor");
                setTimeout(() => typeWriterAll(index + 1), 200);
            }
        }
        type();
    }
    typeWriterAll();

    // Theme toggle logic (unchanged)
    function setTheme(isDark) {
        if (isDark) {
            body.classList.add("dark-mode");
            themeIcon.textContent = "☀️";
            toggleBtn.title = "Toggle Light Mode";
        } else {
            body.classList.remove("dark-mode");
            themeIcon.textContent = "🌙";
            toggleBtn.title = "Toggle Dark Mode";
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    setTheme(savedTheme === "dark");

    toggleBtn.addEventListener("click", function () {
        const isDark = !body.classList.contains("dark-mode");
        setTheme(isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    // GSAP animation for main elements
    gsap.set(["h1", "nav", "section"], { y: 40, opacity: 0 });
    gsap.to(["h1", "nav", "section"], {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        stagger: 0.15
    });

    // Horizontal scroll for gallery with smooth entrance
    const galleryTrack = document.querySelector(".gallery-track");
    const gallerySection = document.querySelector(".gallery-section");

    if (galleryTrack && gallerySection) {
        // Animate gallery-section entrance like p tags
        gsap.set(gallerySection, { y: -30, opacity: 0 });
        gsap.to(gallerySection, { y: 0, opacity: 1, duration: 0.7, ease: "power2.out", delay: 0.5 });

        // Animate gallery images sliding up as they enter viewport
        const galleryImages = document.querySelectorAll('.gallery-item img');
        galleryImages.forEach((img, i) => {
            ScrollTrigger.create({
                trigger: img,
                start: "top 80%",
                onEnter: () => img.classList.add('visible'),
                once: true
            });
        });

        // Horizontal scroll effect
        const totalScroll = galleryTrack.scrollWidth - window.innerWidth;
        gsap.to(galleryTrack, {
            x: () => -totalScroll,
            ease: "none",
            scrollTrigger: {
                trigger: gallerySection,
                start: "top top",
                end: () => "+=" + totalScroll,
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });
    }

    // Animate skill bars when skills-section enters viewport
    const skillLevels = [
        { selector: ".skill-level", percent: [90, 35, 20, 50, 25, 10, 45] } // JavaScript, HTML/CSS, Python, MDX, Manim, GSAP, Mintlify
    ];

    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        const bars = skillsSection.querySelectorAll('.skill-level');
        ScrollTrigger.create({
            trigger: skillsSection,
            start: "top 80%",
            once: true,
            onEnter: () => {
                bars.forEach((bar, i) => {
                    // Set width based on your skill level
                    const widths = [90, 35, 20, 50, 25, 10, 45]; // JavaScript, HTML/CSS, Python, MDX, Manim, GSAP, Mintlify
                    gsap.to(bar, {
                        width: widths[i] + "%",
                        duration: 1.2,
                        ease: "power2.out",
                        delay: i * 0.2
                    });
                });
            }
        });
    }

    document.querySelectorAll('.reveal-text').forEach(el => {
        const letters = el.textContent.split('').map(letter =>
            `<span class="reveal-letter">${letter === ' ' ? '&nbsp;' : letter}</span>`
        ).join('');
        el.innerHTML = letters;
        gsap.to(el.querySelectorAll('.reveal-letter'), {
            y: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
    });
});
