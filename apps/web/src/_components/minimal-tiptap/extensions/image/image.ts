import { Image as TiptapImage } from "@tiptap/extension-image";
import { ReactNodeViewRenderer } from "@tiptap/react";
// import { ImageViewBlock } from "./components/image-view-block";
// import ImageResize from "tiptap-extension-resize-image";

// export const Image = TiptapImage.extend({
//   addNodeView() {
//     return ReactNodeViewRenderer(ImageViewBlock);
//   },
//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       caption: {
//         default: null,
//         parseHTML: (element) => element.getAttribute("data-caption"),
//         renderHTML: (attributes) => {
//           if (!attributes.caption) {
//             return {};
//           }
//           return {
//             "data-caption": attributes.caption,
//           };
//         },
//       },
//     };
//   },
// });

// ImageResize.tsx

import { ResizableImageTemplate } from "./components/resizable";

export const Image = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: 640,
        renderHTML: ({ width }) => ({ width }),
      },
      height: {
        default: "auto",
        renderHTML: ({ height }) => ({ height }),
      },
      align: {
        default: "mx-auto",
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ResizableImageTemplate);
  },
}).configure({ inline: false });
