import { ViewTransition } from "react";

export function PageTransition({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransition
      default="none"
      enter={{
        "nav-back": "nav-back",
        "nav-forward": "nav-forward",
        default: "none",
      }}
      exit={{
        "nav-back": "nav-back",
        "nav-forward": "nav-forward",
        default: "none",
      }}
    >
      {children}
    </ViewTransition>
  );
}
