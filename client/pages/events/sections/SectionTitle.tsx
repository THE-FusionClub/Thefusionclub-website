import { motion } from "framer-motion";

const easeOut = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export function SectionTitle({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) {
  return (
    <motion.div variants={fadeUpVariants} className="mb-12 md:mb-16 text-center">
      {subtitle && (
        <span className="inline-block rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold tracking-wide text-blue-600 mb-4">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
        {children}
      </h2>
    </motion.div>
  );
}