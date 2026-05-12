<template>
<div>

<h1>Panel Administrativo</h1>

<router-link to="/pacientes">
Pacientes
</router-link>

|

<router-link to="/citas">
Citas
</router-link>

<br><br>

<button @click="salir">
Cerrar Sesión
</button>

</div>
</template>

<script setup>
import {useRouter} from 'vue-router'

const router = useRouter()

const salir = ()=>{

 localStorage.removeItem('token')

 router.push('/')

}
</script>
