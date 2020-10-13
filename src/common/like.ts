import { getIp } from "./ip";
import { API_URL } from "../constants";

export async function like(data: any) {
    try {
        return await getIp().then((ip) => {
            return new Promise((resolve, reject) => {
                const url = `${API_URL}/post/like/${data._id}`;

                fetch(url, {
                    method: "POST",
                    body: JSON.stringify({ post: data, ip }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                })
                    .then((res) => res.json())
                    .then((json) => {
                        resolve(json);
                    })
                    .catch((error) => {
                        reject(`Error: ${error}`);
                    });
            });
        });
    } catch (error) {
        return `Error: ${error}`;
    }
}
