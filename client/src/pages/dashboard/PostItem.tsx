import React, { FC } from 'react';
import { IPost } from "../../models/IPost";
import { Button } from 'antd';

interface PostItemProps {
  post: IPost;
  remove?: (post: IPost) => void;
  update?: (post: IPost) => void;
}

const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {

  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    if (remove) remove(post)
  }

  const handleUpdate = (event: React.MouseEvent) => {
    const title = prompt() || ""
    if (update) update({ ...post, title })
  }

  return (
    <div className="postItem" onClick={handleUpdate}>
      <div className="postItem_header">
        {post.id}. {post.title}
        <Button type="primary" danger onClick={handleRemove}>Delete</Button>
      </div>
      <div>{post.body}</div>
    </div>
  );
};

export default PostItem;