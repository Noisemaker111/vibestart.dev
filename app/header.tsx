import { ToggleWelcome } from '@/components/modals/welcome'
import { cn } from '@/lib/utils'

interface Props {
  className?: string
}

export async function Header({ className }: Props) {
  return (
    <header className={cn('flex items-center justify-between', className)}>
      <div className="flex items-center">
        <span className="hidden md:inline text-sm uppercase font-mono font-bold tracking-tight">
          VibeStart.dev
        </span>
      </div>
      <div className="flex items-center ml-auto space-x-1.5">
        <ToggleWelcome />
      </div>
    </header>
  )
}
