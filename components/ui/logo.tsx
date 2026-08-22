import * as React from "react";
import { cn } from "@/lib/utils";

interface LogoProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export function LogoIcon({ className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("text-foreground", className)}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2L22 7V17L12 22L2 17V7L12 2ZM12 4.3094L4 8.3094V15.6906L12 19.6906L20 15.6906V8.3094L12 4.3094Z"
        fill="currentColor"
        className="opacity-20"
      />
      <path
        d="M12 2L22 7V17L12 22L2 17V7L12 2Z"
        fill="url(#paint0_linear)"
        className="opacity-10 dark:opacity-20"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 7L16 9V15L12 17L8 15V9L12 7ZM12 9.3094L10 10.3094V13.6906L12 14.6906L14 13.6906V10.3094L12 9.3094Z"
        fill="currentColor"
      />
      <path
        d="M12 11.5C12.8284 11.5 13.5 10.8284 13.5 10C13.5 9.17157 12.8284 8.5 12 8.5C11.1716 8.5 10.5 9.17157 10.5 10C10.5 10.8284 11.1716 11.5 12 11.5Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="2"
          y1="2"
          x2="22"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 group", className)}>
      <div className="relative flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3 duration-300">
        <LogoIcon className="h-7 w-7" />
      </div>
      <span className="font-heading text-xl font-bold tracking-tight text-foreground">
        Studix
      </span>
    </div>
  );
}

