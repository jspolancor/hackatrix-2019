<template>
    <div id="news-card" v-if="news">
        <h2> Esta es tu noticia {{news.url}}</h2>
        <div id="negative-votes">
            {{news.negative_votes.length}}
        </div>
        <div id="positive-votes">
            {{news.positive_votes.length}}
        </div>
        <div id="related-news" v-if="relatedNews" v-for="(rnews, url) in relatedNews" :key="url">
            <h2>{{rnews.url}}</h2>
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
   computed:{
       ...mapState('app', ['news']), 
       getRelatedNews(){ 
            colletion = firebase.firestore(mainApp).collection('news');   
            this.news.related_news.forEach( element => {
                colletion.doc(element)
            });            
            colletion.get().then((querySnapshot) => {
               this.relatedNews.push(doc.data());
            });
       }
   }    
    
}
</script>
<style scoped>


</style>