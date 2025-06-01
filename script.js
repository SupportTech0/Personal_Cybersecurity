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
            message: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
            options: [
                { text: 'Conocer sobre nuestros productos', value: 'opcionA' },
                { text: 'Saber más sobre nuestros servicios', value: 'opcionB' },
                { text: 'Contactar con soporte', value: 'opcionC' }
            ]
        },
        opcionA: {
            message: 'Genial. ¿Qué tipo de producto te interesa?',
            options: [
                { text: 'Producto 1 (Electrónica)', value: 'producto1', info: 'Ideal para el hogar moderno.', link: '#seccion-electronica' },
                { text: 'Producto 2 (Ropa)', value: 'producto2', info: 'Estilo y comodidad garantizados.', link: '#seccion-ropa' },
                { text: 'Producto 3 (Libros)', value: 'producto3', info: 'Explora nuevos mundos literarios.', link: '#seccion-libros' },
                { text: 'Producto 4 (Hogar)', value: 'producto4', info: 'Todo para tu espacio personal.', link: '#seccion-hogar' }
            ]
        },
        opcionB: {
            message: 'Entendido. ¿Qué servicio te gustaría explorar?',
            options: [
                { text: 'Asesoría Personalizada', value: 'servicio1', info: 'Guía experta para tus proyectos.', link: '#seccion-asesoria' },
                { text: 'Soporte Técnico', value: 'servicio2', info: 'Soluciones rápidas para tus dudas.', link: '#seccion-soporte' },
                { text: 'Capacitaciones', value: 'servicio3', info: 'Aprende y crece con nosotros.', link: '#seccion-capacitaciones' }
            ]
        },
        opcionC: {
            message: 'Claro, aquí tienes la información de contacto:',
            options: [
                { text: 'Contactar por Email', value: 'contacto1', info: 'Envíanos un correo electrónico para asistencia.', link: '#seccion-contacto' }
            ]
        },
        end: {
            message: '¡Gracias por usar nuestro chatbot! Si tienes más preguntas, haz clic en el icono de nuevo.',
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

