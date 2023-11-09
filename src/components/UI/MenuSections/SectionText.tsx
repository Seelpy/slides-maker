import MenuSection from '../MenuSection'
import Button from '../Button'

type SectionTextProps = {
    
};

const SectionText = (props: SectionTextProps) => {
    return (
        <MenuSection name='Text'>
            <div>
                Font:
                <select defaultValue={"Arial"}>
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Tahoma">Tahoma</option>
                    <option value="Trebuchet MS">Trebuchet MS</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Garamond">Garamond</option>
                    <option value="Courier New">Courier New</option>
                    <option value="Brush Script MT">Brush Script MT</option>
                </select>

                Size:
                <input type="number" defaultValue={14} style={{width: `2.5rem`}}/>
            </div>

            <div>
                <Button> <i className="fa-solid fa-plus" style={{color: `#4c88f0`}}/> New Text </Button>
                <Button> <em>italic</em> </Button>
                <Button> <strong>Bold</strong> </Button>
            </div>
        </MenuSection>
    )
}

export default SectionText