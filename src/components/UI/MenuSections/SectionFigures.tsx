import MenuSection from '../MenuSection'
import Button from '../Button'

type SectionFiguresProps = {

};

const SectionFigures = (props: SectionFiguresProps) => {
    return (
        <MenuSection name='Figures'>
            <div>
                <Button width='2.5rem' height='2.5rem'>
                    <i className="fa-solid fa-circle fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>

                <Button width='2.5rem' height='2.5rem'>
                    <i className="fa-solid fa-square fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>
            </div>

            <div>
                <Button width='2.5rem' height='2.5rem'>
                    <i className="fa-solid fa-caret-up fa-2xl" style={{color: `#4c88f0`}}/>
                </Button>
            </div>
        </MenuSection>
    )
}

export default SectionFigures