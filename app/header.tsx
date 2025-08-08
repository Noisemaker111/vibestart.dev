import { ToggleWelcome } from '@/components/modals/welcome'
import { GithubIcon } from '@/components/icons/github'
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
        <a
          href="https://github.com/Noisemaker111/vibestart.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-mono inline-flex items-center gap-1 underline underline-offset-2"
          aria-label="GitHub repository"
        >
          Github
          <GithubIcon className="size-3.5" />
        </a>
        <ToggleWelcome />
      </div>
    </header>
  )
}
