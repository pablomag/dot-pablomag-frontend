export function initializeNavigation() {
    const header = document.querySelector("header");
    const burger = document.querySelector(".burger");

    const options = {};

    const observer = new IntersectionObserver((entries, _) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                if (
                    burger!.classList.contains("burger--init") ||
                    burger!.classList.contains("burger--hide")
                ) {
                    burger!.classList.remove("burger--init");
                    burger!.classList.remove("burger--hide");
                    burger!.classList.add("burger--show");
                }
            } else {
                if (!burger!.classList.contains("burger--init")) {
                    burger!.classList.add("burger--hide");
                    burger!.classList.remove("burger--show");
                }
            }
        });
    }, options);

    if (header !== null && burger !== null) {
        observer.observe(header);
    }
}
