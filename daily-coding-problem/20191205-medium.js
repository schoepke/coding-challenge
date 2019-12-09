// This problem was asked by Google.
// Given the root to a binary tree, implement serialize(root), which serializes the tree into a string,
// and deserialize(s), which deserializes the string back into the tree.
// For example, given the following Node class
// class Node:
//     def __init__(self, val, left=None, right=None):
//         self.val = val
//         self.left = left
//         self.right = right
// The following test should pass:
// node = Node('root', Node('left', Node('left.left')), Node('right'))
// assert deserialize(serialize(node)).left.left.val == 'left.left'

const assert = require('assert').strict;

class Node { 
    constructor(val, left, right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
    hasLeaf() {
        return this.left !== undefined || this.left !== undefined;
    }
}

function serialize(node, level = 0) {
    let s = node.val;
    if (node.hasLeaf()) s += '[';
    if (node.left !== undefined) {
        s += `/${level}/${serialize(node.left, level + 1)}/${level}/`;
    }
    if (node.right !== undefined) {
        s += `\\${level}\\${serialize(node.right, level + 1)}\\${level}\\`;
    }
    if (node.hasLeaf()) s += ']';
    return s;
}

function parseLeafs(leafString, level) {
    let left, right;
    const ls = leafString.indexOf(`/${level}/`);
    if (ls !== -1) {
        // we have a left leaf
        const le = leafString.lastIndexOf(`/${level}/`);
        const leftNodeString = leafString.substring(ls + 3, le);
        left = deserialize(leftNodeString, level + 1);
    }
    const rs = leafString.indexOf(`\\${level}\\`);
    if (rs !== -1) {
        // we have a right leaf
        const re = leafString.lastIndexOf(`\\${level}\\`);
        const rightNodeString = leafString.substring(rs + 3, re);
        right = deserialize(rightNodeString, level + 1);
    }
    return [left, right];
}

function deserialize(nodeString, level = 0) {
    const s = nodeString.indexOf('[');
    let val;
    if (s !== -1) {
        // we have more children
        val = nodeString.substring(0, s);
        const e = nodeString.lastIndexOf(']');
        const leafString = nodeString.substring(s + 1, e);
        const [left, right] = parseLeafs(leafString, level);
        return new Node(val, left, right);
    } else {
        // leaf node
        val = nodeString;
        return new Node(val);
    }
}

function main() {
    const tree = new Node('root', new Node('left', new Node('left.left')), new Node('right'));
    const ser = serialize(tree);
    console.log(ser);
    const parsedTree = deserialize(ser);
    console.log(parsedTree);
    assert.equal(deserialize(serialize(tree)).left.left.val, 'left.left');
}

main();
