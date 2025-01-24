import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  amount: string
  onConfirm: () => void
}

export function ConfirmationModal({ isOpen, onClose, amount, onConfirm }: ConfirmationModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Confirm Top Up</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex flex-col items-center justify-center space-y-3">
            <CheckCircle className="h-12 w-12 text-green-500" />
            <p className="text-lg font-semibold">Please Confirm Your Top Up</p>
          </div>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Amount to Top Up</span>
              <span className="font-medium">${amount}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Processing Fee</span>
              <span className="font-medium">$0.00</span>
            </div>
            <div className="mt-3 border-t pt-3">
              <div className="flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium">${amount}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex space-x-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} className="flex-1">
            Proceed
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

