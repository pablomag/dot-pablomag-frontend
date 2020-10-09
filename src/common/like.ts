import { getIp } from "./ip";
import { API_URL } from "../constants";

export async function like(data: any) {
    try {
        return await getIp().then((ip) => {
            return new Promise((resolve, reject) => {
                console.log(
                    `Liking post: ${data.title} id: ${data._id} from ${ip}`
                );

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
                    .catch((err) => {
                        reject(`Error: ${err}`);
                    });
            });
        });
    } catch (err) {
        return `Error: ${err}`;
    }
}
