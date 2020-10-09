export function getIp() {
    return new Promise((resolve, _) => {
        const url = "https://api.ipify.org?format=json";

        fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((json) => resolve(json.ip));
    });
}
