import { useEffect, useState } from "react"
import { GetUserCivilVacinatedValuesID } from "../../Application/GetUserCivilVaccinatedValuesID"
import type { VaccinationResponse } from "../../Domain/VaccinationResponse"

export function useGetUserCivilVaccinatedValuesId(id: number) {
  const [data, setData] = useState<VaccinationResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      const useCase = new GetUserCivilVacinatedValuesID()

      try {
        const result = await useCase.execute(id)
        console.log("result", result)
        setData(result)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchData()
    }
  }, [id])

  return { data, loading, error }
}
