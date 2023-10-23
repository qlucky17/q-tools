module.exports = {
  ignores: [(commit) => commit.includes('init')], //提交过程中忽略有init的字符串
  extends: ['@commitlint/config-conventional'],
  //rule配置说明:：rule由name和配置数组组成，如：'name:[0, 'always', 72]'，数组中第一位为level，可选0,1,2，0为 disable，1为warning，2为error，第二位为应用与否，可选always|never，第三位该rule的值。
  //type: '选择一种你的提交类型:'; subject: '短说明:\n'; body: '长说明，使用"|"换行(可选)：\n'; footer: '关联关闭的issue，例如：#31, #34(可选):\n',
  rules: {
    'body-leading-blank': [2, 'always'], //body上面要有换行，即<body> 以空行开头
    'footer-leading-blank': [1, 'always'], //footer上面要有换行,即<footer> 以空行开头
    'header-max-length': [2, 'always', 108], //header最大108个字符
    'subject-empty': [2, 'never'], //subject（简短得描述）不能为空
    'type-empty': [2, 'never'], //type不能为空
    'subject-case': [0], //subject位不限制大小写，默认是'lower-case'，开头字母为小写
    'type-enum': [
      //type提交规则
      2,
      'always',
      [
        'feat', //新特性、新功能
        'fix', //	修改bug
        'perf', //	优化相关，比如提升性能、体验
        'style', //代码格式修改, 注意不是 css 修改
        'docs', //文档修改
        'test', //测试用例修改
        'refactor', //代码重构
        'build', //编译相关的修改，例如发布版本、对项目构建或者依赖的改动
        'ci', //	持续集成修改
        'chore', //其他修改, 比如改变构建流程、或者增加依赖库、工具等
        'revert', //回滚到上一个版本
        'wip', //work in progress 工作中 还没完成
        'workflow', // 工作流
        'types', //类型修改
        'release', //发版
        'update', //更新某功能
      ],
    ],
  },
};

// git commit -m <type>[optional scope]: <description>
// type ：用于表明我们这次提交的改动类型，是新增了功能？还是修改了测试代码？又或者是更新了文档？
// optional scope：一个可选的修改范围。用于标识此次提交主要涉及到代码中哪个模块。
// description：一句话描述此次提交的主要内容，做到言简意赅。
// 例如：
// git commit -m 'fix(account): 修复xxx的bug'
// git commit -m 'refactor: 重构整个项目'
