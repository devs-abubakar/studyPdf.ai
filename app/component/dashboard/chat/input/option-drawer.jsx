import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Plus } from "lucide-react"
import { ImageIcon, FileText } from "lucide-react"

export function UploadDropdown({ onSelect }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
        size="icon"
          variant="secondary"
          className="
            size-10
            rounded-full
          "
        >
          <Plus className="size-5"/>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="
          w-56
          rounded-2xl
          border
          border-white/10

        "
      >
        <DropdownMenuItem
          onClick={() => onSelect("pdf")}
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            px-3
            py-2
            hover:bg-white/10
            focus:bg-white/10
          "
        >
          <FileText className="h-4 w-4 text-zinc-400" />
          Upload PDF
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => onSelect("image")}
          className="
            flex
            cursor-pointer
            items-center
            gap-2
            rounded-xl
            px-3
            py-2
            hover:bg-white/10
            focus:bg-white/10
          "
        >
          <ImageIcon className="h-4 w-4 text-zinc-400" />
          Upload Image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}