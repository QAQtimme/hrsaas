<template>
  <!--
    核心功能： 预览 数量控制 删除 上传 进度条
        list-type="picture-card" 照片墙
        action: 文件上传的服务器地址，不需要   将来自定义上传方式
        file-list:默认图片对象数组
        on-preview:预览图片
        on-remove:删除图片
        http-request:自定义上传文件
        onchange:文件上传，成功，失败触发
        ：before-upload:上传前校验
    --><div>
  <el-upload
    list-type="picture-card"
    action="#"
    :file-list="fileList"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-exceed="handleExceed"
    :before-upload="beforeUpload"
    :limit="2"
    :class="{disabbled:false}"
    :http-request="upload"
    :on-change="handleChange"
>
    <i class="el-icon-plus" />
  </el-upload>
  <el-dialog title="图片预览" :visible。asnyc="showDialog">
   <img width="100%" :src="srcImg" alt="">
</el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDZEwY2NXZN7kCUcbNyraBexFd6XuFZyOl',
  SecretKey: 'UyPxVzOl298BCD7314DLVcd5SjqsogYU'
})
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      fileList: [],
      showDialog: false,
      srcImg: ''
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length >= 1
    },
    uploadAllSuccess() {
      return this.fileList.every(item => item.status === 'success')
    }
  },
  methods: {
    handlePreview(file) {
      this.showDialog = true
      this.srcImg = file.url
    },
    // file删除的文件
    // fileList删除后页面上的数据
    // this.fileList:数据fileList
    // 解决问题：删除图片后，+显示
    // 方案一：
    handleRemove(file, fileList) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
      // 方案二：
      this.fileList = fileList
    },
    upload(file) {
      console.log(file)
    },
    // 配置上传前的校验, 只要通过校验, 才能进行上传
    beforeUpload(file) {
      // 1. 限制文件类型 file.type
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传的图片格式, 必须是jpg, gif, bmp, png的格式!')
        return false
      }
      // 2. 限制文件大小 file.size
      if (file.size / 1024 / 1024 >= 5) {
        this.$message.error('上传头像过大, 超过了5M, 必须5M以内')
        return false
      }
      return true
    },
    // 进行上传操作
    // eslint-disable-next-line no-dupe-keys, vue/no-dupe-keys
    upload(obj) {
      // console.log(params.file)
      // 执行上传操作
      const o = this.fileList.find(item => item.uid === obj.file.uid)
      cos.putObject({
        Bucket: 'hrsaas-1319580781', /* 存储桶 */
        Region: 'ap-nanjing', /* 存储桶所在地域，必须字段 */
        // eslint-disable-next-line no-undef
        Key: (Math.random() * 10000) + file.name, /* 文件名 */
        Body: obj.file, // 上传文件对象
        // onProgress: (progressData) => {
        //  console.log(JSON.stringify(progressData))
        // }
        onprogress: progressData => {
          // console.log(JSON.stringify(progressData))
          o.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        // console.log(err || data)
        if (err) return this.$message.error('上传失败')
        // 成功后的两件事
        // 1.状态修改为success
        // 2.url修改为服务器地址
        o.state = 'success'
        o.url = 'https://' + data.Location
      })
    }
  },
  handleChange(file, fileList) {
    this.fileList = fileList
  }
}

</script>

<style lang="scss" scoped>
.disabled{
    ::v-deep .el-upload-picture-card{
        display: none;
    }
}
</style>
