<template>
  <div class="comment">
    <Spinner v-if="loading"></Spinner>
    <div  v-if="!loading">
        <div class="commentlist"  v-if="!loading" v-for="item in commentsMsg.comments">
            <div class="commentitem">
                <div class="msg-rating">
                    <van-rate  v-model="item.rating.value"   />
                </div>
                <div class="content">
                <p class="author-content">{{item.content}}</p>
                </div>
                <div class="author-img">
                <img :src="item.author.avatar" :alt="item.author.alt">
                <span>{{item.author.name}}</span>
                <div class="thinkyes">
                    <span>{{item.useful_count}} </span>
                </div>
                </div>
            </div>
        </div>
        <div @click="dianji()">diandiandianji</div>
        <div>{{MyName}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import {Action, Mutation, State} from 'vuex-class';
import Spinner from '@/components/loading.vue';
import MovieItem from '@/components/MovieItem.vue';
import { Rate } from 'vant';
@Component({
  components: {
    [Rate.name]: Rate,
    MovieItem,
    Spinner,
  },
})
export default class StartDetail extends Vue {
      private starMsg: any;
      private loading: boolean= true;
      private id:string = '';
      private commentsMsg:any;
      private name: string = "";
      
      @Action private movieComment!:(id:string) => any;
      private created() {
          this.id = this.$route.params.id;
          this.movieComment(this.id).then((res:any) =>{
              this.commentsMsg = res;
              this.loading = false;
          })
      }
       get MyName():string {
        return `My name is ${this.name}`
      }
      private dianji():void {
        this.name = 'haha'
      }
}
</script>
<style lang="sass">
  .comment
    .commentlist
      padding: 6px 0px
      margin-left: 10px
      border-bottom: 1px solid #e5e5e5
      font-size: 13px
      .msg-rating
        line-height: 16px
      .content
        padding: 10px 10px 10px 0
      .author-img
        position: relative
        img
          border-radius: 50%
          width: 28px
          height: 28px
        span
          font-size: 14px
          color: #999
          line-height: 33px
          vertical-align: top
        .yes
          display: inline-block
          width: 16px
          height: 16px
          vertical-align: top
        .thinkyes
          position: absolute
          right: 20px
          top: 10px
    .commentlist:last-child
      border-bottom: none
    .moreComment
      display: flex
      line-height: 46px
      text-align: center
      color: #e54847
      .comments
        flex: 1
        text-align: center
        &:first-child
          border-right: 1px solid #eee
</style>
