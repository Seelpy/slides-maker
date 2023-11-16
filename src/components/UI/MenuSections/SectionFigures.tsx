import MenuSection from '../MenuSection'
import Button from '../Button'
import { usePresentationActions } from '../../../hooks/redux';
import { PrimitiveType, SlideObjectType } from '../../../models/types';

type SectionFiguresProps = {
    activeSlideId: string|undefined
};

const SectionFigures = (props: SectionFiguresProps) => {
    const {createObject} = usePresentationActions();

    const clickCreateObjectHandler = (slideId: string|undefined, type: string, subtype: string|undefined) => {
        if (slideId === undefined) {
            return
        }
        createObject({slideId: slideId, type: type, subtype: subtype})
    }

    return (
        <MenuSection name='Figures'>
            <div>
                <Button width='2.5rem' height='2.5rem' onClick={() => clickCreateObjectHandler(props.activeSlideId, SlideObjectType.Primitive, PrimitiveType.Circle)}>
                    <i className="fa-solid fa-circle fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>

                <Button width='2.5rem' height='2.5rem' onClick={() => clickCreateObjectHandler(props.activeSlideId, SlideObjectType.Primitive, PrimitiveType.Square)}>
                    <i className="fa-solid fa-square fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>
            </div>

            <div>
                <Button width='2.5rem' height='2.5rem' onClick={() => clickCreateObjectHandler(props.activeSlideId, SlideObjectType.Primitive, PrimitiveType.Triangle)}>
                    <i className="fa-solid fa-caret-up fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>
            </div>
        </MenuSection>
    )
}

export default SectionFigures