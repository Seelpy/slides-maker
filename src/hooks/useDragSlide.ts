import { useEffect, useRef } from "react";
import { SlideInfo } from "../models/types";
import { useAppSelector, useInterfaceActions, usePresentationActions } from "./redux";

function useDragSlide(elementRef: React.MutableRefObject<HTMLDivElement | null>, slide: SlideInfo, isDraggingCallback: (start: boolean) => void) {
    const {isDraggingSlides} = useAppSelector(state => state.interfaceReducer);
    const slides = useAppSelector(state => state.presentationReducer.slides);

    const {moveSlide} = usePresentationActions();
    const {setMovedSlides} = useInterfaceActions();

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

                const moveDelta = coords.current.lastMouse - coords.current.startMouse;
                const slidesPassed = Math.round(moveDelta / (elementRef.current.clientHeight + 12));

                // Клэмпим количество пройденных слайдов
                const oldIndex = slides.findIndex(s => s.id === slide.id);
                const minMove = -oldIndex;
                const maxMove = slides.length - oldIndex - 1;
                const moveBy = Math.min(Math.max(slidesPassed, minMove), maxMove);

                // Проверяем, есть ли смысл двигать слайды (есть ли невыделенные слайды выше/ниже)
                let shouldMove = false;
                for (let i = moveBy > 0 ? (oldIndex + 1) : 0; moveBy > 0 ? i < slides.length : i < oldIndex; i++) {
                    if (!slides[i].selected) {
                        shouldMove = true;
                        break;
                    }
                }

                // Двигаем слайды и меняем активный слайд, если он поменялся
                if (shouldMove && moveBy !== 0) {     
                    setMovedSlides(true);
                    moveSlide({
                        slide: slide,
                        moveBy: moveBy
                    });
                }
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
                isDraggingCallback(true);
            }
        }
    
        const onMouseMove = (e: MouseEvent) => {
            coords.current.lastMouse = e.clientY;

            if (!isDraggingThis.current) return;

            const deltaHeight = e.clientY - coords.current.startMouse;
            element.style.transform = `translateY(${deltaHeight}px)`;
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