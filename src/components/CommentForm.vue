<template>
  <div class="comment-form">
    <textarea v-if="!voted" v-model="comment" name="comment" rows="5" placeholder="Que te parece esta noticia?"></textarea>
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
    voted: false
  }),
  components: {
    VotingButtonsVue
  },
  methods: {
    vote(fake) {
      const negativePositive = fake ? 'negative_votes' : 'positive_votes';
      
      firebase.firestore(mainApp)
      .collection('news').doc(this.new.id)
      .update(
        {
          [negativePositive]: firebase.firestore.FieldValue.arrayUnion({
            comment: this.comment,
            datetime: firebase.firestore.Timestamp.fromDate(new Date()),
          })
        }
      );

      this.voted = true;
    },

  },
  computed : {
    ...mapState('app', ['new']),
  }
}
</script>

<style lang="scss" scoped>
@import "@/theme/variables.scss";

.comment-form {
  width: 100%;
  margin-top: 20px;

  textarea {
    width: 100%;
    border: solid grey 1px;
    padding-left: 10px;
  }
}
</style>
