import { GET_POSTS, POST_ERROR } from '../actions/types';

const initialState = {
    posts: [],
    post: [],
    loading: true,
    error: {}
}

export default function( state = initialState, actions) {
    const { type, payload } = actions;
    switch(type) {
        case GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            }
        case POST_ERROR:
            return {
                ...state, 
                error: payload,
                loading: false
            }
        default: 
            return {
                ...state
            }
    }
}