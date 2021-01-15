import React, { useEffect, useRef } from 'react'
import Matter from 'matter-js'

export const MatterStepOne = () => {
  const boxRef = useRef(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    let Engine = Matter.Engine
    let Render = Matter.Render
    let World = Matter.World
    let Bodies = Matter.Bodies

    let engine = Engine.create({})

    let render = Render.create({
      element: boxRef.current,
      engine: engine,
      canvas: canvasRef.current,
      options: {
        width: 300,
        height: 300,
        background: 'rgba(255, 0, 0, 0.5)',
        wireframes: false,
      },
    })

    const floor = Bodies.rectangle(150, 300, 300, 20, {
      isStatic: true,
      render: {
        fillStyle: 'blue',
      },
    })

    const ball = Bodies.circle(150, 0, 10, {
      restitution: 0.9,
      render: {
        fillStyle: 'yellow',
      },
    })

    World.add(engine.world, [floor, ball])

    Engine.run(engine)
    Render.run(render)
  }, [])

  return (
    <div
      ref={boxRef}
      style={{
        border: '1px solid white',
        width: 300,
        height: 300,
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
