function init() {
    console.log("Logger initialized");
}

function log(error: any) {
    console.log("An unexpected error has occurred!", error.message);
}

export default {
    init,
    log,
};
