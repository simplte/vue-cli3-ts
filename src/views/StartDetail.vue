<template>
  <div class="start">
    <Spinner v-if="loading"></Spinner>
    <div class="castsMsg" v-if="!loading">
      <div class="casts">
        <div class="castsone-background">
        </div>
        <div class="caststwo-background">
        </div>
        <div class="casts-content">
          <div class="movie-image">
            <img src="" width="130" height="170" >
          </div>
          <div class="movie-right">
            <p class="title">{{starMsg.name}}</p>
            <p>{{starMsg.name_en}}</p>
            <p>{{starMsg.gender}}</p>
          </div>
        </div>
      </div>
      <div class="movieList">
        <div class="movieitem" v-for="item in starMsg.works"  @click="goToMovieDetail(item.subject.id)">
          <div class="movieitem-left">
            <img :src="item.subject.images.small" width="70" height="90">
          </div>
          <div class="movieitem-right">
            <p class="title">{{item.subject.title}}</p>
            <p class="cate">{{item.roles[0]}}</p>
            <span v-for="items in item.subject.genres" class="cate">
              <span style="display: inline-block;margin-right: 4px">{{items}}</span>
            </span>
            <p class="year">{{item.subject.year}}</p>
            <p class="vist">{{item.subject.collect_count}}人看过</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import {Action, Mutation, State} from 'vuex-class';
import Spinner from '@/components/loading.vue';
@Component({
  components: {
    Spinner,
  },
})
export default class StartDetail extends Vue {
     private starMsg: any;
     private loading: boolean = true;
     private id: string = '';
     @Action private stratDetail!: (id: string) => any;
     private created() {
         this.id = this.$route.params.id;
         this.stratDetail(this.id).then((res:any) =>{
             this.loading = false;
             this.starMsg = res;
         })
     };
     private goToMovieDetail(id: string) {
         this.$router.push({path: '/MovieDetail/' + id});
     }
}
</script>
<style lang="sass">
  .casts
    text-align: left;
    width: 100%
    height: 240px
    box-sizing: border-box
    overflow: hidden
    position: relative
    .castsone-background
      background-image: url('https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2503997609.jpg')
      background-size: 100% 100%
      filter: blur(5px)
      z-index: 1
    .caststwo-background
      z-index: 3
      background-color: #40454d
      opacity: .55
    .castsone-background,.caststwo-background
      height: 240px
      position: absolute
      top: 0
      left: 0
      right: 0
      bottom: 0
      width: 100%
    .casts-content
      position: absolute
      padding: 0 20px
      z-index: 100
      bottom: 0px
      display: flex
      color: #c6c6c6
      font-size: 14px
      .movie-image
        flex: 0
        width: 130px
        height: 170px
      .movie-right
        flex: 1
        margin-left: 16px
        line-height: 22px
        padding-top: 94px
        .title
          font-size: 19px
          line-height: 24px
          color: #fff
        .enTitle
          font-size: 14px
          line-height: 20px
          color: #fff
  .movieList
    .movieitem
      margin-left: 20px
      display: flex
      text-align: left;
      padding: 10px 0 10px 0px
      border-bottom: 1px solid #eee
      .movieitem-left
        flex: 0
        width: 70px
      .movieitem-right
        flex: 1
        margin-left: 12px
        position: relative
        .vist
          position: absolute
          font-size: 12px
          color: #ff9334
          right: 14px
          top: 6px
        .title
          line-height: 24px
        .cate
          color: #333
          font-size: 12px
          line-height: 20px
        .year
          line-height: 24px
</style>