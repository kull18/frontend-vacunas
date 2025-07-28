import type { UserCivil } from "./UserCIvil";

export class UserCivilRepository {
  private baseUrl = `${import.meta.env.VITE_URL_API_2}/UserCivil`;

  private formatToken(token: string | null): string | null {
    if (!token) return null;
    const trimmed = token.trim().replace(/[^\x00-\x7F]/g, "");
    if (!trimmed.startsWith("Bearer ")) {
      return `Bearer ${trimmed}`;
    }
    return trimmed;
  }

  private getHeaders(token: string | null): HeadersInit {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    const formatted = this.formatToken(token);
    if (formatted) {
      headers["Authorization"] = formatted;
    }

    return headers;
  }

  async getAll(token: string | null): Promise<UserCivil[]> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "GET",
        headers: this.getHeaders(token),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al obtener usuarios civiles");
      }

      const data = await response.json();
      return data.users || data; // depende de cómo lo devuelva tu API
    } catch (error) {
      console.error("Error en getAll:", error);
      throw error;
    }
  }

  async create(user: UserCivil, token: string | null): Promise<UserCivil> {
    try {
      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: this.getHeaders(token),
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al crear usuario civil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en create:", error);
      throw error;
    }
  }

  async update(id: number, data: Partial<UserCivil>, token: string | null): Promise<UserCivil> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "PUT",
        headers: this.getHeaders(token),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al actualizar usuario civil");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en update:", error);
      throw error;
    }
  }

  async delete(id: number, token: string | null): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "DELETE",
        headers: this.getHeaders(token),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al eliminar usuario civil");
      }

      return true;
    } catch (error) {
      console.error("Error en delete:", error);
      throw error;
    }
  }

  async getById(id: number, token: string | null): Promise<UserCivil> {
    try {
      const response = await fetch(`${this.baseUrl}/${id}`, {
        method: "GET",
        headers: this.getHeaders(token),
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || "Error al obtener usuario civil por ID");
      }

      return await response.json();
    } catch (error) {
      console.error("Error en getById:", error);
      throw error;
    }
  }
}
