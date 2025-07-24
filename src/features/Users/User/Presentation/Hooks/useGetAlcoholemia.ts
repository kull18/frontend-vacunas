import { useEffect, useState } from "react";
import { GetAlcoholemia } from "../../Application/GetDataAlcoholemia";
import { useAuth } from "./AuthProvider";

export const useGetAlcohol = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
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

    const interval = setInterval(() => {
      fetchData();
    }, 60000);

    return () => clearInterval(interval); 
  }, [token]);

  return { data, loading };
};
