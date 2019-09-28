<template>
    <div id="news-card">
        <h3>  Tu noticia:  <a target="blank" :href=news.url >{{news.url}}</a> </h3>
        <div id="negative-votes">
           Votos negativos:  {{news.negative_votes.length}}
        </div>
        <div id="positive-votes">
           Votos positivos: {{news.positive_votes.length}}
        </div>
        <div id="related-news" v-if="relatedNews.length > 0" v-for="(rnews, url) in relatedNews" :key="url">
            <h4>Noticia relacionada: <a target="blank" :href=news.url >{{rnews.url}}</a></h4>
            <div >
             {{rnews.negative_votes.length}}
            </div>
            <div >
             {{rnews.positive_votes.length}}
            </div>
        </div>        
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import store from '../store';
import firebase from 'firebase/app'
import { mainApp } from '../firebase/init'; 

export default {
    data:() => ({
        relatedNews:[]
    }),
    mounted() {
                      this.relatedNews = [];
                this.news.related_news.forEach( id => {
                    console.log(id);
                    firebase.firestore(mainApp)
                    .collection('news')
                    .doc(id)
                    .get().then((querySnapshot) => {
                        console.log(querySnapshot);
                        this.relatedNews.push(querySnapshot.data());
                    });
                });   
    },
   computed:{
       ...mapState('app', ['news']), 
   }    
    
}
</script>
<style scoped>


</style>