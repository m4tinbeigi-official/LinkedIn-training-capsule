document.addEventListener("DOMContentLoaded", function () {
    fetch('assets/data/data.json')
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            const page = window.location.pathname.split('/').pop();

            if (page === 'index.html') {
                content.innerHTML = generateParticipantPage(data);
            } else if (page === 'sponsor.html') {
                content.innerHTML = generateSponsorPage(data);
            }

            AOS.init();
            initAnimations();
            initBackToTop();
            initChatbot();
            initGallery();
            initPoll();
        });

    function generateParticipantPage(data) {
        return `
            <h1 data-aos="fade-up">${data.course.title} <span class="emoji">💊</span></h1>
            <p data-aos="fade-up">${data.course.description}</p>
            
            <h2 data-aos="fade-up">اهداف دوره <span class="emoji">🎯</span></h2>
            <ul data-aos="fade-up">
                ${data.course.goals.map(goal => `<li>${goal}</li>`).join('')}
            </ul>

            <h2 data-aos="fade-up">ویدیوی معرفی <span class="emoji">🎥</span></h2>
            <div class="video-container" data-aos="fade-up">
                <iframe src="${data.course.video}" frameborder="0" allowfullscreen></iframe>
            </div>

            <h2 data-aos="fade-up">سوالات متداول <span class="emoji">❓</span></h2>
            <div class="accordion" id="faqAccordion" data-aos="fade-up">
                ${data.faq.map((item, index) => `
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="heading${index}">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}">
                                ${item.question}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                ${item.answer}
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <h2 data-aos="fade-up">دانلود فایل‌های آموزشی <span class="emoji">📂</span></h2>
            <div data-aos="fade-up">
                <a href="${data.files[0].path}" download class="btn btn-primary">
                    <i class="fas fa-download"></i> ${data.files[0].name}
                </a>
            </div>

            <h2 data-aos="fade-up">اشتراک‌گذاری در شبکه‌های اجتماعی <span class="emoji">📢</span></h2>
            <div class="social-links" data-aos="fade-up">
                ${data.socialLinks.map(link => `
                    <a href="${link.url}" target="_blank" class="btn btn-primary">
                        <i class="${link.icon}"></i> ${link.name}
                    </a>
                `).join('')}
            </div>

            <h2 data-aos="fade-up">حمایت مالی <span class="emoji">💖</span></h2>
            <p data-aos="fade-up">اگر دوست دارید از من حمایت کنید، روی دکمه زیر کلیک کنید:</p>
            <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#supportModal" data-aos="fade-up">
                <i class="fas fa-donate"></i> حمایت مالی
            </button>

            <!-- پاپ‌آپ حمایت مالی -->
            <div class="modal fade" id="supportModal" tabindex="-1" aria-labelledby="supportModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="supportModalLabel">حمایت مالی <span class="emoji">💖</span></h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <p>سلام دوست عزیز،</p>
                            <p>من این کار رو برای پول انجام ندادم، اما اگر دوست داری از من حمایت کنی، خوشحال می‌شم. 😊</p>
                            <p>امیدوارم تو هم روزی بتونی به یک نفر کمک کنی و دنیا رو جای بهتری بسازی. 🌍</p>
                            <p>با تشکر از حمایت تو،</p>
                            <p>ریک سانچز</p>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">بستن</button>
                        </div>
                    </div>
                </div>
            </div>

            <h2 data-aos="fade-up">لینک‌های من <span class="emoji">🔗</span></h2>
            <ul data-aos="fade-up">
                ${data.personalLinks.map(link => `
                    <li>
                        <a href="${link.url}" target="_blank">
                            <i class="${link.icon}"></i> ${link.name}
                        </a>
                    </li>
                `).join('')}
            </ul>

            <!-- گالری تصاویر -->
            <h2 data-aos="fade-up">گالری تصاویر <span class="emoji">📷</span></h2>
            <div class="gallery" data-aos="fade-up">
                <img src="images/image1.jpg" alt="تصویر ۱" class="gallery-item">
                <img src="images/image2.jpg" alt="تصویر ۲" class="gallery-item">
            </div>

            <!-- نظرسنجی -->
            <h2 data-aos="fade-up">نظرسنجی <span class="emoji">📊</span></h2>
            <div class="poll" data-aos="fade-up">
                <p>چقدر از دوره راضی هستید؟</p>
                <button class="btn btn-primary">عالی</button>
                <button class="btn btn-primary">خوب</button>
                <button class="btn btn-primary">متوسط</button>
            </div>
        `;
    }

    function generateSponsorPage(data) {
        return `
            <h1 data-aos="fade-up">${data.sponsor.title} <span class="emoji">🤝</span></h1>
            <p data-aos="fade-up">${data.sponsor.description}</p>
            
            <h2 data-aos="fade-up">مزایای اسپانسری <span class="emoji">💼</span></h2>
            <ul data-aos="fade-up">
                ${data.sponsor.benefits.map(benefit => `<li>${benefit}</li>`).join('')}
            </ul>

            <h2 data-aos="fade-up">پیشنهادات اسپانسری <span class="emoji">📜</span></h2>
            <ul data-aos="fade-up">
                ${data.sponsor.offers.map(offer => `<li>${offer}</li>`).join('')}
            </ul>

            <h2 data-aos="fade-up">تماس با ما <span class="emoji">📞</span></h2>
            <p data-aos="fade-up">${data.sponsor.contact.description}</p>
            <ul data-aos="fade-up">
                ${data.sponsor.contact.links.map(link => `
                    <li>
                        <a href="${link.url}" target="_blank">
                            <i class="${link.icon}"></i> ${link.name}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
    }

    function initAnimations() {
        gsap.from(".card", { duration: 1, y: 50, opacity: 0, stagger: 0.2, ease: "power2.out" });
    }

    function initBackToTop() {
        const backToTopButton = document.getElementById('back-to-top');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initChatbot() {
        const chatbotBody = document.querySelector('.chatbot-body');
        const chatbotInput = document.querySelector('.chatbot-input');
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const message = chatbotInput.value.trim();
                if (message) {
                    chatbotBody.innerHTML += `<p><strong>شما:</strong> ${message}</p>`;
                    chatbotInput.value = '';
                    chatbotBody.scrollTop = chatbotBody.scrollHeight;
                }
            }
        });
    }

    function initGallery() {
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('zoomed');
            });
        });
    }

    function initPoll() {
        document.querySelectorAll('.poll .btn').forEach(button => {
            button.addEventListener('click', () => {
                alert(`شما گزینه "${button.textContent}" را انتخاب کردید!`);
            });
        });
    }
});
