<template>
<div>

<h2>Citas</h2>

<select v-model="paciente_id">

<option value="">
Seleccione paciente
</option>

<option
v-for="p in pacientes"
:key="p.id"
:value="p.id"
>

{{p.nombre}}

</option>

</select>

<input type="date" v-model="fecha">
<input type="time" v-model="hora">

<input
v-model="observaciones"
placeholder="Observaciones"
/>

<button @click="guardar">
Guardar
</button>

<p>{{mensaje}}</p>

<hr>

<table border="1">

<tr>
<th>Paciente</th>
<th>Fecha</th>
<th>Hora</th>
<th>Observaciones</th>
<th>Acción</th>
</tr>

<tr
v-for="c in citas"
:key="c.id"
>

<td>{{c.nombre}}</td>
<td>{{c.fecha}}</td>
<td>{{c.hora}}</td>
<td>{{c.observaciones}}</td>

<td>
<button @click="eliminar(c.id)">
Eliminar
</button>
</td>

</tr>

</table>

</div>
</template>

<script setup>
import {ref,onMounted} from 'vue'

const pacientes = ref([])
const citas = ref([])

const paciente_id = ref('')
const fecha = ref('')
const hora = ref('')
const observaciones = ref('')

const mensaje = ref('')

const cargarPacientes = async()=>{

 const res = await fetch(
 'http://localhost:3000/api/pacientes'
 );

 pacientes.value = await res.json();

}

const cargarCitas = async()=>{

 const res = await fetch(
 'http://localhost:3000/api/citas'
 );

 citas.value = await res.json();

}

const guardar = async()=>{

 const res = await fetch(
 'http://localhost:3000/api/citas',
 {
   method:'POST',
   headers:{
     'Content-Type':'application/json'
   },
   body:JSON.stringify({
     paciente_id:paciente_id.value,
     fecha:fecha.value,
     hora:hora.value,
     observaciones:observaciones.value
   })
 });

 const data = await res.json()

 mensaje.value = data.mensaje

 cargarCitas()

}

const eliminar = async(id)=>{

 await fetch(
 `http://localhost:3000/api/citas/${id}`,
 {
   method:'DELETE'
 });

 cargarCitas()

}

onMounted(()=>{
 cargarPacientes()
 cargarCitas()
})
</script>
