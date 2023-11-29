import { parseFragment } from 'parse5';
import { fromParse5 } from 'hast-util-from-parse5';
import { visit } from 'unist-util-visit';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';

export default function remarkMermaid() {
  return (tree) => {
    visit(tree, { type: 'code', lang: 'mermaid' }, (node, index, parent) => {
      const div = createElement(
        'div',
        {
          className: 'mermaid'
        },
        node.value
      );
      const value = renderToString(div);

      parent.children.splice(index, 1, {
        type: 'div',
        children: [{ type: 'html', value }],
        data: { hChildren: [fromParse5(parseFragment(value))] }
      });
    });
  };
}
