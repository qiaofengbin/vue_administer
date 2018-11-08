<template>
    <div class="spec-box">
        <div class="spec-group" v-for="(item,index) in spec">
                <el-input placeholder="规格名称" v-model="item.key" ></el-input>
                <span>=</span>
                <el-input placeholder="规格参数" v-model="item.value" ></el-input>
                <a v-if="spec.length>=2" href="javascript:;" class="remove" @click="removeSpec(index)">X</a>
        </div>
        <button @click="addSpec" type="button">添加规格</button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                spec: [
                    {
                        key: '',
                        value: ''
                    }
                ]
            }
        },
        watch:{
                spec(newval){
                    this.$emit('input',newval)
                }
            },
        methods: {
            addSpec() {
                this.spec.push({
                    key: '',
                    value: ''
                })
                this.initWatch()
            },
           
            created(){
                this.initWatch()
            },
            initWatch(){
                this.$watch(()=>{
                    return this.spec[this.spec.length-1].key
                }, ()=>{
                    this.$emit('input',this.spec)
                })
                this.$watch(()=>{
                    return this.spec[this.spec.length-1].value
                }, ()=>{
                    this.$emit('input',this.spec)
                })
            },
            removeSpec(index){
                this.spec.splice(index,1);
            }
        }
    }
</script>
<style scoped lang="less">
    .spec-group{
      display: flex;
      div{
          width:200px;
          margin-bottom:20px;
      }
      span{
          margin: 0 20px;
      }
      .remove{
          width: 20px;
          height: 20px;
          background: #ccc;
          border-radius: 50%;
          text-align: center;
          line-height: 20px;
          margin: 10px;
      }
    }
</style>