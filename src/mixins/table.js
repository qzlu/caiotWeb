/**
 * @param {Array} tableData 表格数据
 * @param {Number} total 表格数据总条数
 * @param {Number} pageIndex 页码
 */
// import Vue from 'vue'
export default{
    data() {
        return{
            tableData:[],
            total:0,
            pageIndex:1
        }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (rowIndex%2 === 1) {
              return 'odd-row';
            } else if (rowIndex%2 === 0) {
              return 'even-row';
            }
        }
    },
}