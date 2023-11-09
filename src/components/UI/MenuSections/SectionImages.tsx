import MenuSection from '../MenuSection'
import Button from '../Button'

type SectionImagesProps = {
    
};

const SectionImages = (props: SectionImagesProps) => {
    return (
        <MenuSection name='Images'>
            <div>
                <Button>
                    <i className="fa-solid fa-file-image" style={{color: `#4c88f0`, fontSize: `1.5rem`}}/> <br/>
                    Upload <br/>
                    Image
                </Button>
            </div>
        </MenuSection>
    )
}

export default SectionImages