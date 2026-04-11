import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getLight, sendLightCommand } from '../../services/lightService'
import { STAR_POSITIONS } from '../../constants/decorations'

export function LightCard() {
  const queryClient = useQueryClient()
  const light = useQuery({ queryKey: ['light'], queryFn: getLight })
  const [localOn, setLocalOn] = useState<boolean | null>(null)
  const isOn = localOn ?? light.data?.status === 'on'

  const mutation = useMutation({
    mutationFn: sendLightCommand,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['light'] })
      queryClient.invalidateQueries({ queryKey: ['lightCommands'] })
    },
  })

  const handleToggle = () => {
    const next = !isOn
    setLocalOn(next)
    mutation.mutate(next ? 'on' : 'off')
  }

  return (
    <div className={`h-full relative overflow-hidden rounded-3xl transition-all duration-700 flex flex-col p-6 ${
      isOn
        ? 'bg-linear-to-br from-orange-50 via-orange-50/60 to-orange-100/50'
        : 'bg-linear-to-br from-[#0d0d12] via-[#111116] to-[#090910]'
    }`}>
      {!isOn && (
        <div className="absolute inset-0 pointer-events-none">
          {STAR_POSITIONS.map(([x, y], i) => (
            <div key={i} className="absolute rounded-full bg-white"
              style={{ left:`${x}%`, top:`${y}%`, width:i%3===0?2:1, height:i%3===0?2:1, opacity:0.4+(i%4)*0.15 }} />
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className={`text-[19px] font-semibold transition-colors duration-700 ${isOn ? 'text-stone-800' : 'text-white/60'}`}>
          {light.data?.name ?? 'Living Room Light'}
        </span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          className={isOn ? 'text-stone-300' : 'text-white/20'}>
          <path d="M7 17l9.2-9.2M17 17V7H7" />
        </svg>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <div role="button" onClick={handleToggle} className="relative flex items-center justify-center transition-transform duration-200 active:scale-95 cursor-pointer">
          {isOn && <div className="absolute rounded-full bg-orange-300/35 blur-2xl w-32 h-32" />}
          <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 shadow-lg ${
            isOn ? 'bg-linear-to-br from-orange-400 to-[#C8601F] shadow-orange-300/40' : 'bg-[#ffffff0d] shadow-none border border-white/10'
          }`}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" strokeWidth="1.4" stroke={isOn ? '#fff' : '#ffffff55'} className="transition-all duration-500">
              <path d="M9 18h6m-5 4h4M12 2a7 7 0 00-4 12.7V17h8v-2.3A7 7 0 0012 2z" />
            </svg>
          </div>
        </div>
        <span className={`text-[12px] font-semibold tracking-widest uppercase transition-colors duration-700 ${isOn ? 'text-orange-500' : 'text-white/25'}`}>
          {isOn ? 'On' : 'Off'}
        </span>
      </div>
    </div>
  )
}
