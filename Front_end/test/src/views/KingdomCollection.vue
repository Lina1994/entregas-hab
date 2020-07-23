<template>
  <div class="kingdom">
      Kingdom
      <pictures :statues="statues"
      v-on:seeAlert="nombreObra" />
  </div>
</template>

<script>

import pictures from "@/components/Pictures.vue"

export default {
    name: 'KingdomCollection',
    components: {
       pictures
   },
   data() {
       return {
        statues: [
            { nombre: 'Vidriera 1',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 1',
            alt: 'Kingdom hearts window',
            url: 'https://i.pinimg.com/originals/fb/36/e9/fb36e9a857a00753160caf06ce258fbb.png'
            },
            { nombre: 'Vidriera 2',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 2',
            alt: 'Kingdom hearts window',
            url: 'https://static.zerochan.net/Sora.%28Kingdom.Hearts%29.full.174051.jpg'
            },
            { nombre: 'Vidriera 3',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 3',
            alt: 'Kingdom hearts window',
            url: 'https://images.khinsider.com/2017%20Uploads/01/15th%20Anniversary/013.jpg'
            },
            { nombre: 'Vidriera 4',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 4',
            alt: 'Kingdom hearts window',
            url: 'https://i.etsystatic.com/13967623/r/il/2970d6/1446351739/il_570xN.1446351739_39bt.jpg'
            },
            { nombre: 'EsVidrieratatua 5',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 5',
            alt: 'Kingdom hearts window',
            url: 'https://i.pinimg.com/originals/57/f1/86/57f186094cc8e346da333758e3995008.png'
            },
            { nombre: 'Vidriera 6',
            artista: 'Nomura`s team',
            localización: 'Kingdom Hearts',
            separation: ', ',
            title: 'Kingdom hearts window 6',
            alt: 'Kingdom hearts window',
            url: 'https://i.etsystatic.com/6532031/r/il/75c45b/547760346/il_570xN.547760346_jqcb.jpg'
            }
        ]
       }
   },
   methods: {
       nombreObra(index){
           let statueName= this.statues[index].nombre;
           alert( 'nombre: '+statueName)
       }
    }
}
</script>

<style>

</style>