import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import TasksView from '../views/TasksView.vue';
import ProjectsView from '../views/ProjectsView.vue';
import ProjectForm from '../views/projects/FormProject.vue';
import ListProject from '../views/projects/ListProject.vue';


const routers: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Tasks',
        component: TasksView,
    },
    {
        path: '/projects',
        component: ProjectsView,
        children: [
            {   
                path: '',
                name: 'Projects',
                component: ListProject,
            },
            {   
                path: 'new',
                name: 'New Project',
                component: ProjectForm,
            },
            {   
                path: ':id',
                name: 'Edit Project',
                component: ProjectForm,
                props: true,
            },
        ],
    },
    
];

const router = createRouter({
    history: createWebHashHistory(),
    routes: routers,
});

export default router;