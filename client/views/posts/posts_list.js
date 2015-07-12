Template.postsList.helpers({
	hasMorePosts: function(){

		// Is rewind deprecated?
		//this.posts.rewind();

		return Router.current().postsLimit() == this.posts.fetch().length;
	}
});