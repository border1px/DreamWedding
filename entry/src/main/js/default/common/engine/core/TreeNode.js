export function IndexerL2R(len, idx) {
    return idx;
}
export function IndexerR2L(len, idx) {
    return len - idx - 1;
}
export class AdapterBase {
    constructor() {
        this._arr = new Array();
    }
    add(t) {
        this._arr.push(t);
    }
    get length() {
        return this._arr.length;
    }
    get isEmpty() {
        return this._arr.length <= 0;
    }
    clear() {
        this._arr = new Array();
    }
    toString() {
        return this._arr.toString();
    }
}
export class Stack extends AdapterBase {
    remove() {
        if (this._arr.length > 0)
            return this._arr.pop();
        else
            return undefined;
    }
}
export class Queue extends AdapterBase {
    remove() {
        if (this._arr.length > 0)
            return this._arr.shift();
        else
            return undefined;
    }
}
export class TreeNode {
    /*
                                    树数据结构
              -------------------------root--------------------
             /                         |                      \
          node1                       node2                  node3
        /   |   \                    /      \                  |
   node4  node5 node6              node7   node8             node9
      |                            |         |
    node10                        node11  node12
                                             |
                                           node13
      */
    constructor(data = undefined, parent = undefined, name = '') {
        this._parent = parent;
        this._children = undefined;
        this.name = name;
        this.data = data;
        if (this._parent !== undefined) {
            this._parent.addChild(this);
        }
    }
    addChildAt(child, index) {
        if (this.isDescendantOf(child)) {
            return undefined;
        }
        if (this._children === undefined) {
            this._children = [];
            //this._children = new Array<TreeNode<T>>();
        }
        if (index >= 0 && index <= this._children.length) {
            if (child._parent) {
                child._parent.removeChild(child);
            }
            child._parent = this;
            this._children.splice(index, 0, child);
            return child;
        }
        else {
            return undefined;
        }
    }
    addChild(child) {
        if (this._children === undefined) {
            this._children = [];
        }
        return this.addChildAt(child, this._children.length);
    }
    removeChildAt(index) {
        if (this._children === undefined)
            return undefined;
        let child = this.getChildAt(index);
        if (child === undefined) {
            return undefined;
        }
        this._children.splice(index, 1); // 从子节点列表中移除掉
        child._parent = undefined; // 将子节点的父亲节点设置为undefined
        return child;
    }
    removeChild(child) {
        if (child == undefined) {
            return undefined;
        }
        if (this._children === undefined) {
            return undefined;
        }
        let index = -1;
        for (let i = 0; i < this._children.length; i++) {
            if (this.getChildAt(i) === child) {
                index = i;
                break;
            }
        }
        if (index === -1) {
            return undefined;
        }
        return this.removeChildAt(index);
    }
    remove() {
        if (this._parent !== undefined) {
            return this._parent.removeChild(this);
        }
        return undefined;
    }
    getChildAt(index) {
        if (this._children === undefined)
            return undefined;
        if (index < 0 || index >= this._children.length)
            return undefined;
        return this._children[index];
    }
    get childCount() {
        if (this._children !== undefined) {
            return this._children.length;
        }
        else {
            return 0;
        }
    }
    hasChild() {
        return this._children !== undefined && this._children.length > 0;
    }
    isDescendantOf(ancestor) {
        if (ancestor === undefined)
            return false;
        let node = this._parent;
        for (let node = this._parent; node !== undefined; node = node._parent) {
            if (node === ancestor)
                return true;
        }
        return false;
    }
    get children() {
        return this._children;
    }
    get parent() {
        return this._parent;
    }
    get root() {
        let curr = this;
        while (curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
        }
        return curr;
    }
    get depth() {
        let curr = this;
        let level = 0;
        while (curr !== undefined && curr.parent !== undefined) {
            curr = curr.parent;
            level++;
        }
        return level;
    }
    repeatString(target, n) {
        let total = '';
        for (let i = 0; i < n; i++) {
            total += target;
        }
        return total;
    }
    visit(preOrderFunc = null, postOrderFunc = null, indexFunc = IndexerL2R) {
        if (preOrderFunc !== null) {
            preOrderFunc(this);
        }
        let arr = this._children;
        if (arr !== undefined) {
            for (let i = 0; i < arr.length; i++) {
                let child = this.getChildAt(indexFunc(arr.length, i));
                if (child !== undefined) {
                    child.visit(preOrderFunc, postOrderFunc, indexFunc);
                }
            }
        }
        if (postOrderFunc !== null) {
            postOrderFunc(this);
        }
    }
    visitForward(preOrderFunc = null, postOrderFunc = null) {
        if (preOrderFunc) {
            preOrderFunc(this);
        }
        let node = this.firstChild;
        while (node !== undefined) {
            node.visitForward(preOrderFunc, postOrderFunc);
            node = node.nextSibling;
        }
        if (postOrderFunc) {
            postOrderFunc(this);
        }
    }
    visitBackward(preOrderFunc = null, postOrderFunc = null) {
        if (preOrderFunc) {
            preOrderFunc(this);
        }
        let node = this.lastChild;
        while (node !== undefined) {
            node.visitBackward(preOrderFunc, postOrderFunc);
            node = node.prevSibling;
        }
        if (postOrderFunc) {
            postOrderFunc(this);
        }
    }
    printLevelInfo(idx = 0) {
        let str = this.repeatString(' ', idx * 4);
        let arr = this._children;
        if (arr !== undefined) {
            for (let i = 0; i < arr.length; i++) {
                let child = this.getChildAt(i);
                if (child !== undefined) {
                    child.printLevelInfo(idx + 1);
                }
            }
        }
        console.log('后根：' + str + this.name);
    }
    printInfo(idx = 0) {
        let str = this.repeatString(' ', idx * 4);
        console.log('先根：' + str + this.name);
        let node = this.firstChild;
        while (node !== undefined) {
            node.printInfo(idx + 1);
            node = node.nextSibling;
        }
    }
    printInfo2(idx = 0) {
        let str = this.repeatString(' ', idx * 4);
        console.log('先根：' + str + this.name);
        let node = this.lastChild;
        while (node !== undefined) {
            node.printInfo(idx + 1);
            node = node.prevSibling;
        }
    }
    get firstChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[0];
        }
        else {
            return undefined;
        }
    }
    get lastChild() {
        if (this._children !== undefined && this._children.length > 0) {
            return this._children[this._children.length - 1];
        }
        else {
            return undefined;
        }
    }
    get nextSibling() {
        if (this._parent === undefined) {
            return undefined;
        }
        if (this._parent._children !== undefined && this._parent._children.length > 1) {
            let idx = -1;
            for (let i = 0; i < this._parent._children.length; i++) {
                if (this === this._parent._children[i]) {
                    idx = i;
                    break;
                }
            }
            if (idx !== this._parent._children.length - 1) {
                return this._parent._children[idx + 1];
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    get prevSibling() {
        if (this._parent === undefined) {
            return undefined;
        }
        if (this._parent._children !== undefined && this._parent._children.length > 1) {
            let idx = -1;
            for (let i = 0; i < this._parent._children.length; i++) {
                if (this === this._parent._children[i]) {
                    idx = i;
                    break;
                }
            }
            if (idx !== 0) {
                return this._parent._children[idx - 1];
            }
            else {
                return undefined;
            }
        }
        else {
            return undefined;
        }
    }
    get mostRight() {
        let node = this;
        while (true) {
            let subNode = undefined;
            if (node !== undefined) {
                subNode = node.lastChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }
    get mostLeft() {
        let node = this;
        while (true) {
            let subNode = undefined;
            if (node !== undefined) {
                subNode = node.firstChild;
            }
            if (subNode === undefined) {
                break;
            }
            node = subNode;
        }
        return node;
    }
    moveNext() {
        let ret = this.firstChild;
        if (ret !== undefined) {
            return ret;
        }
        ret = this.nextSibling;
        if (ret !== undefined) {
            return ret;
        }
        ret = this;
        while (ret !== undefined && ret.nextSibling === undefined) {
            ret = ret.parent;
        }
        if (ret !== undefined) {
            return ret.nextSibling;
        }
        return undefined;
    }
    movePrev() {
        let ret = this.lastChild;
        if (ret !== undefined) {
            return ret;
        }
        ret = this.prevSibling;
        if (ret !== undefined) {
            return ret;
        }
        ret = this;
        while (ret !== undefined && ret.prevSibling === undefined) {
            ret = ret.parent;
        }
        if (ret !== undefined) {
            return ret.prevSibling;
        }
        return undefined;
    }
    moveNextPost() {
        let next = this.nextSibling;
        if (next === undefined) {
            return this.parent;
        }
        let first = undefined;
        while (next !== undefined && (first = next.firstChild)) {
            next = first;
        }
        return next;
    }
    movePrevPost() {
        let prev = this.prevSibling;
        if (prev === undefined) {
            return this.parent;
        }
        let last = undefined;
        while (prev !== undefined && (last = prev.lastChild)) {
            prev = last;
        }
        return prev;
    }
}
export class LinkTreeNode {
    constructor() {
        this.name = '';
    }
}
export class NodeT2BEnumerator {
    constructor(node, func, adapter) {
        if (node === undefined) {
            return;
        }
        this._node = node;
        this._indexer = func;
        this._adapter = new adapter();
        this._adapter.add(this._node);
        this._currNode = undefined;
    }
    reset() {
        if (this._node === undefined) {
            return;
        }
        this._currNode = undefined;
        this._adapter.clear();
        this._adapter.add(this._node);
    }
    moveNext() {
        if (this._adapter.isEmpty) {
            return false;
        }
        this._currNode = this._adapter.remove();
        if (this._currNode != undefined) {
            let len = this._currNode.childCount;
            for (let i = 0; i < len; i++) {
                let childIdx = this._indexer(len, i);
                let child = this._currNode.getChildAt(childIdx);
                if (child !== undefined) {
                    this._adapter.add(child);
                }
            }
        }
        return true;
    }
    get current() {
        return this._currNode;
    }
}
export class NodeB2TEnumerator {
    constructor(iter) {
        this._iter = iter;
        this.reset();
    }
    reset() {
        this._arr = [];
        while (this._iter.moveNext()) {
            this._arr.push(this._iter.current);
        }
        this._arrIdx = this._arr.length;
    }
    get current() {
        if (this._arrIdx >= this._arr.length) {
            return undefined;
        }
        else {
            return this._arr[this._arrIdx];
        }
    }
    moveNext() {
        this._arrIdx--;
        return this._arrIdx >= 0 && this._arrIdx < this._arr.length;
    }
}
export class NodeEnumeratorFactory {
    static create_df_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Stack);
        return iter;
    }
    static create_df_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Stack);
        return iter;
    }
    static create_bf_l2r_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerL2R, Queue);
        return iter;
    }
    static create_bf_r2l_t2b_iter(node) {
        let iter = new NodeT2BEnumerator(node, IndexerR2L, Queue);
        return iter;
    }
    static create_df_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_r2l_t2b_iter(node));
        return iter;
    }
    static create_df_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_df_l2r_t2b_iter(node));
        return iter;
    }
    static create_bf_l2r_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_r2l_t2b_iter(node));
        return iter;
    }
    static create_bf_r2l_b2t_iter(node) {
        let iter = new NodeB2TEnumerator(NodeEnumeratorFactory.create_bf_l2r_t2b_iter(node));
        return iter;
    }
}
