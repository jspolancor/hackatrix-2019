<template>
    <div id="news-card">
        <h2>{{news.url}}</h2>
        <div id="negative-votes">
            {{news.negative_votes.length}}
        </div>
        <div id="positive-votes">
            {{news.positve_votes.length}}
        </div>
        <div id="positive-comments">
            <div>
                {{ comment.comment}} {{comment.datetime}}
            </div>
        </div>
        <div id="negative-comments">
                {{ comment.comment}} {{comment.datetime}}
        </div>
    </div>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'

export default {
    props: {
        news: Object
    }
    
}
</script>
<script>
export default {
    
}
</script>