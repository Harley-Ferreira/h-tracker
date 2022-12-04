<template>
    <button class="button" @click="action" :disabled="disabledButton">
        <span class="icon">
        <i :class="iconBuntton"></i>
        </span>
        <span>{{textButton}}</span>
    </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent ({
    name: 'ButtonComponent',
    
    emits:['action'],

    props: {
        disabledButton: {
            type: Boolean,
        },

        iconBuntton: {
            type: String,
            required: true,
        },

        textButton: {
            type: String,
            required: true,
        }
    },

    methods: {
        action(): void {
            this.$emit('action')
        }
    },
})
</script>