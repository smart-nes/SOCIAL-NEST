// وظيفة تبديل اللغة
function toggleLanguage() {
    const arElements = document.querySelectorAll('.ar-text');
    const enElements = document.querySelectorAll('.en-text');
    const htmlElement = document.documentElement;
    
    arElements.forEach(el => {
        el.style.display = el.style.display === 'none' ? 'inline' : 'none';
    });
    
    enElements.forEach(el => {
        el.style.display = el.style.display === 'none' ? 'inline' : 'none';
    });
    
    if (htmlElement.getAttribute('dir') === 'rtl') {
        htmlElement.setAttribute('dir', 'ltr');
        htmlElement.setAttribute('lang', 'en');
    } else {
        htmlElement.setAttribute('dir', 'rtl');
        htmlElement.setAttribute('lang', 'ar');
    }
}

// وظيفة فتح/إغلاق الدردشة
function toggleChat() {
    const chatbot = document.getElementById('chatbot');
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
}

// وظيفة تبديل الوضع الليلي
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    
    // تغيير أيقونة الوضع الليلي
    const icon = document.querySelector('.mode-toggle i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// وظيفة التحقق من ظهور العناصر عند التمرير
function checkScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('animate-in');
        }
    });
}

// تشغيل التحقق عند التمرير وعند التحميل
window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// منطق chatbot المحسن
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

function addMessage(sender, text, buttons = null) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.innerHTML = `<span class="${document.documentElement.lang === 'ar' ? 'ar-text' : 'en-text'}">${text}</span>`;
    
    if (buttons) {
        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('button-group');
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn.text;
            button.onclick = () => handleBotButtonClick(btn.action);
            buttonGroup.appendChild(button);
        });
        messageDiv.appendChild(buttonGroup);
    }
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function handleBotButtonClick(action) {
    addMessage('user', action);
    processBotResponse(action);
}

function sendMessage() {
    const userMessage = chatbotInput.value.trim();
    if (userMessage) {
        addMessage('user', userMessage);
        processBotResponse(userMessage);
        chatbotInput.value = '';
    }
}

function processBotResponse(message) {
    const lowerCaseMessage = message.toLowerCase();
    let botResponseText = '';
    let buttons = null;
    const currentLang = document.documentElement.lang;

    const responses = {
        ar: {
            greeting: ['مرحباً بك مرة أخرى!', 'أهلاً وسهلاً!', 'كيف أستطيع مساعدتك اليوم؟', 'مرحباً! أنا مساعد سوشيال نيست الرقمي.'],
            aboutUs: 'سوشيال نيست هي شركة رائدة في مجال التسويق الرقمي وإدارة وسائل التواصل الاجتماعي. نحن فريق من المحترفين المتخصصين في بناء العلامات التجارية الرقمية وتطوير استراتيجيات تسويقية مبتكرة. رؤيتنا هي أن نكون الشريك الأول للشركات في رحلتها نحو النجاح الرقمي، من خلال تقديم حلول متكاملة تجمع بين الإبداع والتكنولوجيا. نفخر بخبرتنا الواسعة في السوق المحلي والعالمي، ونلتزم بتحقيق أعلى معايير الجودة في جميع مشاريعنا.',
            services: 'نقدم مجموعة واسعة من الخدمات لتلبية احتياجاتك التسويقية:',
            digitalMarketing: 'استراتيجيات تسويقية مبتكرة لزيادة الوعي بعلامتك التجارية وتحقيق أقصى عائد على الاستثمار.',
            socialMedia: 'إدارة احترافية لحساباتك على جميع منصات التواصل الاجتماعي مع محتوى جذاب ومؤثر.',
            dataAnalytics: 'تحليل شامل لأداء حملاتك التسويقية مع تقارير مفصلة لاتخاذ قرارات مدروسة.',
            creativeDesign: 'تصاميم بصرية مبتكرة تعكس هوية علامتك التجارية وتجذب انتباه جمهورك المستهدف.',
            seoOptimization: 'تحسين موقعك ليظهر في المراكز الأولى في نتائج البحث وزيادة الزيارات العضوية.',
            contentProduction: 'إنتاج محتوى متنوع من نصوص وصور وفيديوهات تفاعلية تحقق أهدافك التسويقية.',
            montageMotion: 'نحوّل أفكارك إلى واقع مرئي جذاب من خلال خدمات المونتاج الاحترافية ومقاطع الموشن جرافيك المبتكرة.',
            voiceOver: 'خدمات تعليق صوتي احترافية لمقاطع الفيديو، الإعلانات، والوثائقيات بأصوات مميزة وجذابة.',
            smartNestIntro: 'نحن في سوشيال نيست نفخر بالتعاون مع شركة سمارت نيست المتخصصة في مجال الكروت الذكية (NFC).',
            smartNestCards: 'ميزة الكروت الذكية هي أنها تعمل بنظام NFC، ويسرنا إهداء هذه الكروت لعملائنا الكرام مجاناً بمجرد التعاون معنا في سوشيال نيست!',
            smartNestWebsites: 'سمارت نيست تقوم أيضاً ببرمجة مواقع الويب المتكاملة لتناسب هوية عملائنا. هذه المواقع توفر لك ميزات رائعة مثل الوصول السهل للخرائط ومعلومات الاتصال المباشرة.',
            cardPrices: 'تبدأ أسعار الكروت الذكية من 20,000 جنيه مصري، وتتوقف الأسعار النهائية على المجال المختص ودراسة السوق لتحديد الأنسب لعلامتك التجارية.',
            freeOffers: 'يسعدنا أن نقدم عروضًا مجانية حصرية لعملائنا بمجرد البدء بالتعاون معنا! ندعوك للتواصل معنا لاكتشاف هذه العروض التي تهدف لتعزيز تواجدك الرقمي بشكل لا مثيل له.',
            contactPrompt: 'هل تود معرفة المزيد أو التواصل معنا؟',
            unknown: 'عذرًا، لم أفهم طلبك. هل يمكنك إعادة صياغة السؤال أو اختيار أحد الخيارات التالية؟',
            buttons: {
                aboutUs: 'من أنتم؟',
                services: 'ما هي خدماتكم؟',
                smartNest: 'عن سمارت نيست',
                cardPrices: 'أسعار الكروت الذكية',
                freeOffers: 'العروض المجانية',
                contact: 'تواصلوا معي',
                mainMenu: 'العودة للقائمة الرئيسية'
            },
            howAreYou: 'أنا بخير، شكراً لسؤالك! كيف يمكنني مساعدتك اليوم؟',
            whatsUp: 'أنا هنا لمساعدتك في أي استفسار لديك عن خدمات سوشيال نيست أو سمارت نيست!',
            canWeTalk: 'بالطبع! أنا هنا للإجابة على جميع استفساراتك. هل لديك سؤال محدد؟',
            needHelp: 'سأكون سعيداً بمساعدتك. هل تريد معرفة المزيد عن خدماتنا، الأسعار، أو لديك استفسار آخر؟'
        },
        en: {
            greeting: ['Welcome back!', 'Hello there!', 'How can I assist you today?', 'Hi! I am Social Nest\'s digital assistant.'],
            aboutUs: 'Social Nest is a leading company in digital marketing and social media management. We are a team of professionals specialized in building digital brands and developing innovative marketing strategies. Our vision is to be the primary partner for companies in their journey towards digital success, by providing integrated solutions that combine creativity and technology. We take pride in our extensive experience in local and global markets, and we are committed to achieving the highest quality standards in all our projects.',
            services: 'We offer a wide range of services to meet your marketing needs:',
            digitalMarketing: 'Innovative marketing strategies to increase brand awareness and maximize ROI.',
            socialMedia: 'Professional management of your social media accounts with engaging and impactful content.',
            dataAnalytics: 'Comprehensive analysis of your marketing campaigns with detailed reports for informed decisions.',
            creativeDesign: 'Innovative visual designs that reflect your brand identity and attract your target audience.',
            seoOptimization: 'Optimize your website to appear in top search results and increase organic traffic.',
            contentProduction: 'Diverse content production including texts, images, and interactive videos to achieve your marketing goals.',
            montageMotion: 'We transform your ideas into compelling visual realities through professional montage services and innovative motion graphics.',
            voiceOver: 'Professional voice-over services for videos, advertisements, and documentaries with distinctive and engaging voices.',
            smartNestIntro: 'At Social Nest, we are proud to collaborate with Smart Nest, a company specialized in NFC smart cards.',
            smartNestCards: 'The advantage of smart cards is their NFC system. We are pleased to offer these cards for free to our valued customers upon partnering with Social Nest!',
            smartNestWebsites: 'Smart Nest also develops integrated websites tailored to our clients\' brand identity. These websites offer great features like easy access to maps and direct contact information.',
            cardPrices: 'Smart card prices start from 20,000 EGP, and final prices depend on the specialized field and market study to determine what best suits your brand.',
            freeOffers: 'We are delighted to offer exclusive free deals to our clients as soon as they start collaborating with us! We invite you to contact us to discover these offers designed to enhance your digital presence like never before.',
            contactPrompt: 'Would you like to know more or contact us?',
            unknown: 'Sorry, I didn\'t understand your request. Can you rephrase your question or choose one of the following options?',
            buttons: {
                aboutUs: 'Who are you?',
                services: 'What are your services?',
                smartNest: 'About Smart Nest',
                cardPrices: 'Smart Card Prices',
                freeOffers: 'Free Offers',
                contact: 'Contact Us',
                mainMenu: 'Back to Main Menu'
            },
            howAreYou: 'I\'m doing well, thank you for asking! How can I assist you today?',
            whatsUp: 'I\'m here to help you with any inquiries about Social Nest or Smart Nest services!',
            canWeTalk: 'Of course! I\'m here to answer all your questions. Do you have a specific inquiry?',
            needHelp: 'I\'d be happy to help. Would you like to know more about our services, pricing, or have another question?'
        }
    };

    const currentResponses = responses[currentLang];
    const greetings = ['مرحبا', 'أهلاً', 'سلام', 'هاي', 'ازيك', 'مرحباً', 'صباح الخير', 'مساء الخير', 'كيف حالك', 'اهلا بك', 'hi', 'hello', 'hey', 'good morning', 'good evening', 'how are you'];
    const isGreeting = greetings.some(greeting => lowerCaseMessage.includes(greeting));

    if (isGreeting) {
        botResponseText = currentResponses.greeting[Math.floor(Math.random() * currentResponses.greeting.length)];
        buttons = [
            { text: currentResponses.buttons.aboutUs, action: 'من أنتم؟' },
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' }
        ];
    } else if (lowerCaseMessage.includes('كيف حالك') || lowerCaseMessage.includes('اخبارك') || lowerCaseMessage.includes('how are you') || lowerCaseMessage.includes('whats up')) {
        botResponseText = currentResponses.howAreYou;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' }
        ];
    } else if (lowerCaseMessage.includes('عامل إيه') || lowerCaseMessage.includes('ممكن نتكلم') || lowerCaseMessage.includes('can we talk')) {
        botResponseText = currentResponses.canWeTalk;
        buttons = [
            { text: currentResponses.buttons.aboutUs, action: 'من أنتم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلو معي' }
        ];
    } else if (lowerCaseMessage.includes('ممكن تساعدني') || lowerCaseMessage.includes('need help')) {
        botResponseText = currentResponses.needHelp;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.cardPrices, action: 'أسعار الكروت الذكية؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('من أنتم') || lowerCaseMessage.includes('عن الشركة') || lowerCaseMessage.includes('who are you') || lowerCaseMessage.includes('about company')) {
        botResponseText = currentResponses.aboutUs + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('خدمات') || lowerCaseMessage.includes('ماذا تقدمون') || lowerCaseMessage.includes('services') || lowerCaseMessage.includes('what do you offer')) {
        botResponseText = currentResponses.services;
        buttons = [
            { text: currentResponses.buttons.digitalMarketing, action: 'التسويق الرقمي' },
            { text: currentResponses.buttons.socialMedia, action: 'إدارة وسائل التواصل' },
            { text: currentResponses.buttons.creativeDesign, action: 'التصميم الإبداعي' },
            { text: currentResponses.buttons.montageMotion, action: 'مونتاج وموشن جرافيك' },
            { text: currentResponses.buttons.voiceOver, action: 'التعليق الصوتي' },
            { text: currentResponses.buttons.mainMenu, action: 'العودة للقائمة الرئيسية' }
        ];
    } else if (lowerCaseMessage.includes('تسويق رقمي') || lowerCaseMessage.includes('digital marketing')) {
        botResponseText = currentResponses.digitalMarketing + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('إدارة وسائل التواصل') || lowerCaseMessage.includes('social media management')) {
        botResponseText = currentResponses.socialMedia + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('تحليل بيانات') || lowerCaseMessage.includes('data analytics')) {
        botResponseText = currentResponses.dataAnalytics + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('تصميم إبداعي') || lowerCaseMessage.includes('creative design')) {
        botResponseText = currentResponses.creativeDesign + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('تحسين محركات البحث') || lowerCaseMessage.includes('seo')) {
        botResponseText = currentResponses.seoOptimization + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('إنتاج محتوى') || lowerCaseMessage.includes('content production')) {
        botResponseText = currentResponses.contentProduction + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('مونتاج') || lowerCaseMessage.includes('موشن جرافيك') || lowerCaseMessage.includes('montage') || lowerCaseMessage.includes('motion graphics')) {
        botResponseText = currentResponses.montageMotion + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('تعليق صوتي') || lowerCaseMessage.includes('voice over')) {
        botResponseText = currentResponses.voiceOver + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('سمارت نيست') || lowerCaseMessage.includes('smart nest') || lowerCaseMessage.includes('الكروت الذكية') || lowerCaseMessage.includes('smart cards')) {
        botResponseText = currentResponses.smartNestIntro + ' ' + currentResponses.smartNestCards + ' ' + currentResponses.smartNestWebsites + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.cardPrices, action: 'أسعار الكروت الذكية؟' },
            { text: currentResponses.buttons.freeOffers, action: 'العروض المجانية' },
            { text: currentResponses.buttons.mainMenu, action: 'العودة للقائمة الرئيسية' }
        ];
    } else if (lowerCaseMessage.includes('أسعار الكروت') || lowerCaseMessage.includes('سعر الكارت') || lowerCaseMessage.includes('card prices') || lowerCaseMessage.includes('how much are smart cards')) {
        botResponseText = currentResponses.cardPrices + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' },
            { text: currentResponses.buttons.freeOffers, action: 'العروض المجانية' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    } else if (lowerCaseMessage.includes('عروض مجانية') || lowerCaseMessage.includes('free offers')) {
        botResponseText = currentResponses.freeOffers + ' ' + currentResponses.contactPrompt;
        buttons = [
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' },
            { text: currentResponses.buttons.mainMenu, action: 'العودة للقائمة الرئيسية' }
        ];
    } else if (lowerCaseMessage.includes('تواصلوا معي') || lowerCaseMessage.includes('اريد التواصل') || lowerCaseMessage.includes('contact us')) {
        botResponseText = (currentLang === 'ar' ? 'بالتأكيد، يمكنك ملء النموذج في قسم "تواصل معنا" أو التواصل معنا مباشرة عبر البريد الإلكتروني: info@socialnest.com أو الهاتف: +1 234 567 8900' : 'Certainly, you can fill out the form in the "Contact Us" section or contact us directly via email: info@socialnest.com or phone: +1 234 567 8900');
        buttons = [
            { text: (currentLang === 'ar' ? 'اذهب لصفحة التواصل' : 'Go to Contact Page'), action: 'open_contact_page' }
        ];
    } else if (lowerCaseMessage.includes('العودة للقائمة الرئيسية') || lowerCaseMessage.includes('main menu')) {
        botResponseText = currentResponses.greeting[0];
        buttons = [
            { text: currentResponses.buttons.aboutUs, action: 'من أنتم؟' },
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' }
        ];
    } else if (lowerCaseMessage.includes('open_contact_page')) {
        window.location.href = 'contact_us_page.html';
        return;
    } else {
        botResponseText = currentResponses.unknown;
        buttons = [
            { text: currentResponses.buttons.aboutUs, action: 'من أنتم؟' },
            { text: currentResponses.buttons.services, action: 'ما هي خدماتكم؟' },
            { text: currentResponses.buttons.smartNest, action: 'عن سمارت نيست' },
            { text: currentResponses.buttons.contact, action: 'تواصلوا معي' }
        ];
    }

    setTimeout(() => addMessage('bot', botResponseText, buttons), 500);
}

// ربط جميع العناصر ذات الصلة بالشات بوت
function connectElementsToChatbot() {
    // ربط بطاقات الخدمات
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', function() {
            const service = this.dataset.service;
            if (service) {
                toggleChat();
                setTimeout(() => {
                    addMessage('user', this.querySelector('h3').textContent.trim());
                    processBotResponse(service);
                }, 300);
            }
        });
    });

    // ربط عناصر الأسعار
    document.querySelectorAll('[data-price-info]').forEach(priceElement => {
        priceElement.addEventListener('click', function() {
            toggleChat();
            setTimeout(() => {
                addMessage('user', currentLang === 'ar' ? 'أسعار سمارت نيست' : 'Smart Nest Prices');
                processBotResponse('أسعار سمارت نيست');
            }, 300);
        });
    });

    // ربط عناصر NFC
    document.querySelectorAll('[data-nfc-info]').forEach(nfcElement => {
        nfcElement.addEventListener('click', function() {
            toggleChat();
            setTimeout(() => {
                addMessage('user', currentLang === 'ar' ? 'مميزات تقنية NFC' : 'NFC Technology Advantages');
                processBotResponse('مميزات تقنية NFC');
            }, 300);
        });
    });

    // ربط عناصر المنتجات
    document.querySelectorAll('[data-product]').forEach(product => {
        product.addEventListener('click', function() {
            const productType = this.dataset.product;
            toggleChat();
            setTimeout(() => {
                addMessage('user', this.textContent.trim());
                processBotResponse(productType);
            }, 300);
        });
    });

    // ربط روابط "المزيد من المعلومات"
    document.querySelectorAll('.more-info-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const topic = this.dataset.topic || 'معلومات إضافية';
            toggleChat();
            setTimeout(() => {
                addMessage('user', topic);
                processBotResponse(topic);
            }, 300);
        });
    });
}

// استدعاء الدالة عند تحميل الصفحة
window.addEventListener('load', function() {
    connectElementsToChatbot();
});

// منع النقر بالزر الأيمن
document.addEventListener('contextmenu', event => event.preventDefault());

// محاولة منع فتح أدوات المطور
document.onkeydown = function(e) {
    if (e.keyCode == 123 || // F12
        (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) || // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) || // Ctrl+Shift+J
        (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) { // Ctrl+U
        return false;
    }
};


// Handle form submission
document.getElementById('myContactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // منع الإرسال الافتراضي
    
    const form = e.target;
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            alert('تم إرسال الرسالة بنجاح!');
            form.reset(); // مسح النموذج
        } else {
            throw new Error('حدث خطأ أثناء الإرسال');
        }
    })
    .catch(error => {
        alert(error.message);
    });
});