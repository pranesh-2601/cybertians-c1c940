import { createFileRoute } from '@tanstack/react-router'
import { YatraXApp } from '@/components/YatraXApp'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <YatraXApp />
}
