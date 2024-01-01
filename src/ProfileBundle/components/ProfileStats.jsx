import { StyleSheet, Text, View } from "react-native";
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
    <View>
      <Text style={styles.statsHeaderText}>Past Sessions</Text>
      <BarChart
        style={styles.graphSyle}
        data={data}
        width={330}
        height={250}
        chartConfig={chartConfig}
        verticalLabelRotation={0}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsHeaderText: {
    fontSize: 17,
    color: "#535353",
    marginLeft: 20,
    marginTop: 20,
  },
  graphSyle: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    bottom: 40,
  },
});

export default ProfileStats;
