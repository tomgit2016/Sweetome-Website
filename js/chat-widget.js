// Simple live chat widget
document.addEventListener('DOMContentLoaded', function() {
    const chatWidget = `
        <div class="chat-widget" id="chatWidget">
            <div class="chat-header" id="chatHeader">
                <h5><i class="bi bi-chat-dots"></i> Live Support</h5>
                <span class="online-status">● Online</span>
            </div>
            <div class="chat-body" id="chatBody">
                <div class="chat-messages" id="chatMessages">
                    <div class="message agent">
                        <p>Hello! How can we help you today?</p>
                        <span class="time">Just now</span>
                    </div>
                </div>
                <div class="chat-input">
                    <input type="text" placeholder="Type your message..." id="chatInput">
                    <button id="sendMessage"><i class="bi bi-send"></i></button>
                </div>
            </div>
        </div>
        <button class="chat-toggle" id="chatToggle">
            <i class="bi bi-chat-dots"></i>
        </button>
    `;

    document.body.insertAdjacentHTML('beforeend', chatWidget);

    // Chat widget functionality
    const toggle = document.getElementById('chatToggle');
    const widget = document.getElementById('chatWidget');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('sendMessage');
    const messages = document.getElementById('chatMessages');

    toggle.addEventListener('click', () => {
        widget.classList.toggle('active');
        toggle.classList.toggle('active');
    });

    function sendMessage() {
        if (input.value.trim()) {
            const message = `
                <div class="message user">
                    <p>${input.value}</p>
                    <span class="time">Just now</span>
                </div>
            `;
            messages.insertAdjacentHTML('beforeend', message);
            input.value = '';
            messages.scrollTop = messages.scrollHeight;

            // Simulate agent response
            setTimeout(() => {
                const response = `
                    <div class="message agent">
                        <p>Thank you for your message. One of our agents will respond shortly.</p>
                        <span class="time">Just now</span>
                    </div>
                `;
                messages.insertAdjacentHTML('beforeend', response);
                messages.scrollTop = messages.scrollHeight;
            }, 1000);
        }
    }

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}); 