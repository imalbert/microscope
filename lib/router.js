Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('notifications');
	}
});

PostsListController = RouteController.extend({
	template: 'postsList',
	increment: 5,
	postsLimit: function() {
		return parseInt(this.params.postsLimit) || this.increment;
	},
	findOptions: function() {
		return {sort: this.sort, limit: this.postsLimit()};
	},
	waitOn: function() {
		return Meteor.subscribe('posts', this.findOptions());
	},
	data: function() {
		return {
			posts: Posts.find({}, this.findOptions()),
			// nextPath: this.route.path({postsLimit: this.postsLimit() + this.increment})
			nextPath: this.nextPath()
		};
	}
});

NewPostsListController = PostsListController.extend({
	sort: {submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.newPosts.path({postsLimit: this.postsLimit() + this.increment})
	}
});

BestPostsListController = PostsListController.extend({
	sort: {votes: -1, submitted: -1, _id: -1},
	nextPath: function() {
		return Router.routes.bestPosts.path({postsLimit: this.postsLimit() + this.increment})
	}
})

Router.map(function() {
	this.route('home', {
		path: '/',
		controller: NewPostsListController
	});

	this.route('newPosts', {
		path: '/new/:postsLimit?',
		controller: NewPostsListController
	});

	this.route('bestPosts', {
		path: '/best/:postsLimit?',
		controller: BestPostsListController
	});

	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function() {
			return [Meteor.subscribe('comments', this.params._id),
					Meteor.subscribe('singlePost', this.params._id)];
		},
		data: function() { return Posts.findOne(this.params._id);}
	});

	this.route('postEdit', {
		path: '/posts/:_id/edit',
		waitOn: function() {
			return Meteor.subscribe('singlePost', this.params._id);
		},
		data: function() { 
			return Posts.findOne(this.params._id);
		},
		onBeforeAction: function() {
			Session.set('currentPostId', this.params._id);
			this.next();
		}
	});

	this.route('postSubmit', {
		path: '/submit',
		disableProgress: true
	});

	this.route('postsList', {
		path:'/:postsLimit?',
		controller: PostsListController
	});
});

var requireLogin = function() {
	if (! Meteor.user()) {
		if (Meteor.loggingIn())
			this.render(this.loadingTemplate);
		else
			this.render('accessDenied');	
		
		this.stop();
	} else {
		Session.set('chapp-docid','uniqueIdentifier');
		Session.set('chapp-username', Meteor.user().username);
		this.next();
	}
}

var clearErrors = function(page) {
	Errors.clearSeen();
	return page;
}

Router.before(requireLogin, {only: 'postSubmit'});
Router.before(function() { 
	clearErrors();
	this.next();
});

