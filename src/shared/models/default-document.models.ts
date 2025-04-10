export interface IDefaultDocument extends Document {
  id: number;
  isDeleted?: boolean;
  createdAt?: Date;
  updatedAt: Date;
}
