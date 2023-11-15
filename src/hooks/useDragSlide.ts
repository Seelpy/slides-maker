import { useEffect, useRef } from "react";
import { SlideInfo } from "../models/types";
import { useAppSelector, useInterfaceActions } from "./redux";

function useDragSlide(elementRef: React.MutableRefObject<HTMLDivElement | null>, slide: SlideInfo) {
    const {isDraggingSlides} = useAppSelector(state => state.interfaceReducer);
    const {setDragSlides, setDragSlidesOrigin, setDragSlidesDelta} = useInterfaceActions();

    const isDraggingThis = useRef<boolean>(false);
    const coords = useRef<{startMouse: number, lastMouse: number}>({
        startMouse: 0,
        lastMouse: 0,
    });

    useEffect(() => {
        if (elementRef.current && elementRef.current.getAttribute("data-selected") === "true") {
            if (isDraggingSlides) {
                isDraggingThis.current = true;
                coords.current.startMouse = coords.current.lastMouse;
            }
            else if (isDraggingThis.current) {
                isDraggingThis.current = false;
                elementRef.current.style.transform = ``;
            }
        }
        else {
            isDraggingThis.current = false;
        }
    }, [isDraggingSlides, slide.id]);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) throw new Error("Slide is undefined!");
        
        const area = element.parentElement;
        if (!area) throw new Error("Wrong slide structure! Slide doesn't have a parent-area");

        const onMouseDown = () => {
            if (element.getAttribute("data-selected") === "true") {
                setDragSlides(true);
                setDragSlidesOrigin(slide);
            }
        }
    
        const onMouseMove = (e: MouseEvent) => {
            coords.current.lastMouse = e.clientY;

            if (!isDraggingThis.current) return;

            const deltaHeight = e.clientY - coords.current.startMouse;
            element.style.transform = `translateY(${deltaHeight}px)`;
            setDragSlidesDelta(deltaHeight);
        }
    
        element.addEventListener('mousedown', onMouseDown);
        area.addEventListener('mousemove', onMouseMove);
    
        return () => {
            element.removeEventListener('mousedown', onMouseDown);
            area.removeEventListener('mousemove', onMouseMove);
        };
    }, [slide.id])
}

export default useDragSlide;