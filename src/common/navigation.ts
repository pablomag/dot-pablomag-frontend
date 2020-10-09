export function initializeNavigation() {
    const header = document.querySelector("header");
    const burger = document.querySelector(".burger");

    const options = {};

    const observer = new IntersectionObserver((entries, _) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                if (
                    burger!.classList.contains("init") ||
                    burger!.classList.contains("hide")
                ) {
                    burger!.classList.remove("init");
                    burger!.classList.remove("hide");
                    burger!.classList.add("show");
                }
            } else {
                if (!burger!.classList.contains("init")) {
                    burger!.classList.add("hide");
                    burger!.classList.remove("show");
                }
            }
        });
    }, options);

    if (header !== null && burger !== null) {
        observer.observe(header);
    }
}
