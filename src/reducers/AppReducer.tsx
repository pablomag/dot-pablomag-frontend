import { getPost, getPosts } from "../services/postService";

export const types = {
    loadPost: "LOAD POST",
    loadPosts: "LOAD POSTS",
    dataLoaded: "DATA LOADED",
    dataError: "DATA ERROR",
};

const loadPost = async (slug: string, dispatch: React.Dispatch<any>) => {
    try {
        await getPost(slug).then((response: any) => {
            const { post } = response;
            dispatch({ type: types.dataLoaded, data: post });
        });
    } catch (error) {
        dispatch({ type: types.dataError, error });
    }
};

const loadPosts = async (dispatch: React.Dispatch<any>) => {
    try {
        await getPosts().then((response: any) => {
            const { posts } = response;
            dispatch({ type: types.dataLoaded, data: posts });
        });
    } catch (error) {
        dispatch({ type: types.dataError, error: error });
    }
};

export const AppReducer = (state: any, action: any) => {
    switch (action.type) {
        case types.loadPost:
            loadPost(action.slug, action.dispatch);

            return {
                ...state,
                loading: true,
            };
        case types.loadPosts:
            loadPosts(action.dispatch);

            return {
                ...state,
                loading: true,
            };
        case types.dataLoaded:
            return {
                ...state,
                data: action.data,
                loading: false,
            };
        case types.dataError:
            return {
                ...state,
                error: action.error,
                loading: false,
            };
        default:
            return;
    }
};
