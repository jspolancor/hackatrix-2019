<template>
    <div id="news-card" >
        <h2>{{news.url}}</h2>
        <div id="negative-votes">
            {{news.negative_votes.length}}
        </div>
        <div id="positive-votes">
            {{news.positve_votes.length}}
        </div>
        <div id="related-news" v-for="(rnews, url) in relatedNews" :key="url">
            <h2>{{rnews.url}}</h2>
            <div >
             {{rnews.negative_votes.length}}
            </div>
            <div >
             {{rnews.positve_votes.length}}
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
    data:{
        relatedNews:[]
    },
   computed:{
       ...mapState('app', ['new']), 
       getRelatedNews(){ 
            colletion = firebase.firestore(mainApp).collection('news');   
            news.relatedNews.forEach( element => {
                colletion.where('url', '==',element.url)
            });            
            colletion.get().then((querySnapshot) => {
               this.relatedNews.push(doc.data());
            });
       }
   }    
    
}
</script>
<script>
export default {
    
}
</script>