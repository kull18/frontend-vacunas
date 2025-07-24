// src/Presentation/hooks/useDeleteVaccine.ts
import { useEffect, useState } from "react";
import { DeleteVaccineUseCase } from "../../Application/DeleteVaccineUseCase";
import { useAuth } from "./AuthProvider";

export function useDeleteVaccine() {
  const [loading, setLoading] = useState(false);
  const { token } = useAuth()

  const remove = (id: number) => {
    setLoading(true);


      const deleVaccine = async(id: number) => {
        try {
          const uc = new DeleteVaccineUseCase()
          return uc.execute(id, token)
        }catch(error) {
          console.log("error to delete vaccine in hook", error)
        }finally {}
      }

      deleVaccine(id)
 

    } 
    return { remove, loading };
}
