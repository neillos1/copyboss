document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const niche = e.target.querySelector('input').value;
    alert(`AI Script generated for niche: ${niche}`);
});
