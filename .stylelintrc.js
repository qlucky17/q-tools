module.exports = {
  root: true,
  plugins: ['stylelint-order'], //'stylelint-order':定义样式的顺序
  customSyntax: 'postcss-html', //打开检测不出问题， 先注释
  /* rules优先级大于extends，建议采用extends方式统一管理 */
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'], // stylelint-config-standard: 这是官方推荐的方式, 后一项将会覆盖前一项, rules 规则可以覆盖他们所有
  rules: {
    'selector-class-pattern': null, //值为 null 时表示禁用该规则
    'function-no-unknown': null,
    'no-invalid-double-slash-comments': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'color-function-notation': null,
    'selector-pseudo-class-no-unknown': [
      //禁止未知的伪类选择器，给规则传递一个数组即可，数组第一项是规则值，第二项是自定义配置。
      true,
      {
        ignorePseudoClasses: ['global', 'deep'], //忽略伪类
      },
    ],
    'selector-pseudo-element-no-unknown': [
      //禁止未知的伪元素选择器。
      true,
      {
        ignorePseudoElements: ['v-deep', 'input-placeholder'], //stylelint不识别vue里的v-deep指令，这是设置忽略该告警
      },
    ],
    'at-rule-no-unknown': [
      //禁止未知的@规则
      true,
      {
        //忽略检查项
        ignoreAtRules: [
          'for',
          'tailwind', //tailwind 的 at-rule 语法，stylelint 插件会和 tailwindcss 起冲突，原因是因为 stylelint 不认识 tailwind 的 at-rule 规则，所以这里忽略
          'apply', // tailwind 的 at-rule 语法
          'variants', // tailwind 的 at-rule 语法
          'responsive', // tailwind 的 at-rule 语法
          'screen', // tailwind 的 at-rule 语法
          'function', //sass语法
          'if', //sass语法
          'each', //sass语法
          'include', //sass语法
          'mixin', //sass语法
        ],
      },
    ],
    'no-empty-source': null, //禁止空源码
    'named-grid-areas-no-invalid': null,
    'unicode-bom': 'never', //Unicode字节顺序标记（BOM）用于指定代码单元是大端还是小端。也就是说，最重要的还是最不重要的字节先来。UTF-8不需要BOM，因为当字符是单个字节时，字节排序无关紧要。由于UTF-8是网络的主要编码方式，因此我们"never"设定默认选项。
    'no-descending-specificity': null, // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'font-family-no-missing-generic-family-keyword': null, //禁止在字体族名称列表中缺少通用字体族关键字
    'declaration-colon-space-after': 'always-single-line', //要求在声明块的冒号之后必须有一个空格或不能有空白符（可自动修复）
    'declaration-colon-space-before': 'never', //要求在声明块的冒号之前必须有一个空格或不能有空白符（可自动修复）
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      //不允许rules前空一行
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ],
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }], //禁止未知的单位,忽略rpx
    // css书写顺序
    'order/order': [
      [
        'dollar-variables', // 变量
        'custom-properties', // 自定义属性
        'at-rules', // 一个at-rule就是一个CSS语句，以@开头，后接标识符，最后以；结束。
        'declarations', // 声明
        {
          type: 'at-rule',
          name: 'supports', //@supports
        },
        {
          type: 'at-rule',
          name: 'media', //@media
        },
        'rules', // 规则
      ],
      { severity: 'warning' }, //严重程度为警告
    ],
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'], //一个文件匹配规则，或者一组文件匹配规则，来指定需要忽略的文件
  //不需要格式化的文件
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-recommended', 'stylelint-config-html'],
      rules: {
        'keyframes-name-pattern': null, //指定关键帧名的模式
        'selector-pseudo-class-no-unknown': [
          //禁止未知的伪类选择器
          true,
          {
            ignorePseudoClasses: ['deep', 'global'],
          },
        ],
        'selector-pseudo-element-no-unknown': [
          //禁止未知的伪元素选择器。
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'],
          },
        ],
      },
    },
  ],
};
