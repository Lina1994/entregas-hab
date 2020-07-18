<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/topartist">TopArist</router-link> |
      <router-link to="/toptracks">TopTracks</router-link> |
      <router-link to="/about">About</router-link> 
    </div>
    <router-view/>
    <!-- CREO UN FOOTER DEVAJO DEL ROUTER-VIEW -->
    <div class="footer">
      <p>
        Created by Lucía Carolina González Chans
      </p>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}

#nav {
  padding: 3px;
  display: flex;
  justify-content: flex-end;
  background-color: rgb(26, 24, 24);
  color: cyan;
}

#nav a {
  font-weight: bold;
  color: #d5dce2;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.footer {
  padding: 3px;
  display: flex;
  justify-content: center;
  background-color: rgb(26, 24, 24);
  color: cyan;
  margin-bottom: 0px;
}
</style>
