import type { BoxVaccine, BoxVaccineAmount } from "../Domain/BoxVaccine";

export class BoxRepository{
        async getBoxs():Promise<BoxVaccine[]>{
            try{
                const token = localStorage.getItem("TokenU");
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
                    const token = localStorage.getItem("TokenU");
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
                    const token = localStorage.getItem("TokenU");
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
}
