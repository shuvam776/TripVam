import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function TestGsap() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current) return

    gsap.fromTo(
      boxRef.current,
      {
        opacity: 0,
        y: 60,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      }
    )
  }, [])

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <div
        ref={boxRef}
        className="w-64 h-40 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold text-xl"
      >
        GSAP WORKS
      </div>
    </div>
  )
}
