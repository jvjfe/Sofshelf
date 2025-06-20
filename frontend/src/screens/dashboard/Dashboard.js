import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";

const API_URL = "http://192.168.1.106:5000/api/protected-endpoint";  

const DashboardScreen = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");  

      if (!token) {
        return;
      }

      try {
        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });

        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.log("Erro ao acessar recurso protegido.");
        }
      } catch (error) {
        console.log("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      {data ? <Text>{JSON.stringify(data)}</Text> : <Text>Carregando...</Text>}
    </View>
  );
};

export default DashboardScreen;