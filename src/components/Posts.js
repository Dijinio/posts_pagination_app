import React, { useEffect, useState } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { Link, useHistory, withRouter } from 'react-router-dom';
import { showPost, paginate, setPostsPerPage } from '../actions';
import { useSelector, useDispatch } from 'react-redux';

function Posts() {
  const dispatch = useDispatch();
  const { searchResult, currentItems, postsPerPage, currentPage } = useSelector(state => state.posts);

  const history = useHistory();

  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    history.push(`/page/${currentPage}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const postItems = currentItems.map(post => (
    <ListItem key={post.id}>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography noWrap component="p">
            {post.body}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
            <Button
              size="small"
              variant="outlined"
              color="primary"
              onClick={() => dispatch(showPost(post.id))}>
                Read More
            </Button>
          </Link>
        </CardActions>
      </Card>
    </ListItem>
  ))

  const pages = Math.ceil(searchResult.length / postsPerPage);

  function handlePaginate(event, value) {
    dispatch(paginate(value));
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    setAnchorEl(null);
    if (e.target.innerText) {
      dispatch(setPostsPerPage(e.target.innerText));
    }
  };

  return (
    <div>
        <p>{searchResult.length} Posts</p>
        Items Per Page:
        <Button
          aria-controls="simple-menu"
          variant="outlined"
          aria-haspopup="true"
          onClick={handleClick}>
          {postsPerPage}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          >
          <MenuItem onClick={handleClose}>5</MenuItem>
          <MenuItem onClick={handleClose}>10</MenuItem>
          <MenuItem onClick={handleClose}>20</MenuItem>
        </Menu>

      <List>
        {postItems}
      </List>
      <Pagination
        size="large"
        count={pages}
        defaultPage={currentPage}
        page={currentPage}
        onChange={handlePaginate}
        color="secondary" />
    </div>
  )
}

export default withRouter(Posts);
