declare module "gsap/SplitText" {
  type SplitTarget =
    | string
    | Element
    | Array<string | Element>
    | NodeListOf<Element>;

  export class SplitText {
    chars: Element[];
    words: Element[];
    lines: Element[];
    constructor(
      target: SplitTarget,
      vars?: {
        type?: string;
        linesClass?: string;
        [key: string]: unknown;
      }
    );
    revert(): void;
  }
}
