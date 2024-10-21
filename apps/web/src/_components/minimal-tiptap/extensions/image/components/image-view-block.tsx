import { isNumber, NodeViewProps, NodeViewWrapper } from '@tiptap/react'
import { useMemo } from 'react'
import { useImageLoad } from '../../../hooks/use-image-load'
import { cn } from '@/lib/utils'

const ImageViewBlock = ({ editor, node, getPos }: NodeViewProps) => {
  const imgSize = useImageLoad(node.attrs.src)

  const paddingBottom = useMemo(() => {
    if (!imgSize.width || !imgSize.height) {
      return 0
    }

    return (imgSize.height / imgSize.width) * 100
  }, [imgSize.width, imgSize.height])

  return (
    <NodeViewWrapper>
      <div draggable data-drag-handle>
        <figure>
          <div className="relative w-full" style={{ paddingBottom: `${isNumber(paddingBottom) ? paddingBottom : 0}%` }}>
            <div className="absolute w-full h-full">
              <div
                className={cn('relative h-full max-h-full w-full max-w-full rounded transition-all')}
                style={{
                  boxShadow: editor.state.selection.from === getPos() ? '0 0 0 1px hsl(var(--primary))' : 'none'
                }}
              >
                <div className="flex overflow-hidden relative w-full max-w-full h-full max-h-full">
                  <img
                    alt={node.attrs.alt}
                    src={node.attrs.src}
                    className="object-contain absolute top-2/4 left-2/4 m-0 max-w-full h-full transform -translate-x-2/4 -translate-y-2/4"
                  />
                </div>
              </div>
            </div>
          </div>
        </figure>
      </div>
    </NodeViewWrapper>
  )
}

export { ImageViewBlock }
