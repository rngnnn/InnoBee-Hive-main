import { MotionProps as OriginalMotionProps } from "framer-motion";
declare module "*.webp" {
  const ref: string;
  export default ref;
}

// TODO: remove this after framer motion is upgraded to a more recent version
declare module "framer-motion" {
  interface MotionProps extends OriginalMotionProps {
    className?: string;
  }
}
