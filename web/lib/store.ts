import { User } from './../../server/entity/User';
import { createState } from '@hookstate/core';

const userState = createState<User | null>(null);

export default userState;
