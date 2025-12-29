import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

type Props = {
  open: boolean
  onClose: () => void
  title: string
  description: string
  onGetStarted: () => void
}

export default function FeatureGateModal({
  open,
  onClose,
  title,
  description,
  onGetStarted,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-zinc-800 text-white max-w-md">
        <h2 className="text-2xl font-semibold">{title}</h2>

        <p className="text-zinc-400 mt-3">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onClose}
            className="text-zinc-400"
          >
            Cancel
          </Button>
          <Button
            onClick={onGetStarted}
            className="bg-orange-500 text-black"
          >
            Get Started with Google
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
