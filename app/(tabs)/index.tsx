import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import UserBox from "../../components/UserBox";
import { users } from "../../constants/fakeusers";
import Loading from "../../components/Loading";
import Bin from "../../components/bin/Bin";

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    /* mock loading */
    const min = 1000;
    const max = 2000;
    const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      setIsLoading(false);
    }, randomValue);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container} className="gap-y-2">
          <View style={styles.header}>
            <Text style={styles.headerText}>Hi User!</Text>
            <View style={styles.headerBackground}>
              <Text style={styles.headerTextWhite}>Together, lets Clean!</Text>
            </View>
          </View>
          <View style={styles.top3Container}>
            <Text className="mb-2 text-base">Top 3 most points</Text>
            <ScrollView style={styles.scrollView}>
              {users.slice(0, 3).map(({ username, scores }, index) => (
                <UserBox username={username} scores={scores} key={index} />
              ))}
            </ScrollView>
          </View>
          {/* Uncomment the following block when needed */}

          <View className="flex-row rounded-md bg-[#fbfbfb] w-full justify-between p-2 flex-1">
            <Bin label="Plactic Bin" percentage="100" color="#96C7C1" />
            <Bin label="Paper Bin" percentage="10" color="#FEF9EF" />
            <Bin label="Can Bin" percentage="30" color="#FF9800" />
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1efee",
    flexDirection: "column",
    height: "100%",
    padding: 5,
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
  headerText: {
    bottom: "55%",
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
});
