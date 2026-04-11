import { createFileRoute } from '@tanstack/react-router'
import { LightsPage } from '../components/lights/LightsPage'

export const Route = createFileRoute('/lights')({
  component: LightsPage,
})
