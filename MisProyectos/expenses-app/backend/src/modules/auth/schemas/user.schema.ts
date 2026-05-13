import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema({ timestamps: true, collection: 'auth_users' })
export class AuthUser {
  @Prop({ required: true, unique: true }) email!: string;
  @Prop({ required: true }) name!: string;
  @Prop({ required: true }) passwordHash!: string;
  @Prop({ enum: ['ADMIN', 'MEMBER'], default: 'MEMBER' }) role!: 'ADMIN' | 'MEMBER';
  @Prop() refreshToken?: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
