import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';

function PostItem() {
  const post = useSelector(state => state.posts.item);
  const currentPage = useSelector(state => state.currentPage);

  const PostDiv = styled.div`
    background: #efefef;
    padding: 10px 30px;
    margin-top: 20px;
    box-shadow: 2px 2px 5px rgba(0,0,0,0.6);
    h1 {
      font-size: 1.6rem;
    }
    p {
      font-size: 1.2rem;
    }
    a {
      text-decoration: none;
    }
  `

  return (
    <PostDiv>
      <Link to={"/page/" + currentPage}>
        <Button variant="contained" color="secondary">Back</Button>
      </Link>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </PostDiv>
  )
}

export default PostItem;
