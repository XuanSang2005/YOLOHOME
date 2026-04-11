import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
<<<<<<< HEAD
import { getLight, getLightCommands, sendLightCommand } from '../../services/lightService'
=======
import {
  getLightCommands,
  getRoomSettings,
  sendRoomCommand,
  updateRoomSettings,
  type RoomSetting,
} from '../../services/lightService'
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
import { useState } from 'react'
import { RoomLightCard } from './RoomLightCard'
import type { RoomLightCardProps, ColorTemp } from './types'

export function LightsPage() {
  const queryClient = useQueryClient()
  const [showAll, setShowAll] = useState(false)

<<<<<<< HEAD
  type LocalCmd = { id: string; command: 'on' | 'off'; created_at: string; device: { name: string } }
  const [localCmds, setLocalCmds] = useState<LocalCmd[]>([])
  const addLocalCmd = (name: string, command: 'on' | 'off') =>
    setLocalCmds((prev) => [{ id: crypto.randomUUID(), command, created_at: new Date().toISOString(), device: { name } }, ...prev])

  const light    = useQuery({ queryKey: ['light'],         queryFn: getLight })
  const commands = useQuery({ queryKey: ['lightCommands'], queryFn: getLightCommands })
  const mutation = useMutation({
    mutationFn: sendLightCommand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['light'] })
      queryClient.invalidateQueries({ queryKey: ['lightCommands'] })
    },
  })
  const [localLiving, setLocalLiving] = useState<boolean | null>(null)
  const [livingBrightness, setLivingBrightness] = useState(85)
  const [livingTemp, setLivingTemp] = useState<ColorTemp>('neutral')
  const isLivingOn = localLiving ?? light.data?.status === 'on'

  const [isBedOn, setIsBedOn]            = useState(false)
  const [bedBrightness, setBedBrightness] = useState(70)
  const [bedTemp, setBedTemp]            = useState<ColorTemp>('warm')

  const [isKitOn, setIsKitOn]            = useState(true)
  const [kitBrightness, setKitBrightness] = useState(100)
  const [kitTemp, setKitTemp]            = useState<ColorTemp>('cool')

  const allCommands = [
    ...localCmds,
    ...(commands.data ?? []),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
=======
  const roomSettings = useQuery({ queryKey: ['roomSettings'], queryFn: getRoomSettings })
  const commands     = useQuery({ queryKey: ['lightCommands'], queryFn: getLightCommands })

  const roomCommandMutation = useMutation({
    mutationFn: ({ room, command }: { room: string; command: 'on' | 'off' }) =>
      sendRoomCommand(room, command),
    onMutate: async ({ room, command }) => {
      await queryClient.cancelQueries({ queryKey: ['roomSettings'] })
      const prev = queryClient.getQueryData<RoomSetting[]>(['roomSettings'])
      queryClient.setQueryData<RoomSetting[]>(['roomSettings'], (old) =>
        old?.map((s) => s.room === room ? { ...s, is_on: command === 'on' } : s) ?? [],
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(['roomSettings'], ctx?.prev)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['roomSettings'] })
      queryClient.invalidateQueries({ queryKey: ['lightCommands'] })
    },
  })

  const roomSettingsMutation = useMutation({
    mutationFn: ({ room, settings }: { room: string; settings: { brightness?: number; color_temp?: string } }) =>
      updateRoomSettings(room, settings),
    onMutate: async ({ room, settings }) => {
      await queryClient.cancelQueries({ queryKey: ['roomSettings'] })
      const prev = queryClient.getQueryData<RoomSetting[]>(['roomSettings'])
      queryClient.setQueryData<RoomSetting[]>(['roomSettings'], (old) =>
        old?.map((s) => s.room === room ? {
          ...s,
          ...(settings.brightness !== undefined ? { brightness: settings.brightness } : {}),
          ...(settings.color_temp !== undefined ? { color_temp: settings.color_temp as RoomSetting['color_temp'] } : {}),
        } : s) ?? [],
      )
      return { prev }
    },
    onError: (_err, _vars, ctx) => {
      queryClient.setQueryData(['roomSettings'], ctx?.prev)
    },
  })

  const getRoom = (roomName: string, defaults: { isOn: boolean; brightness: number; colorTemp: ColorTemp }) => {
    const r = roomSettings.data?.find((s) => s.room === roomName)
    if (!r) return defaults
    return { isOn: r.is_on, brightness: r.brightness, colorTemp: r.color_temp as ColorTemp }
  }

  const toggle = (room: string) => {
    const current = roomSettings.data?.find((s) => s.room === room)?.is_on ?? false
    roomCommandMutation.mutate({ room, command: current ? 'off' : 'on' })
  }

  const setBrightness = (room: string, brightness: number) =>
    roomSettingsMutation.mutate({ room, settings: { brightness } })

  const setColorTemp = (room: string, colorTemp: ColorTemp) =>
    roomSettingsMutation.mutate({ room, settings: { color_temp: colorTemp } })

  const allCommands = [...(commands.data ?? [])].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  )
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e

  const arrowIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17l9.2-9.2M17 17V7H7" />
    </svg>
  )

<<<<<<< HEAD
=======
  const bed     = getRoom('Bedroom',     { isOn: false, brightness: 70,  colorTemp: 'warm'    })
  const living  = getRoom('Living Room', { isOn: true,  brightness: 85,  colorTemp: 'neutral' })
  const kitchen = getRoom('Kitchen',     { isOn: true,  brightness: 100, colorTemp: 'cool'    })

>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
  const rooms: (RoomLightCardProps & { key: string })[] = [
    {
      key: 'bedroom',
      name: 'Bedroom',
      schedule: '7:00 PM',
      icon: arrowIcon,
<<<<<<< HEAD
      isOn: isBedOn,
      brightness: bedBrightness,
      colorTemp: bedTemp,
      onToggle: () => { const next = !isBedOn; setIsBedOn(next); addLocalCmd('Bedroom', next ? 'on' : 'off') },
      onBrightness: setBedBrightness,
      onColorTemp: setBedTemp,
=======
      isOn: bed.isOn,
      brightness: bed.brightness,
      colorTemp: bed.colorTemp,
      onToggle:     () => toggle('Bedroom'),
      onBrightness: (v) => setBrightness('Bedroom', v),
      onColorTemp:  (v) => setColorTemp('Bedroom', v),
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
    },
    {
      key: 'living',
      name: 'Living Room',
      schedule: '10:30 PM',
      icon: arrowIcon,
<<<<<<< HEAD
      isOn: isLivingOn,
      brightness: livingBrightness,
      colorTemp: livingTemp,
      onToggle: () => {
        const next = !isLivingOn
        setLocalLiving(next)
        mutation.mutate(next ? 'on' : 'off')
      },
      onBrightness: setLivingBrightness,
      onColorTemp: setLivingTemp,
=======
      isOn: living.isOn,
      brightness: living.brightness,
      colorTemp: living.colorTemp,
      onToggle:     () => toggle('Living Room'),
      onBrightness: (v) => setBrightness('Living Room', v),
      onColorTemp:  (v) => setColorTemp('Living Room', v),
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
    },
    {
      key: 'kitchen',
      name: 'Kitchen',
      schedule: '6:00 PM',
      icon: arrowIcon,
<<<<<<< HEAD
      isOn: isKitOn,
      brightness: kitBrightness,
      colorTemp: kitTemp,
      onToggle: () => { const next = !isKitOn; setIsKitOn(next); addLocalCmd('Kitchen', next ? 'on' : 'off') },
      onBrightness: setKitBrightness,
      onColorTemp: setKitTemp,
=======
      isOn: kitchen.isOn,
      brightness: kitchen.brightness,
      colorTemp: kitchen.colorTemp,
      onToggle:     () => toggle('Kitchen'),
      onBrightness: (v) => setBrightness('Kitchen', v),
      onColorTemp:  (v) => setColorTemp('Kitchen', v),
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
    },
  ]

  const onCount = rooms.filter((r) => r.isOn).length

  return (
    <div className="flex flex-col gap-6 animate-float-up">
      {/* Page title */}
      <div className="mt-5 flex items-end justify-between">
        <div>
          <p className="text-xs text-stone-400/80 mb-1.5">Last updated: 3 mins ago</p>
          <h1 className="text-[32px] sm:text-[40px] font-normal text-stone-900 leading-tight tracking-tight">Room Lights</h1>
        </div>
        <div className={`flex items-center gap-2 text-sm font-semibold rounded-2xl px-4 py-2 transition-all duration-500 ${
          onCount > 0 ? 'bg-white/70 text-stone-700' : 'bg-white/50 text-stone-400'
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${onCount > 0 ? 'bg-emerald-400' : 'bg-stone-300'}`} />
          {onCount} / {rooms.length} on
        </div>
      </div>

      {/* 3 room cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {rooms.map(({ key, ...props }) => (
          <RoomLightCard key={key} {...props} />
        ))}
      </div>

      {/* Command history */}
      <div
        className="rounded-3xl overflow-hidden"
        style={{
          background: '#ffffff',
          border: '1px solid rgba(0,0,0,0.06)',
          boxShadow: '0 0 0 1px rgba(255,255,255,0.7) inset, 0 1px 2px rgba(0,0,0,0.03), 0 8px 32px rgba(0,0,0,0.05)',
        }}
      >
        <div className="flex items-start justify-between px-7 pt-6 pb-5" style={{ background: '#f0efed' }}>
          <div>
            <div className="flex items-center gap-3 mb-1.5">
              <div className="w-0.75 h-4.5 rounded-full bg-[#C8601F]" />
              <h2 className="text-[19px] font-semibold text-stone-900 leading-none tracking-tight">Command History</h2>
            </div>
            <p className="text-[13px] text-stone-400 pl-3.75">Recent lighting activity</p>
          </div>
          <div className="bg-stone-200/80 rounded-full px-3 py-1.5">
            <span className="text-[12px] font-semibold text-stone-500 tabular-nums">{allCommands.length} entries</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_96px_64px] px-7 py-3 bg-stone-50 border-y border-stone-100/80">
          {[
            { label: 'Device', cls: '' },
            { label: 'Command', cls: '' },
            { label: 'Time', cls: 'text-right' },
          ].map(({ label, cls }) => (
            <span key={label} className={`text-[12px] font-bold tracking-[0.15em] uppercase text-stone-400 ${cls}`}>{label}</span>
          ))}
        </div>

        <div className="divide-y divide-stone-100/70">
          {(showAll ? allCommands : allCommands.slice(0, 5)).map((cmd) => {
            const isOn = cmd.command === 'on'
            const time = new Date(cmd.created_at).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
            return (
              <div key={cmd.id} className="relative grid grid-cols-[1fr_96px_64px] items-center px-7 py-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isOn ? 'bg-emerald-50' : 'bg-red-50'}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke={isOn ? '#10b981' : '#ef4444'} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 18h6m-5 4h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <div className="text-[15px] font-semibold text-stone-800 truncate leading-snug">
<<<<<<< HEAD
                      {(cmd.device?.name ?? 'Unknown').replace(/\s*light\s*/i, '').trim()}
                    </div>
                    <div className="text-[12px] text-stone-400 mt-1 font-medium leading-snug">Living Room</div>
=======
                      {(cmd.device_name ?? cmd.device?.name ?? 'Unknown').replace(/\s*Room\s*/i, '').trim()}
                    </div>
                    <div className="text-[12px] text-stone-400 mt-1 font-medium leading-snug">
                      {cmd.device_name ?? 'Living Room'}
                    </div>
>>>>>>> 0cfb5800ab41499dd5b546fd19c5441e9822217e
                  </div>
                </div>
                <div>
                  {isOn ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wider bg-emerald-50 text-emerald-600 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />On
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-bold tracking-wider bg-red-50 text-red-500 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />Off
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-mono text-[13px] text-stone-400 tabular-nums">{time}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="px-7 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[12px] font-medium text-stone-400">
            Showing {showAll ? allCommands.length : Math.min(5, allCommands.length)} of {allCommands.length} commands
          </span>
          <button onClick={() => setShowAll((v) => !v)} className="inline-flex items-center gap-1 text-[12px] font-bold text-[#C8601F]/60 tracking-wide uppercase">
            {showAll ? 'Show less' : 'View all'}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
