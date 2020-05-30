import { StyleSheet, StyleResolver } from "style-sheet";

type StyleNode = {[key: string]: string | StyleNode};

function createStyles<T extends StyleNode>(styles: T): [{ [key in keyof T]: keyof T }, (...styles: (keyof T)[]) => string] {
  let styleSheet = StyleSheet.create(styles);

  let classNames = styles;
  Object.keys(classNames).forEach((key: keyof T) => classNames[key] = key as T[keyof T]);

  return [
    classNames as {[key in keyof T]: keyof T },
    (...styles) => StyleResolver.resolve(styles.map(style => styleSheet[style])),
  ];
}

export default createStyles;
