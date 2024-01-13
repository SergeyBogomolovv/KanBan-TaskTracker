import { Variants } from 'framer-motion'

export const modalAnimation: Variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
}
export const newBoardDialogAnimation: Variants = {
  initial: {
    scale: 0.3,
    rotate: -60,
    x: -500,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 0.3,
    rotate: -20,
    x: -500,
  },
}
export const newTaskDialogAnimation: Variants = {
  initial: {
    scale: 0,
    rotate: -60,
    x: 500,
    y: -300,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: -60,
    x: 500,
    y: -300,
  },
}
export const editBoardDialogAnimation: Variants = {
  initial: {
    scale: 0,
    rotate: -60,
    x: 600,
    y: -300,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: -30,
    x: 600,
    y: -300,
  },
}
export const TaskOverlayAnimation: Variants = {
  initial: {
    scale: 0,
    rotate: -60,
  },
  visible: {
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
  },
  exit: {
    opacity: 0,
    scale: 0,
    rotate: -60,
  },
}
export const includedItemsAnimation: Variants = {
  initial: {
    scale: 0,
    x: -100,
  },
  visible: {
    x: 0,
    scale: 1,
  },
  exit: {
    x: 100,
    scale: 0,
  },
}
export const warningAnimation: Variants = {
  initial: {
    scale: 0,
  },
  visible: {
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 0,
  },
}

export const defaultAnimationAttributes = {
  initial: 'initial',
  exit: 'exit',
  animate: 'visible',
}
