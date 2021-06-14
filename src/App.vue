<template>
    <div id="app">
        <router-view></router-view>
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