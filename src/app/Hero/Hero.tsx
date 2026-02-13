import { motion } from "framer-motion";
import { HeroContent } from "../Hero/components/HeroContent";
export const Hero = () => {
    return (
        <section className="relative text-white items-center box-border caret-transparent flex min-h-[660px] break-words pt-[82.5156px] md:pt-[95.0938px]" id="reserver">
            <div className="absolute bg-black caret-transparent break-words inset-0">
                <div className="absolute bg-black caret-transparent break-words pointer-events-none overflow-hidden inset-0">
                    <motion.img
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        alt="Portada de Mexican'o"
                        src="images/portada.jpeg"
                     sizes="(max-width: 799px) 200vw, 100vw"
                        className="relative aspect-[auto_1698_/_1114] caret-transparent h-full object-cover break-words w-full"
                    />
                    <div className="absolute bg-black caret-transparent opacity-25 break-words inset-0"></div>
                </div>
            </div>
            <div className="relative caret-transparent flex justify-center max-w-full break-words w-full mx-auto py-[66px] md:py-[84.48px]">
                    <div className="caret-transparent break-words w-full">
                        <div className="relative caret-transparent h-full break-words w-full">
                            <div className="relative caret-transparent gap-x-[11px] grid col-end-[-1] col-start-1 row-end-[-1] row-start-1 grid-cols-[minmax(11.5px,1fr)_repeat(8,minmax(0px,190.375px))_minmax(11.5px,1fr)] grid-rows-[repeat(5,minmax(24px,auto))] break-words overflow-x-clip gap-y-[11px] md:grid-cols-[minmax(27.4px,1fr)_repeat(24,minmax(0px,56.125px))_minmax(27.4px,1fr)] md:grid-rows-[repeat(4,minmax(25.8688px,auto))]" >
                            <HeroContent />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};