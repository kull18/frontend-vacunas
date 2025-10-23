import { useEffect, useState } from "react";
import { GetAlcoholemia } from "../../Application/GetDataAlcoholemia";
import { useAuth } from "./AuthProvider";
import type { AlcoholData } from "../../Domain/DataAlcoholemia";

export const useGetAlcohol = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AlcoholData>(null);
  const { token } = useAuth();

  const fetchData = async () => {
    setLoading(true);
    try {
      const uc = new GetAlcoholemia();
      const response = await uc.execute(token);
      setData(response);
    } catch (error) {
      console.error("Error fetching alcohol data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  return { data, loading, refetchAlcohol: fetchData };
};
