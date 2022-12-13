<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="" srcset="">
        </h1>
        <div>
            <button class="button" @click="changeTheme">
                {{ buttonText }}
            </button>
        </div>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"> 
                            Tasks
                        </i>
                    </router-link>
                </li>
                <li>
                    <router-link to="/projects" class="link">
                        <i class="fas fa-project-diagram"> 
                            Projects
                        </i>
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent ({
    name: 'SideBar',

    computed: {
        buttonText(): string {
            if (this.activatedDarkMode) {
                return "Deactivate dark mode";
            } else {
                return "Activate dark mode";
            }
        }
    },

    data () {
        return {
            activatedDarkMode: false,
        }
    },

    emits: ['changedTheme'],

    methods: {
        changeTheme(): void {
            this.activatedDarkMode = !this.activatedDarkMode;
            this.$emit('changedTheme', this.activatedDarkMode);
        },
    },
});
</script>

<style scoped>
    header {
        background: #0d3b86;
        width: 100%;
        height: 100vh;
        padding: 1rem;
        text-align: center;
    }

    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }

    .panel li {
        margin: 8px 0;
        text-align: left;
    }

    .link {
        color: #fff;
    }

    .link:hover {
        color: #FAF0CA;
    }

    .link.router-link-activate {
        color: #FAF0CA;
    }
</style>