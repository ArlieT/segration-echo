import React from "react";
import { StyleSheet } from "react-native";

import Colors from "../constants/Colors";
import { ExternalLink } from "./ExternalLink";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={{ backgroundColor: "white" }}>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Lorem
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)"
        ></View>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Lorem ipsum{" "}
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Lorem ipsum{" "}
        </Text>
        {/* <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
        >
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </ExternalLink> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    backgroundColor: "white",
    color: "black",
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    color: "black",
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    color: "black",
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    backgroundColor: "white",
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
    color: "black",
  },
});
