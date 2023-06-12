import { ReactNode } from "react";
import Fade from "@material-ui/core/Fade";

export default function FadeIn({ children, duration }: { children: ReactNode, duration?: number }) {
  const timeout = duration ? duration : 800;
  return <Fade in={true} {...{ timeout }}>
    {children}
  </Fade>;
}
