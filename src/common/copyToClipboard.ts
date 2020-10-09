export function initializeCodeCopy() {
    const copyToClipboardIcons = [].slice.call(
        document.querySelectorAll(".code-block-copy")
    );

    copyToClipboardIcons.forEach((element: any) => {
        element.addEventListener("click", copyTextToClipboard, false);
    });
}

function copyTextToClipboard(event: any) {
    const element = event.target.nextSibling;
    const text = element.innerText;

    if (!navigator.clipboard) return fallbackCopyTextToClipboard(text, element);

    showTooltip(element);

    navigator.clipboard.writeText(text).then(
        () => {
            console.log("Async: Copying to clipboard was successful!");
        },
        (err) => {
            console.error("Async: Could not copy text: ", err);
        }
    );
}

function showTooltip(element: any) {
    const _UUID = create_UUID();

    if (element.tagName === "PRE") {
        element.childNodes[0].disabled = true;
        element.insertAdjacentHTML(
            "beforebegin",
            `<i id="${_UUID}" class="dynamic-tooltip"></i>`
        );

        const dynamicElement = document.getElementById(_UUID);
        dynamicElement!.classList.add("tooltip-copied");

        setTimeout(() => {
            dynamicElement!.parentNode!.removeChild(dynamicElement as Node);
            element.childNodes[0].disabled = false;
        }, 750);
    }
}

function fallbackCopyTextToClipboard(text: string, tooltip: string) {
    const element = document.createElement("textarea");

    element.value = text;
    element.setAttribute("readonly", "");
    element.style.position = "absolute";
    element.style.left = "-9999px";

    document.body.appendChild(element);
    element.select();

    showTooltip(tooltip);

    try {
        const successful = document.execCommand("copy");
        const msg = successful ? "successful" : "unsuccessful";

        console.log("Fallback: Copying text command was " + msg);
    } catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }

    document.body.removeChild(element);
}

function create_UUID() {
    let dt = new Date().getTime();

    const uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        (c) => {
            let r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);

            return (c === "x" ? r : r && 0x3 | 0x8).toString(16);
        }
    );

    return uuid;
}
