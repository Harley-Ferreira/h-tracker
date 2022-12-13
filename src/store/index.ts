import { ADD_PROJECT, EDIT_PROJECT, DELETE_PROJECT, NOTIFY } from './mutatios-type';
import IProject from "@/interfaces/IProject";
import { InjectionKey } from "vue";
import { createStore, Store, useStore as vuexUseStore } from "vuex";
import { INotification } from '@/interfaces/INotification';

interface State {
    projectList: IProject[];
    notifications: INotification[];
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
    state: {
        projectList: [],
        notifications: [] 
    },

    mutations: {
        [ADD_PROJECT](state, projectName: string) {
            const project = {
                id: new Date().toISOString(),
                name: projectName,
            } as IProject;
            state.projectList.push(project);
        },
        [EDIT_PROJECT](state, project: IProject) {
            const index = state.projectList.findIndex(p => p.id == project.id)
            state.projectList[index] = project;
        },
        [DELETE_PROJECT](state, id: string) {
            state.projectList = state.projectList.filter(p => p.id !=  id);
        },
        [NOTIFY](state, newNotification: INotification) {
            newNotification.id = new Date().getTime();
            state.notifications.push(newNotification);
            setTimeout(() => {
                state.notifications = state.notifications.filter(n => n.id != newNotification.id);    
            }, 2000)
        }
    }
})

export function useStore(): Store<State> {
    return vuexUseStore(key);
}