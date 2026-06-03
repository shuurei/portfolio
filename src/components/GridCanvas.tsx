import { useEffect, useRef } from 'react'

interface GridCanvasProps {
    grid?: number
    radius?: number
    dotBase?: number
    dotHover?: number
    color?: string
    lineOpacityFactor?: number
    className?: string
}

export default function GridCanvas({ className, ...options }: GridCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const {
        grid = 40,
        radius = 175,
        dotBase = 0.15,
        dotHover = 0.6,
        color = '0, 0, 0',
        lineOpacityFactor = 0.4,
    } = options

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let mouseX = -9999
        let mouseY = -9999
        let animFrame: number

        const getOffset = () => {
            const rect = canvas.getBoundingClientRect()
            return { top: rect.top + window.scrollY, left: rect.left + window.scrollX }
        }

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const cols = Math.ceil(canvas.width / grid) + 1
            const rows = Math.ceil(canvas.height / grid) + 1
            const { top, left } = getOffset()

            const localMouseX = mouseX - left
            const localMouseY = mouseY - top

            // traits
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * grid
                    const y = j * grid

                    const dist = Math.hypot(localMouseX - x, localMouseY - y)
                    const influence = Math.max(0, 1 - dist / radius)
                    const opacity = dotBase + influence * (dotHover - dotBase)

                    if (i < cols - 1) {
                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(x + grid, y)
                        ctx.strokeStyle = `rgba(${color}, ${opacity * lineOpacityFactor})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }

                    if (j < rows - 1) {
                        ctx.beginPath()
                        ctx.moveTo(x, y)
                        ctx.lineTo(x, y + grid)
                        ctx.strokeStyle = `rgba(${color}, ${opacity * lineOpacityFactor})`
                        ctx.lineWidth = 0.5
                        ctx.stroke()
                    }
                }
            }

            // points
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * grid
                    const y = j * grid

                    const dist = Math.hypot(localMouseX - x, localMouseY - y)
                    const influence = Math.max(0, 1 - dist / radius)
                    const opacity = dotBase + influence * (dotHover - dotBase)
                    const dotRadius = 1 + influence * 1.75  // 1px → 2.5px progressivement

                    ctx.beginPath()
                    ctx.arc(x, y, dotRadius, 0, Math.PI * 2)
                    ctx.fillStyle = `rgba(${color}, ${opacity})`
                    ctx.fill()
                }
            }

            animFrame = requestAnimationFrame(draw)
        }

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX + window.scrollX
            mouseY = e.clientY + window.scrollY
        }

        resize()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas)

        window.addEventListener('mousemove', onMouseMove)
        draw()

        return () => {
            cancelAnimationFrame(animFrame)
            resizeObserver.disconnect()
            window.removeEventListener('mousemove', onMouseMove)
        }
    }, [grid, radius, dotBase, dotHover, color, lineOpacityFactor])

    return (
        <canvas
            ref={canvasRef}
            className={`pointer-events-none ${className}`}
            style={{ width: '100%', height: '100%' }}
        />
    );
}