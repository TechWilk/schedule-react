import { StyleSheet, StyleResolver } from "style-sheet";

type StyleNode = {[key: string]: string | StyleNode};

function createStyles<T extends StyleNode>(styles: T): (...styles: (keyof T)[]) => string {
  let styleSheet = StyleSheet.create(styles);

  let classNames = styles;
  Object.keys(classNames).forEach((key: keyof T) => classNames[key] = key as T[keyof T]);

  return (...styles) => StyleResolver.resolve(styles.map(style => styleSheet[style]));
}

export default createStyles;
