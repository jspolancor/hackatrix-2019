<template>
    <div id="news-comments">
        <h5>Comentarios positivos</h5>
        <div id="positive-comments" v-for="(comment, index) in news.positive_votes" :key="index">
            <ul>
                <li>{{comment.comment}} </li>
            </ul>
            
        </div>
        <h5>Comentarios Negativos</h5>
        <div id="negative-comments" v-for="(comment, index) in news.negative_votes" :key="index">
            <ul>
                <li>{{comment.comment}}  </li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import store from '../store';
import firebase from 'firebase/app';
import { mainApp } from '../firebase/init'; 

export default {
     data () {
      return {
      }
    },
    computed:{
       ...mapState('app', ['news']), 
   }  
}
</script>
<style>
#news-comments{
    width: 50%;
    padding: 20px;
    margin-top: 20px;
}
</style>