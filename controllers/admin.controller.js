let { readData, hashPassword } = require('./../utils/model');

module.exports = {
	POST: async (req, res) => {
		let { username, password } = await req.body;
		let admins = readData('admin');
		/*
      {
        username: 'salim',
        password: 'salimAdmin'
      }
    */
		try {
			password = hashPassword(password);
			let admin = admins.find(
				(admin) =>
					admin.username == username && admin.password == password,
			);

			if (!admin) {
				throw new Error('Invalid username or password');
			}

			res.json(201, {
				status: 201,
				message: 'Signin is successfull',
			});
		} catch (error) {
			res.json(400, { status: 400, message: error.message });
		}
	},
};
