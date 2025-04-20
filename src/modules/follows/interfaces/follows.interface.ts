import { IUser } from 'modules/users/interfaces/users.interface';

export interface IFollows {
  id: string;
  follower: IUser;
  following: IUser;
  createdAt: Date;
}

export interface IFollowIds {
  followerId: string;
  followingId: string;
}

export interface IFollowDto extends Pick<IFollowIds, 'followingId'> {}

export interface IFollowsCount {
  followersCount: number;
  followingCount: number;
}
