import { project } from './modules/project/index';
import { TaskState, task } from './modules/task/index';
import { NOTIFY } from './mutatios-type';
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { INotification } from '@/interfaces/INotification';
import { ProjectState } from './modules/project';

export interface State {
    task: TaskState;
    notifications: INotification[];
    project: ProjectState;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        notifications: [],
        project: {
            projectList: [],
        },
        task: {
            taskList: [],
        },
    },

    mutations: {
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != newNotification.id);    
            }, 2000)
        },
    },

    modules: {
        project,
        task,
    }
    
})  

export function useStore(): Store<State> {
    return vuexUseStore(key);
}