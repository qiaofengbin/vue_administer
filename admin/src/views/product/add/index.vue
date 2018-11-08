<template>
    <el-form ref="form" :model="form" label-width="80px" class="product-box">
        <h3 class="title">基础信息</h3>
        <div class="product-info">
            <el-form-item label="商品标题" :style="{width:'400px'}">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="标签描述">
                <Tag />
            </el-form-item>
            <el-form-item label="商品分类">
                <el-select v-model="form.region" placeholder="请选择分类">
                    <el-option label="零食" value="零食"></el-option>
                    <el-option label="酸奶" value="酸奶"></el-option>
                    <el-option label="纯奶" value="纯奶"></el-option>
                    <el-option label="方便面" value="方便面"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品配料" >
                <el-transfer
                filter-placeholder="请输入配料名称"
                v-model="form.ingredients"
                :data="ingredients">
                </el-transfer>
            </el-form-item>
            <el-form-item label="商品规格" >
                  <Spec v-model="form.spec"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
    import Tag from './components/tag.vue'
    import Spec from './components/spec.vue'
    export default {
        data() {
            return {
                ingredients:[
                    {
                        key:0,
                        label:'生牛乳'
                    },
                    {
                        key:1,
                        label:'白砂糖'
                    },
                    {
                        key:2,
                        label:'保加利亚乳杆菌'
                    },
                    {
                        key:3,
                        label:'嗜热链球菌'
                    },
                    {
                        key:4,
                        label:'乳双歧杆'
                    }
                ],
                form: {
                    title: '',
                    tag: [],
                    ingredients:[],
                    spec:[]
                }
            }
        },
        components: {
            Tag,
            Spec
        },
        methods: {
            onSubmit() {
                console.log(this.form);
            }
        }
    }
</script>
<style scoped lang="less">
    .product-box {
        .title {
            font-size: 24px;
            font-weight: 800;
            line-height: 1.5;
            padding-left: 15px;
        }
    }
</style>