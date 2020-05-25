import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Posts from './components/Posts';
import Navbar from './components/Navbar';
import PostItem from './components/PostItem';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, paginate } from './actions';
import Container from '@material-ui/core/Container';



function App() {
  const postItems = useSelector(state => state.posts.items);
  const searchResult = useSelector(state => state.posts.searchResult);
  const { postsPerPage, currentPage } = useSelector(state => state.posts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(fetchPosts());
    }

    getPosts();
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(paginate(currentPage, postsPerPage));
    }

    if (postItems.length > 0) {
      getPosts();
    }
  }, [currentPage, postsPerPage, postItems, searchResult]);

  return (
    <div className="App">
      <Navbar />
      <Container maxWidth="md">
        <Switch>
          <Redirect exact from="/" to="/page/1" />
          <Route exact path='/page/:page'>
            <Posts />
          </Route>
          <Route exact path='/posts/:id'>
            <PostItem />
          </Route>
        </Switch>
      </Container>
    </div>
  );
}

export default App;
