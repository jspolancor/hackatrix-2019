<template>
  <div class="search-bar">
    <input 
        @input="getInfo"
        v-model="url"
        type="text"
        name="search-bar"
        placeholder="Ingresa la url de la noticia" />
  </div>
</template>

<script>
import firebase from 'firebase/app'
import { mainApp } from '../firebase/init';
import store from '../store';

export default {
    data: () => ({
        url: ''  
    }),
    methods: {
        getInfo() {
            console.log(this.url);
            firebase.firestore(mainApp)
            .collection('news').where('url', '==', this.url.trim())
            .get().then((querySnapshot) => {
                if(querySnapshot.docs.length > 0) {
                    querySnapshot.forEach(function(doc) {

                    store.commit('app/setNews', {
                        id: doc.id,
                        ...doc.data(),
                    });
                    });
                }else {
                    store.commit('app/setNews', null);
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.search-bar {
  width: 100%;

  input {
    width: 100%;
    border: solid grey 1px;
    height: 38px;
    padding-left: 10px;
    margin-top: 40px;
  }
}
</style>
