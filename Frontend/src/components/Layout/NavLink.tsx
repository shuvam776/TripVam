import { NavLink as RouterLink } from "react-router-dom"
import { cn } from "@/lib/utils"

export default function NavLink({
  to,
  label,
}: {
  to: string
  label: string
}) {
  return (
    <RouterLink
      to={to}
      className={({ isActive }) =>
        cn(
          "relative px-1 py-2 transition text-sm",
          "hover:text-orange-400",
          isActive
            ? "text-orange-500 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:bg-orange-500"
            : "text-white"
        )
      }
    >
      {label}
    </RouterLink>
  )
}
