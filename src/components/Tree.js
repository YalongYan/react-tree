import React, {Component} from 'react';
import './tree.css';
import Stack from '../utils/util';

class Tree extends Component {
  constructor(props) {
    super(props)
    // 数的渲染用的是 treeData， treeArray， treeObj 是把treeData 的数据结构调整了下，由于浅复制的存在，修改任意一个，其他数据也会变
    this.state = {
      treeData: {},
      treeArray: [],
      treeObj: {},
      type: 'tree',
      parentId: 'pid',
      id: 'id',
      value: 'value',
      label: 'label',
      children: 'children',
      checkBox: false
    }
    this.checkMap = {
      2: 'checked',
      1: 'partChecked',
      0: ''
    }
  }
  componentWillMount() {
    // 区分数数组和对象格式的数据
    if (this.props.config.type.toLowerCase() === 'tree') {
      this.setState({
        treeData: this.props.treeData,
        ...this.props.config
      })
    } else {
      this.setState({
        treeArray: this.props.treeData,
        ...this.props.config
      })
    }
  }

  componentDidMount() {
    if (this.state.type.toLowerCase() !== 'tree') {
      this.factoryArrayData()
    } else {
      this.factoryTreeData()
    }
    // 浅复制
    setTimeout(() => {
      this.state.treeData.children[2].label = '我是浅复制导致的'
      this.forceUpdate()
    }, 4000)
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  factoryArrayData() {
    let data = this.state.treeArray, obj = {}, rootId = null;
    data.map((v, i) => {
      if (v[this.state.parentId] || v[this.state.parentId] === 0) {
        if (obj[v[this.state.parentId]]) {
          if (obj[v[this.state.parentId]].children) {
            obj[v[this.state.parentId]].children.push(v)
          } else {
            obj[v[this.state.parentId]].children = [v]
          }
        } else {
          obj[v[this.state.parentId]] = {
            children: [v]
          }
        }
      } else {
        rootId = v[this.state.id]
      }
      if (obj[v[this.state.id]]) {
        v.children = obj[v[this.state.id]].children
      }
      obj[v[this.state.id]] = v
    })
    this.setState({
      treeData: obj[rootId],
      treeObj: obj
    })
  }

  factoryTreeData() {
    let data = this.state.treeData
    let stack = new Stack();
    let obj = {};
    stack.push(data);
    while (stack.top) {
      let node = stack.pop();
      for (let i in node.children) {
        stack.push(node.children[i])
      }
      obj[node[this.state.id]] = node
    }
    this.setState({
      treeObj: obj
    })
  }

  openNode (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    data.open = !data.open
    this.forceUpdate()
  }

  selectNode (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    this.setState({
      selectVal: data[this.state.value]
    }, () => {
      if (this.props.nodeClick) {
        this.props.nodeClick(data)
        // this.props.nodeClick(data[this.state.value])
      }
    })
  }

  selectCheckBox (e, data) {
    if (e.stopPropagation) {
      e.stopPropagation();
    } else {
      window.event.cancelBubble = true;
    }
    let check = data.checked
    // 下面有孩子 就把孩子都选上
    if (data.children && data.children.length) {
      let stack = new Stack();
      stack.push(data);
      while(stack.top) {
        let node = stack.pop()
        for (let i in node.children) {
          stack.push(node.children[i])
        }
        if (check === 2) {
          node.checked = 0;
        } else {
          node.checked = 2
        }
      }
    } else {
      if (check === 2) {
        data.checked = 0;
      } else {
        data.checked = 2
      }
    }
    // 有父节点 就把父节点也更新了
    if (data[this.state.parentId] || data[this.state.parentId] === 0) {
      this.updateParentNode(data)
    } else {
      this.forceUpdate()
      // 组件外部传递了selectChange方法 就调用
      if (this.props.selectChange) {
        this.getCheckedItems()
      }
    }
  }

  updateParentNode (data) {
    // data[this.state.parentId] 只是为了获取所谓的id
    let par = this.state.treeObj[data[this.state.parentId]],
    checkLen = 0,
    partChecked = false
    for (let i in par.children) {
      if (par.children[i].checked === 2) {
        checkLen++;
      } else if (par.children[i].checked === 1) {
        partChecked = true;
        break;
      }
    }
    // 如果子孩子全都是选择的， 父节点就全选
    if (checkLen === par.children.length) {
      par.checked = 2
      // 如果有子节点 不是全选的 父节点也不能全选
    } else if (partChecked || (checkLen < par.children.length && checkLen > 0)) {
      par.checked = 1;
    } else {
      // 一个也没选择的
      par.checked = 0;
    }
    // 如果还有父节点 解析往上更新
    if (this.state.treeObj[par[this.state.parentId]] || this.state.treeObj[par[this.state.parentId]] == 0) {
      this.updateParentNode(par)
    } else {
      this.forceUpdate()
      if (this.props.selectChange) {
        this.getCheckedItems()
      }
    }
  }

  getCheckedItems() {
    let stack = new Stack ();
    let checkedArr = [];
    stack.push(this.state.treeData);
    while (stack.top) {
      let node = stack.pop();
      for (let i in node.children) {
        stack.push(node.children[i])
      }
      if (node.checked === 2) {
        checkedArr.push(node[this.state.value])
      }
    }
    this.props.selectChange(checkedArr)
  }

  renderTreeParent() {
    let data = this.state.treeData
    return (
      <div className={`parentNode childNode ${data.open?'open':'close'} ${data.children && data.children.length?'':'noChildren'}`}>
        <span onClick={(e) => this.openNode(e, data)} className="openNode"></span>
        {
          this.state.checkBox?
            <div className={`checkBox ${this.checkMap[data.checked]}`} onClick={(e) => this.selectCheckBox(e, data)}></div>:
            <div className="fileBox">
              <img src="./images/file-icon.png" alt=""/>
            </div>
        }
        <div className={`nodeName ${this.state.selectVal === data[this.state.value]?'active':''}`} onClick={(e) => this.selectNode(e, data)}>
          {data[this.state.label]}
        </div>
        {
          this.state.treeData.children ?
            <div className="childList">
              {this.renderTreeNode(data)}
            </div> : null
        }
      </div>
    )
  }

  renderTreeNode(data) {
    return data.children.map((val, ind) => {
      return (
        <div key={ind} className={`childNode ${val.open?'open':'close'} ${val.children && val.children.length?'':'noChildren'}`}>
          <span onClick={(e) => this.openNode(e, val)} className="openNode"></span>
          {
            this.state.checkBox?
              <div className={`checkBox ${this.checkMap[val.checked]}`} onClick={(e) => this.selectCheckBox(e, val)}></div>:
              <div className="fileBox">
                <img src="./images/file-icon.png" alt=""/>
              </div>
          }
          {ind === data.children.length - 1?
              <span className="lastNode"></span>:null
          }
          <div className={`nodeName ${this.state.selectVal === val[this.state.value]?'active':''}`} onClick={(e) => this.selectNode(e, val)}>
            {val[this.state.label]}
          </div>
          {
            val.children ?
              <div className="childList">
                {this.renderTreeNode(val)}
              </div> : null
          }
        </div>
      )
    })
  }

  render() {
    return (
      <div className="tree">
        {this.renderTreeParent()}
      </div>
    )
  }
}

export default Tree
