import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { users } from "../../../constants/fakeusers";
import UserBox from "../../../components/UserBox";
import Bin from "../../../components/bin/Bin";
import Loading from "../../../components/Loading";
import { onValue } from "firebase/database";
import firebaseRef from "../../../firebase/ref";
import BinModal, { ModalProps } from "../../../components/BinModal";
import { Link, useRouter } from "expo-router";
import { useAuth } from "../../../_store/authStore";

type TWeater = {
  temperature: string;
  humidity: string;
};
type TBin = {
  plastic: string;
  can: string;
  paper: string;
};

export default function TabOneScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<TWeater>();
  const [bin, setBin] = useState<TBin>();
  const [binCount, setBinCount] = useState<TBin>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<ModalProps>();

  useEffect(() => {
    onValue(firebaseRef("Bin"), (snapshot) => {
      const data = snapshot.val();
      setBin(data);
    });
    onValue(firebaseRef("BottleCount"), (snapshot) => {
      const data = snapshot.val();
      setBinCount(data);
    });
    onValue(firebaseRef("Weather"), (snapshot) => {
      const data = snapshot.val();
      setWeather(data);
    });
  }, []);

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
        <>
          <View style={styles.container} className="gap-y-2">
            {isModalOpen && (
              <BinModal
                setIsModalOpen={setIsModalOpen}
                percentage={info?.percentage}
                count={info?.count}
                label={info?.label}
              />
            )}

            <View
              style={styles.top3Container}
              className="flex-[1.5] outline outline-red-500"
            >
              <Text className="mb-2 text-base">Top 3 most points</Text>
              <ScrollView style={styles.scrollView}>
                {users.slice(0, 3).map(({ username, scores }, index) => (
                  <UserBox username={username} scores={scores} key={index} />
                ))}
              </ScrollView>
            </View>

            <View className="flex-row rounded-md bg-[#fbfbfb] w-full justify-between p-2 flex-[0.8]">
              <Bin
                label="Plactic Bin"
                percentage={bin?.plastic}
                count={binCount?.plastic}
                // color="#051c2e"
                color="rgba(5, 28, 46, 0.9)"
                setInfo={setInfo}
                setModal={setIsModalOpen}
              />
              <Bin
                label="Paper Bin"
                count={binCount?.paper}
                percentage={bin?.paper}
                // color="#051c2e"
                color="rgba(5, 28, 46, 0.9)"
                setInfo={setInfo}
                setModal={setIsModalOpen}
              />
              <Text></Text>
              <Bin
                label="Can Bin"
                count={binCount?.can}
                percentage={bin?.can}
                color="rgba(5, 28, 46, 0.9)"
                setInfo={setInfo}
                setModal={setIsModalOpen}
              />
            </View>
          </View>
        </>
      )}
    </>
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
