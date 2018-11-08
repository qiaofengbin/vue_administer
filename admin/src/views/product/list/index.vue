<template>
    <div>
        <el-form :inline="true" class="demo-form-inline" :model="filter">
            <el-form-item label="按时间">
                <el-date-picker v-model="filter.date" type="datetimerange" format="yyyy-MM-dd" value-format="timestamp" range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="按库存">
                <el-select v-model="filter.count" placeholder="选择库存">
                    <el-option label="小于100" value="0-100" ></el-option>
                    <el-option label="小于200" value="0-200" ></el-option>
                    <el-option label="小于300" value="0-300" ></el-option>
                    <el-option label="小于400" value="0-400" ></el-option>
                    <el-option label="小于500" value="0-500" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="按状态">
                <el-select v-model="filter.status" placeholder="活动区域">
                    <el-option label="上架" value="2" ></el-option>
                    <el-option label="下架" value="1" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>




        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="商品" width="180">
                <template slot-scope="scope">
                    <dl class="item-info">
                        <dt>
                            <img :src="scope.row.thumbnail" alt="">
                        </dt>
                        <dd>
                            <h2>{{scope.row.title}}</h2>
                            <p>{{scope.row.tag}}</p>
                        </dd>
                    </dl>
                </template>
            </el-table-column>
            <el-table-column prop="price" label="价格" width="180">
            </el-table-column>
            <el-table-column prop="count" label="库存" width="180">
            </el-table-column>
            <el-table-column prop="total_sales" label="总销量">
            </el-table-column>
            <el-table-column prop="time" label="创建时间">
            </el-table-column>
            <el-table-column prop="status" label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status==2">已上架</el-tag>
                    <el-tag type="warning" v-else >已下架</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="remove(scope.row.id)">删除</el-button>
                    <el-button type="text" size="small" v-if="scope.row.status==1" @click="publish(scope.row.id,2,scope.$index)">上架</el-button>
                    <el-button type="text" size="small" v-else @click="publish(scope.row.id,1,scope.$index)">下架</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="total" @current-change="gotoPage" :page-size="pageSize">
        </el-pagination>
    </div>
</template>
<script>
    import api from '@/api'
    export default {
        data() {
            return {
                page: 1,
                pageSize: 3,
                total: 0,
                tableData: [],
                filter: {
                    date: '',
                    status: '',
                    count:''
                },
            }
        },
        created() {
            this.getProductList(1)
        },
        methods: {
            gotoPage(index) { // 点击页码数 重新渲染数据  index为自带的
                this.getProductList(index)
            },
            getProductList(index) {
                this.page = index;
                let data = {
                    page: this.page,
                    pageSize: this.pageSize
                }
                let filter =JSON.parse(JSON.stringify(this.filter));
                if(filter.count){
                    filter.count = filter.count.split('-')
                }
                if (Object.values(this.filter).join('').length >= 1) {
                    data = {
                        page: this.page,
                        pageSize: this.pageSize,
                        filter
                    }
                }
                this.$nextTick(() => {
                    api.product.list(data).then((res) => {
                        this.tableData = res.data.list
                        this.total = res.data.count
                    })
                })
            },
            publish(id, status, index) {
                this.$confirm(status == 1 ? '确认下架' : '确认上架？', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.product.status({
                        id: id,
                        status: status
                    }).then((res) => {
                        console.log(this.tableData, index, res.data)
                        this.$set(this.tableData, index, res.data)
                        if (status == 1) {
                            this.$message({
                                type: 'success',
                                message: '下架成功!'
                            });
                        } else {
                            this.$message({
                                type: 'success',
                                message: '上架成功!'
                            });
                        }
                    })

                })
            },
            onSubmit() {
                console.log(this.filter)
                this.getProductList(1)
            },
            remove(id) {
                api.product.deleteList({ id: id }).then(res => {
                    console.log(res)
                })
            }
        }
    }
</script>
<style scoped lang="less">
    .item-info {
        display: flex;
        dt {
            img {
                display: block;
                width: 50px;
            }
        }
        dd {
            font-size: 10px;
            transform: scale(0.8);
        }
    }
</style>