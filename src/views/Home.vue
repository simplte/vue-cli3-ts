<template>
  <div class="home">
    <Loading v-if="loading"></Loading>
    <van-tabs v-model="active" v-if="!loading">
      <van-tab title="正在热映">
        <div class="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
      <van-tab title="即将上映">
         <div class="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
      <van-tab title="Top250">
        <div class="listMovieBox">
          <MovieItem :movie="movieListData"></MovieItem>
        </div>
      </van-tab>
      <van-tab title="会员信息">
        <div class="listMovieBox">
          <Member :member="memberListData"></Member>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Mutation, State } from "vuex-class";
import { Tab, Tabs } from "vant";
import Loading from "@/components/loading.vue";
import MovieItem from "@/components/MovieItem.vue";
import Member from "@/components/Member.vue";

@Component({
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    Loading,
    MovieItem,
    Member,
  }
})
export default class Home extends Vue {
  private cate = "in_theaters";
  private active = 0;
  private movieListData = [];
  private memberListData = [];
  private loading: boolean = true;
  @Action private movieList!: (cate: string) => any;
  @Action private memberList!: () => any;
  @Watch("active")
  private onActiveChanged(val: number) {
    if (val === 0) {
      this.changeType(0, "in_theaters");
    } else if (val === 1) {
      this.changeType(1, "coming_soon");
    } else if (val === 2) {
      this.changeType(2, "top250");
    } else if (val === 3) {
      this.changeMemberType();
    }
  }
  private created() {
    this.movieList(this.cate).then((res: any) => {
      this.movieListData = res.subjects;
      this.loading = false;
    });
  }
  // 电影切换
  private changeType(active: number, name: string) {
    this.cate = name;
    this.loading = true;
    this.movieList(this.cate).then((res: any) => {
      this.movieListData = res.subjects;
      this.loading = false;
    });
  }
  // 会员切换
  private changeMemberType() {
    this.loading = true;
    this.memberList().then((res: any) => {
      this.memberListData = res;
      this.loading = false;
    });
  }
}
</script>
<style lang="sass">
  #listMovieBox
    padding: 0 16px
    background: #fff
    .item
      padding: 10px 5px
      border-bottom: 1px solid #eee
      margin-bottom: 5px
      background: #fff
      
      a
        position: relative
        display: flex
        .movie-cover
          width: 88px
          flex: 0
          height: 110px
          color: #000
        .movie-des
          flex: 1
          padding-left: 10px
          vertical-align: top
          .ratings
            position: absolute
            font-size: 20px
            font-weight: bold
            font-family: "Microsoft New Tai Lue"
            color: #FFB400
            right: 0px
            top: 16px
            span
              font-size: 14px
          .title
            line-height: 1.5rem
            padding-top: 4px
            font-size: 16px
          .genres
            font-size: 12px
            color: #666
            line-height: 24px
          .cast
            font-size: 12px
            width: 200px
            overflow: hidden
            white-space: nowrap
            text-overflow: ellipsis
            color: #666
            line-height: 24px
          .director
            font-size: 14px
            color: #999
            line-height: 26px
</style>
