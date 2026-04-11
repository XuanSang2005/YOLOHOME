import { createFileRoute } from '@tanstack/react-router'
import { CameraPage } from '../components/camera/CameraPage'

export const Route = createFileRoute('/camera')({
  component: CameraPage,
})
