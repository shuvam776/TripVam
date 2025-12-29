import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onClose: () => void
  title: string
  description: string
  onContinue: () => void
}

export default function FeatureExplainerModal({
  open,
  onClose,
  title,
  description,
  onContinue,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-zinc-800 text-white max-w-lg">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="text-zinc-400 mt-4 leading-relaxed">
          {description}
        </p>

        <div className="mt-8 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-zinc-400"
          >
            Cancel
          </Button>
          <Button
            onClick={onContinue}
            className="bg-orange-500 text-black px-6"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
