import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

type InputSinglePickerProps = {
  date: Date;
  onChange?: (date?: Date) => void;
  mode?: 'single';
  disablePass?: boolean;
  readonly?: boolean;
};

type InputRangePickerProps = {
  date: DateRange;
  mode?: 'range';
  onChange?: (date: DateRange) => void;
  disablePass?: boolean;
  readonly?: boolean;
};

type InputPickerProps = InputSinglePickerProps | InputRangePickerProps;

export function InputPicker(props: InputPickerProps) {
  const { mode = 'single', date, onChange, disablePass, readonly } = props;

  const renderDate = () => {
    if (mode === 'range') {
      const date = props.date as InputRangePickerProps['date'];
      return date?.from ? (
        date.to ? (
          <>
            {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
          </>
        ) : (
          format(date.from, 'LLL dd, y')
        )
      ) : (
        <span>Elegir fecha</span>
      );
    } else if (mode === 'single') {
      const date = props.date as InputSinglePickerProps['date'];
      return date ? format(date, 'PPP') : <span>Elegir fecha</span>;
    } else {
      return null;
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'justify-start text-left font-normal bg-transparent',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {renderDate()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          required
          mode={mode}
          selected={date as any}
          onSelect={(e: any) => onChange?.(e)}
          disabled={
            readonly || (disablePass ? { before: new Date() } : undefined)
          }
        />
      </PopoverContent>
    </Popover>
  );
}
