import { useEffect, useRef } from "react";
import { Position, SlideInfo, SlideObject } from "../models/types";
import { useAppSelector, usePresentationActions } from "./redux";

function useDragObject(elementRef: React.MutableRefObject<HTMLDivElement | null>, slide: SlideInfo, obj: SlideObject, isDraggingCallback: (start: boolean) => void) {
    const isDraggingThis = useRef<boolean>(false);
    const isDraggingObjects = useAppSelector(state => state.interfaceReducer.isDraggingObjects);

    const {updateSlide} = usePresentationActions();
    const coords = useRef<{start: Position, stop: Position, lastEvent: Position}>({
        start: { x: 0, y: 0 },
        stop: { x: 0, y: 0 },
        lastEvent: { x: 0, y: 0 },
    });

    useEffect(() => {
        if (elementRef.current && elementRef.current.getAttribute("data-selected") === "true") {
            if (isDraggingObjects) {
                isDraggingThis.current = true;
                coords.current.start.x = coords.current.lastEvent.x;
                coords.current.start.y = coords.current.lastEvent.y;
            }
            else {
                isDraggingThis.current = false;
                coords.current.stop.x = elementRef.current.offsetLeft;
                coords.current.stop.y = elementRef.current.offsetTop;
            }
        }
        else {
            isDraggingThis.current = false;
        }
    }, [isDraggingObjects]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) throw new Error("Slide object is undefined!");

        const area = element.parentElement;
        if (!area) throw new Error("Wrong slide object structure! Object doesn't have a parent-area");

        const onMouseDown = () => {
            if (element.getAttribute("data-selected") === "true") {
                isDraggingCallback(true);
            }
        }
    
        const onMouseMove = (e: MouseEvent) => {
            coords.current.lastEvent.x = e.clientX;
            coords.current.lastEvent.y = e.clientY;

            if (!isDraggingThis.current) return;

            const deltaHeight = e.clientY - coords.current.start.y + coords.current.stop.y;
            const deltaWidth = e.clientX - coords.current.start.x + coords.current.stop.x;

            updateSlide({
                slide: slide,
                oldSlideObject: obj,
                newSlideObject: {...obj, position: {x: deltaWidth, y: deltaHeight}}
            });
        }
    
        element.addEventListener('mousedown', onMouseDown);
        area.addEventListener('mousemove', onMouseMove);
    
        return () => {
            element.removeEventListener('mousedown', onMouseDown);
            area.removeEventListener('mousemove', onMouseMove);
        };
    }, [elementRef, obj.id])
}

export default useDragObject;