import MenuSection from '../MenuSection'
import Button from '../Button'
import { usePresentationActions } from '../../../hooks/redux';
import { SlideObjectType } from '../../../models/types';

type SectionImagesProps = {
    activeSlideId: string|undefined
};

const SectionImages = (props: SectionImagesProps) => {
    const {createObject} = usePresentationActions();

    const clickCreateObjectHandler = (slideId: string|undefined, type: string, subtype: string|undefined) => {
        if (slideId === undefined) {
            return
        }
        createObject({slideId: slideId, type: type, subtype: subtype})
    }

    return (
        <MenuSection name='Images'>
            <div>
                <Button onClick={() => clickCreateObjectHandler(props.activeSlideId, SlideObjectType.Image, undefined)}>
                    <i className="fa-solid fa-file-image" style={{color: `#4c88f0`, fontSize: `1.5rem`}}/> <br/>
                    Upload <br/>
                    Image
                </Button>
            </div>
        </MenuSection>
    )
}

export default SectionImages