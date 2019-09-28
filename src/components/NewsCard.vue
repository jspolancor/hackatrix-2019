<template>
    <div id="news-card" class="news">
        <h3>  Tu noticia:  <a target="blank" :href=news.url >{{news.url}}</a> </h3>
        <div id="negative-votes">
           <small>Votos negativos:  {{news.negative_votes.length}}</small>
        </div>
        <div id="positive-votes">
          <small> Votos positivos: {{news.positive_votes.length}}</small>
        </div>
        <h1>Veracidad {{ reliability }} %</h1>

        <div id="gradient">
            <div id="caret" :style="{
                left: reliability + '%'
            }"></div>
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
       reliability() {
           if(this.news && this.news.negative_votes.length > 0 && this.news.positive_votes.length > 0) {
               const total = this.news.negative_votes.length + this.news.positive_votes.length;
               return this.news.positive_votes.length * 100 / total;
           }
           return 0;
       }
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

#news-card a {
    word-break: break-word;
}

#gradient {
    background: linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(9,121,25,1) 61%, rgba(33,255,0,1) 100%);
    width: 100%;
    height: 10px;
    position: relative;
}

#caret {
    width: 10px;
    background: black;
    height: 15px;
    position: absolute;
        
    top: -8px;
    background: white;
    border: solid black 4px;
}

</style>