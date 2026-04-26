declare module "*.svg" {
  import * as React from "react";
  const SvgComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}
