<template>
  <div class="comment-form">
    <textarea v-if="!voted" v-model="comment" name="comment" rows="5" placeholder="Que te parece esta noticia?"></textarea>
    <small v-if="!voted">Si tienes un link de una noticia relacionada a esta por favor agregalo, ayudanos a estar informados</small>
    <input v-if="!voted" type="text" placeholder="Noticia relacionada" v-model="relatedLink">
    <p v-if="linkError && !voted"><small style="color: red">No parece una url valida</small></p>
    <VotingButtonsVue :disabled="comment.length == 0 || voted"></VotingButtonsVue>
  </div>
</template>

<script>
import VotingButtonsVue from './VotingButtons.vue'
import firebase from 'firebase/app'
import { mapState } from 'vuex';
import { mainApp } from '../firebase/init';

export default {
  data: () => ({
    comment: '',
    relatedLink: '',
    linkError: false,
    voted: false
  }),
  components: {
    VotingButtonsVue
  },
  methods: {
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

      this.voted = true;
    },

  },
  computed : {
    ...mapState('app', ['news']),
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
