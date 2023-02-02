import { BaseObj } from '../types/baseObj';

export interface ITodo extends BaseObj{
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export const todoSearchKeys: (keyof ITodo)[] = ['id', 'userId', 'title', 'completed']
