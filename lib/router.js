Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() {
		return Meteor.subscribe('posts');
	}
});

Router.map(function() {
	this.route('postsList', {path:'/'});

	this.route('postPage', {
		path: '/posts/:_id',
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

Router.before(requireLogin, {only: 'postSubmit'});