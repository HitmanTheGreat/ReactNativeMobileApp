import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import Charts from "@/components/Charts";
import StatCard from "@/components/StatCard";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

export default function HomeScreen() {
  // Mock Data (Moved the stats object outside the return block)
  const stats = {
    farms: 25,
    users: 120,
    crops: 50,
    farmTypes: 5,
    clerks: 15,
    admins: 3,
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>

      {/* Cards Section */}
      <View style={styles.cardContainer}>
        <StatCard icon="tractor" label="Farms" count={stats.farms} />
        <StatCard icon="users" label="Users" count={stats.users} />
        <StatCard icon="seedling" label="Crops" count={stats.crops} />
        <StatCard icon="tree" label="Farm Types" count={stats.farmTypes} />
        <StatCard icon="user-tie" label="Clerks" count={stats.clerks} />
        <StatCard icon="user-shield" label="Admins" count={stats.admins} />
      </View>

      {/* Charts Section */}
      <Charts />

      {/* Extra Space Below Charts */}
      <View style={styles.spacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2D732E",
  },
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  spacer: {
    height: 30, // Adjust this value for more or less space
  },
});
