import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { useDimensions } from "../../hooks/use-dimensions";
import { Navigation } from "./Navigation";

const sidebar = {
  initial: {
    scale: 0,
    originX: '55px',
    originY: '70px',
  },
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 39px 54px`,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2
    },
  }),
  closed: {
    clipPath: "circle(30px at 39px 54px)",
    scale: 1,
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40
    }
  }
}

const BurgerMenu = () => {
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const { height } = useDimensions(containerRef)

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? "open" : "closed"}
      custom={height}
      ref={containerRef}
      className="absolute z-40 top-0 left-0 bottom-0 w-72"
    >
      <motion.div
        className="fixed top-0 left-0 bottom-0 w-72 bg-white"
        variants={sidebar}
        initial="initial"
        animate={isOpen ? "open" : "closed"}
      />
      <Navigation isOpen={isOpen}/>
      <MenuToggle toggle={() => toggleOpen()} />
    </motion.nav>
  )
}

export default BurgerMenu