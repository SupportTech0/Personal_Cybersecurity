// CHAT BOT 
document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotContainer = document.getElementById('chatbot-container');
    const closeBtn = document.querySelector('.close-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotOptions = document.getElementById('chatbot-options');

    let currentStep = 'initial'; // Controla la etapa actual del chatbot

    // Definición de los flujos de conversación
    const conversationFlow = {
        initial: {
            message: 'Hi there, what can I do for you today?',
            options: [
                { text: 'I want to know more about preventive measurements', value: 'opcionA' },
                { text: 'I got hacked!!!', value: 'opcionB' },
                { text: 'Mission', value: 'opcionC' }
            ]
        },
        opcionA: {
            message: 'Great, where would you like to start?',
            options: [
                { text: 'Do you need help with your passwords?', value: 'producto1', info: 'Start with a password manager.', link: 'https://supporttech0.github.io/Personal_Cybersecurity/password_manager.html' },
                { text: 'Are you receiving to many email and you want to prevent for more to come?', value: 'producto2.', info: 'An alias is the answer.', link: 'https://supporttech0.github.io/Personal_Cybersecurity/aliases.html' },
                { text: 'Do you want to protect your account using something else apart of your password?', value: 'producto3', info: 'Start using Two-Factor Authentication.', link: 'https://supporttech0.github.io/Personal_Cybersecurity/2fa.html' },
                { text: 'Do you want to check if things are secure?', value: 'producto4', info: 'Just check everything with some free tools.', link: 'https://supporttech0.github.io/Personal_Cybersecurity/tools.html' }
            ]
        },
        opcionB: {
            message: 'Oh no, I am sorry to read this! I need a bit more of info to help you out:',
            options: [
                { text: 'Did your email or any of your accounts got hacked?', value: 'servicio1', info: 'Change your password, add Second-Factor Authentication to your account, report it. click here for more steps.', link: 'https://supporttech0.github.io/Personal_Cybersecurity/hacked-email.html' },
                { text: 'Did you lost your phone?', value: 'servicio2', info: 'Changen your passwords! Report it! For other recommendations, click here', link: 'https://supporttech0.github.io/Personal_Cybersecurity/lost-phone.html' },
                { text: 'Another thing? Send us an email', value: 'servicio3', info: 'supporttech0.hastily033@passfwd.com', }
            ]
        },
        opcionC: {
            message: 'We are here to help',
            options: [
                { text: 'Our mission is simple', value: 'contacto1', info: 'We want to help you to improve your privet digital security', link: 'https://supporttech0.github.io/Personal_Cybersecurity/mission.html' }
            ]
        },
        end: {
            message: 'We are here to help. If you need more help please send an email to: supporttech0.hastily033@passfwd.com',
            options: []
        }
    };

    // --- Funciones del Chatbot ---

    function openChatbot() {
        chatbotContainer.classList.add('open');
        displayMessage(conversationFlow[currentStep].message, 'bot');
        displayOptions(conversationFlow[currentStep].options);
    }

    function closeChatbot() {
        chatbotContainer.classList.remove('open');
        // Opcional: Reiniciar el estado del chatbot al cerrarlo
        // currentStep = 'initial';
        // chatbotMessages.innerHTML = ''; // Limpiar mensajes
        // chatbotOptions.innerHTML = ''; // Limpiar opciones
    }

    function displayMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message-bubble', `${sender}-message`);
        messageDiv.textContent = text;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function displayOptions(options) {
        chatbotOptions.innerHTML = ''; // Limpiar opciones anteriores

        options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option.text;
            button.value = option.value;
            button.addEventListener('click', () => handleOptionClick(option));
            chatbotOptions.appendChild(button);

            if (option.info || option.link) {
                const infoText = document.createElement('p');
                infoText.classList.add('info-text');
                if (option.info) {
                    infoText.textContent = option.info;
                }
                if (option.link) {
                    const link = document.createElement('a');
                    link.href = option.link;
                    link.textContent = 'Ver más';
                    link.target = '_self';
                    if (option.info) {
                        infoText.innerHTML += '<br>';
                    }
                    infoText.appendChild(link);
                }
                chatbotOptions.appendChild(infoText);
            }
        });
    }

    function handleOptionClick(option) {
        displayMessage(option.text, 'user');

        currentStep = option.value;

        if (option.link) {
            setTimeout(() => {
                window.location.href = option.link;
                // Opcional: podrías querer reiniciar el chatbot al navegar a otra sección
                // currentStep = 'initial';
                // chatbotMessages.innerHTML = '';
                // chatbotOptions.innerHTML = '';
                closeChatbot(); // Cierra el chatbot después de la navegación
            }, 500);

            displayMessage('¡Excelente! Te he dirigido a la información. Si necesitas algo más, vuelve a abrirme.', 'bot');
            chatbotOptions.innerHTML = '';
            return;
        }

        if (conversationFlow[currentStep]) {
            setTimeout(() => {
                displayMessage(conversationFlow[currentStep].message, 'bot');
                displayOptions(conversationFlow[currentStep].options);
            }, 500);
        } else {
            displayMessage('Lo siento, algo salió mal o no tengo más opciones para esta selección.', 'bot');
            displayOptions(conversationFlow['initial'].options);
        }
    }

    // --- Event Listeners ---
    chatbotIcon.addEventListener('click', openChatbot);
    closeBtn.addEventListener('click', closeChatbot);
});

