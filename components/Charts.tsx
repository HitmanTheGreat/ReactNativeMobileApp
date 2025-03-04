import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { PieChart, BarChart } from "react-native-chart-kit";

const Charts: React.FC = () => {
    return (
        <View>
            {/* Pie Chart */}
            <Text style={styles.chartTitle}>Farm Distribution</Text>
            <PieChart
                data={[
                    { name: "Type A", population: 10, color: "#FF6384", legendFontColor: "#333", legendFontSize: 14 },
                    { name: "Type B", population: 8, color: "#36A2EB", legendFontColor: "#333", legendFontSize: 14 },
                    { name: "Type C", population: 7, color: "#FFCE56", legendFontColor: "#333", legendFontSize: 14 },
                ]}
                width={350}
                height={200}
                chartConfig={chartConfig}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
            />

            {/* Bar Chart */}
            <Text style={styles.chartTitle}>Farms with Crops</Text>
            <BarChart
                data={{
                    labels: ["Maize", "Tobacco", "Wheat"],
                    datasets: [{ data: [30, 50, 20] }]
                }}
                width={350}
                height={400}
                yAxisLabel=""
                chartConfig={chartConfig}
                verticalLabelRotation={30}
            />
        </View>
    );
};

// Chart Configurations
const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
    chartTitle: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 15,
        color: "#333",
    },
});

export default Charts;
