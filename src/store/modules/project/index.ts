import axios from '@/http';
import IProject from '@/interfaces/IProject';
import { State } from '@/store';
import { Module } from 'vuex';
import { GET_PROJECT, POST_PROJECT, PUT_PROJECT, DELETE_PROJECT } from './../../actions-type';
import { ADD_PROJECT, EDIT_PROJECT, REMOVE_PROJECT, DEFINE_PROJECT } from './../../mutatios-type';

export interface ProjectState {
    projectList: IProject[];
}

export const project: Module<ProjectState, State> =  {
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
        [REMOVE_PROJECT](state, id: string) {
            state.projectList = state.projectList.filter(p => p.id !=  id);
        },
        [DEFINE_PROJECT](state, projects: IProject[]) {
            state.projectList = projects;
        },
    },

    actions: {
        [GET_PROJECT] ({ commit }) {
            axios.get('/projects').then(response =>  commit(DEFINE_PROJECT, response.data))
        },
        [POST_PROJECT] (context, nameProject: string) {
            return axios.post('/projects', {
                name: nameProject,
            });
        },
        [PUT_PROJECT] (context, project: IProject) {
            return axios.put(`/projects/${project.id}`, {
                name: project.name,
            });
        },
        [DELETE_PROJECT] ({ commit }, id: string) {
            return axios.delete(`/projects/${id}`)
                .then(() => commit(REMOVE_PROJECT, id));
        },
    }
}