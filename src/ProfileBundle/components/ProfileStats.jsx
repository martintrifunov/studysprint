import { StyleSheet } from "react-native";
import React from "react";
import { BarChart } from "react-native-chart-kit";

const ProfileStats = ({ data }) => {
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "white",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 1,
    barPercentage: 1,
    useShadowColorFromDataset: false,
  };
  return (
    <BarChart
      style={styles.graphSyle}
      data={data}
      width={330}
      height={280}
      chartConfig={chartConfig}
      verticalLabelRotation={0}
    />
  );
};

const styles = StyleSheet.create({
  graphSyle: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    top: 15,
    borderRadius: 40,
  },
});

export default ProfileStats;
