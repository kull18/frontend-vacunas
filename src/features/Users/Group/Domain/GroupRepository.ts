import type { Group } from "./Group";

export class GroupRepository{
        async getGroup():Promise<Group[]>{
            try{
                const token = localStorage.getItem("token");
                console.log("CORRIENDO GROUPS")
                const response = await fetch("http://127.0.0.1:8000/api/groups", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
            });
    
                if(!response.ok){
                    throw Error("No se pudo obtener los grupos")
                }
                const data = await response.json();
                return data;
            }catch (error){
                console.error("Error fetch groups", error)
                throw error;
                
            } finally{
                console.log("Fetch Completed")
            }
        }

         async createGroup(newGroup: Omit<Group, 'id'>): Promise<Group> {
        try {
            const token = localStorage.getItem("token");
            console.log("Creando nuevo grupo...");
            
            const response = await fetch("http://127.0.0.1:8000/api/groups", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(newGroup)
            });

            console.log("Status:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create group");
            }

            const data = await response.json();
            console.log("Grupo creado:", data);
            return data;

        } catch (error) {
            console.error("Error al crear grupo:", error);
            throw error;
        } finally {
            console.log("Operación de creación completada");
        }
    }

     async deleteGroup(id: number): Promise<boolean> {
        try {
            const token = localStorage.getItem("token");
            console.log(`Eliminando grupo con ID: ${id}...`);
            
            const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log("Status:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete group");
            }

            console.log("Grupo eliminado exitosamente");
            return true;

        } catch (error) {
            console.error("Error al eliminar grupo:", error);
            throw error;
        } finally {
            console.log("Operación de eliminación completada");
        }
    }

    async updateGroup(id: number, updatedGroup: Partial<Group>): Promise<Group> {
        try {
            const token = localStorage.getItem("token");
            console.log(`Actualizando grupo con ID: ${id}...`);
            
            const response = await fetch(`http://127.0.0.1:8000/api/groups/${id}`, {
                method: "PUT", // o "PATCH" según tu API
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(updatedGroup)
            });

            console.log("Status:", response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update group");
            }

            const data = await response.json();
            console.log("Grupo actualizado:", data);
            return data;

        } catch (error) {
            console.error("Error al actualizar grupo:", error);
            throw error;
        } finally {
            console.log("Operación de actualización completada");
        }
    }
}