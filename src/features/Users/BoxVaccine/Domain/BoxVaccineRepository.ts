import type { BoxVaccine, BoxVaccineAmount } from "../Domain/BoxVaccine";

export class BoxRepository{
        async getBoxs():Promise<BoxVaccine[]>{
            try{
                const token = localStorage.getItem("token");
                console.log("CORRIENDO CAJAS")
                const response = await fetch("http://127.0.0.1:8000/api/vaccineBox", {
                method: "GET",
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
                }
            });
    
                if(!response.ok){
                    throw Error("No se pudo obtener las cajas")
                }
                const data = await response.json();
                return data;
            }catch (error){
                console.error("Error fetch cajas", error)
                throw error;
                
            } finally{
                console.log("Fetch Completed")
            }
        }

            async createBox(newBox: BoxVaccine): Promise<BoxVaccine> {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch("http://127.0.0.1:8000/api/vaccineBox", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            idVaccineBox: newBox.idVaccineBox,
                            idVaccines: newBox.idVaccineBox
                        })
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

            async createAmountVaccineBox(newBox: BoxVaccineAmount): Promise<BoxVaccineAmount> {
                try {
                    const token = localStorage.getItem("token");
                    const response = await fetch("http://127.0.0.1:8000/api/vaccineBox", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            amountVaccines: newBox.amountVaccines,
                        })
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

    async deleteBox(id: number): Promise<boolean> {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://127.0.0.1:8000/api/vaccineBox/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar la caja con ID ${id}`);
        }

        // Si tu API devuelve un status 204 (No Content), puedes retornar true directamente
        return true;
        
    } catch (error) {
        console.error(`Error al eliminar caja (ID: ${id}):`, error);
        throw error;
    } finally {
        console.log("Operación de eliminación completada");
    }
}
}
