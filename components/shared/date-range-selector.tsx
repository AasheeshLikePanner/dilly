'use client';

import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

type PresetRange = '1d' | '7d' | '1m' | 'max';

type CustomDateRange = {
    start: string; // ISO date string
    end: string;   // ISO date string
};

interface DateRangeSelectorProps {
    value: PresetRange;
    onChange: (range: PresetRange) => void;
    customRange: CustomDateRange | null;
    onCustomChange: (range: CustomDateRange | null) => void;
}

export function DateRangeSelector({
    value,
    onChange,
    customRange,
    onCustomChange,
}: DateRangeSelectorProps) {
    const presetRanges: { value: PresetRange; label: string }[] = [
        { value: '1d', label: '24h' },
        { value: '7d', label: '7d' },
        { value: '1m', label: '30d' },
        { value: 'max', label: 'All' },
    ];

    const handlePresetClick = (range: PresetRange) => {
        onChange(range);
        onCustomChange(null); // Clear custom range
    };

    const handleCalendarSelect = (range: any) => {
        if (range?.from && range?.to) {
            onCustomChange({
                start: range.from.toISOString().split('T')[0],
                end: range.to.toISOString().split('T')[0],
            });
        }
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex gap-2">
                {presetRanges.map((range) => (
                    <button
                        key={range.value}
                        onClick={() => handlePresetClick(range.value)}
                        className={cn(
                            "px-2 py-1 text-[11px] font-medium transition-all border-b-2",
                            value === range.value && !customRange
                                ? "border-zinc-900 dark:border-white text-zinc-900 dark:text-white"
                                : "border-transparent text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        )}
                    >
                        {range.label}
                    </button>
                ))}
            </div>

            <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />

            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "flex items-center gap-2 text-[11px] font-medium transition-colors",
                            customRange
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                        )}
                    >
                        <CalendarIcon className="w-3 h-3" />
                        {customRange ? `${customRange.start} - ${customRange.end}` : 'Custom'}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto p-0" align="end">
                    <Calendar
                        mode="range"
                        selected={
                            customRange
                                ? { from: new Date(customRange.start), to: new Date(customRange.end) }
                                : undefined
                        }
                        onSelect={handleCalendarSelect}
                        initialFocus
                    />
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
