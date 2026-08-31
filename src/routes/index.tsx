import { createFileRoute } from '@tanstack/react-router'
import { MergedYatraX } from '@/components/MergedYatraX'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return <MergedYatraX />
}
