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
    <Pressable
      onPress={() => info?.setIsModalOpen(false)}
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
        zIndex: 20
      }}
    >
      <View className="justify-between gap-y-6 bg-white w-[80%] pt-0 h-[40%] rounded-xl px-4 pb-4">
        {/* Header */}
        <View className="flex-row justify-between relative items-center">
          <Text className="font-bold flex-1 text-center text-lg">
            {info?.label} info
          </Text>
          <Pressable className="absolute right-0">
            {({ pressed }) => (
              <FontAwesome
                name="info-circle"
                size={28}
                style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
              />
            )}
          </Pressable>
          {/* <TouchableOpacity onPress={() => info?.setIsModalOpen(false)}>
            <FontAwesome name="window-minimize" size={24} />
          </TouchableOpacity> */}
        </View>

        <View
          style={{
            borderRadius: 12,
            padding: 40,
            borderWidth: 1,
            borderColor: "#051c2e",
            gap: 12,
            flex: 1,
            justifyContent: "center",
            alignContent: "center"
          }}
        >
          <Text style={{ fontSize: 16, color: "black" }}>
            Count: {info?.count}
          </Text>
          <Text style={{ fontSize: 16, color: "black" }}>
            Bin percentage: {info?.percentage}%
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => info?.setIsModalOpen(false)}
          className="bg-[#051c2e] justify-center items-center rounded-xl p-4"
        >
          <Text className="font-bold text-white">Close</Text>
        </TouchableOpacity>
      </View>
    </Pressable>
  );
};
export default BinModal;
