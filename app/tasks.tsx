import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useGameContext } from '../context/GameContext';
import TaskItem from '../components/TaskItem';
import { TaskType } from '../types';

export default function TasksScreen() {
    const { tasks } = useGameContext();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Завдання</Text>

            <FlatList
                data={tasks}
                renderItem={({ item }) => <TaskItem task={item} />}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    list: {
        flex: 1,
    },
});