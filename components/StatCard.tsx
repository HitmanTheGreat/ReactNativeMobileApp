import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

interface StatCardProps {
    icon: string;
    label: string;
    count: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, count }) => {
    return (
        <View style={styles.card}>
            <FontAwesome5 name={icon} size={24} color="#FFD700" />
            <Text style={styles.cardCount}>{count}</Text>
            <Text style={styles.cardLabel}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        width: "47%",
        backgroundColor: "#2D732E",
        borderRadius: 12,
        padding: 15,
        alignItems: "center",
        marginBottom: 15,
        elevation: 5,
    },
    cardCount: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#FFD700",
        marginTop: 5,
    },
    cardLabel: {
        fontSize: 16,
        fontWeight: "600",
        color: "#FFF",
        marginTop: 2,
    },
});

export default StatCard;
