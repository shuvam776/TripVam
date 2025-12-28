import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function TestGsapLoop() {
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!boxRef.current) return

    const tween = gsap.to(boxRef.current, {
      x: 200,
      duration: 2,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    })

    return () => {
      tween.kill()
    }
  }, [])

  return (
    <div className="h-screen flex items-center justify-center bg-black overflow-hidden">
      <div
        ref={boxRef}
        className="w-32 h-32 rounded-xl bg-orange-500 flex items-center justify-center text-black font-bold"
      >
        MOVING
      </div>
    </div>
  )
}
