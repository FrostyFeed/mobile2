import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskType } from '../types';

interface TaskItemProps {
    task: TaskType;
}

export default function TaskItem({ task }: TaskItemProps) {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{task.title}</Text>
                <Text style={styles.description}>{task.description}</Text>
            </View>
            <View style={[
                styles.statusIndicator,
                { backgroundColor: task.completed ? '#4CAF50' : '#9E9E9E' }
            ]}>
                <Text style={styles.statusText}>{task.completed ? 'Виконано' : 'Не виконано'}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
        elevation: 2,
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    statusIndicator: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 20,
        marginLeft: 10,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});