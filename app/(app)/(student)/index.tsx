import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Bin from "../../../components/bin/Bin";
import Loading from "../../../components/Loading";
import firebaseRef from "../../../firebase/ref";
import BinModal, { ModalProps } from "../../../components/BinModal";
import { useAuth } from "../../../_store/useAuthStore";
import { MyProfile } from "../[user]";
import { useObject } from "react-firebase-hooks/database";

export type TBinScore = {
  plastic: string;
  can: string;
  paper: string;
};

export default function UserScreen() {
  const { token: user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<ModalProps>();
  const [student, loading, error] = useObject(
    firebaseRef(`users/STUDENT/${user?.username}`)
  );

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
      {isLoading || loading ? (
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

            <MyProfile
              username={user?.username}
              percentage={student?.val()?.bin_score}
              count={student?.val()?.bin_count}
            />

            <View className="flex-row rounded-md bg-[#fbfbfb] w-full justify-between gap-x0 p-2 flex-[0.8]">
              <Bin
                label="Plactic Bin"
                percentage={student?.val()?.bin_score?.plastic}
                count={student?.val()?.bin_count?.plastic}
                // color="#051c2e"
                color="rgba(5, 28, 46, 0.9)"
                setInfo={setInfo}
                setModal={setIsModalOpen}
              />
              <Bin
                label="Paper Bin"
                count={student?.val()?.bin_count?.paper}
                percentage={student?.val()?.bin_score?.paper}
                // color="#051c2e"
                color="rgba(5, 28, 46, 0.9)"
                setInfo={setInfo}
                setModal={setIsModalOpen}
              />
              <Bin
                label="Can Bin"
                count={student?.val()?.bin_count?.can}
                percentage={student?.val()?.bin_score?.can}
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
