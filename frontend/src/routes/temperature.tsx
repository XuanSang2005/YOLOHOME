import { createFileRoute } from '@tanstack/react-router'
import { TemperaturePage } from '../components/temperature/TemperaturePage'

export const Route = createFileRoute('/temperature')({
  component: TemperaturePage,
})
