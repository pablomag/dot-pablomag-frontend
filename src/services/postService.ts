import http from "./httpService";
import { API_URL } from "../constants";

export async function getPost(slug: string) {
    return await http.get(`${API_URL}/post/slug/${slug}`);
}

export async function getPosts() {
    return await http.get(`${API_URL}/post/list`);
}

export async function updateCommentCount(postId: string, commentCount: number) {
    return await http.put(`${API_URL}/post/comment-count-update`, {
        postId,
        commentCount,
    });
}
