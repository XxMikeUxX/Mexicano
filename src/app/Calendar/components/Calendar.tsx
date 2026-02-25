    import React, { useState } from "react";
    import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    getDay,
    isToday,
    isBefore,
    startOfToday,
    } from "date-fns";
    import { cn } from "@/lib/utils";
    import { ChevronLeft, ChevronRight } from "lucide-react";
    type CalendarProps = {
    selectedDate: Date | null;
    onSelectDate: (date: Date) => void;
    };
    export const Calendar = ({ selectedDate, onSelectDate }: CalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const today = startOfToday();
    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => {
    const previous = subMonths(currentMonth, 1);
    // Prevent going back past the current month if we are in it
    if (isBefore(endOfMonth(previous), today)) return;
    setCurrentMonth(previous);
    };
    const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
    });
    // 0 is Sunday, 1 is Monday... we want Monday as 0 for the grid offset if week starts on Monday
    // The design shows MON as first column.
    // date-fns getDay returns 0 for Sunday, 1 for Monday.
    // We need to shift so Monday is 0, Sunday is 6.
    const startDay = getDay(startOfMonth(currentMonth));
    const emptySlots = startDay === 0 ? 6 : startDay - 1;
    const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    return (
    <div className="w-full max-w-[390px] mx-auto flex flex-col items-center">
    {/* Navigation */}
    <div className="flex justify-between items-center w-full mb-4 px-2">
    <button
    onClick={prevMonth}
    disabled={isSameMonth(currentMonth, today)}
    className="p-2 rounded-full hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
    >
    <ChevronLeft className="w-5 h-5 text-stone-600" />
    </button>
    <h2 className="text-xl font-medium capitalize">
    {format(currentMonth, "MMMM yyyy")}
    </h2>
    <button
    onClick={nextMonth}
    className="p-2 rounded-full hover:bg-stone-100 transition-colors"
    >
    <ChevronRight className="w-5 h-5 text-stone-600" />
    </button>
    </div>
    {/* Weekday Headers */}
    <div className="grid grid-cols-7 w-full mb-2">
    {weekDays.map((day) => (
    <div
    key={day}
    className="text-[10px] font-light text-center uppercase pb-1 font-ralewayx text-stone-500"
    >
    {day}
    </div>
    ))}
    </div>
    {/* Days Grid */}
    <div className="grid grid-cols-7 gap-1 w-full">
    {Array.from({ length: emptySlots }).map((_, i) => (
    <div key={`empty-${i}`} className="aspect-square" />
    ))}
    {days.map((day) => {
    const isSelected = selectedDate && isSameDay(day, selectedDate);
    const isCurrentMonth = isSameMonth(day, currentMonth);
    const isPast = isBefore(day, today);
    const isTodayDate = isToday(day);
    return (
    <button
    key={day.toString()}
    onClick={() => !isPast && onSelectDate(day)}
    disabled={isPast}
    className={cn(
    "aspect-square flex items-center justify-center text-sm rounded-md transition-all duration-200 relative",
    !isCurrentMonth && "invisible",
    isPast && "text-stone-300 cursor-not-allowed",
    !isPast && "hover:bg-stone-100 text-stone-800",
    isSelected &&
    "bg-green-700 text-white hover:bg-green-800 shadow-md font-medium",
    isTodayDate && !isSelected && "font-bold text-green-700",
    // Style matching the reference for non-selected available days
    !isSelected && !isPast && "bg-white shadow-[rgba(0,0,0,0.05)_0px_0px_0px_1px_inset]"
    )}
    >
    {format(day, "d")}
    </button>
    );
    })}
    </div>
    </div>
    );
    };