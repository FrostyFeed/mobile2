export type TaskType = {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    type: TaskActionType;
    goalCount: number;
    currentCount: number;
};

export type TaskActionType = 'tap' | 'doubleTap' | 'longPress' | 'pan' | 'flingRight' | 'flingLeft' | 'pinch' | 'score';

export interface GameContextType {
    score: number;
    tasks: TaskType[];
    addScore: (points: number) => void;
    completeTask: (taskType: TaskActionType) => void;
}