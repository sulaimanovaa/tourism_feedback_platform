// import { Schema, Types } from 'mongoose';
// import { IUser, UserTypes } from './user.models';

// const UserSchema = new Schema<IUser>(
//   {
//     _id: {
//       type: Types.ObjectId,
//       auto: true,
//     },
//     user_type: {
//       type: String,
//       enum: Object.values(UserTypes),
//       default: UserTypes.USER,
//     },
//     name: {
//       type: String,
//     },
//     surname: {
//       type: String,
//     },
//     nickname: {
//       type: String,
//     },
//     avatar: {
//       type: String,
//     },
//     bio: {
//       type: String,
//     },
//     email: {
//       type: String,
//     },
//     is_deleted: {
//       type: Boolean,
//       default: false,
//     },
//     created_at: {
//       type: Date,
//       default: new Date(),
//     },
//     updated_at: {
//       type: Date,
//       default: new Date(),
//     },
//   },
//   {
//     timestamps: true,
//     id: true,
//     virtuals: true,
//     toJSON: {
//       virtuals: true,
//     },
//     toObject: {
//       virtuals: true,
//     },
//   },
// );

// export { UserSchema };
