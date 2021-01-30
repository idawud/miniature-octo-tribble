import { UsersDto } from '../dto/users.model';
import mongooseService from '../../common/services/mongoose.service';
import shortUUID from 'shortid';
import debug from 'debug';

class UsersDao {
	private static instance: UsersDao;
	Schema = mongooseService.getMongoose().Schema;

	userSchema = new this.Schema({
		_id: String,
		email: String,
		password: { type: String, select: false },
		firstName: String,
		lastName: String,
		permissionLevel: Number
	});

	User = mongooseService.getMongoose().model('Users', this.userSchema);

	constructor() {}

	static getInstance(): UsersDao {
		if (!this.instance) {
			this.instance = new UsersDao();
		}
		return this.instance;
	}

	async addUser(userFields: UsersDto): Promise<string> {
		userFields._id = shortUUID.generate();
		userFields.permissionLevel = 1;
		const user = new this.User(userFields);
		await user.save();
		return userFields._id;
	}

	async getUserByEmail(email: string) {
		return this.User.findOne({ email: email }).exec();
	}

	async getUserByEmailWithPassword(email: string) {
		return this.User.findOne({ email: email }).select('_id email permissionLevel +password').exec();
	}

	async removeUserById(userId: string) {
		return this.User.deleteOne({ _id: userId }).exec();
	}

	async getUserById(userId: string) {
		return this.User.findOne({ _id: userId }).populate('User').exec();
	}

	async getUsers(limit: number = 25, page: number = 0) {
		return this.User.find().limit(limit).skip(limit * page).exec();
	}

	async patchUserById(userId: string, userFields: any) {
		const existingUser = await this.User
			.findOneAndUpdate({ _id: userId }, { $set: userFields }, { new: true })
			.exec();

		if (!existingUser) {
			throw new Error(`User not id: ${userId}found`);
		}
		return Promise.resolve(existingUser);
	}
}

export default UsersDao.getInstance();
