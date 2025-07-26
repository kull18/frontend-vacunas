import { data } from "react-router-dom";
import type { User, UserLogin } from "./User";
import type { Group } from "../../Group/Domain/Group";
import { useNavigate } from "react-router-dom";
export class UserRepository{
    async getUser():Promise<User[]>{
        try{
            const response = await fetch("http://127.0.0.1:8000/api/userMedicPersona");

            if(!response.ok){
                throw Error("No se pudo obtener los usuarios")
            }
            const data = await response.json();
            console.log("data",data)
            return data;
        }catch (error){
            console.error("Error fetch users", error)
            throw error;
            
        } finally{
            console.log("Fetch Completed")
        }
    }

// src/Domain/UserRepository.ts
async getUserByRol(): Promise<User[]> {
  try {
    console.log("[UserRepository] Obteniendo usuarios...");

    const token = localStorage.getItem("token");
    if (!token) throw new Error("Token no encontrado en localStorage");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    // Obtener usuarios
    const usersResponse = await fetch("http://127.0.0.1:8000/api/leadersAndNurse", {
      headers
    });

    if (!usersResponse.ok) {
      console.error("[UserRepository] Error en respuesta de usuarios:", usersResponse.status);
      throw new Error("Error al obtener usuarios");
    }

    const users: User[] = await usersResponse.json();
    console.log("[UserRepository] Usuarios recibidos:", users);

    // Obtener grupos
    console.log("[UserRepository] Obteniendo grupos...");
    const groupsResponse = await fetch("http://127.0.0.1:8000/api/groups", {
      headers
    });

    if (!groupsResponse.ok) {
      console.error("[UserRepository] Error en respuesta de grupos:", groupsResponse.status);
      throw new Error("Error al obtener grupos");
    }

    const groups: Group[] = await groupsResponse.json();
    console.log("[UserRepository] Grupos recibidos:", groups);

    // Asociar usuarios con sus grupos
    const usersWithGroups = users.map(user => {
      const group = groups.find(g => g.idGroup === user.groupIdGroup);
      return {
        ...user,
        groupName: group ? group.nameGroup : 'Sin grupo'
      };
    });

    console.log("[UserRepository] Usuarios con grupos:", usersWithGroups);
    return usersWithGroups;

  } catch (error) {
    console.error("[UserRepository] Error completo:", error);
    throw error;
  }
}


    async createUser(newUser: User): Promise<User> {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch("http://127.0.0.1:8000/api/userMedicPersona", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newUser)
            });

            if (!response.ok) {
                throw new Error("No se pudo crear el usuario");
            }

            const data = await response.json();
            return data.user; // O simplemente `data`, según tu API
        } catch (error) {
            console.error("Error al crear usuario repo:", error);
            throw error;
        } finally {
            console.log("Creación de usuario completada");
        }
    }

async loginUser(credentials: { username: string; password: string }): Promise<{ token: string; body: User }> {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/login/userMedicPersona", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });

        if (!response.ok) {
            console.log("Credenciales enviadas:", credentials);
            throw new Error("Credenciales inválidas o error en el login");
        }

        const authHeader = response.headers.get("authorization");
        if (!authHeader) {
            throw new Error("No se encontró el token en el header");
        }

        // token
        const token = authHeader.split(" ")[1];
        console.log("Token limpio:", token);

        // body completo
        const body = await response.json();
        console.log("Body de respuesta:", body);

        return { token, body };

    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        throw error;
    } finally {
        console.log("Login completado");
    }
}


    async updateUser(id: number, updatedData: Partial<User>): Promise<User> {
        try {
            const response = await fetch(`api/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                throw new Error("No se pudo actualizar el usuario");
            }

            const data = await response.json();
            return data.user; // O solo `data`, según la estructura de tu backend
        } catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        } finally {
            console.log("Actualización de usuario completada");
        }
    }

     async deleteUser(id: number): Promise<boolean> {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/userMedicPersona/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("No se pudo eliminar el usuario");
            }

            console.log(`Usuario ${id} eliminado correctamente`);
            return true;
        } catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        } finally {
            console.log("Petición DELETE completada");
        }
    }

}