document.getElementById('helloBtn').addEventListener('click', function() {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = '👋 Hello, World!';
    messageDiv.classList.remove('hidden');
    
    // Optional: Add a fun effect
    this.textContent = 'Click Again!';
});
