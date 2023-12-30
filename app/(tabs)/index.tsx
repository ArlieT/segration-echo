import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import UserBox from "../../components/UserBox";
import { users } from "../../constants/fakeusers";
import Loading from "../../components/Loading";
export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Hi User!</Text>
            <View style={styles.headerBackground}>
              <Text style={styles.headerTextWhite}>Together, lets Clean!</Text>
            </View>
          </View>
          <View style={styles.top3Container}>
            <Text className="">Top 3</Text>
            <ScrollView style={styles.scrollView}>
              {users.map(({ username, scores }, index) => (
                <UserBox username={username} scores={scores} key={index} />
              ))}
              {users.map(({ username, scores }, index) => (
                <UserBox username={username} scores={scores} key={index} />
              ))}
            </ScrollView>
          </View>
          {/* Uncomment the following block when needed */}
          {/* <View style={styles.bottomContainer}>
            <PaperBin label="Plactic Bin" />
            <PaperBin label="Paper Bin" />
            <PaperBin label="Can Bin" />
          </View> */}
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
    padding: 0,
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
    height: "40%",
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
  // Uncomment the following block when needed
  // bottomContainer: {
  //   flex: 0.5,
  //   padding: 8,
  //   flexDirection: "row",
  //   borderRadius: 16,
  //   backgroundColor: "#fbfbfb",
  // },
});
