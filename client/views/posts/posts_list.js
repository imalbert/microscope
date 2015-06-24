var postsData = [
	{
		title: 'Introducing Telescope',
		author: 'Sacha Greif',
		url: 'http://sachagreif.com/introducing-telescope/',
		img: 'Chrysanthemum.jpg'
	},
	{
		title: 'Meteor',
		author: 'Tom Coleman',
		url: 'http://meteor.com',
		img: 'Desert.jpg'
	},
	{
		title: 'The Meteor Book',
		author: 'Tom Coleman',
		url: 'http://themeteorbook.com',
		img: 'Koala.jpg'
	}
];
Template.postList.helpers({
	posts: postsData
});