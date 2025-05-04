import React, { createContext, useContext, useState, ReactNode } from 'react';
import { TaskType, TaskActionType, GameContextType } from '../types';

const GameContext = createContext<GameContextType>({
    score: 0,
    tasks: [],
    addScore: () => { },
    completeTask: () => { },
});

export const useGameContext = () => useContext(GameContext);

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const [score, setScore] = useState<number>(0);
    const [tasks, setTasks] = useState<TaskType[]>([
        {
            id: '1',
            title: 'Зробити 10 кліків',
            description: 'Натиснути на об\'єкт 10 разів',
            completed: false,
            type: 'tap',
            goalCount: 10,
            currentCount: 0
        },
        {
            id: '2',
            title: 'Зробити подвійний клік 5 разів',
            description: 'Використати TapGestureHandler для виконання 5 подвійних кліків',
            completed: false,
            type: 'doubleTap',
            goalCount: 5,
            currentCount: 0
        },
        {
            id: '3',
            title: 'Утримувати об\'єкт 3 секунди',
            description: 'Використати LongPressGestureHandler для довгого натискання',
            completed: false,
            type: 'longPress',
            goalCount: 1,
            currentCount: 0
        },
        {
            id: '4',
            title: 'Перетягнути об\'єкт',
            description: 'Використати PanGestureHandler, щоб перемістити об\'єкт по екрану',
            completed: false,
            type: 'pan',
            goalCount: 1,
            currentCount: 0
        },
        {
            id: '5',
            title: 'Зробити свайп вправо',
            description: 'Використати FlingGestureHandler, щоб зробити швидкий свайп вправо',
            completed: false,
            type: 'flingRight',
            goalCount: 1,
            currentCount: 0
        },
        {
            id: '6',
            title: 'Зробити свайп вліво',
            description: 'Використати FlingGestureHandler, щоб зробити швидкий свайп вліво',
            completed: false,
            type: 'flingLeft',
            goalCount: 1,
            currentCount: 0
        },
        {
            id: '7',
            title: 'Змінити розмір об\'єкта',
            description: 'Використати PinchGestureHandler, щоб збільшити або зменшити об\'єкт',
            completed: false,
            type: 'pinch',
            goalCount: 1,
            currentCount: 0
        },
        {
            id: '8',
            title: 'Отримати 100 очок',
            description: 'Набрати загалом 100 очок у лічильнику',
            completed: false,
            type: 'score',
            goalCount: 100,
            currentCount: 0
        },
    ]);

    const addScore = (points: number): void => {
        setScore(prevScore => {
            const newScore = prevScore + points;
            // Перевіряємо чи виконано завдання з 100 очками
            if (newScore >= 100) {
                completeTask('score');
            }
            return newScore;
        });
    };

    const completeTask = (taskType: TaskActionType): void => {
        setTasks(prevTasks =>
            prevTasks.map(task => {
                if (task.type === taskType && !task.completed) {
                    const newCount = task.currentCount + 1;
                    const completed = newCount >= task.goalCount;

                    return {
                        ...task,
                        currentCount: newCount,
                        completed: completed
                    };
                }
                return task;
            })
        );
    };

    const value: GameContextType = {
        score,
        tasks,
        addScore,
        completeTask
    };

    return (
        <GameContext.Provider value={value}>
            {children}
        </GameContext.Provider>
    );
};