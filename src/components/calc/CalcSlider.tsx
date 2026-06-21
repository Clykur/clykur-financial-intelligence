import * as SliderPrimitive from "@radix-ui/react-slider";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CalcSliderProps {
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  display: string;
}

export function CalcSlider({
  label,
  icon,
  value,
  min,
  max,
  step,
  onChange,
  display,
}: CalcSliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <span className="text-primary">{icon}</span>
          {label}
        </span>
        <motion.span
          key={display}
          initial={{ opacity: 0.4, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-md bg-secondary px-2.5 py-1 font-display text-sm font-semibold tabular-nums text-foreground"
        >
          {display}
        </motion.span>
      </div>
      <SliderPrimitive.Root
        className="relative flex h-5 w-full touch-none select-none items-center"
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={(v) => onChange(v[0])}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-secondary">
          <SliderPrimitive.Range className="absolute h-full bg-gradient-to-r from-primary to-primary-glow" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block h-4 w-4 rounded-full border-2 border-primary bg-background shadow-md transition-transform",
            "hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          )}
        />
      </SliderPrimitive.Root>
    </div>
  );
}
