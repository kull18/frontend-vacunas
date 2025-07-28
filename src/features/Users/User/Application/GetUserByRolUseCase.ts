// src/Application/GetUserUseCase.ts
import type { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export class GetUserRoleCase {
  private repository = new UserRepository();

  async execute(): Promise<User[]> {
    try {
      return await this.repository.getUserByRol();
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
      throw error;
    }
  }
}