//Objective is to do a vertical order traversal over a binary tree
//**IMPORTANT**//
//Do note this is different from '314. Binary Tree Vertical Order Traversal'
//We sort the nodes based on value if they end up in the same position

class Node {
    constructor(left = null, right = null, val) {
      this.val = val
      this.left = left
      this.right = right
    }
}
  
class Tree {
    constructor(root) {
      this.root = null
    }
  
    createRoot(val) {
      this.root = new Node(null, null, val)
    }
  
    addLeftNode(node, val) {
      node.left = new Node(null, null, val)
    }
  
    addRightNode(node, val) {
      node.right = new Node(null, null, val)
    }
}

let tree = new Tree()
tree.createRoot(11)
tree.addLeftNode(tree.root, 9)
tree.addRightNode(tree.root, 20)
tree.addRightNode(tree.root.right, 36)
tree.addLeftNode(tree.root.right, 15)


//O(n) solution where n is the number of nodes in the binary tree
//We do an inorder traversal over the graph to go left to right,
//Then we sort based on column, then row, then by value

let nodes = []

//Inorder traversal to visit left to right
inorder(tree.root, 0, 0)
function inorder(root, x, y) {
    if (root) {
        inorder(root.left, x - 1, y - 1)
        nodes.push([x, y, root.val])
        inorder(root.right, x + 1, y - 1)
    }
}

//Sort by priority of x coord, then y coord, and finally by value
nodes.sort((a,b) => {
    return a[0] - b[0] || b[1] - a[1] || a[2] - b[2]
})

let map = new Map()
for (let [x,y,val] of nodes) {
    if (!map.has(x)) {
        map.set(x, [])
    } 
    map.get(x).push(val)
}

return [...map.values()]