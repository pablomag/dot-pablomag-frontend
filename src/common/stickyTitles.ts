export function initializeStickyTitles() {
    const stickyTitles = [].slice.call(
        document.querySelectorAll(".sticky-title")
    );

    stickyTitles.forEach((stickyTitle, index) =>
        createObserver(stickyTitle, index)
    );
}

function createObserver(stickyTitle: any, index: number) {
    const options = { threshold: [0.75, 1], rootMargin: "3% 0% 0% 0%" };
    const heroes = [].slice.call(document.querySelectorAll(".hero"));

    const hero = heroes[index];

    const observer = new IntersectionObserver((entries, _) => {
        entries.forEach((entry, _) => {
            if (!entry.isIntersecting) {
                stickyTitle.classList.remove("unstuck-title");
                stickyTitle.classList.add("stuck-title");
            } else {
                stickyTitle.classList.remove("stuck-title");
                stickyTitle.classList.add("unstuck-title");
            }
        });
    }, options);

    if (hero !== null) {
        observer.observe(hero);
    }
}
