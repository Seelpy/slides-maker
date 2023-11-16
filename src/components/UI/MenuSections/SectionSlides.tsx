import MenuSection from '../MenuSection'
import Button from '../Button'
import { usePresentationActions } from '../../../hooks/redux'
import { SlideInfo } from '../../../models/types'
import { v4 as uuidv4 } from 'uuid';

const SectionSlides = () => {
    const {createSlide} = usePresentationActions();

    const handleNewSlide = () => {
        const emptySlide: SlideInfo = {
            id: uuidv4(),
            selected: false,
            slide: []
        }

        createSlide(emptySlide);
    }

    return (
        <MenuSection name='Slides'>
            <div>
                <Button onClick={() => handleNewSlide()}> 
                    <i className="fa-solid fa-plus" style={{color: `#4c88f0`}}/> New Slide 
                </Button>
            </div>
        </MenuSection>
    )
}

export default SectionSlides