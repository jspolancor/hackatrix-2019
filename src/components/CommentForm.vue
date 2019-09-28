<template>
  <div class="comment-form">
    <textarea v-if="!voted && !sameLink" v-model="comment" name="comment" rows="5" placeholder="Que te parece esta noticia?"></textarea>
    <small v-if="!voted && !sameLink">Si tienes un link de una noticia relacionada a esta por favor agregalo, ayudanos a estar informados</small>
    <input v-if="!voted && !sameLink" type="text" placeholder="Noticia relacionada" v-model="relatedLink">
    <p v-if="linkError && !voted && !sameLink"><small style="color: red">No parece una url valida</small></p>
    <VotingButtonsVue v-if="!voted && !sameLink" :disabled="comment.length == 0 || voted || sameLink"></VotingButtonsVue>
  </div>
</template>

<script>
import VotingButtonsVue from './VotingButtons.vue'
import firebase from 'firebase/app'
import { mapState } from 'vuex';
import { mainApp } from '../firebase/init';
import store from '../store';

export default {
  data: () => ({
    comment: '',
    relatedLink: '',
    linkError: false,
    lastSavedLink: '',
    voted: false
  }),
  components: {
    VotingButtonsVue
  },
  methods: {
    resetForm() {
      this.voted = false;
      this.comment = '';
      this.relatedLink = '';
      this.linkError = false;
      // refresh data

      firebase.firestore(mainApp)
            .collection('news').doc(this.news.id)
            .get().then((doc) => {
              store.commit('app/setNews', {
                  id: doc.id,
                  ...doc.data(),
              });
            });
    },
    saveRelated() {
      this.lastSavedLink = this.news.url;
      // Save related news
      if(this.relatedLink) {
        // Check if exists

        firebase.firestore(mainApp)
            .collection('news').where('url', '==', this.relatedLink)
            .get().then((querySnapshot) => {
                if(querySnapshot.docs.length > 0) {
                    querySnapshot.forEach(function(doc) {
                    
                    // Save id in related news doc.id
                    firebase.firestore(mainApp)
                      .collection('news').doc(this.news.id)
                      .update(
                        {
                          related_news: firebase.firestore.FieldValue.arrayUnion(doc.id)
                        }
                      );
                    });
                }else {
                  // Save a new
                  const newItem = firebase.firestore(mainApp)
                      .collection('news')
                      .add({
                        negative_votes: [],
                        positive_votes: [],
                        related_news: [this.news.id],
                        url: this.relatedLink
                      });

                  newItem.then(item => {
                    
                    // Save id in related news
                    firebase.firestore(mainApp)
                      .collection('news').doc(this.news.id)
                      .update(
                        {
                          related_news: firebase.firestore.FieldValue.arrayUnion(item.id)
                        }
                      );
                  });

                }
            });

        // Save
      }
      this.resetForm();
    },
    vote(fake) {
      const negativePositive = fake ? 'negative_votes' : 'positive_votes';

      if(this.relatedLink) {
        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if(! this.relatedLink.match(regex)) {
          this.linkError = true;
          return;
        }
        this.linkError = true;
      }
      
      if(this.news){
        firebase.firestore(mainApp)
        .collection('news').doc(this.news.id)
        .update(
          {
            [negativePositive]: firebase.firestore.FieldValue.arrayUnion({
              comment: this.comment,
              datetime: firebase.firestore.Timestamp.fromDate(new Date()),
            })
          }
        );
        this.saveRelated();
      }else {
        const newUrl = document.getElementById('search-bar').value;

        var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regex = new RegExp(expression);
        if(! newUrl.match(regex)) {
          alert('URL no valida');
          return;
        }

        const commentData = {
          comment: this.comment,
          datetime: firebase.firestore.Timestamp.fromDate(new Date()),
        }

        let negative_votes = [];
        let positive_votes = [];

        if(fake) {
          negative_votes = [comment];
        }else{
          positive_votes = [comment];
        }
      
        // Save a new
        const newItem = firebase.firestore(mainApp)
            .collection('news')
            .add({
              negative_votes,
              positive_votes,
              related_news: [],
              url: newUrl
            });
            newItem.then(doc => {
              store.commit('app/setNews', {
                  id: doc.id,
                  negative_votes,
                  positive_votes,
                  related_news: [],
                  url: newUrl
              });
              this.saveRelated();
            });
      }
    },

  },
  computed : {
    ...mapState('app', ['news']),
    sameLink() {
      if(this.news) {
        return this.lastSavedLink == this.news.url;
      }else {
        return false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.comment-form {
  width: 100%;
  margin-top: 20px;

  textarea, input {
    width: 100%;
    border: solid grey 1px;
    padding-left: 10px;
  }
  input {
    height: 30px;
  }

}
</style>
