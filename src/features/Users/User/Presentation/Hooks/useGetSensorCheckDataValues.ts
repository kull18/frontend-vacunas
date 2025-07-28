import { useEffect, useState } from "react";
import { GetAlcoholemia } from "../../Application/GetDataAlcoholemia";
import { GetSensorCheckUseCase } from "../../Application/GetSensorCheckDataUseCase";
import type { SensorCheckDataValues } from "../../Domain/SensorCheckDataValues";


export const useGetSensorCheckDataValues = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<SensorCheckDataValues | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const uc = new GetSensorCheckUseCase();
      const response = await uc.execute();
      setData(response);
    } catch (error) {
      console.error("Error fetching sensorcheck  data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading };
};
