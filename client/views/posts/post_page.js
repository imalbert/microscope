Template.postPage.helpers({
	comments: function() {
		return Comments.find({postId: this._id});
	},
	currentPost: function() {
		return Posts.findOne({_id: this._id});
	}
});