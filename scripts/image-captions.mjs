/** Render a standalone Markdown image's title as its visible caption. */
export default function imageCaptions() {
  return {
    name: 'image-captions',
    element: {
      filter: ['p'],
      visit(node, ctx) {
        const content = node.children.filter(
          (item) => item.type !== 'text' || item.value.trim() !== '',
        );
        const image = content[0];
        const caption = image?.properties?.title;

        if (content.length === 1 && image?.tagName === 'img' && typeof caption === 'string' && caption.trim()) {
          const { title: _title, ...properties } = image.properties;
          ctx.replaceNode(node, {
            type: 'element',
            tagName: 'figure',
            properties: {},
            children: [
              { ...image, properties },
              {
                type: 'element',
                tagName: 'figcaption',
                properties: {},
                children: [{ type: 'text', value: caption }],
              },
            ],
          });
        }
      },
    },
  };
}
