<template>
    <div id="news-card" class="news">
        <h3>  Tu noticia:  <a target="blank" :href=news.url >{{news.url}}</a> </h3>
        <div id="negative-votes">
           <small>Votos negativos:  {{news.negative_votes.length}}</small>
        </div>
        <div id="positive-votes">
          <small> Votos positivos: {{news.positive_votes.length}}</small>
        </div>
        <div id="related-news" class="related-news" v-if="relatedNews.length > 0" v-for="(rnews, url) in relatedNews" :key="url">
            <h4>Noticia relacionada: <a target="blank" :href=news.url >{{rnews.url}}</a></h4>
            <div >
             <small>Votos negativos:  {{rnews.negative_votes.length}}</small>
            </div>
            <div >
             <small>Votos positivos:  {{rnews.positive_votes.length}}</small>
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
<style >
#news-card{
    width: 50%; 
    padding: 20px;   
    margin-top: 20px;
    border-right: 1px solid grey;
}

</style>