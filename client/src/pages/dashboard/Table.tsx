
import React, { useEffect, useState, useRef, useTransition } from "react";
import { Button, Slider, Layout, Row } from 'antd';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { postAPI } from "../../services/PostService";
import PostItem from "./PostItem";
import PostFilter from "./PostFilter";
import PostModal from "./PostModal";
import { IPost } from "../../models/IPost";

const Table = () => {

  const [_, startTransition] = useTransition();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef<Element>();
  const observer = useRef<IntersectionObserver>();
  const [selectedSortedPosts, setSelectedSortedPosts] = useState([]);
  
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = postAPI.useFetchAllPostsQuery({limit,page});

  const [createPost] = postAPI.useCreatePostMutation();
  const [updatePost] = postAPI.useUpdatePostMutation();
  const [deletePost] = postAPI.useDeletePostMutation();

  useEffect(() => {
    if(isLoading) return;
    if(observer.current) (observer.current as IntersectionObserver).disconnect();
    const callback = function(entries: any) {
      if(entries[0].isIntersecting) {
        setPage(page + 1);
      }
    }
    observer.current = new IntersectionObserver(callback);
    (observer.current).observe(lastElement.current!);
  }, [selectedSortedPosts]);

  useEffect(() => {
    startTransition(() => {
      if(posts?.length && (page !== 1)) {
        setSelectedSortedPosts([...selectedSortedPosts, ...posts as []]);
      } else if (posts?.length) {
        setSelectedSortedPosts(posts as []);
      }
    });
  }, [posts]);

  useEffect(() => {
    setPage(1);
  }, [limit]);

  // useEffect(() => {setTimeout(() => { setLimit(3) }, 2000)}, []);

  const handleCreate = async (newPost: IPost) => {
    await createPost({ title: newPost.title, body: newPost.body } as IPost);  
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
        <PostFilter posts={posts as []} handleFilter={handleFilter}/>
        <div className="post__list">
          <Button type="primary" onClick={() => refetch()}>Refetch</Button>
          <PostModal createNewPost={handleCreate}/>
          <Slider min={1} max={100} defaultValue={limit} onChange={setLimit}/>
          <h1 >Posts list</h1>
          {isLoading && <h1>Loading...</h1>}
          {error && <h1>Error</h1>}
          <TransitionGroup>
            {selectedSortedPosts ?
              selectedSortedPosts.map((post: IPost) => (
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
          <div ref={lastElement as any} style={{height: '10px'}}></div>
        </div>
      </Row>
    </Layout>
  );
}
 
export default Table;