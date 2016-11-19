usersApp.factory('usersFactory', function($localStorage) {
	var usersFactory = {};

	$localStorage.$default({
		currentId: 3,
		users: {
			'1': {
				id: 1,
				firstName: "Test",
				lastName: "User",
				gitHubId: "test",
				email: "testUser@gmail.com"
			}, 
			'2': {
			  id: 2,
			  firstName: 'Michael',
			  lastName: 'Woods',
			  gitHubId: 'mwoods',
			  email: 'mwoods@mktec.com'
			}
		}
	});

	function validateUser(user) {
		var errors = [];
		if (!user || typeof(user) !== 'object') {
			errors.push('Invalid user.');
			return errors;
		}
		if (!user.firstName) {
			errors.push('First name is required.')
		}

		if (!user.lastName) {
			errors.push('Last name is required');
		}
		if (!user.gitHubId) {
			errors.push('GitHub ID is required');
		}
		if (!user.email) {
			errors.push('Email is required');
		}

		return errors;
	}

	usersFactory.getAllUsers = function () {
		var result = [];
		var users = $localStorage.users;
		for (var key in users) {
			result.push(users[key]);
		}
		return result;
	}

	usersFactory.getUser = function (id) {
		return $localStorage.users[id];
	}

	usersFactory.addUser = function (user) {
		var errors = validateUser(user);
		if (errors.length) {
			return errors;
		}
		var id = $localStorage.currentId++;
		user.id = id;
		$localStorage.users[id] = user;
		return [];
	}

	usersFactory.updateUser = function (user) {
		if (!user.id) {
			return ['Invalid user id.'];
		}

		var errors = validateUser(user);
		if (errors.length) {
			return errors;
		}
		$localStorage.users[user.id] = user;
		return [];
	}

	usersFactory.deleteUser = function(user) {
		delete $localStorage.users[user.id];
	}

	return usersFactory;
});