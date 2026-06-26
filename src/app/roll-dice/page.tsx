'use client'

import { useState, useMemo } from "react"
import { Dices, RotateCcw, Play, BarChart3, Clock, HelpCircle } from "lucide-react"
import PageHeader from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import miniProjects from "@/data/mini-projects"

// Helper to define dot grid positions (1-indexed for CSS grid row/column mapping)
const getDots = (value: number) => {
  switch (value) {
    case 1:
      return [{ r: 2, c: 2 }]
    case 2:
      return [{ r: 1, c: 3 }, { r: 3, c: 1 }]
    case 3:
      return [{ r: 1, c: 3 }, { r: 2, c: 2 }, { r: 3, c: 1 }]
    case 4:
      return [{ r: 1, c: 1 }, { r: 1, c: 3 }, { r: 3, c: 1 }, { r: 3, c: 3 }]
    case 5:
      return [{ r: 1, c: 1 }, { r: 1, c: 3 }, { r: 2, c: 2 }, { r: 3, c: 1 }, { r: 3, c: 3 }]
    case 6:
      return [{ r: 1, c: 1 }, { r: 1, c: 3 }, { r: 2, c: 1 }, { r: 2, c: 3 }, { r: 3, c: 1 }, { r: 3, c: 3 }]
    default:
      return []
  }
}

// Vector-based dice rendering
function DiceFace({ value, size = "large" }: { value: number; size?: "large" | "small" }) {
  const dots = getDots(value)
  const boxClass = size === "large" 
    ? "size-32 border-4 shadow-shadow p-5" 
    : "size-12 border-2 shadow-[2px_2px_0px_var(--border)] p-1.5"
  
  const dotClass = size === "large" ? "size-5" : "size-2"

  return (
    <div 
      className={`${boxClass} border-border bg-secondary-background rounded-base grid grid-cols-3 grid-rows-3 gap-0.5 justify-items-center items-center shrink-0 select-none`}
    >
      {dots.map((dot, idx) => (
        <div 
          key={idx}
          className={`${dotClass} bg-foreground rounded-full`}
          style={{ gridRowStart: dot.r, gridColumnStart: dot.c }}
        />
      ))}
    </div>
  )
}

export default function RollDice() {
  const [currentValue, setCurrentValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)
  const [rollHistory, setRollHistory] = useState<number[]>([])

  const [pageHeaderData] = useState(() =>
    miniProjects.find((project) => project.id === 'roll-dice')
  )

  // Simulation of roll animation
  const handleRoll = () => {
    if (isRolling) return
    setIsRolling(true)

    let counter = 0
    const interval = setInterval(() => {
      // Cycle random numbers for rolling effect
      setCurrentValue(Math.floor(Math.random() * 6) + 1)
      counter++
      
      if (counter > 10) {
        clearInterval(interval)
        const finalValue = Math.floor(Math.random() * 6) + 1
        setCurrentValue(finalValue)
        setRollHistory((prev) => [finalValue, ...prev])
        setIsRolling(false)
      }
    }, 60)
  }

  // Reset helper
  const handleReset = () => {
    if (isRolling) return
    setCurrentValue(1)
    setRollHistory([])
  }

  // Statistical calculations
  const stats = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0]
    rollHistory.forEach((val) => {
      if (val >= 1 && val <= 6) {
        counts[val - 1]++
      }
    })
    
    const sum = rollHistory.reduce((acc, val) => acc + val, 0)
    const average = rollHistory.length > 0 ? (sum / rollHistory.length).toFixed(2) : "0.00"

    return { counts, average, sum }
  }, [rollHistory])

  const accentColor = pageHeaderData?.accent || 'var(--chart-1)'

  return (
    <div 
      className="min-h-[100dvh] flex flex-col bg-background bg-grid-pattern"
      style={{ '--page-accent': accentColor } as React.CSSProperties}
    >
      <main className="flex-1">
        {/* Page header */}
        <PageHeader
          title={pageHeaderData?.title || "Roll Dice"}
          description={pageHeaderData?.description || "Simulasi melempar dadu dengan animasi interaktif."}
          accent={accentColor}
        />

        {/* Main Content */}
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left: Main Roller Card */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <Card className="p-0 overflow-hidden border-2 border-border shadow-shadow bg-secondary-background">
                <CardHeader className="bg-main border-b-2 border-border text-main-foreground px-5 py-3">
                  <CardTitle className="text-main-foreground text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Dices className="size-4 text-main-foreground" />
                    Papan Kocok Dadu
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-10 flex flex-col items-center justify-center gap-8 min-h-[300px]">
                  {/* Dice container with roll rotate/shake animations */}
                  <div 
                    className={`transition-transform duration-100 ${
                      isRolling ? 'animate-[bounce_0.2s_infinite] scale-95 rotate-12' : ''
                    }`}
                  >
                    <DiceFace value={currentValue} size="large" />
                  </div>

                  {/* Controls */}
                  <div className="flex gap-4 w-full max-w-xs mt-4">
                    <Button
                      onClick={handleRoll}
                      disabled={isRolling}
                      className="flex-1 font-bold"
                    >
                      <Play className="size-4 mr-2 fill-white text-white" />
                      Lempar Dadu
                    </Button>

                    {rollHistory.length > 0 && (
                      <Button
                        onClick={handleReset}
                        disabled={isRolling}
                        variant="neutral"
                        className="px-5 shrink-0 font-bold"
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Statistics occurrence table */}
              <Card className="p-0 overflow-hidden border-2 border-border shadow-shadow bg-secondary-background">
                <CardHeader className="bg-secondary-background border-b-2 border-border px-5 py-3">
                  <CardTitle className="text-foreground text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <BarChart3 className="size-4 text-foreground" />
                    Statistik Distribusi Lemparan
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-5 flex flex-col gap-5">
                  <div className="grid grid-cols-6 gap-2 text-center">
                    {[1, 2, 3, 4, 5, 6].map((num) => {
                      const count = stats.counts[num - 1]
                      const percent = rollHistory.length > 0 
                        ? ((count / rollHistory.length) * 100).toFixed(0) 
                        : "0"

                      return (
                        <div key={num} className="border-2 border-border bg-secondary-background p-2.5 flex flex-col items-center shadow-shadow rounded-base">
                          <span className="text-xs font-black text-foreground/70">Dadu {num}</span>
                          <span className="text-xl font-black text-foreground mt-1">{count}</span>
                          <span className="text-[10px] font-bold text-foreground/60 mt-0.5">{percent}%</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-main/10 border-2 border-border p-4 text-center rounded-base">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Total Lemparan</span>
                      <span className="text-lg sm:text-xl font-black text-foreground mt-0.5">{rollHistory.length} Kali</span>
                    </div>
                    <div className="flex flex-col items-center justify-center border-l-2 border-r-2 border-border/10 px-2">
                      <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Total Nilai</span>
                      <span className="text-lg sm:text-xl font-black text-foreground mt-0.5">{stats.sum}</span>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Rata-Rata Nilai</span>
                      <span className="text-lg sm:text-xl font-black text-foreground mt-0.5">{stats.average}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right: Roll History Log */}
            <div className="flex flex-col gap-6">
              <Card className="h-full flex flex-col p-0 overflow-hidden border-2 border-border shadow-shadow bg-secondary-background">
                <CardHeader className="bg-foreground text-background border-b-2 border-border px-5 py-3">
                  <CardTitle className="text-background text-sm font-black uppercase tracking-widest flex items-center gap-2">
                    <Clock className="size-4 text-background" />
                    Riwayat Lemparan
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-5 flex-1 overflow-y-auto max-h-[460px] flex flex-col gap-4">
                  {rollHistory.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center gap-2 border-2 border-dashed border-border/20 p-5 rounded-base">
                      <HelpCircle className="size-8 text-foreground/40" />
                      <p className="text-sm font-bold text-foreground">Belum ada riwayat</p>
                      <p className="text-xs text-foreground/60">Silakan lempar dadu untuk memulai pencatatan.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-3">
                      {rollHistory.map((val, idx) => (
                        <div 
                          key={idx}
                          className="flex flex-col items-center gap-1.5 p-2 bg-background border-2 border-border rounded-base shadow-shadow hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                        >
                          <span className="text-[10px] font-black text-foreground/70 select-none">#{rollHistory.length - idx}</span>
                          <DiceFace value={val} size="small" />
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

