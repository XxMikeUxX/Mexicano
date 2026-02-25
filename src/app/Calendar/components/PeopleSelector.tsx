    import React from "react";
    import { cn } from "@/lib/utils";

    type PeopleSelectorProps = {
    selectedPeople: number;
    onSelectPeople: (num: number) => void;
    };

    export const PeopleSelector = ({
    selectedPeople,
    onSelectPeople,
    }: PeopleSelectorProps) => {
    const options = Array.from({ length: 12 }, (_, i) => i + 1);
    
    return (
    <div className="w-full max-w-[390px] mx-auto">
    <h3 className="text-center text-lg mb-6 font-medium">
    Combien de personnes ?
    </h3>
    <div className="grid grid-cols-4 gap-3">
    {options.map((num) => (
    <button
    key={num}
    onClick={() => onSelectPeople(num)}
    className={cn(
    "aspect-square flex items-center justify-center text-lg rounded-md transition-all duration-200 border border-stone-200",
    selectedPeople === num
    ? "bg-green-700 text-white border-green-700 shadow-md"
    : "bg-white hover:border-green-700 hover:text-green-700 text-stone-700"
    )}
    >
    {num}
    </button>
    ))}
    </div>
    </div>
        );
    }