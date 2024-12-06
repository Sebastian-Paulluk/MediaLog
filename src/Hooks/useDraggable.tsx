import { useState } from "react";

type Position = {
    x: number;
    y: number;
};

const useDraggable = (initialPosition: Position = { x: 0, y: 0 }) => {
    const [position, setPosition] = useState<Position>(initialPosition);
    const [dragging, setDragging] = useState<boolean>(false);

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>): void => {
        setDragging(true);
        e.currentTarget.setPointerCapture(e.pointerId); // Captura el puntero para este elemento
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
        if (!dragging) return;

        setPosition((prevPosition) => ({
            x: prevPosition.x + e.movementX, // Incrementa según el movimiento
            y: prevPosition.y + e.movementY,
        }));
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>): void => {
        setDragging(false);
        e.currentTarget.releasePointerCapture(e.pointerId); // Libera el puntero
    };

    return {
        position,
        handlePointerDown,
        handlePointerMove,
        handlePointerUp,
    };
};

export default useDraggable;