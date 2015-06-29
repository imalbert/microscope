Session.setDefault('index', 0);

Template.slideBox.events({
	'onSlideChanged': function(event, template){
		Session.set('index', event.index);
		console.log(event.index);
	}
});

Template.slideBox.helpers({
	slideNumber: function() {
		return Session.get('index') + 1;
	}
});