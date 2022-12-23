import axios from '@/http';
import ITask from '@/interfaces/ITask';
import { State } from '@/store';
import { Module } from 'vuex';
import { GET_TASK, POST_TASK, PUT_TASK } from '@/store/actions-type';
import { ADD_TASK, EDIT_TASK, DEFINE_TASK } from '@/store/mutatios-type';

export interface TaskState {
    taskList: ITask[];
}

export const task: Module<TaskState, State> = {
    mutations: {
        [ADD_TASK](state, task: ITask) {
            state.taskList.push(task);
        },
        [EDIT_TASK](state, task: ITask) {
            const index = state.taskList.findIndex(t => t.id == task.id)
            state.taskList[index] = task;
        },
        [DEFINE_TASK](state, tasks: ITask[]) {
            state.taskList = tasks;
        },
    },

    actions: {
        [GET_TASK] ({ commit }, filter: string) {
            let url = "tasks";
            if (filter) {
                url += '?description=' + filter;
            }
            axios.get(url)
                .then(response =>  commit(DEFINE_TASK, response.data));
        },
        [POST_TASK] ({ commit }, task: ITask) {
            return axios.post('/tasks', task)
                .then(response => commit(ADD_TASK, response.data));
        },
        [PUT_TASK]({ commit }, task: ITask) {
            return axios.put(`/tasks/${task.id}`, task)
                .then(() => commit(EDIT_TASK, task));
        },
    },
}