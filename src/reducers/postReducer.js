const initialState = {
  items: [],
  searchResult: [],
  currentItems: [],
  item: {},
  currentPage: 1,
  postsPerPage: 10
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_POSTS':
      return {
        ...state,
        items: action.payload,
        searchResult: action.payload
      }
    case 'CURRENT_POSTS':
      const { currentPage } = action.payload;
      const indexOfLastPost = currentPage * state.postsPerPage;
      const indexOfFirstPost = indexOfLastPost - state.postsPerPage;
      const currentPosts = state.searchResult.slice(indexOfFirstPost, indexOfLastPost);
      return {
        ...state,
        currentItems: currentPosts,
        currentPage
      }
    case 'SEARCH_POSTS':
      return {
        ...state,
        searchResult: state.items.filter(item => (
          item.title.includes(action.payload) || item.body.includes(action.payload)
        ))
      }
    case 'GET_POST':
      return {
        ...state,
        item: state.items.filter(item => item.id === action.payload)[0]
      }
    case 'POSTS_PER_PAGE':
      return {
        ...state,
        postsPerPage: action.payload
      }
    default:
      return state;
  }
}
