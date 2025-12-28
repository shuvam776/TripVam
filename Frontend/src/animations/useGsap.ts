import { useEffect } from "react"
import gsap from "gsap"

export const useGsap = (
  selector: string,
  animation: gsap.TweenVars
) => {
  useEffect(() => {
    gsap.from(selector, animation)
  }, [selector, animation])
}
