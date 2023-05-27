const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
    alert(`Высота экрана: ${window.screen.height}\nШирина экрана: ${window.screen.width}`);
});
