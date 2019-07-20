<template>
  <div>
    <div
      v-if="member"
      class="item"
      v-for="(item, index) in member"
      :key="index"
    >
      <div class="movie-cover">
        <img src="../assets/lz.webp" width="88" height="110">
      </div>
      <div class="movie-des">
        <p class="title">{{item.name}}</p>
        <p class="genres">
          <span>性别:</span>
          <span v-if="item.gender=== 0">女</span>
          <span v-else>男</span>
        </p>
        <p class="cast">
          爱好:
          <span style="margin-right: 4px;"
          >{{ item.habbies}}</span>
        </p>
        <p class="director">
          年龄:
          <span >{{ item.age }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";

@Component({
})
export default class Member extends Vue {
  @Prop() private member!: any;
  private goToMovieDetail(id: string) {
    this.$router.push({ path: "/MovieDetail/" + id });
  }
}
</script>
<style lang="sass">
.item
  padding: 10px 0
  border-bottom: 1px solid #eee
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
