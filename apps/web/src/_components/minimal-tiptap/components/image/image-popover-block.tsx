import { ToolbarButton } from '../toolbar-button'
import { TrashIcon } from '@radix-ui/react-icons'

const ImagePopoverBlock = ({ onRemove }: { onRemove: (e: React.MouseEvent<HTMLButtonElement>) => void }) => {
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onRemove(e)
  }

  return (
    <div className="flex overflow-hidden p-2 h-10 rounded shadow-lg bg-background">
      <div className="inline-flex gap-1 items-center">
        <ToolbarButton tooltip="Remove" onClick={handleRemove}>
          <TrashIcon className="size-4" />
        </ToolbarButton>
      </div>
    </div>
  )
}

export { ImagePopoverBlock }
