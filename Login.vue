<template>
<div class="container">

<h1>Iniciar Sesión</h1>

<input
v-model="usuario"
placeholder="Usuario"
/>

<input
type="password"
v-model="password"
placeholder="Contraseña"
/>

<button @click="login">
Entrar
</button>

<p>{{mensaje}}</p>

</div>
</template>

<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'

const usuario = ref('')
const password = ref('')
const mensaje = ref('')

const router = useRouter()

const login = async()=>{

 const res = await fetch(
 'http://localhost:3000/api/auth/login',
 {
   method:'POST',
   headers:{
     'Content-Type':'application/json'
   },
   body:JSON.stringify({
     usuario:usuario.value,
     password:password.value
   })
 });

 const data = await res.json();

 if(res.ok){

   localStorage.setItem(
     'token',
     data.token
   );

   router.push('/dashboard');

 }else{
   mensaje.value = data.mensaje;
 }

}
</script>
