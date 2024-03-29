import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, BackHandler } from "react-native";
import UserBox from "../../../components/UserBox";
import Bin from "../../../components/bin/Bin";
import Loading from "../../../components/Loading";
import { onValue } from "firebase/database";
import firebaseRef from "../../../firebase/ref";
import BinModal, { ModalProps } from "../../../components/BinModal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useList } from "react-firebase-hooks/database";
import Weather from "../../../components/Weather";
import { useNavigation } from "expo-router/src/useNavigation";

type TWeater = {
  temperature: string;
  humidity: string;
};
export type TBin = {
  plastic: string;
  can: string;
  paper: string;
};

export default function AdminScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [weather, setWeather] = useState<TWeater>();
  const [bin, setBin] = useState<TBin>();
  const [binCount, setBinCount] = useState<TBin>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useState<ModalProps>();

  const navigation = useNavigation();

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

  const [studentList, loading, error] = useList(firebaseRef(`users/STUDENT`));

  useEffect(() => {
    /* mock loading */
    const min = 1000;
    const max = 2000;
    const randomValue = Math.floor(Math.random() * (max - min + 1) + min);
    setTimeout(() => {
      setIsLoading(false);
    }, randomValue);
  }, []);

  const studentArray: any[] = [];
  studentList?.forEach((childSnapshot) => {
    studentArray.push({
      key: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });

  const sortedStudentArray = studentArray?.sort((a, b) => {
    const totalScoreA =
      (a?.bin_score?.can || 0) +
      (a?.bin_score?.plastic || 0) +
      (a?.bin_score?.paper || 0);
    const totalScoreB =
      (b?.bin_score?.can || 0) +
      (b?.bin_score?.plastic || 0) +
      (b?.bin_score?.paper || 0);

    return totalScoreB - totalScoreA;
  });

  const { navigate } = useNavigation();
  useEffect(() => {
    const backAction = () => {
      // Handle custom back button behavior here
      // For example, prevent going back to the previous screen:
      // navigation.navigate('Home'); // Navigate to a specific screen
      navigate("Admin" as never);
      return true; // Prevent default behavior (going back)
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
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
            <Weather
              temperature={weather?.temperature}
              humidity={weather?.humidity}
            />
            <View
              style={styles.top3Container}
              className="outline outline-red-500"
            >
              <View className="flex flex-row justify-between">
                <View>
                  <Text className="mb-2 text-base">Top 3 students</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Students" as never)}
                >
                  <Text className="mb-2 text-base underline underline-offset-1">
                    See all students
                  </Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.scrollView}>
                {sortedStudentArray?.slice(0, 3)?.map((v, index) => (
                  <UserBox
                    username={v?.username}
                    bin_score={v?.bin_score}
                    key={index}
                  />
                ))}
              </ScrollView>
            </View>

            <View className="flex-row rounded-md bg-[#fbfbfb] w-full justify-between p-2 flex-1">
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
    padding: 10,
    paddingVertical: 15,
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

// <BottomSheet
//           ref={bottomSheetRef}
//           index={0}
//           snapPoints={snapPoints}
//           enablePanDownToClose={true}
//           backdropComponent={renderBackdrop}
//           containerStyle={{
//             zIndex: 9999,
//             borderWidth: 1,
//           }}
//           backgroundStyle={{ backgroundColor: "#fff" }}
//           containerHeight={{ value: 1000 }}
//         >
//           <TouchableOpacity
//             onPress={() => info?.setIsModalOpen(false)}
//             className="h-[40px]"
//           >
//             <FontAwesome
//               name="info-circle"
//               size={24}
//               style={{ marginRight: 35, height: "100%" }}
//               className="h-full"
//             />
//           </TouchableOpacity>
//           <View style={styles.contentContainer} className="space-y-4">
//             <Text className="text-white font-bold text-lg">
//               {info?.label} info
//             </Text>
//             <View className="px-10 py-5 h-[30%] border w-full">
//               <View
//                 className="border h-full w-full"
//                 style={{
//                   borderRadius: 12,
//                   padding: 20,
//                   backgroundColor: "#051c2e",
//                   gap: 12,
//                 }}
//               >
//                 <Text style={{ fontSize: 16, color: "white" }}>
//                   Count: {info?.count}
//                 </Text>
//                 <Text style={{ fontSize: 16, color: "white" }}>
//                   Bin percentage: {info?.percentage}%
//                 </Text>
//               </View>
//             </View>
//             <View
//               className="w-[50%] border h-[80%]"
//               style={{ height: "50%" }}
//             >
//               <Bin
//                 label="Can Bin"
//                 count={binCount?.can}
//                 percentage={bin?.can}
//                 color="rgba(5, 28, 46, 0.9)"
//                 setInfo={setInfo}
//                 setModal={setIsModalOpen}
//               />
//             </View>
//           </View>
//         </BottomSheet>
