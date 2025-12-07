declare module 'lucide-react' {
  import { FC, SVGProps } from 'react';
  
  export interface IconProps extends SVGProps<SVGSVGElement> {
    size?: string | number;
    strokeWidth?: string | number;
  }
  
  export const Github: FC<IconProps>;
  export const Linkedin: FC<IconProps>;
  export const Mail: FC<IconProps>;
  export const Phone: FC<IconProps>;
  export const ExternalLink: FC<IconProps>;
  export const Download: FC<IconProps>;
  export const Award: FC<IconProps>;
  export const Users: FC<IconProps>;
  export const Target: FC<IconProps>;
  export const ArrowDown: FC<IconProps>;
}
