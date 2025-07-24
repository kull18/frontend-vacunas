import type { Group } from "./Group";

export class GroupRepository{
        async getGroup():Promise<Group[]>{
            try{
                const token = localStorage.getItem("TokenU");
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
            const token = localStorage.getItem("TokenU");
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
}