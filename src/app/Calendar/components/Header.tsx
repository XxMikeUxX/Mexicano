import { Logo } from "../components/Logo";
import { BookingWidget }  from "../components/BookingWidget";
export const Header = () => {
 return (
 <div className="min-h-screen bg-white flex flex-col">
 {/* Top Bar */}
 <div className="w-full px-4 py-4 md:px-10 flex justify-between items-center border-b border-stone-100 md:border-none">
 <div className="flex-shrink-0">
 <Logo />
 </div>
 </div>
 {/* Main Content */}
 <div className="flex-1 flex flex-col items-center w-full max-w-4xl mx-auto px-4 pt-8 pb-12">
 <div className="text-center mb-8">
 <h1 className="text-3xl font-bold text-stone-800 mb-2 font-ralewayx">
 Mexican'o
 </h1>
 <p className="text-stone-500 text-sm uppercase tracking-widest">Restaurant Mexicaine</p>
 </div>
 <div className="w-full">
 <BookingWidget />
 </div>
 </div>
 </div>
 );
}   