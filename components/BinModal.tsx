import { FontAwesome } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export type ModalProps = {
  count?: string;
  percentage?: string;
  label?: string;
  setIsModalOpen: (b: boolean) => void;
};
const BinModal = (info?: ModalProps) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 20,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          width: "80%",
          minHeight: "40%",
          borderRadius: 20,
          padding: 16,
        }}
      >
        {/* Header */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Pressable>
            {({ pressed }) => (
              <FontAwesome
                name="info-circle"
                size={28}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          <TouchableOpacity onPress={() => info?.setIsModalOpen(false)}>
            <FontAwesome
              name="window-minimize"
              size={24}
              style={{ marginRight: 15 }}
            />
          </TouchableOpacity>
        </View>
        <Text
          style={{
            fontWeight: "700",
            textAlign: "center",
            marginTop: 20,
            fontSize: 16,
          }}
        >
          {info?.label} info
        </Text>
        <View
          style={{
            marginTop: 20,
            borderRadius: 12,
            padding: 20,
            backgroundColor: "#051c2e",
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Count: {info?.count}
          </Text>
          <Text style={{ fontSize: 16, color: "white" }}>
            Bin percentage: {info?.percentage}%
          </Text>
        </View>
      </View>
    </View>
  );
};
export default BinModal;
