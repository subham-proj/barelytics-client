import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';

const DateRangePicker = ({ dateRange, onDateRangeChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (date) => {
    if (!dateRange.from) {
      onDateRangeChange({ from: date, to: null });
    } else if (!dateRange.to && date > dateRange.from) {
      onDateRangeChange({ from: dateRange.from, to: date });
      setIsOpen(false);
    } else {
      onDateRangeChange({ from: date, to: null });
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return format(date, 'MMM dd, yyyy');
  };

  const getDisplayText = () => {
    if (!dateRange.from) {
      return 'Select date range';
    }
    if (!dateRange.to) {
      return `${formatDate(dateRange.from)} - Select end date`;
    }
    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={`justify-start text-left font-normal ${className}`}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          <span className="truncate">{getDisplayText()}</span>
          <ChevronDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={dateRange.from}
          selected={{
            from: dateRange.from,
            to: dateRange.to,
          }}
          onSelect={(range) => {
            if (range?.from) {
              onDateRangeChange({
                from: range.from,
                to: range.to || null,
              });
              if (range.to) {
                setIsOpen(false);
              }
            }
          }}
          numberOfMonths={2}
          disabled={(date) => date > new Date()}
        />
      </PopoverContent>
    </Popover>
  );
};

export default DateRangePicker; 