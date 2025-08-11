import { HexTransitionMaterial } from '/shaders/HexTransitionMaterial';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      hexTransitionMaterial: ReactThreeFiber.Object3DNode<
        ReturnType<typeof HexTransitionMaterial>,
        typeof HexTransitionMaterial
      >;
    }
  }
}
