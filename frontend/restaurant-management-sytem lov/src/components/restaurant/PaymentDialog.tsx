import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Banknote, CreditCard } from 'lucide-react';
import { formatCurrency } from '@/types/restaurant';

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  onSelect: (method: 'cash' | 'online') => void;
  total: number;
}

const PaymentDialog = ({ open, onClose, onSelect, total }: PaymentDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Select Payment Method</DialogTitle>
          <p className="text-center text-2xl font-bold text-primary">{formatCurrency(total)}</p>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button
            variant="outline"
            className="h-28 flex-col gap-3 text-base hover:border-primary hover:bg-primary/5"
            onClick={() => onSelect('cash')}
          >
            <Banknote className="h-8 w-8 text-success" />
            Cash
          </Button>
          <Button
            variant="outline"
            className="h-28 flex-col gap-3 text-base hover:border-primary hover:bg-primary/5"
            onClick={() => onSelect('online')}
          >
            <CreditCard className="h-8 w-8 text-primary" />
            Online
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
