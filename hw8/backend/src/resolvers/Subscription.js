// const Subscription = {
//   comment: {
//     subscribe(parent, { postId }, { db, pubsub }, info) {
//       const post = db.posts.find(
//         (post) => post.id === postId && post.published,
//       );

//       if (!post) {
//         throw new Error('Post not found');
//       }

//       return pubsub.subscribe(`comment ${postId}`);
//     },
//   },
//   post: {
//     subscribe(parent, args, { pubsub }, info) {
//       return pubsub.subscribe('post');
//     },
//   },
// };

const makeName = (name, to) => {
    return [name, to].sort().join('_');
}

const Subscription = {
    message: {
      subscribe: (parent, { from, to }, { pubsub }) => {
        const chatBoxName = makeName(from, to);
        return pubsub.subscribe(`chatBox ${chatBoxName}`);
  }, },
};

export default Subscription;
