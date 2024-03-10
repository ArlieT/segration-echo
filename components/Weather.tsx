import { View, Text, StyleSheet } from "react-native";
import React from "react";

type WeatherProps = {
  temperature?: string;
  humidity?: string;
};

export default function Weather(weather: WeatherProps) {
  return (
    <View className="w-full h-[15%] bg-white rounded-xl">
      <View className="flex flex-1 flex-row justify-center">
        <View className="p-[10px]">
          <Text className="text-center">Temperature</Text>
          <View className="bg-[#051C2ECC] w-[100px] rounded-md justify-center items-center flex-1">
            <Text
              style={{
                color: "white",
              }}
            >
              {weather?.temperature}c
            </Text>
          </View>
        </View>
        <View className="p-[10px]">
          <Text className="text-center ">Humidity</Text>
          <View className="bg-[#051C2ECC] w-[100px] rounded-md justify-center items-center flex-1 border">
            <Text
              style={{
                color: "white",
              }}
            >
              {weather?.humidity}%
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#f1efee",
    flexDirection: "column",
    height: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 16,
    backgroundColor: "#f1efee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10%",
    height: "12%",
    flexDirection: "column",
    top: 20,
  },
  boxCon: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
    borderRadius: 10,
    minHeight: 80,
    gap: 10,
  },
  box: {
    backgroundColor: "rgba(5, 28, 46, 0.8)",
    elevation: 20,
    opacity: 10,
    textAlign: "center",
    padding: 10,

    paddingHorizontal: 20,
    borderRadius: 10,
    height: "80%",
    maxWidth: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    bottom: "25%",
    color: "black",
    alignSelf: "flex-start",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 18,
  },
  headerBackground: {
    backgroundColor: "#051c2e",
    height: "100%",
    position: "absolute",
    bottom: -6,
    width: "90%",
    borderRadius: 16,
    justifyContent: "center",
  },
  headerTextWhite: {
    textAlign: "center",
    color: "white",
    margin: "auto",
  },
  top3Container: {
    borderRadius: 16,
    backgroundColor: "#fbfbfb",
    height: "50%",
    padding: 10,
  },
  top3Text: {
    color: "black",
    textAlign: "left",
    width: "100%",
    padding: 8,
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: "medium",
  },
  scrollView: {
    marginVertical: 2,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  containerHeadline: {
    fontSize: 24,
    fontWeight: "600",
    padding: 20,
  },
});
