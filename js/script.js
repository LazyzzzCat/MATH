document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, {
        threshold: 0.2 // Карточка появится, когда 50% её будет видно
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});