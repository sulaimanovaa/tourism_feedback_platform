import { IUser } from 'modules/users/interfaces/users.interface';

export interface IFollows {
  id: number;
  follower: IUser;
  following: IUser;
  createdAt: Date;
}

export interface IFollowIds {
  followerId: number;
  followingId: number;
}

export interface IFollowDto extends Pick<IFollowIds, 'followingId'> {}

export interface IFollowsCount {
  followersCount: number;
  followingCount: number;
}
