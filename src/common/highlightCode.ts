import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage("javascript", javascript);

export const highlightCode = () => {
    document.querySelectorAll("pre code").forEach((block: any) => {
        hljs.highlightBlock(block);
    });
};
