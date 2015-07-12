Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('notifications');
	}
});

Router.map(function() {
	this.route('postPage', {
		path: '/posts/:_id',
		waitOn: function() {
			return Meteor.subscribe('comments', this.params._id);
		},
		data: function() {return Posts.findOne(this.params._id);}
	});

	this.route('postEdit', {
		path: '/posts/:_id/edit',
		data: function() { 
			Posts.findOne(this.params._id);
		},
		onBeforeAction: function() {
			Session.set('currentPostId', this.params._id);
			this.next();
		}
	});

	this.route('postSubmit', {
		path: '/submit'
	});

	this.route('postsList', {
		path:'/:postsLimit?',
		waitOn: function() {
			var limit = parseInt(this.params.postsLimit) || 5;
			return Meteor.subscribe('posts', {limit: limit});
		},
		data: function() {
			var limit = parseInt(this.params.postsLimit) || 5;
			return {
				posts: Posts.find({}, {limit: limit})
			};
		}
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

