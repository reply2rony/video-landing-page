// Video preview functionality
const videoPreview = document.getElementById('videoPreview');
const playBtn = document.getElementById('playBtn');

if (playBtn) {
    playBtn.addEventListener('click', function() {
        videoPreview.play();
    });
}

if (videoPreview) {
    videoPreview.addEventListener('play', function() {
        const overlay = this.parentElement.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });

    videoPreview.addEventListener('pause', function() {
        const overlay = this.parentElement.querySelector('.video-overlay');
        if (overlay) {
            overlay.style.opacity = '0';
        }
    });
}

// Download function
function downloadVideo(quality) {
    const qualityInfo = {
        '720p': {
            name: '720p HD',
            size: '128 MB',
            url: 'video-720p.mp4'
        },
        '1080p': {
            name: '1080p Full HD',
            size: '245 MB',
            url: 'video-1080p.mp4'
        },
        '1440p': {
            name: '1440p 2K',
            size: '512 MB',
            url: 'video-1440p.mp4'
        },
        '4k': {
            name: '2160p 4K',
            size: '1.2 GB',
            url: 'video-4k.mp4'
        }
    };

    const info = qualityInfo[quality];
    const modal = document.getElementById('downloadModal');
    const downloadMessage = document.getElementById('downloadMessage');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');

    downloadMessage.textContent = `Downloading ${info.name} (${info.size})...`;
    modal.style.display = 'block';

    // Simulate download progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress > 100) progress = 100;

        progressFill.style.width = progress + '%';
        progressPercent.textContent = Math.floor(progress);

        if (progress === 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
                downloadMessage.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success-color); font-size: 1.5rem; margin-right: 0.5rem;"></i> Download completed! File saved to your downloads folder.`;
            }, 300);
        }
    }, 300);

    // Trigger actual download (in real scenario)
    // const link = document.createElement('a');
    // link.href = info.url;
    // link.download = `premium-video-${quality}.mp4`;
    // link.click();
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('downloadModal');
    modal.style.display = 'none';
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    progressFill.style.width = '0%';
    progressPercent.textContent = '0';
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('downloadModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        this.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.quality-card, .feature-item, .video-wrapper').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Scroll effect for navbar
let lastScrollPosition = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollPosition = window.scrollY;

    if (currentScrollPosition > 100) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }

    lastScrollPosition = currentScrollPosition;
});