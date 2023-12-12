import React from "react";
import { View } from "./Themed";
import { Pressable, StyleSheet, Text } from "react-native";
import { BlueText } from "./StyledText";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Link } from "expo-router";
// type Score={

// }
const Scores = {
  Plastics: {},
};
type UserBoxProps = {
  username: string;
  scores: {
    paper: number;
    can: number;
    plastic: number;
  };
};

const UserBox = ({ username, scores }: UserBoxProps) => {
  const bins = [
    { label: "Plastics", plasticSCore: scores.plastic },
    { label: "Papers", paperScore: scores.paper },
    { label: "Cans", canScore: scores.can },
  ];
  return (
    <View style={styles.container}>
      <View
        style={{
          width: "70%",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: "#fff",
        }}
      >
        {bins.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <Box
                label={
                  index === 0 ? "Plastics" : index === 1 ? "Cans" : "Papers"
                }
                score={
                  index === 0
                    ? scores.plastic
                    : index === 1
                    ? scores.can
                    : scores.paper
                }
              />
              {/* sepator  */}
              <View
                style={styles.separator}
                lightColor="#eee"
                darkColor="rgba(255,255,255,0.1)"
              />
              {/* )} */}
            </React.Fragment>
          );
        })}
      </View>
      <View
        style={{
          width: "30%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          gap: 12,
        }}
      >
        <Text>{username}</Text>
        <TouchableOpacity
          style={{
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 32,
            backgroundColor: "rgba(63, 133, 239, 0.10)",
          }}
        >
          <Link href={`/${username}`}>
            <BlueText>Details</BlueText>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserBox;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    color: "#3E3B3B",
    flexDirection: "row",
    height: 78,
    width: "100%",
    padding: 12,
    borderRadius: 7,
    marginBottom: 10,
  },
  box: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    backgroundColor: "#fff",
    padding: 6,
  },
  separator: {
    width: 0.1,
    height: "100%",
    backgroundColor: "rgba(169, 169, 169, 0.6)",
  },
});

type BoxProps = {
  label: string;
  //   scores?: Pick<UserBoxProps,'scores'>;
  score: number;
};
const Box = ({ label, score }: BoxProps) => {
  return (
    <View style={styles.box}>
      <Text style={{ color: "#3E3B3B", fontWeight: "400" }}>{label}</Text>
      <BlueText children={score} style={{ fontWeight: "bold", fontSize: 16 }} />
    </View>
  );
};
