import type { User } from "@bookph/core/prisma/client";

export interface IUsersRepository {
  updateLastActiveAt(userId: number): Promise<User>;
}
