import Axios from 'axios';

export const fetchPosts = () => dispatch => {
  Axios.get('https://jsonplaceholder.typicode.com/posts')
    .then(res => dispatch({
      type: 'FETCH_POSTS',
      payload: res.data
    }));
}

export const paginate = (currentPage) => dispatch => {
  dispatch({
    type: 'CURRENT_POSTS',
    payload: { currentPage }
  })
}

export const searchPosts = (text) => dispatch => {
  dispatch({
    type: 'SEARCH_POSTS',
    payload: text
  })
}

export const showPost = (id) => dispatch => {
  dispatch({
    type: 'GET_POST',
    payload: id
  })
}

export const setPostsPerPage = (amount) => dispatch => {
  dispatch({
    type: 'POSTS_PER_PAGE',
    payload: amount
  })
}
