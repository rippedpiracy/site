interface TreeNode {
  type: string;
  depth?: number;
  value?: string;
  children?: TreeNode[];
}

interface Tree {
  type: string;
  children: TreeNode[];
}

interface Frontmatter {
  title?: string;
  no_show_title?: boolean;
}

function parseFrontmatter(raw: string): Frontmatter {
  const result: Record<string, string | boolean> = {};
  for (const line of raw.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    if (val === "true") result[key] = true;
    else if (val === "false") result[key] = false;
    else result[key] = val;
  }
  return result as unknown as Frontmatter;
}

function injectTitle(tree: Tree) {
  let frontmatter: Frontmatter = {};

  // Find the YAML frontmatter node
  for (const node of tree.children) {
    if (node.type === "yaml" && node.value) {
      frontmatter = parseFrontmatter(node.value);
      break;
    }
  }

  if (frontmatter.title && !frontmatter.no_show_title) {
    // Insert an h1 heading after any frontmatter/import nodes
    let insertIndex = 0;
    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];
      if (child.type === "yaml" || child.type === "mdxjsEsm") {
        insertIndex = i + 1;
      } else {
        break;
      }
    }

    tree.children.splice(insertIndex, 0, {
      type: "heading",
      depth: 1,
      children: [{ type: "text", value: frontmatter.title }],
    });
  }
}

export default function remarkInjectTitle() {
  return injectTitle;
}
