if (Posts.find().count() === 0) {
	Posts.insert({
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://sachagreif.com/introducing-telescope/',
		img: 'Chrysanthemum.jpg'
	});

	Posts.insert({
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com',
		img: 'Desert.jpg'
	});

	Posts.insert({
		title: 'The Meteor Book',
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com',
		img: 'Koala.jpg'
	});
}