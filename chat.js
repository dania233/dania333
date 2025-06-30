const chatbot = document.getElementById('chatbot');
const toggleBtn = document.getElementById('chatbot-toggle');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');

// قاعدة بيانات بسيطة للأسئلة والأجوبة
const qaPairs = {
  "مرحبا": "أهلاً! كيف يمكنني مساعدتك؟",
  "hi": "Hello! How can I help you?",
  "ما هي ساعات العمل؟": "ساعات العمل من 10 صباحًا حتى 6 مساءً، من الإثنين إلى السبت.",
  "هل يوجد توصيل مجاني؟": "نعم، التوصيل مجاني للطلبات التي تزيد عن 100 دولار.",
  "كيف أرجع منتج؟": "يمكنك إرجاع المنتج خلال 14 يومًا من تاريخ الشراء مع الفاتورة.",
  "ما هي طرق الدفع؟": "نقبل الدفع نقدًا عند الاستلام وبطاقات الائتمان."
};

toggleBtn.addEventListener('click', () => {
  if (chatbot.style.display === 'none' || chatbot.style.display === '') {
    chatbot.style.display = 'flex';
    toggleBtn.textContent = '✖️'; // زر الإغلاق
  } else {
    chatbot.style.display = 'none';
    toggleBtn.textContent = '💬'; // زر الفتح
  }
});

chatbotInput.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && chatbotInput.value.trim() !== '') {
    const userMessage = chatbotInput.value.trim();
    addMessage('أنت', userMessage);
    chatbotInput.value = '';

    setTimeout(() => {
      const response = getBotResponse(userMessage);
      addMessage('البوت', response);
    }, 500);
  }
});

function addMessage(sender, message) {
  const messageDiv = document.createElement('div');
  messageDiv.textContent = sender + ": " + message;

  if (sender === 'أنت') {
    messageDiv.className = 'user-message';
  } else {
    messageDiv.className = 'bot-message';
  }

  chatbotMessages.appendChild(messageDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(input) {
  input = input.toLowerCase();
  for (const question in qaPairs) {
    if (input.includes(question.toLowerCase())) {
      return qaPairs[question];
    }
  }
  return "عذرًا، لم أفهم سؤالك. حاول صياغته بطريقة مختلفة.";
}