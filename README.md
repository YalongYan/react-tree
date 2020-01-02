# react-tree A tree component for react
效果图如下
#### 多选

![多选](https://raw.githubusercontent.com/YalongYan/react-tree/master/src/images/checkbox.gif?token=ACGVJW2RA3ZEUECACMAHHQK6BWJQG)

#### 单选

![单选](https://raw.githubusercontent.com/YalongYan/react-tree/master/src/images/single.gif?token=ACGVJWZLKZXXYYKX2TNAMIC6BWJRG)

for example:
<Tree
  config={ config }
  treeData={ treeData }
  selectChange={(data) => selectChange(data)}
  nodeClick={(data) => nodeClick(data)} />
Parameter description：
  config: {
    type: 'tree', //必填 string 数据类型(tree || array) array是代表需要根据父子关系处理为树结构， tree是代表已经是树状结构，不需要处理
    parentId: 'pid', // type为array时，必填父级id的key
    id: 'id', // 必填自身id的key
    value: 'value', // 必填自身value的key
    label: 'label', // 必填自身label的key
    children: 'children', // type为tree时，必填子元素集合的key
    checkBox: false // 是否需要checkbox，切换单选多选
 }
 treeData // type为array时, treeData应该为array; type为tree时，treeData应该为object
 selectChange // 当checkBox为true时有效，返回选中的节点的value
 nodeClick // 点击元素时，返回点击的元素
