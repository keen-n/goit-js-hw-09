const form = document.querySelector('.feedback-form');
const emailInput = form.elements.email;
const messageInput = form.elements.message;
const STORAGE_KEY = 'feedback-form-state';

// Початковий об'єкт formData
let formData = {
  email: '',
  message: '',
};

// 🔹 Перевіряємо локальне сховище та заповнюємо поля форми
const savedData = localStorage.getItem(STORAGE_KEY);
if (savedData) {
  formData = JSON.parse(savedData);
  emailInput.value = formData.email;
  messageInput.value = formData.message;
}

// 🔹 Відстежуємо введення користувача
form.addEventListener('input', event => {
  formData[event.target.name] = event.target.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
});

// 🔹 Обробник події сабміту
form.addEventListener('submit', event => {
  event.preventDefault(); // Зупиняємо стандартну поведінку форми

  // Перевіряємо, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData);

  // Очищуємо все після відправки
  localStorage.removeItem(STORAGE_KEY);
  formData = { email: '', message: '' };
  form.reset();
});
