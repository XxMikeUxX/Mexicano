import { motion } from "framer-motion";
export const HeroContent = () => {
  return (
    <div className="caret-transparent col-end-10 col-start-2 row-end-6 row-start-1 break-words z-0 md:col-end-[25] md:col-start-3 md:row-end-5">
      <div className="relative caret-transparent flex flex-col h-full justify-start break-words w-full md:justify-center">
        <div className="caret-transparent break-words">
          <div className="caret-transparent break-words">
            <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[48.4px] font-bold caret-transparent leading-[59.6288px] break-words text-center uppercase mb-8 md:text-[62.08px] md:leading-[76.4826px]"
            >
              RÉSERVATIONS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="caret-transparent break-words text-center mt-4"
            >
              <em className="italic caret-transparent break-words">
                Toutes nos réservations se font en ligne, sur notre
                site internet et par appel 😌✨
              </em>
            </motion.p>
          </div>
        </div>
      </div>
    </div>
  );
};