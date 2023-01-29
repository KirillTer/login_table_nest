
import React, { useEffect, useState, useRef, useTransition } from "react";
import { Button, Layout, Row } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { postAPI } from "../../services/PostService";
import PostItem from "./PostItem";
import PostFilter from "./PostFilter";
import PostModal from "./PostModal";
import { IPost } from "../../models/IPost";

const Table = () => {

  // const [_, startTransition] = useTransition();
  // const [selectedSortedPosts, setSelectedSortedPosts] = useState([]);
  
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery({});

  const [createPost] = postAPI.useCreatePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  const handleCreate = async (newPost: IPost) => {
    await createPost({ title: newPost.title, content: newPost.content } as IPost);  
  };

  const handleRemove = (post: IPost) => {
    deletePost(post);
  };

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  };

  const handleFilter = (post: IPost) => {
    // setSelectedSortedPosts(post as any);
  };

  return (
    <Layout>
      <Row justify={'center'} align={'top'} gutter={[16, 16]} className={'h100'}>
        {/* <PostFilter posts={posts as []} handleFilter={handleFilter}/> */}
        <div className="post__list">
          <Button type="primary" onClick={() => refetch()}>Refetch</Button>
          <PostModal createNewPost={handleCreate}/>
          <h1 >Posts list</h1>
          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Error</h1>}
          <TransitionGroup>
            {posts ?
              posts.map((post: IPost) => (
                <CSSTransition
                  key={post.id}
                  timeout={500}
                  classNames="postAnimation"
                >
                  <PostItem
                    remove={handleRemove}
                    update={handleUpdate}
                    key={post.id}
                    post={post}
                  />
                </CSSTransition>
              )) : <div>No available posts</div> }
            </TransitionGroup>
        </div>
      </Row>
    </Layout>
  );
}
 
export default Table;