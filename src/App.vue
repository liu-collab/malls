<template>
    <div id="app">
        <keep-alive>
            <router-view />

        </keep-alive>
        <MainTab></MainTab>
    </div>
</template>

<script>
    import MainTab from 'components/content/MainTab'

    export default {
        name: 'App',
        components: {
            MainTab
        }
    }
</script>

<style>
    @import 'assets/css/base.css';
</style>