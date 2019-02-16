
const execSync = require('child_process').execSync

// 获取要提交的文件列表
const commitFiles = execSync('git diff --cached --name-only').toString().split('\n')

// 过滤掉非js和vue文件
const checkFiles = commitFiles.filter(file => file && file.startsWith('src') && /\.(js|vue)$/.test(file))

try {
    execSync(`eslint ${checkFiles.join(' ')}`)
    process.exit(0) // 没错误，返回0允许提交
} catch (err) {
    console.error('未通过语法检查，请修改后再提交！')
    console.log(err.stdout.toString())
    process.exit(1) // 有错误，返回1阻止提交
}
