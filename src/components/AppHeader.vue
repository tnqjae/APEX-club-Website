<template>
  <header class="app-header">
    <h1>APEX</h1>
    <nav>
      <ul class="nav-list">
        <li>Home</li>
        <li>Professor</li>
        <li>Team</li>
        <li>Student</li>
        <li>Project</li>
        <li>Contact</li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  padding: 0 24px;
  background: #000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}
.app-header h1 {
  color: #ffffff;
  font-size: 24px;
  margin: 0;
}
.nav-list {
  list-style: none;
  display: flex;
  gap: 24px;
  margin: 0;
  padding: 0;
  margin-right: 50px;
}
.nav-list li {
  color: #ffffff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  min-width: max-content; 
}
.nav-list li:hover {
  color: #42b983;
}
</style>