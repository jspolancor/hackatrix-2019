<template>
  <div class="page-wrapper">
    <h1 class="home-page-title">{{ appTitle }}</h1>

    <p>Evita la desinformación verificando si una noticia es falsa o real.</p>
    
    <p v-if="!isUserLoggedIn">Por favor logueate para continuar</p>

    <router-link v-if="!isUserLoggedIn" to="/login">
      LOGIN
    </router-link>

    <SearchBarVue v-if="isUserLoggedIn"></SearchBarVue>
    
    <div class="container">
      <NewsCard v-if="news"></NewsCard>
      <NewsComments v-if="news"></NewsComments>
      
    </div>
    <CommentFormVue v-if="showComments"></CommentFormVue> 
    
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import SearchBarVue from '../components/SearchBar.vue'

import VotingButtonsVue from '../components/VotingButtons.vue'
import CommentFormVue from '../components/CommentForm.vue'
import NewsCard from '../components/NewsCard.vue'
import NewsComments from '../components/NewsComments.vue';

export default {
  components: { 
    SearchBarVue,
    VotingButtonsVue,
    CommentFormVue,
    NewsCard,
    NewsComments
  },
  head: function() {
    return {
      title: {
        inner: 'Home'
      },
      meta: [
        {
          name: 'description',
          content: `${this.appTitle} home page`,
          id: 'desc'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('authentication', ['isUserLoggedIn']),
    ...mapState('authentication', ['user']),
    ...mapState('app', ['networkOnLine', 'appTitle', 'appShortTitle', 'news']),
    showComments() { return this.isUserLoggedIn }
  },
  methods: {
    vote(vote) {
      console.log('fp', vote);
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/theme/variables.scss';

.page-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    margin-bottom: 3rem;
  }

  .home-page-title {
    text-align: center;
  }

  .documentation-link {
    display: inline-block;
    font-size: 1.2rem;
    color: #fff;
    background-color: #5d6788;
    padding: 0.8rem 1.6rem;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    width: fit-content;
    font-weight: 500;
  }
  .container {
    display: flex;
    flex-direction: column;

    @media (min-width: 860px){
      flex-direction: row;
    }
  }
}
</style>
