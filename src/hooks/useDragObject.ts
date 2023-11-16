import { useEffect, useRef } from "react";
import { Position, SlideInfo, SlideObject } from "../models/types";
import { useAppSelector, useInterfaceActions, usePresentationActions } from "./redux";

function useDragObject(elementRef: React.MutableRefObject<HTMLDivElement | null>, slide: SlideInfo, obj: SlideObject) {
    const isDraggingThis = useRef<boolean>(false);
    const isDraggingObjects = useAppSelector(state => state.interfaceReducer.isDraggingObjects);

    const {updateSlide} = usePresentationActions();
    const {setDragObjectsDelta} = useInterfaceActions();

    const coords = useRef<{startMouse: Position, startOffset: Position, currentMouse: Position}>({
        startMouse: { x: 0, y: 0 },
        startOffset: { x: 0, y: 0 },
        currentMouse: { x: 0, y: 0 },
    });

    useEffect(() => {
        if (elementRef.current && obj.selected && isDraggingObjects) {
            isDraggingThis.current = true;
            coords.current.startMouse.x = coords.current.currentMouse.x;
            coords.current.startMouse.y = coords.current.currentMouse.y;
            coords.current.startOffset.x = elementRef.current.offsetLeft;
            coords.current.startOffset.y = elementRef.current.offsetTop;
        }
        else {
            isDraggingThis.current = false;
        }
    }, [isDraggingObjects, elementRef, obj]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) throw new Error("Slide object is undefined!");
        
        const area = element.parentElement?.parentElement;
        if (!area) throw new Error("Wrong slide object structure! Object doesn't have a parent-area");
    
        const onMouseMove = (e: MouseEvent) => {
            coords.current.currentMouse.x = e.clientX;
            coords.current.currentMouse.y = e.clientY;

            if (!isDraggingThis.current) return;

            const deltaHeight = e.clientY - coords.current.startMouse.y + coords.current.startOffset.y;
            const deltaWidth = e.clientX - coords.current.startMouse.x + coords.current.startOffset.x;

            setDragObjectsDelta(Math.abs(deltaHeight) + Math.abs(deltaWidth));
            
            updateSlide({
                slide: slide,
                oldSlideObject: obj,
                newSlideObject: {...obj, position: {x: deltaWidth, y: deltaHeight}}
            });
        }
    
        area.addEventListener('mousemove', onMouseMove);
    
        return () => {
            area.removeEventListener('mousemove', onMouseMove);
        };
    }, [elementRef, obj])
}

export default useDragObject;