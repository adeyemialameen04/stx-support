// import React, { useState, useRef, useEffect } from "react";
// import { cn } from "@/lib/utils";
//
// interface ResizableImageProps {
//   src: string;
//   alt: string;
//   initialWidth: string;
//   onResize: (width: string) => void;
// }
//
// const ResizableImage: React.FC<ResizableImageProps> = ({
//   src,
//   alt,
//   initialWidth,
//   onResize,
// }) => {
//   const [width, setWidth] = useState(initialWidth);
//   const [isResizing, setIsResizing] = useState(false);
//   const imageRef = useRef<HTMLImageElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       if (!isResizing || !containerRef.current) return;
//       const containerRect = containerRef.current.getBoundingClientRect();
//       const newWidth = e.clientX - containerRect.left;
//       setWidth(`${newWidth}px`);
//     };
//
//     const handleMouseUp = () => {
//       if (isResizing) {
//         setIsResizing(false);
//         onResize(width);
//       }
//     };
//
//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//
//     return () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };
//   }, [isResizing, onResize, width]);
//
//   return (
//     <div ref={containerRef} className="relative inline-block" style={{ width }}>
//       <img ref={imageRef} src={src} alt={alt} className="max-w-full h-auto" />
//       <div
//         className="absolute right-0 top-0 bottom-0 w-4 cursor-ew-resize"
//         onMouseDown={() => setIsResizing(true)}
//       />
//
//     </div>
//   );
// };
//
// export default ResizableImage;
// ResizableImageTemplate
import { cn } from "@/lib/utils";
import { NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import React, {
  // CSSProperties,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import ImageConfig from "./image-config";

const useEvent = <T extends (...args: any[]) => any>(handler: T): T => {
  const handlerRef = useRef<T | null>(null);

  useLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  return useCallback((...args: Parameters<T>): ReturnType<T> => {
    if (handlerRef.current === null) {
      throw new Error("Handler is not assigned");
    }
    return handlerRef.current(...args);
  }, []) as T;
};

export const ResizableImageTemplate = ({
  node,
  updateAttributes,
}: NodeViewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [editing, setEditing] = useState(false);
  const [width, setWidth] = useState<number>(node.attrs.width);
  // const [alt, setAlt] = useState(node.attrs.alt);
  // const [title, setTitle] = useState(node.attrs.title);

  useEffect(() => {
    setWidth(node.attrs.width);
  }, [node.attrs.width]);

  const handleMouseDown = useEvent(
    (
      event:
        | React.MouseEvent<HTMLDivElement>
        | React.TouchEvent<HTMLDivElement>,
    ) => {
      if (!imgRef.current) return;
      setEditing(true);
      const direction = event.currentTarget.dataset.direction || "--";
      const initialXPosition = event.type.includes("mouse")
        ? (event as React.MouseEvent<HTMLDivElement>).clientX
        : (event as React.TouchEvent<HTMLDivElement>).touches[0].clientX;
      const currentWidth = imgRef.current.clientWidth;
      let newWidth = currentWidth;
      const transform = direction === "w" ? -1 : 1;

      const mouseMoveHandler = (event: MouseEvent | TouchEvent) => {
        /* eslint-disable-next-line */
        event.cancelable && event.preventDefault();
        const currentPosition =
          event instanceof MouseEvent
            ? event.clientX
            : event.touches[0].clientX;
        newWidth =
          currentWidth + transform * (currentPosition - initialXPosition);
        setWidth(newWidth);
      };

      const removeListeners = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", removeListeners);
        window.removeEventListener("touchmove", mouseMoveHandler);
        window.removeEventListener("touchend", removeListeners);
        setEditing(false);
        updateAttributes({ width: newWidth });
      };

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", removeListeners);
      window.addEventListener("touchmove", mouseMoveHandler, {
        passive: false,
      });
      window.addEventListener("touchend", removeListeners, { passive: false });
    },
  );

  const dragCornerButton = (direction: string, className?: string) => (
    <div
      role="button"
      tabIndex={0}
      data-direction={direction}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onClick={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      className={cn(
        `absolute top-1/2 h-16 w-2 -translate-y-1/2 transform rounded-md bg-secondary group-hover:bg-muted-foreground`,
        className,
        editing && "bg-muted-foreground",
      )}
    ></div>
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setEditing(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [editing]);

  return (
    <NodeViewWrapper
      ref={containerRef}
      as="div"
      // draggable
      // data-drag-handle
      onMouseDown={() => setEditing(true)}
      onTouchStart={() => setEditing(true)}
      onBlur={() => setEditing(false)}
      // style={{
      //   display: "table",
      //   lineHeight: "0px",
      // }}
      className={`relative my-6 overflow-visible bg-green-700 sm:my-8 ${node.attrs.align}`}
    >
      <div className="relative">
        {/* @ts-expect-error Types issues here(Would fix later) */}
        <ImageConfig updateAttributes={updateAttributes} node={node} />
      </div>
      {/* Change later to NextImage(bug). Using NextImage for now doesn't work */}
      {/* eslint-disable-next-line */}
      <img
        src={node.attrs.src}
        ref={imgRef}
        style={{
          width: `${width}px`,
        }}
        alt={node.attrs.alt || "Image"}
        className={cn(
          editing && `cursor-default ring-1 ring-foreground`,
          "min-w-[200px] max-w-full rounded-md",
        )}
      />
      <div className="group">
        {dragCornerButton("w", "-left-3.5 cursor-w-resize")}
        {dragCornerButton("e", "-right-3.5 cursor-e-resize")}
      </div>
    </NodeViewWrapper>
  );
};
